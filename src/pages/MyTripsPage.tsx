// Список поездок пользователя.
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function MyTripsPage() {
  const { t } = useTranslation()

  return (
    <section className="page-shell" aria-label={t('myTrips.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('myTrips.title')}</h1>
        <p className="page-lead">{t('myTrips.lead')}</p>
      </header>

      <div className="results-toolbar">
        <label className="field-inline">
          <span>{t('myTrips.status')}</span>
          <select defaultValue="all">
            <option value="all">{t('myTrips.all')}</option>
            <option value="upcoming">{t('myTrips.upcoming')}</option>
            <option value="past">{t('myTrips.past')}</option>
            <option value="cancelled">{t('myTrips.cancelled')}</option>
          </select>
        </label>
        <input type="search" className="search-input-wide" placeholder={t('myTrips.searchPlaceholder')} />
      </div>

      <ul className="trips-list">
        <li>
          <article className="trip-card">
            <div>
              <p className="trip-route">Istanbul · 15 Apr – 22 Apr</p>
              <p className="page-muted">
                {t('myTrips.bookingRef')} TRIP-001
              </p>
            </div>
            <Link to="/my-trips/trip-001" className="text-button">
              {t('myTrips.open')}
            </Link>
          </article>
        </li>
        <li>
          <article className="trip-card">
            <div>
              <p className="trip-route">Dubai · 3 Jun – 10 Jun</p>
              <p className="page-muted">
                {t('myTrips.bookingRef')} TRIP-002
              </p>
            </div>
            <Link to="/my-trips/trip-002" className="text-button">
              {t('myTrips.open')}
            </Link>
          </article>
        </li>
      </ul>
    </section>
  )
}

export default MyTripsPage
