import { apiClient } from '../client.ts'
import type {
  CreateOrderRequest,
  CreateOrderResponse,
  OrdersService,
} from '../contracts.ts'

export const ordersService: OrdersService = {
  async create(body: CreateOrderRequest, signal) {
    return apiClient.request<CreateOrderResponse>('/api/orders', {
      method: 'POST',
      body,
      signal,
    })
  },
}
