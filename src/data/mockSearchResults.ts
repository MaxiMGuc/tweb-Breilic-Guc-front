export type MockTicket = {
  id: string
  airline: string
  route: string
  date: string
  price: number
  durationMin: number
  stops: 0 | 1
  airlineCode: string
}

export const MOCK_TICKETS: MockTicket[] = [
  {
    id: 'demo-ticket-1',
    airline: 'Sample Airline',
    route: 'Moscow (SVO) → Istanbul (IST)',
    date: '28 Mar · 3h 40m · direct',
    price: 189,
    durationMin: 220,
    stops: 0,
    airlineCode: 'a1',
  },
  {
    id: 'demo-ticket-2',
    airline: 'Another Carrier',
    route: 'Moscow (VKO) → Istanbul (SAW)',
    date: '28 Mar · 5h 10m · 1 stop',
    price: 156,
    durationMin: 310,
    stops: 1,
    airlineCode: 'a2',
  },
]
