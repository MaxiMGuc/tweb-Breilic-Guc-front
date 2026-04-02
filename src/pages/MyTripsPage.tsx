// Список поездок: мок-данные, фильтр по статусу и поиск (T31).
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MOCK_TRIPS, type TripStatus } from '../data/mockTrips.ts'

type StatusFilter = 'all' | TripStatus

function MyTripsPage() {
  const [status, setStatus] = useState<StatusFilter>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    let list = MOCK_TRIPS
    if (status !== 'all') {
      list = list.filter((t) => t.status === status)
    }
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (t) =>
          t.routeLabel.toLowerCase().includes(q) ||
          t.pnr.toLowerCase().includes(q) ||
          t.cityHint.toLowerCase().includes(q),
      )
    }
    return list
  }, [query, status])

  return (
    <section className="page-shell" aria-label="My trips">
      <header className="page-header">
        <h1 className="page-title">My trips</h1>
        <p className="page-lead">Upcoming and past bookings (mock data on this device).</p>
      </header>

      <div className="results-toolbar">
        <label className="field-inline">
          <span>Status</span>
          <select value={status} onChange={(e) => setStatus(e.target.value as StatusFilter)}>
            <option value="all">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
        <input
          type="search"
          className="search-input-wide"
          placeholder="Search by city or PNR…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search trips"
        />
      </div>

      <ul className="trips-list">
        {filtered.length === 0 ? (
          <li className="page-muted">No trips match your filters.</li>
        ) : null}
        {filtered.map((t) => (
          <li key={t.id}>
            <article className="trip-card">
              <div>
                <p className="trip-route">
                  {t.cityHint} · {t.dateRange}
                </p>
                <p className="page-muted">
                  Booking ref: {t.pnr} · {t.status}
                </p>
              </div>
              <Link to={`/my-trips/${t.id}`} className="text-button">
                Open
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default MyTripsPage
