import { apiClient } from '../client.ts'
import type { ApiProductDto, ProductCreatePayload, ProductService } from '../contracts.ts'

function normalizeProduct(p: ApiProductDto): ApiProductDto {
  return { ...p, isActive: p.isActive !== false }
}

export const productService: ProductService = {
  async list(signal) {
    const rows = await apiClient.request<ApiProductDto[]>('/api/products', { signal })
    return rows.map(normalizeProduct)
  },

  async listAdmin(signal) {
    const rows = await apiClient.request<ApiProductDto[]>('/api/admin/products', { signal })
    return rows.map(normalizeProduct)
  },

  async create(body, signal) {
    const created = await apiClient.request<ApiProductDto, ProductCreatePayload>('/api/products', {
      method: 'POST',
      body,
      signal,
    })
    return normalizeProduct(created)
  },

  async update(id, body, signal) {
    const updated = await apiClient.request<ApiProductDto, ApiProductDto>(`/api/products/${id}`, {
      method: 'PUT',
      body,
      signal,
    })
    return normalizeProduct(updated)
  },

  async setActive(id, isActive, signal) {
    const updated = await apiClient.request<ApiProductDto, { isActive: boolean }>(
      `/api/products/${id}/active`,
      {
        method: 'PATCH',
        body: { isActive },
        signal,
      },
    )
    return normalizeProduct(updated)
  },

  async remove(id, signal) {
    await apiClient.request<void>(`/api/products/${id}`, { method: 'DELETE', signal })
  },
}
