import { apiClient } from '../client.ts'
import type { SetUserRoleRequest } from '../contracts.ts'

export async function deleteUser(userId: number, signal?: AbortSignal): Promise<void> {
  await apiClient.request<void>(`/api/users/${userId}`, { method: 'DELETE', signal })
}

export async function setUserRole(
  userId: number,
  body: SetUserRoleRequest,
  signal?: AbortSignal,
): Promise<void> {
  await apiClient.request(`/api/users/${userId}/role`, {
    method: 'PATCH',
    body,
    signal,
  })
}

export async function setUserActive(
  userId: number,
  isActive: boolean,
  signal?: AbortSignal,
): Promise<void> {
  await apiClient.request(`/api/users/${userId}/active`, {
    method: 'PATCH',
    body: { isActive },
    signal,
  })
}
