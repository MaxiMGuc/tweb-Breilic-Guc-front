// Детали выбранного билета перед бронированием.
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

function TicketDetailPage() {
  const { t } = useTranslation()
  const { ticketId } = useParams()

  return (
    <section className="page-shell" aria-label={t('ticketDetail.aria')}>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/search">{t('ticketDetail.search')}</Link>
        <span aria-hidden="true"> / </span>
        <Link to="/search/results">{t('ticketDetail.results')}</Link>
        <span aria-hidden="true"> / </span>
        <span>{t('ticketDetail.ticket')}</span>
      </nav>

      <header className="page-header">
        <h1 className="page-title">{t('ticketDetail.title')}</h1>
        <p className="page-muted">
          {t('ticketDetail.ticketId')} {ticketId ?? '—'}
        </p>
      </header>

      <div className="detail-grid">
        <div className="detail-card">
          <h2>{t('ticketDetail.itinerary')}</h2>
          <ul className="detail-list">
            <li>
              <strong>{t('ticketDetail.outbound')}</strong> — SVO 08:40 → IST 13:20
            </li>
            <li>
              <strong>{t('ticketDetail.return')}</strong> — IST 18:10 → SVO 21:35
            </li>
          </ul>
          <label className="field-block">
            <span>{t('ticketDetail.baggage')}</span>
            <select defaultValue="standard">
              <option value="standard">{t('ticketDetail.baggageStandard')}</option>
              <option value="plus">{t('ticketDetail.baggagePlus')}</option>
            </select>
          </label>
        </div>
        <div className="detail-card">
          <h2>{t('ticketDetail.fareRules')}</h2>
          <p className="page-muted">{t('ticketDetail.fareLead')}</p>
          <div className="detail-actions">
            <Link to="/booking" className="primary-button">
              {t('ticketDetail.continueBooking')}
            </Link>
            <button type="button" className="secondary-button">
              {t('ticketDetail.addFavorites')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TicketDetailPage
