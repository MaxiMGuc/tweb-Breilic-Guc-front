import { MOCK_TRIPS, getMockTripById, type MockTrip } from '../../data/mockTrips.ts'
import { apiClient } from '../client.ts'
import type { TripsQuery, TripsService } from '../contracts.ts'

const USE_MOCKS = true

function applyTripsFilters(items: MockTrip[], query?: TripsQuery): MockTrip[] {
  if (!query) {
    return items
  }

  const normalizedQuery = query.query?.trim().toLowerCase() ?? ''
  return items.filter((trip) => {
    const matchesStatus = query.status && query.status !== 'all' ? trip.status === query.status : true
    const matchesText = normalizedQuery
      ? trip.routeLabel.toLowerCase().includes(normalizedQuery) ||
        trip.pnr.toLowerCase().includes(normalizedQuery) ||
        trip.cityHint.toLowerCase().includes(normalizedQuery)
      : true
    return matchesStatus && matchesText
  })
}

export const tripsService: TripsService = {
  async getTrips(query, signal) {
    if (USE_MOCKS) {
      return applyTripsFilters(MOCK_TRIPS, query)
    }
    return apiClient.request<MockTrip[]>('/api/trips', {
      method: 'POST',
      body: query ?? {},
      signal,
    })
  },

  async getTripById(tripId, signal) {
    if (USE_MOCKS) {
      return getMockTripById(tripId) ?? null
    }
    return apiClient.request<MockTrip | null>(`/api/trips/${tripId}`, { signal })
  },
}
