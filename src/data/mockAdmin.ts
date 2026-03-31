// Мок-таблицы для админки users/bookings (T56–T59).
export type MockAdminUser = {
  id: string
  email: string
  registered: string
  role: 'user' | 'admin'
}

export type MockAdminBooking = {
  ref: string
  route: string
  created: string
  status: 'Paid' | 'Pending' | 'Cancelled'
}

export const MOCK_ADMIN_USERS: MockAdminUser[] = [
  { id: 'u1', email: 'user@example.com', registered: '2025-01-12', role: 'user' },
  { id: 'u2', email: 'admin@example.com', registered: '2024-06-01', role: 'admin' },
  { id: 'u3', email: 'partner@example.com', registered: '2025-03-02', role: 'user' },
]

export const MOCK_ADMIN_BOOKINGS: MockAdminBooking[] = [
  { ref: 'ABC123', route: 'Moscow → Istanbul', created: '2025-03-20', status: 'Paid' },
  { ref: 'DEF456', route: 'Dubai → London', created: '2025-03-18', status: 'Pending' },
  { ref: 'GHI789', route: 'Berlin → Paris', created: '2025-02-01', status: 'Cancelled' },
]
