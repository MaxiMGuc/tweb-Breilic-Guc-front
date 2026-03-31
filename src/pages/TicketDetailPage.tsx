// Детали выбранного билета: багаж (mock), избранное в localStorage, контекст брони (T19–T21).
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useBooking } from '../context/BookingContext.tsx'
import { MOCK_TICKETS } from '../data/mockSearchResults.ts'

const LS_FAVORITES = 'breilic_favorite_ticket_ids_v1'

function readFavoriteIds(): string[] {
  try {
    const raw = localStorage.getItem(LS_FAVORITES)
    if (!raw) return []
    const p = JSON.parse(raw) as unknown
    return Array.isArray(p) ? p.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

function TicketDetailPage() {
  const { ticketId } = useParams()
  const navigate = useNavigate()
  const { selectedOffer, setSelectedOffer, baggageOption, setBaggageOption, baggageExtraUsd } =
    useBooking()

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => readFavoriteIds())

  const mock = useMemo(
    () => MOCK_TICKETS.find((t) => t.id === ticketId) ?? MOCK_TICKETS[0],
    [ticketId],
  )

  useEffect(() => {
    if (!ticketId) return
    setSelectedOffer({
      ticketId: mock.id,
      routeLabel: mock.route,
      priceFrom: mock.price,
      currency: 'USD',
      airline: mock.airline,
    })
  }, [mock, setSelectedOffer, ticketId])

  const isFavorite = ticketId ? favoriteIds.includes(ticketId) : false

  const toggleFavorite = useCallback(() => {
    if (!ticketId) return
    setFavoriteIds((prev) => {
      const next = prev.includes(ticketId) ? prev.filter((id) => id !== ticketId) : [...prev, ticketId]
      try {
        localStorage.setItem(LS_FAVORITES, JSON.stringify(next))
      } catch {
        /* ignore */
      }
      return next
    })
  }, [ticketId])

  const basePrice = selectedOffer?.priceFrom ?? mock.price
  const totalPreview = basePrice + baggageExtraUsd

  const continueBooking = () => {
    navigate('/booking')
  }

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
            <select
              value={baggageOption}
              onChange={(e) => setBaggageOption(e.target.value as 'standard' | 'plus')}
            >
              <option value="standard">1×23 kg included</option>
              <option value="plus">Extra bag (+$45)</option>
            </select>
          </label>
          <p className="page-muted" style={{ marginTop: 8 }}>
            Fare subtotal: ${basePrice}
            {baggageOption === 'plus' ? ` + baggage $${baggageExtraUsd}` : ''} · Estimated total: $
            {totalPreview} (mock)
          </p>
        </div>
        <div className="detail-card">
          <h2>Fare rules</h2>
          <p className="page-muted">Non-refundable. Changes for a fee. Seat selection optional.</p>
          <div className="detail-actions">
            <button type="button" className="primary-button" onClick={continueBooking}>
              Continue to booking
            </button>
            <button type="button" className={`secondary-button ${isFavorite ? 'active' : ''}`} onClick={toggleFavorite}>
              {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TicketDetailPage
