// Детали бронирования: мок по :id, регистрация и модалки (превью).
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { tripsService } from '../api/index.ts'
import type { MockTrip } from '../data/mockTrips.ts'

function TripDetailPage() {
  const { t } = useTranslation()
  const { id } = useParams()
  const [trip, setTrip] = useState<MockTrip | null>(null)

  const [modal, setModal] = useState<'none' | 'dates' | 'cancel' | 'invoice'>('none')
  const [checkInOpen, setCheckInOpen] = useState(false)

  const closeModal = useCallback(() => setModal('none'), [])

  useEffect(() => {
    if (!id) {
      setTrip(null)
      return
    }
    const controller = new AbortController()
    tripsService
      .getTripById(id, controller.signal)
      .then((data) => setTrip(data))
      .catch(() => setTrip(null))
    return () => controller.abort()
  }, [id])

  if (!trip) {
    return (
      <section className="page-shell" aria-label={t('tripDetail.aria')}>
        <p className="page-muted">{t('tripDetail.notFound')}</p>
        <Link to="/my-trips" className="text-button">
          {t('tripDetail.backTrips')}
        </Link>
      </section>
    )
  }

  return (
    <section className="page-shell" aria-label={t('tripDetail.aria')}>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/my-trips">{t('tripDetail.breadcrumb')}</Link>
        <span aria-hidden="true"> / </span>
        <span>{trip.pnr}</span>
      </nav>

      <header className="page-header">
        <h1 className="page-title">{t('tripDetail.title')}</h1>
        <p className="page-muted">
          {t('tripDetail.bookingSummary', {
            route: trip.routeLabel,
            airline: trip.airline,
            pnr: trip.pnr,
          })}
        </p>
      </header>

      <div className="detail-grid">
        <div className="detail-card">
          <h2>{t('tripDetail.flights')}</h2>
          <p>{t('tripDetail.flightsMock', { range: trip.dateRange })}</p>
          {trip.checkInAvailable && trip.checkInUrl ? (
            <>
              <button type="button" className="secondary-button" onClick={() => setCheckInOpen(true)}>
                {t('tripDetail.checkInOpens')}
              </button>
              {checkInOpen ? (
                <div className="modal-backdrop" role="presentation">
                  <div
                    className="fieldset-card modal-card"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="checkin-title"
                  >
                    <h2 id="checkin-title">{t('tripDetail.modalCheckInTitle')}</h2>
                    <p className="page-muted">{t('tripDetail.modalCheckInLead')}</p>
                    <p>
                      <a href={trip.checkInUrl} target="_blank" rel="noopener noreferrer">
                        {t('tripDetail.openCheckInTab')}
                      </a>
                    </p>
                    <button type="button" className="primary-button" onClick={() => setCheckInOpen(false)}>
                      {t('tripDetail.close')}
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <button
              type="button"
              className="secondary-button"
              disabled
              title={t('tripDetail.checkInDisabledHint')}
            >
              {t('tripDetail.checkInDisabled')}
            </button>
          )}
        </div>
        <div className="detail-card">
          <h2>{t('tripDetail.manage')}</h2>
          <div className="stack-buttons">
            <button type="button" className="ghost-button" onClick={() => setModal('dates')}>
              {t('tripDetail.changeDates')}
            </button>
            <button type="button" className="ghost-button" onClick={() => setModal('cancel')}>
              {t('tripDetail.cancelBooking')}
            </button>
            <button type="button" className="ghost-button" onClick={() => setModal('invoice')}>
              {t('tripDetail.requestInvoice')}
            </button>
          </div>
        </div>
      </div>

      {modal !== 'none' ? (
        <div className="modal-backdrop" role="presentation" onClick={closeModal}>
          <div
            className="fieldset-card modal-card"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {modal === 'dates' ? (
              <>
                <h2>{t('tripDetail.modalDatesTitle')}</h2>
                <p className="page-muted">{t('tripDetail.modalDatesLead')}</p>
                <button type="button" className="primary-button" onClick={closeModal}>
                  {t('tripDetail.close')}
                </button>
              </>
            ) : null}
            {modal === 'cancel' ? (
              <>
                <h2>{t('tripDetail.modalCancelTitle')}</h2>
                <p className="page-muted">{t('tripDetail.modalCancelLead')}</p>
                <button type="button" className="primary-button" onClick={closeModal}>
                  {t('tripDetail.modalCancelClose')}
                </button>
              </>
            ) : null}
            {modal === 'invoice' ? (
              <>
                <h2>{t('tripDetail.modalInvoiceTitle')}</h2>
                <p className="page-muted">{t('tripDetail.modalInvoiceLead')}</p>
                <button type="button" className="primary-button" onClick={closeModal}>
                  {t('tripDetail.close')}
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default TripDetailPage
