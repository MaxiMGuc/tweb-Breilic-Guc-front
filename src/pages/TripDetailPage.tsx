// Детали бронирования из «Мои поездки».
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

function TripDetailPage() {
  const { t } = useTranslation()
  const { id } = useParams()

  return (
    <section className="page-shell" aria-label={t('tripDetail.aria')}>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/my-trips">{t('tripDetail.breadcrumb')}</Link>
        <span aria-hidden="true"> / </span>
        <span>{id ?? '—'}</span>
      </nav>

      <header className="page-header">
        <h1 className="page-title">{t('tripDetail.title')}</h1>
        <p className="page-muted">
          {t('tripDetail.bookingId')} {id ?? '—'}
        </p>
      </header>

      <div className="detail-grid">
        <div className="detail-card">
          <h2>{t('tripDetail.flights')}</h2>
          <p>{t('tripDetail.flightsLead')}</p>
          <button type="button" className="secondary-button">
            {t('tripDetail.checkIn')}
          </button>
        </div>
        <div className="detail-card">
          <h2>{t('tripDetail.manage')}</h2>
          <div className="stack-buttons">
            <button type="button" className="ghost-button">
              {t('tripDetail.changeDates')}
            </button>
            <button type="button" className="ghost-button">
              {t('tripDetail.cancelBooking')}
            </button>
            <button type="button" className="ghost-button">
              {t('tripDetail.requestInvoice')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TripDetailPage
