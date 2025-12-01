import { apiClient } from './apiClient';
import { Order } from './orderService';

export const adminService = {
  async getAllOrders(): Promise<Order[]> {
    const response = await apiClient.get<{ orders: Order[] }>('/api/admin/orders');
    return response.orders;
  },

  async updateOrderStatus(orderId: string, status: string): Promise<void> {
    await apiClient.put(`/api/admin/orders/${orderId}/status`, { status });
  },
};
