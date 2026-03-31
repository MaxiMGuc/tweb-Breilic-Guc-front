// Обзор шага бронирования: сводка рейса и переход к данным пассажиров.
import { Link } from 'react-router-dom'

function BookingPage() {
  return (
    <section className="page-shell" aria-label="Booking overview">
      <ol className="booking-steps" aria-label="Booking progress">
        <li className="active">Overview</li>
        <li>
          <Link to="/booking/passengers">Passengers</Link>
        </li>
        <li>
          <Link to="/booking/payment">Payment</Link>
        </li>
        <li>Confirmation</li>
      </ol>

      <header className="page-header">
        <h1 className="page-title">Booking overview</h1>
        <p className="page-lead">Review your flight selection before entering passenger details.</p>
      </header>

      <div className="detail-card">
        <h2>Selected flight</h2>
        <p>Moscow → Istanbul · 28 Mar – 2 Apr · 1 adult · economy</p>
        <div className="form-row-inline">
          <label className="field-inline">
            <span>Contact email</span>
            <input type="email" placeholder="you@example.com" autoComplete="email" />
          </label>
          <label className="field-inline">
            <span>Phone</span>
            <input type="tel" placeholder="+1 …" autoComplete="tel" />
          </label>
        </div>
        <div className="detail-actions">
          <Link to="/booking/passengers" className="primary-button">
            Continue
          </Link>
          <Link to="/search/results" className="text-button">
            Back to results
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BookingPage
