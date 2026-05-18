// Успешное бронирование: номер заказа и дальнейшие действия.
import { Link, useLocation } from 'react-router-dom'

function BookingSuccessPage() {
  const location = useLocation()
  const state = location.state as { ref?: string; demoPayment?: boolean } | null
  const ref = state?.ref ?? 'ABC123XYZ'
  const demo = state?.demoPayment === true

  return (
    <section className="page-shell page-success" aria-label="Booking confirmed">
      <div className="success-banner">
        <h1 className="page-title">Booking confirmed</h1>
        <p className="page-lead">
          Your reservation reference: <strong>{ref}</strong>
        </p>
        {demo ? (
          <p className="page-muted">
            Учебный проект: оплата была симуляцией, реальные средства не списывались.
          </p>
        ) : (
          <p className="page-muted">A confirmation has been sent to your email (placeholder).</p>
        )}
      </div>

      <div className="detail-actions">
        <Link to="/my-trips" className="primary-button">
          View my trips
        </Link>
        <Link to="/" className="secondary-button">
          Back to home
        </Link>
        <button type="button" className="ghost-button">
          Download receipt (preview)
        </button>
      </div>
    </section>
  )
}

export default BookingSuccessPage
