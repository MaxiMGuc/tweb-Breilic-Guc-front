// Оплата бронирования: форма карты и биллинг (без реальной оплаты).
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function PaymentPage() {
  const { t } = useTranslation()

  return (
    <section className="page-shell" aria-label={t('payment.aria')}>
      <ol className="booking-steps" aria-label={t('bookingFlow.stepsAria')}>
        <li>
          <Link to="/booking">{t('bookingFlow.overview')}</Link>
        </li>
        <li>
          <Link to="/booking/passengers">{t('bookingFlow.passengers')}</Link>
        </li>
        <li className="active">{t('bookingFlow.payment')}</li>
        <li>{t('bookingFlow.confirmation')}</li>
      </ol>

      <header className="page-header">
        <h1 className="page-title">{t('payment.title')}</h1>
        <p className="page-lead">
          {t('payment.leadPrefix')} <strong>$412.00</strong> {t('payment.leadSuffix')}
        </p>
      </header>

      <div className="payment-layout">
        <div className="fieldset-card">
          <h2>{t('payment.card')}</h2>
          <label className="field-block">
            <span>{t('payment.cardNumber')}</span>
            <input type="text" inputMode="numeric" placeholder="0000 0000 0000 0000" autoComplete="cc-number" />
          </label>
          <div className="form-grid-2">
            <label className="field-block">
              <span>{t('payment.expiry')}</span>
              <input type="text" placeholder="MM/YY" autoComplete="cc-exp" />
            </label>
            <label className="field-block">
              <span>{t('payment.cvc')}</span>
              <input type="password" autoComplete="cc-csc" />
            </label>
          </div>
          <label className="field-block">
            <span>{t('payment.cardholder')}</span>
            <input type="text" autoComplete="cc-name" />
          </label>
        </div>

        <div className="fieldset-card">
          <h2>{t('payment.billing')}</h2>
          <label className="field-block">
            <span>{t('payment.country')}</span>
            <select defaultValue="">
              <option value="" disabled>
                {t('payment.selectCountry')}
              </option>
              <option value="us">{t('payment.countryUs')}</option>
              <option value="ru">{t('payment.countryRu')}</option>
              <option value="tr">{t('payment.countryTr')}</option>
            </select>
          </label>
          <label className="field-block">
            <span>{t('payment.city')}</span>
            <input type="text" />
          </label>
          <label className="field-block">
            <span>{t('payment.addressLine')}</span>
            <input type="text" autoComplete="street-address" />
          </label>
          <label className="checkbox-row">
            <input type="checkbox" defaultChecked />
            {t('payment.agreeFare')}
          </label>
        </div>
      </div>

      <div className="detail-actions">
        <Link to="/booking/success" className="primary-button">
          {t('payment.payNow')}
        </Link>
        <Link to="/booking/passengers" className="text-button">
          {t('payment.back')}
        </Link>
      </div>
    </section>
  )
}

export default PaymentPage
