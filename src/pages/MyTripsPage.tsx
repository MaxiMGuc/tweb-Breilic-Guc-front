// Список поездок: мок-данные, фильтр по статусу и поиск.
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { tripsService } from '../api/index.ts'
import type { MockTrip, TripStatus } from '../data/mockTrips.ts'

type StatusFilter = 'all' | TripStatus

function MyTripsPage() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<StatusFilter>('all')
  const [query, setQuery] = useState('')
  const [filtered, setFiltered] = useState<MockTrip[]>([])

  useEffect(() => {
    const controller = new AbortController()
    tripsService
      .getTrips({ status, query }, controller.signal)
      .then((rows) => setFiltered(rows))
      .catch(() => setFiltered([]))
    return () => controller.abort()
  }, [query, status])

  return (
    <section className="page-shell" aria-label={t('myTrips.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('myTrips.title')}</h1>
        <p className="page-lead">{t('myTrips.lead')}</p>
      </header>

      <div className="results-toolbar">
        <label className="field-inline">
          <span>{t('myTrips.status')}</span>
          <select value={status} onChange={(e) => setStatus(e.target.value as StatusFilter)}>
            <option value="all">{t('myTrips.all')}</option>
            <option value="upcoming">{t('myTrips.upcoming')}</option>
            <option value="past">{t('myTrips.past')}</option>
            <option value="cancelled">{t('myTrips.cancelled')}</option>
          </select>
        </label>
        <input
          type="search"
          className="search-input-wide"
          placeholder={t('myTrips.searchPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={t('myTrips.searchTripsAria')}
        />
      </div>

      <ul className="trips-list">
        {filtered.length === 0 ? <li className="page-muted">{t('myTrips.noMatches')}</li> : null}
        {filtered.map((trip) => (
          <li key={trip.id}>
            <article className="trip-card">
              <div>
                <p className="trip-route">
                  {trip.cityHint} · {trip.dateRange}
                </p>
                <p className="page-muted">
                  {t('myTrips.bookingRef')} {trip.pnr} · {trip.status}
                </p>
              </div>
              <Link to={`/my-trips/${trip.id}`} className="text-button">
                {t('myTrips.open')}
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default MyTripsPage
