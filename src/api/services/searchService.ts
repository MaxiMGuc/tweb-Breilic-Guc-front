import { apiClient } from '../client.ts'
import type { SearchService, SearchTicketsQuery } from '../contracts.ts'
import type { MockTicket } from '../../data/mockSearchResults.ts'
import { MOCK_TICKETS } from '../../data/mockSearchResults.ts'

const USE_MOCKS = true

function applySearchFilters(items: MockTicket[], query: SearchTicketsQuery): MockTicket[] {
  let filtered = [...items]
  const { maxPrice, airlineCodes, stops } = query

  if (maxPrice !== undefined) {
    filtered = filtered.filter((ticket) => ticket.price <= maxPrice)
  }
  if (airlineCodes && airlineCodes.length > 0) {
    filtered = filtered.filter((ticket) => airlineCodes.includes(ticket.airlineCode))
  }
  if (stops && stops.length > 0) {
    filtered = filtered.filter((ticket) => stops.includes(ticket.stops))
  }

  return filtered
}

export const searchService: SearchService = {
  async searchTickets(query, signal) {
    if (USE_MOCKS) {
      return applySearchFilters(MOCK_TICKETS, query)
    }
    return apiClient.request<MockTicket[]>('/api/tickets/search', {
      method: 'POST',
      body: query,
      signal,
    })
  },

  async getTicketById(ticketId, signal) {
    if (USE_MOCKS) {
      return MOCK_TICKETS.find((ticket) => ticket.id === ticketId) ?? null
    }
    return apiClient.request<MockTicket | null>(`/api/tickets/${ticketId}`, { signal })
  },
}
