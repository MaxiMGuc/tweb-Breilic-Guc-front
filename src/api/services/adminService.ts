import { MOCK_ADMIN_BOOKINGS, MOCK_ADMIN_USERS, type MockAdminBooking } from '../../data/mockAdmin.ts'
import type { MockAdminUser } from '../../data/mockAdmin.ts'
import { apiClient } from '../client.ts'
import type { AdminBookingsQuery, AdminService } from '../contracts.ts'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

type BackendUserDto = {
  id: number
  firstName: string
  username: string
  email: string
  phone: string
  role: number | string
  isActive: boolean
  registeredOn: string
}

type BackendBookingDto = {
  orderId: number
  ref: string
  route: string
  created: string
  status: string
  userFirstName?: string
  userEmail?: string
}

function mapRoleFromBackend(role: number | string): MockAdminUser['role'] {
  if (typeof role === 'number') {
    if (role === 30) return 'admin'
    if (role === 20) return 'manager'
    return 'user'
  }
  const s = String(role).toLowerCase()
  if (s === 'admin') return 'admin'
  if (s === 'manager') return 'manager'
  return 'user'
}

function adaptBackendUser(u: BackendUserDto): MockAdminUser {
  return {
    id: String(u.id),
    email: u.email,
    username: u.username,
    registered: (u.registeredOn ?? '').slice(0, 10),
    role: mapRoleFromBackend(u.role),
    isActive: u.isActive !== false,
  }
}

function adaptBackendBooking(b: BackendBookingDto): MockAdminBooking {
  return {
    orderId: b.orderId,
    ref: b.ref,
    route: b.route,
    created: b.created,
    status: b.status,
    customerFirstName: b.userFirstName ?? '—',
    customerEmail: b.userEmail ?? '—',
  }
}

function applyBookingsFilters(items: MockAdminBooking[], query?: AdminBookingsQuery): MockAdminBooking[] {
  if (!query) {
    return items
  }

  const normalizedQuery = query.query?.trim().toLowerCase() ?? ''
  return items.filter((booking) => {
    const matchesQuery = normalizedQuery
      ? booking.ref.toLowerCase().includes(normalizedQuery) ||
        booking.route.toLowerCase().includes(normalizedQuery) ||
        (booking.customerEmail ?? '').toLowerCase().includes(normalizedQuery) ||
        (booking.customerFirstName ?? '').toLowerCase().includes(normalizedQuery)
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
    const list = await apiClient.request<BackendUserDto[]>('/api/admin/users', { signal })
    return list.map(adaptBackendUser)
  },

  async getBookings(query, signal) {
    if (USE_MOCKS) {
      return applyBookingsFilters(MOCK_ADMIN_BOOKINGS, query)
    }
    const list = await apiClient.request<BackendBookingDto[]>('/api/admin/bookings/search', {
      method: 'POST',
      body: {
        query: query?.query,
        dateFrom: query?.dateFrom,
        dateTo: query?.dateTo,
      },
      signal,
    })
    return list.map(adaptBackendBooking)
  },
}
