import { apiClient } from './apiClient';

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderData {
  items: OrderItem[];
  deliveryAddress: string;
}

export interface Order {
  id: string;
  total_price: number;
  status: string;
  delivery_address: string;
  created_at: string;
  items: {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  email?: string;
  first_name?: string;
  last_name?: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  name: string;
  price: number;
  unit: string;
  image: string;
  category: string;
}

export const orderService = {
  async createOrder(data: CreateOrderData): Promise<Order> {
    const response = await apiClient.post<{ order: Order }>('/api/orders', data);
    return response.order;
  },

  async getUserOrders(): Promise<Order[]> {
    const response = await apiClient.get<{ orders: Order[] }>('/api/orders');
    return response.orders;
  },

  async getOrderById(id: string): Promise<Order> {
    const response = await apiClient.get<{ order: Order }>(`/api/orders/${id}`);
    return response.order;
  },

  async getCart(): Promise<CartItem[]> {
    const response = await apiClient.get<{ cart: CartItem[] }>('/api/orders/cart/items');
    return response.cart;
  },

  async updateCart(productId: string, quantity: number): Promise<void> {
    await apiClient.post('/api/orders/cart/items', { productId, quantity });
  },

  async clearCart(): Promise<void> {
    await apiClient.delete('/api/orders/cart/items');
  },
};
