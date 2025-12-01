import { Request, Response } from 'express';
import pool from '../config/database';

export const createOrder = async (req: Request, res: Response) => {
  const client = await pool.connect();
  
  try {
    const { items, deliveryAddress } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items are required' });
    }

    if (!deliveryAddress || deliveryAddress.trim() === '') {
      return res.status(400).json({ message: 'Delivery address is required' });
    }

    await client.query('BEGIN');

    // Calculate total price and validate products
    let totalPrice = 0;
    const validatedItems = [];

    for (const item of items) {
      const { productId, quantity } = item;
      
      const productResult = await client.query(
        'SELECT id, price FROM products WHERE id = $1',
        [productId]
      );

      if (productResult.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({ message: `Product ${productId} not found` });
      }

      const product = productResult.rows[0];
      const itemTotal = product.price * quantity;
      totalPrice += itemTotal;

      validatedItems.push({
        productId: product.id,
        quantity,
        price: product.price
      });
    }

    // Create order
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total_price, delivery_address, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, totalPrice, deliveryAddress, 'pending']
    );

    const order = orderResult.rows[0];

    // Create order items
    for (const item of validatedItems) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [order.id, item.productId, item.quantity, item.price]
      );
    }

    // Clear user's cart after successful order
    await client.query('DELETE FROM user_carts WHERE user_id = $1', [userId]);

    await client.query('COMMIT');

    res.status(201).json({
      message: 'Order placed successfully',
      order: {
        id: order.id,
        totalPrice: order.total_price,
        status: order.status,
        deliveryAddress: order.delivery_address,
        createdAt: order.created_at
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  } finally {
    client.release();
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const ordersResult = await pool.query(
      `SELECT o.id, o.total_price, o.status, o.delivery_address, o.created_at,
              json_agg(
                json_build_object(
                  'id', oi.id,
                  'productId', oi.product_id,
                  'productName', p.name,
                  'quantity', oi.quantity,
                  'price', oi.price,
                  'image', p.image
                )
              ) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE o.user_id = $1
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [userId]
    );

    res.json({ orders: ordersResult.rows });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const orderResult = await pool.query(
      `SELECT o.id, o.total_price, o.status, o.delivery_address, o.created_at,
              json_agg(
                json_build_object(
                  'id', oi.id,
                  'productId', oi.product_id,
                  'productName', p.name,
                  'quantity', oi.quantity,
                  'price', oi.price,
                  'image', p.image
                )
              ) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE o.id = $1 AND o.user_id = $2
       GROUP BY o.id`,
      [id, userId]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ order: orderResult.rows[0] });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Failed to fetch order' });
  }
};

export const getUserCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const cartResult = await pool.query(
      `SELECT uc.id, uc.product_id, uc.quantity, 
              p.name, p.price, p.unit, p.image, p.category
       FROM user_carts uc
       JOIN products p ON uc.product_id = p.id
       WHERE uc.user_id = $1`,
      [userId]
    );

    res.json({ cart: cartResult.rows });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};

export const updateCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { productId, quantity } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (quantity === 0) {
      // Remove item from cart
      await pool.query(
        'DELETE FROM user_carts WHERE user_id = $1 AND product_id = $2',
        [userId, productId]
      );
    } else {
      // Upsert cart item
      await pool.query(
        `INSERT INTO user_carts (user_id, product_id, quantity, updated_at)
         VALUES ($1, $2, $3, NOW())
         ON CONFLICT (user_id, product_id)
         DO UPDATE SET quantity = $3, updated_at = NOW()`,
        [userId, productId, quantity]
      );
    }

    res.json({ message: 'Cart updated successfully' });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Failed to update cart' });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await pool.query('DELETE FROM user_carts WHERE user_id = $1', [userId]);

    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Failed to clear cart' });
  }
};
