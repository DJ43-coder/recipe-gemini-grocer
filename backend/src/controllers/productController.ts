import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/database';

export const getProducts = async (req: Request, res: Response) => {
  const { category, search, page = 1, limit = 50 } = req.query;

  try {
    let query = 'SELECT * FROM products WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (category) {
      query += ` AND category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    if (search) {
      query += ` AND (name ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    query += ' ORDER BY name ASC';

    const offset = (Number(page) - 1) * Number(limit);
    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(Number(limit), offset);

    const result = await pool.query(query, params);

    const countQuery = 'SELECT COUNT(*) FROM products WHERE 1=1' +
      (category ? ` AND category = '${category}'` : '') +
      (search ? ` AND (name ILIKE '%${search}%' OR description ILIKE '%${search}%')` : '');
    
    const countResult = await pool.query(countQuery);
    const total = parseInt(countResult.rows[0].count);

    res.json({
      products: result.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createProductValidation = [
  body('name').trim().notEmpty(),
  body('price').isFloat({ min: 0 }),
  body('category').trim().notEmpty(),
  body('image_url').optional().isURL(),
  body('description').optional().trim(),
  body('unit').optional().trim(),
];

export const createProduct = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, price, category, image_url, description, unit } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO products (name, price, category, image_url, description, unit) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, price, category, image_url || null, description || null, unit || 'ea']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, category, image_url, description, unit } = req.body;

  try {
    const result = await pool.query(
      'UPDATE products SET name = COALESCE($1, name), price = COALESCE($2, price), category = COALESCE($3, category), image_url = COALESCE($4, image_url), description = COALESCE($5, description), unit = COALESCE($6, unit), updated_at = NOW() WHERE id = $7 RETURNING *',
      [name, price, category, image_url, description, unit, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
