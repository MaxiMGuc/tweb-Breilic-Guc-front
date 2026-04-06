// Успешное бронирование: номер заказа и дальнейшие действия.
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function BookingSuccessPage() {
  const { t } = useTranslation()

  return (
    <section className="page-shell page-success" aria-label={t('bookingSuccess.aria')}>
      <div className="success-banner">
        <h1 className="page-title">{t('bookingSuccess.title')}</h1>
        <p className="page-lead">
          {t('bookingSuccess.lead')} <strong>ABC123XYZ</strong>
        </p>
        <p className="page-muted">{t('bookingSuccess.muted')}</p>
      </div>

      <div className="detail-actions">
        <Link to="/my-trips" className="primary-button">
          {t('bookingSuccess.viewTrips')}
        </Link>
        <Link to="/" className="secondary-button">
          {t('bookingSuccess.backHome')}
        </Link>
        <button type="button" className="ghost-button">
          {t('bookingSuccess.downloadReceipt')}
        </button>
      </div>
    </section>
  )
}

export default BookingSuccessPage
