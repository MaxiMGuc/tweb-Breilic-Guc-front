// Детали бронирования: мок по :id, check-in / manage (T32–T36 — превью UI).
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { tripsService } from '../api/index.ts'
import type { MockTrip } from '../data/mockTrips.ts'

function TripDetailPage() {
  const { id } = useParams()
  const [trip, setTrip] = useState<MockTrip | null>(null)

  const [modal, setModal] = useState<'none' | 'dates' | 'cancel' | 'invoice'>('none')
  const [checkInOpen, setCheckInOpen] = useState(false)
  const checkInDialogRef = useRef<HTMLDivElement | null>(null)
  const manageDialogRef = useRef<HTMLDivElement | null>(null)

  const closeModal = useCallback(() => setModal('none'), [])

  useEffect(() => {
    if (!id) {
      return
    }
    const controller = new AbortController()
    tripsService
      .getTripById(id, controller.signal)
      .then((data) => setTrip(data))
      .catch(() => setTrip(null))
    return () => controller.abort()
  }, [id])

  useEffect(() => {
    const closeAllModals = () => {
      setCheckInOpen(false)
      setModal('none')
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAllModals()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!checkInOpen) return
    const focusTarget = checkInDialogRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    focusTarget?.focus()
  }, [checkInOpen])

  useEffect(() => {
    if (modal === 'none') return
    const focusTarget = manageDialogRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    focusTarget?.focus()
  }, [modal])

  if (!trip) {
    return (
      <section className="page-shell" aria-label="Trip details">
        <p className="page-muted">Booking not found.</p>
        <Link to="/my-trips" className="text-button">
          Back to my trips
        </Link>
      </section>
    )
  }

  return (
    <section className="page-shell" aria-label="Trip details">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/my-trips">My trips</Link>
        <span aria-hidden="true"> / </span>
        <span>{trip.pnr}</span>
      </nav>

      <header className="page-header">
        <h1 className="page-title">Trip details</h1>
        <p className="page-muted">
          {trip.routeLabel} · {trip.airline} · Ref: {trip.pnr}
        </p>
      </header>

      <div className="detail-grid">
        <div className="detail-card">
          <h2>Flights</h2>
          <p>
            Outbound and return segments (mock). Dates: {trip.dateRange}.
          </p>
          {trip.checkInAvailable && trip.checkInUrl ? (
            <>
              <button type="button" className="secondary-button" onClick={() => setCheckInOpen(true)}>
                Check-in (opens airline window)
              </button>
              {checkInOpen ? (
                <div className="modal-backdrop" role="presentation" onClick={() => setCheckInOpen(false)}>
                  <div
                    ref={checkInDialogRef}
                    className="fieldset-card modal-card"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="checkin-title"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2 id="checkin-title">Online check-in</h2>
                    <p className="page-muted">
                      In production this would open the carrier check-in flow. Preview URL:
                    </p>
                    <p>
                      <a href={trip.checkInUrl} target="_blank" rel="noopener noreferrer">
                        Open check-in (new tab)
                      </a>
                    </p>
                    <button type="button" className="primary-button" onClick={() => setCheckInOpen(false)}>
                      Close
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <button type="button" className="secondary-button" disabled title="Check-in not yet available">
              Check-in (not available)
            </button>
          )}
        </div>
        <div className="detail-card">
          <h2>Manage booking</h2>
          <div className="stack-buttons">
            <button type="button" className="ghost-button" onClick={() => setModal('dates')}>
              Change dates (preview)
            </button>
            <button type="button" className="ghost-button" onClick={() => setModal('cancel')}>
              Cancel booking (preview)
            </button>
            <button type="button" className="ghost-button" onClick={() => setModal('invoice')}>
              Request invoice
            </button>
          </div>
        </div>
      </div>

      {modal !== 'none' ? (
        <div className="modal-backdrop" role="presentation" onClick={closeModal}>
          <div
            ref={manageDialogRef}
            className="fieldset-card modal-card"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {modal === 'dates' ? (
              <>
                <h2>Change dates</h2>
                <p className="page-muted">
                  Rebooking would call the airline/API with new dates and fare difference. This is a UI preview only.
                </p>
                <button type="button" className="primary-button" onClick={closeModal}>
                  Close
                </button>
              </>
            ) : null}
            {modal === 'cancel' ? (
              <>
                <h2>Cancel booking</h2>
                <p className="page-muted">
                  Cancellation fees depend on fare rules. Confirming would send a cancel request to the backend.
                </p>
                <button type="button" className="primary-button" onClick={closeModal}>
                  Close preview
                </button>
              </>
            ) : null}
            {modal === 'invoice' ? (
              <>
                <h2>Request invoice</h2>
                <p className="page-muted">
                  Invoice/PDF would be generated or emailed by the billing service after confirmation.
                </p>
                <button type="button" className="primary-button" onClick={closeModal}>
                  Close
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default TripDetailPage
