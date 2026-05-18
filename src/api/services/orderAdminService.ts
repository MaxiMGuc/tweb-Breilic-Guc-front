import { apiClient } from '../client.ts'
import type { OrderAdminService } from '../contracts.ts'

export const orderAdminService: OrderAdminService = {
  async updateStatus(orderId, status, signal) {
    return apiClient.request(`/api/orders/${orderId}/status`, {
      method: 'PUT',
      body: { status },
      signal,
    })
  },

  async remove(orderId, signal) {
    await apiClient.request<void>(`/api/orders/${orderId}`, { method: 'DELETE', signal })
  },
}
