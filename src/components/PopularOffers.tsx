// Компонент списка популярных предложений.
// Принимает массив билетов и отображает карточки в едином стиле.
import { Link } from 'react-router-dom'
import type { Ticket } from '../data/popularTickets'

type PopularOffersProps = {
  tickets: Ticket[]
}

// Отдельный UI-блок главной страницы, чтобы не перегружать HomePage разметкой.
function PopularOffers({ tickets }: PopularOffersProps) {
  return (
    <section className="results" aria-label="Popular offers">
      <div className="results-header">
        <h2>Popular offers</h2>
        <Link to="/search">See all</Link>
      </div>
      <ul className="ticket-list">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="ticket-card">
            <div>
              <p className="airline">{ticket.airline}</p>
              <p className="route">{ticket.route}</p>
              <p className="date">{ticket.date}</p>
            </div>
            <p className="price">{ticket.price}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PopularOffers
