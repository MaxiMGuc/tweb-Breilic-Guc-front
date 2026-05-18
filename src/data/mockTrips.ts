// Мок-бронирования для «Мои поездки» и деталей (исполнитель B: T31–T36 на клиенте).
export type TripStatus = 'upcoming' | 'past' | 'cancelled'

export type MockTrip = {
  id: string
  routeLabel: string
  pnr: string
  status: TripStatus
  cityHint: string
  dateRange: string
  airline: string
  checkInAvailable: boolean
  checkInUrl?: string
}

export const MOCK_TRIPS: MockTrip[] = [
  {
    id: 'trip-001',
    routeLabel: 'Moscow → Istanbul',
    pnr: 'TRIP-001',
    status: 'upcoming',
    cityHint: 'Istanbul',
    dateRange: '15 Apr – 22 Apr',
    airline: 'Airline A',
    checkInAvailable: true,
    checkInUrl: 'https://example.com/checkin?pnr=TRIP-001',
  },
  {
    id: 'trip-002',
    routeLabel: 'Saint Petersburg → Dubai',
    pnr: 'TRIP-002',
    status: 'upcoming',
    cityHint: 'Dubai',
    dateRange: '3 Jun – 10 Jun',
    airline: 'Airline B',
    checkInAvailable: false,
  },
  {
    id: 'trip-003',
    routeLabel: 'Moscow → Antalya',
    pnr: 'TRIP-OLD',
    status: 'past',
    cityHint: 'Antalya',
    dateRange: 'Jan 2025',
    airline: 'Airline A',
    checkInAvailable: false,
  },
]

export function getMockTripById(id: string | undefined): MockTrip | undefined {
  if (!id) return undefined
  return MOCK_TRIPS.find((t) => t.id === id)
}
