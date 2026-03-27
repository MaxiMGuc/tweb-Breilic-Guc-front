// Детали выбранного билета перед бронированием.
import { Link, useParams } from 'react-router-dom'

function TicketDetailPage() {
  const { ticketId } = useParams()

  return (
    <section className="page-shell" aria-label="Ticket details">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/search">Search</Link>
        <span aria-hidden="true"> / </span>
        <Link to="/search/results">Results</Link>
        <span aria-hidden="true"> / </span>
        <span>Ticket</span>
      </nav>

      <header className="page-header">
        <h1 className="page-title">Flight details</h1>
        <p className="page-muted">Ticket ID: {ticketId ?? '—'}</p>
      </header>

      <div className="detail-grid">
        <div className="detail-card">
          <h2>Itinerary</h2>
          <ul className="detail-list">
            <li>
              <strong>Outbound</strong> — SVO 08:40 → IST 13:20
            </li>
            <li>
              <strong>Return</strong> — IST 18:10 → SVO 21:35
            </li>
          </ul>
          <label className="field-block">
            <span>Baggage</span>
            <select defaultValue="standard">
              <option value="standard">1×23 kg included</option>
              <option value="plus">Extra bag (+$45)</option>
            </select>
          </label>
        </div>
        <div className="detail-card">
          <h2>Fare rules</h2>
          <p className="page-muted">Non-refundable. Changes for a fee. Seat selection optional.</p>
          <div className="detail-actions">
            <Link to="/booking" className="primary-button">
              Continue to booking
            </Link>
            <button type="button" className="secondary-button">
              Add to favorites
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TicketDetailPage
