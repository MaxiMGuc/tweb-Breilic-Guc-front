// Мок-таблицы для админки users/bookings (T56–T59).
export type MockAdminUser = {
  id: string
  email: string
  username?: string
  registered: string
  role: 'user' | 'admin' | 'manager'
  /** false — заблокирован */
  isActive: boolean
}

export type MockAdminBooking = {
  /** Present when row comes from API (needed for status/delete). */
  orderId?: number
  ref: string
  route: string
  created: string
  status: string
  customerFirstName?: string
  customerEmail?: string
}

export const MOCK_ADMIN_USERS: MockAdminUser[] = [
  { id: 'u1', email: 'user@example.com', username: 'user1', registered: '2025-01-12', role: 'user', isActive: true },
  { id: 'u2', email: 'admin@example.com', username: 'admin1', registered: '2024-06-01', role: 'admin', isActive: true },
  { id: 'u3', email: 'partner@example.com', username: 'partner', registered: '2025-03-02', role: 'user', isActive: true },
]

export const MOCK_ADMIN_BOOKINGS: MockAdminBooking[] = [
  {
    ref: 'ABC123',
    route: 'Moscow → Istanbul',
    created: '2025-03-20',
    status: 'Paid',
    customerFirstName: 'Alex',
    customerEmail: 'user@example.com',
  },
  {
    ref: 'DEF456',
    route: 'Dubai → London',
    created: '2025-03-18',
    status: 'Pending',
    customerFirstName: 'Sam',
    customerEmail: 'partner@example.com',
  },
  {
    ref: 'GHI789',
    route: 'Berlin → Paris',
    created: '2025-02-01',
    status: 'Cancelled',
    customerFirstName: 'Jordan',
    customerEmail: 'admin@example.com',
  },
]
