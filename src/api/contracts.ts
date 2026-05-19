import type { MockAdminBooking, MockAdminUser } from '../data/mockAdmin.ts'
import type { MockTicket } from '../data/mockSearchResults.ts'
import type { MockTrip, TripStatus } from '../data/mockTrips.ts'

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  role: string
  userId: number
  username: string
}

/** 1 = User, 20 = Manager, 30 = Admin — совпадает с enum на бэкенде. */
export type StaffRole = 1 | 20 | 30

export type RegisterRequest = {
  firstName: string
  username: string
  email: string
  password: string
  phone: string
  /** Только для первого админа (bootstrap), пока в системе нет Admin. */
  bootstrapSecret?: string
}

export type SetUserRoleRequest = {
  role: StaffRole
}

export type SetUserActiveRequest = {
  isActive: boolean
}

export type AuthService = {
  login: (body: LoginRequest, signal?: AbortSignal) => Promise<LoginResponse>
  register: (body: RegisterRequest, signal?: AbortSignal) => Promise<void>
}

export type CreateOrderItem = {
  productId: number
  qua: number
}

export type CreateOrderRequest = {
  items: CreateOrderItem[]
}

export type CreateOrderResponse = {
  id: number
  totalPrice: number
  status: string
}

export type OrdersService = {
  create: (body: CreateOrderRequest, signal?: AbortSignal) => Promise<CreateOrderResponse>
}

export type SearchTicketsQuery = {
  from?: string
  to?: string
  maxPrice?: number
  airlineCodes?: string[]
  stops?: Array<0 | 1>
}

export type SearchService = {
  searchTickets: (query: SearchTicketsQuery, signal?: AbortSignal) => Promise<MockTicket[]>
  getTicketById: (ticketId: string, signal?: AbortSignal) => Promise<MockTicket | null>
}

export type TripsQuery = {
  status?: TripStatus | 'all'
  query?: string
}

export type TripsService = {
  getTrips: (query?: TripsQuery, signal?: AbortSignal) => Promise<MockTrip[]>
  getTripById: (tripId: string, signal?: AbortSignal) => Promise<MockTrip | null>
}

export type AdminBookingsQuery = {
  query?: string
  dateFrom?: string
  dateTo?: string
}

export type ApiProductDto = {
  id: number
  name: string
  description: string
  price: number
  stock: number
  inStock: boolean
  /** В каталоге; false — скрыт с поиска */
  isActive: boolean
  airline: string
  airlineCode: string
  route: string
  flightDate: string
  stops: number
  durationMin: number
}

export type ProductCreatePayload = {
  name: string
  description: string
  price: number
  stock: number
  airline: string
  airlineCode: string
  route: string
  flightDate: string
  stops: number
  durationMin: number
}

export type ProductService = {
  list: (signal?: AbortSignal) => Promise<ApiProductDto[]>
  /** Все продукты для админ-панели (включая скрытые из каталога). */
  listAdmin: (signal?: AbortSignal) => Promise<ApiProductDto[]>
  create: (body: ProductCreatePayload, signal?: AbortSignal) => Promise<ApiProductDto>
  update: (id: number, body: ApiProductDto, signal?: AbortSignal) => Promise<ApiProductDto>
  /** Admin only — показать/скрыть из каталога. */
  setActive: (id: number, isActive: boolean, signal?: AbortSignal) => Promise<ApiProductDto>
  remove: (id: number, signal?: AbortSignal) => Promise<void>
}

export type OrderAdminService = {
  updateStatus: (orderId: number, status: string, signal?: AbortSignal) => Promise<unknown>
  remove: (orderId: number, signal?: AbortSignal) => Promise<void>
}

export type AdminService = {
  getUsers: (signal?: AbortSignal) => Promise<MockAdminUser[]>
  getBookings: (query?: AdminBookingsQuery, signal?: AbortSignal) => Promise<MockAdminBooking[]>
}
