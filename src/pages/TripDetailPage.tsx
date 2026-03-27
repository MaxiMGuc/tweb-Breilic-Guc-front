// Детали бронирования из «Мои поездки».
import { Link, useParams } from 'react-router-dom'

function TripDetailPage() {
  const { id } = useParams()

  return (
    <section className="page-shell" aria-label="Trip details">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/my-trips">My trips</Link>
        <span aria-hidden="true"> / </span>
        <span>{id ?? 'Trip'}</span>
      </nav>

      <header className="page-header">
        <h1 className="page-title">Trip details</h1>
        <p className="page-muted">Booking ID: {id ?? '—'}</p>
      </header>

      <div className="detail-grid">
        <div className="detail-card">
          <h2>Flights</h2>
          <p>Outbound and return segments will be listed here.</p>
          <button type="button" className="secondary-button">
            Check-in (when available)
          </button>
        </div>
        <div className="detail-card">
          <h2>Manage booking</h2>
          <div className="stack-buttons">
            <button type="button" className="ghost-button">
              Change dates (preview)
            </button>
            <button type="button" className="ghost-button">
              Cancel booking (preview)
            </button>
            <button type="button" className="ghost-button">
              Request invoice
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TripDetailPage
