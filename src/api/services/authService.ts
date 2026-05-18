import { apiClient } from '../client.ts'
import type { AuthService, LoginRequest, LoginResponse, RegisterRequest } from '../contracts.ts'

export const authService: AuthService = {
  async login(body: LoginRequest, signal) {
    return apiClient.request<LoginResponse>('/api/session/auth', {
      method: 'POST',
      body,
      signal,
    })
  },

  async register(body: RegisterRequest, signal) {
    await apiClient.request<void>('/api/reg', {
      method: 'POST',
      body,
      signal,
    })
  },
}
