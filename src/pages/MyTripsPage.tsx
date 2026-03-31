// Список поездок пользователя.
import { Link } from 'react-router-dom'

function MyTripsPage() {
  return (
    <section className="page-shell" aria-label="My trips">
      <header className="page-header">
        <h1 className="page-title">My trips</h1>
        <p className="page-lead">Upcoming and past bookings will appear here.</p>
      </header>

      <div className="results-toolbar">
        <label className="field-inline">
          <span>Status</span>
          <select defaultValue="all">
            <option value="all">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
        <input type="search" className="search-input-wide" placeholder="Search by city or PNR…" />
      </div>

      <ul className="trips-list">
        <li>
          <article className="trip-card">
            <div>
              <p className="trip-route">Istanbul · 15 Apr – 22 Apr</p>
              <p className="page-muted">Booking ref: TRIP-001</p>
            </div>
            <Link to="/my-trips/trip-001" className="text-button">
              Open
            </Link>
          </article>
        </li>
        <li>
          <article className="trip-card">
            <div>
              <p className="trip-route">Dubai · 3 Jun – 10 Jun</p>
              <p className="page-muted">Booking ref: TRIP-002</p>
            </div>
            <Link to="/my-trips/trip-002" className="text-button">
              Open
            </Link>
          </article>
        </li>
      </ul>
    </section>
  )
}

export default MyTripsPage
