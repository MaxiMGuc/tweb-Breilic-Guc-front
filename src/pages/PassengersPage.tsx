// Данные пассажиров для бронирования.
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function PassengersPage() {
  const { t } = useTranslation()

  return (
    <section className="page-shell" aria-label={t('passengers.aria')}>
      <ol className="booking-steps" aria-label={t('bookingFlow.stepsAria')}>
        <li>
          <Link to="/booking">{t('bookingFlow.overview')}</Link>
        </li>
        <li className="active">{t('bookingFlow.passengers')}</li>
        <li>
          <Link to="/booking/payment">{t('bookingFlow.payment')}</Link>
        </li>
        <li>{t('bookingFlow.confirmation')}</li>
      </ol>

      <header className="page-header">
        <h1 className="page-title">{t('passengers.title')}</h1>
        <p className="page-lead">{t('passengers.lead')}</p>
      </header>

      <form className="stack-form">
        <fieldset className="fieldset-card">
          <legend>{t('passengers.adult1')}</legend>
          <div className="form-grid-2">
            <label className="field-block">
              <span>{t('passengers.firstName')}</span>
              <input type="text" autoComplete="given-name" />
            </label>
            <label className="field-block">
              <span>{t('passengers.lastName')}</span>
              <input type="text" autoComplete="family-name" />
            </label>
            <label className="field-block">
              <span>{t('passengers.dob')}</span>
              <input type="date" />
            </label>
            <label className="field-block">
              <span>{t('passengers.gender')}</span>
              <select defaultValue="">
                <option value="" disabled>
                  {t('passengers.select')}
                </option>
                <option value="f">{t('passengers.female')}</option>
                <option value="m">{t('passengers.male')}</option>
              </select>
            </label>
            <label className="field-block">
              <span>{t('passengers.documentNumber')}</span>
              <input type="text" autoComplete="off" />
            </label>
            <label className="field-block">
              <span>{t('passengers.expiry')}</span>
              <input type="date" />
            </label>
          </div>
        </fieldset>

        <label className="checkbox-row">
          <input type="checkbox" />
          {t('passengers.frequentFlyer')}
        </label>

        <div className="detail-actions">
          <Link to="/booking/payment" className="primary-button">
            {t('passengers.continuePayment')}
          </Link>
          <Link to="/booking" className="text-button">
            {t('passengers.back')}
          </Link>
        </div>
      </form>
    </section>
  )
}

export default PassengersPage
