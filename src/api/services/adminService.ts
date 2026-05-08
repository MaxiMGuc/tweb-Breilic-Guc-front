import { MOCK_ADMIN_BOOKINGS, MOCK_ADMIN_USERS, type MockAdminBooking } from '../../data/mockAdmin.ts'
import type { MockAdminUser } from '../../data/mockAdmin.ts'
import { apiClient } from '../client.ts'
import type { AdminBookingsQuery, AdminService } from '../contracts.ts'

const USE_MOCKS = true

function applyBookingsFilters(items: MockAdminBooking[], query?: AdminBookingsQuery): MockAdminBooking[] {
  if (!query) {
    return items
  }

  const normalizedQuery = query.query?.trim().toLowerCase() ?? ''
  return items.filter((booking) => {
    const matchesQuery = normalizedQuery
      ? booking.ref.toLowerCase().includes(normalizedQuery) ||
        booking.route.toLowerCase().includes(normalizedQuery)
      : true
    const matchesDateFrom = query.dateFrom ? booking.created >= query.dateFrom : true
    const matchesDateTo = query.dateTo ? booking.created <= query.dateTo : true
    return matchesQuery && matchesDateFrom && matchesDateTo
  })
}

export const adminService: AdminService = {
  async getUsers(signal) {
    if (USE_MOCKS) {
      return [...MOCK_ADMIN_USERS]
    }
    return apiClient.request<MockAdminUser[]>('/api/admin/users', { signal })
  },

  async getBookings(query, signal) {
    if (USE_MOCKS) {
      return applyBookingsFilters(MOCK_ADMIN_BOOKINGS, query)
    }
    return apiClient.request('/api/admin/bookings/search', {
      method: 'POST',
      body: query ?? {},
      signal,
    })
  },
}
