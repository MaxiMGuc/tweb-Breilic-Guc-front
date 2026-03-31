// Тип и набор демонстрационных данных для блока популярных предложений на главной странице.
export type Ticket = {
  id: number
  airline: string
  price: string
  route: string
  date: string
}

export const popularTickets: Ticket[] = [
  {
    id: 1,
    airline: 'S7 Airlines',
    price: '9 450 RUR',
    route: 'Moscow -> Sochi',
    date: '20 Mar, direct flight',
  },
  {
    id: 2,
    airline: 'Aeroflot',
    price: '12 180 RUR',
    route: 'Saint Petersburg -> Kaliningrad',
    date: '22 Mar, 1 stop',
  },
  {
    id: 3,
    airline: 'Utair',
    price: '8 790 RUR',
    route: 'Kazan -> Mineralnye Vody',
    date: '25 Mar, direct flight',
  },
]
