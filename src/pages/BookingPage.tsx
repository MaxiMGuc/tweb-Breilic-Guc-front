// Обзор шага бронирования: сводка из контекста, возврат к результатам.
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import EmailField from '../components/form/EmailField'
import { useBooking } from '../context/BookingContext.tsx'

function BookingPage() {
  const { t } = useTranslation()
  const { selectedOffer, baggageExtraUsd, searchResultsReturnPath } = useBooking()

  const routeLabel = selectedOffer?.routeLabel ?? t('booking.sampleRoute')
  const priceBase = selectedOffer?.priceFrom ?? 189
  const total = priceBase + baggageExtraUsd

  return (
    <section className="page-shell" aria-label={t('booking.aria')}>
      <ol className="booking-steps" aria-label={t('bookingFlow.stepsAria')}>
        <li className="active">{t('bookingFlow.overview')}</li>
        <li>
          <Link to="/booking/passengers">{t('bookingFlow.passengers')}</Link>
        </li>
        <li>
          <Link to="/booking/payment">{t('bookingFlow.payment')}</Link>
        </li>
        <li>{t('bookingFlow.confirmation')}</li>
      </ol>

      <header className="page-header">
        <h1 className="page-title">{t('booking.title')}</h1>
        <p className="page-lead">{t('booking.lead')}</p>
      </header>

      <div className="detail-card">
        <h2>{t('booking.selectedFlight')}</h2>
        <p>
          {selectedOffer ? (
            <>
              {routeLabel} · {t('booking.tripDatesPaxClass')}
              {selectedOffer.airline ? ` · ${selectedOffer.airline}` : ''}
            </>
          ) : (
            routeLabel
          )}
        </p>
        <p className="page-muted">
          {t('booking.fareMock')} ${priceBase}
          {baggageExtraUsd > 0 ? ` ${t('booking.fareExtras', { amount: baggageExtraUsd })}` : ''} ·{' '}
          {t('booking.totalPreview')} ${total}
        </p>
        <div className="form-row-inline">
          <EmailField
            label={t('booking.contactEmail')}
            name="contactEmail"
            placeholder={t('booking.emailPlaceholder')}
            autoComplete="email"
            wrapperClassName="field-inline"
            required
          />
          <label className="field-inline">
            <span>{t('booking.phone')}</span>
            <input type="tel" placeholder={t('booking.phonePlaceholder')} autoComplete="tel" />
          </label>
        </div>
        <div className="detail-actions">
          <Link to="/booking/passengers" className="primary-button">
            {t('booking.continue')}
          </Link>
          <Link to={searchResultsReturnPath} className="text-button">
            {t('booking.backToResults')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BookingPage
