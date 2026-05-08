import type { MockAdminBooking, MockAdminUser } from '../data/mockAdmin.ts'
import type { MockTicket } from '../data/mockSearchResults.ts'
import type { MockTrip, TripStatus } from '../data/mockTrips.ts'

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

export type AdminService = {
  getUsers: (signal?: AbortSignal) => Promise<MockAdminUser[]>
  getBookings: (query?: AdminBookingsQuery, signal?: AbortSignal) => Promise<MockAdminBooking[]>
}
