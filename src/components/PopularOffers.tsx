// Компонент списка популярных предложений.
// Принимает массив билетов и отображает карточки в едином стиле.
import { useTranslation } from 'react-i18next'
import type { Ticket } from '../data/popularTickets'

type PopularOffersProps = {
  tickets: Ticket[]
}

// Отдельный UI-блок главной страницы, чтобы не перегружать HomePage разметкой.
function PopularOffers({ tickets }: PopularOffersProps) {
  const { t } = useTranslation()

  return (
    <section className="results" aria-label={t('home.popularAria')}>
      <div className="results-header">
        <h2>{t('home.popularOffers')}</h2>
        <a href="/">{t('home.seeAll')}</a>
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
