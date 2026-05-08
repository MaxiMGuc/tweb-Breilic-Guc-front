// Детали выбранного билета: багаж, избранное, контекст брони.
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { searchService } from '../api/index.ts'
import { LS_FAVORITE_TICKET_IDS } from '../constants/storageKeys.ts'
import { useBooking } from '../context/BookingContext.tsx'
import type { MockTicket } from '../data/mockSearchResults.ts'
import { readStorageJson, writeStorageJson } from '../utils/storage.ts'

function readFavoriteIds(): string[] {
  const p = readStorageJson<unknown>(LS_FAVORITE_TICKET_IDS, { fallback: [] })
  return Array.isArray(p) ? p.filter((x): x is string => typeof x === 'string') : []
}

function TicketDetailPage() {
  const { t } = useTranslation()
  const { ticketId } = useParams()
  const navigate = useNavigate()
  const { selectedOffer, setSelectedOffer, baggageOption, setBaggageOption, baggageExtraUsd } =
    useBooking()

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => readFavoriteIds())
  const [ticket, setTicket] = useState<MockTicket | null>(null)

  useEffect(() => {
    if (!ticketId) {
      setTicket(null)
      return
    }
    const controller = new AbortController()
    searchService
      .getTicketById(ticketId, controller.signal)
      .then((data) => setTicket(data))
      .catch(() => setTicket(null))
    return () => controller.abort()
  }, [ticketId])

  useEffect(() => {
    if (!ticketId || !ticket) return
    setSelectedOffer({
      ticketId: ticket.id,
      routeLabel: ticket.route,
      priceFrom: ticket.price,
      currency: 'USD',
      airline: ticket.airline,
    })
  }, [setSelectedOffer, ticket, ticketId])

  const isFavorite = ticketId ? favoriteIds.includes(ticketId) : false

  const toggleFavorite = useCallback(() => {
    if (!ticketId) return
    setFavoriteIds((prev) => {
      const next = prev.includes(ticketId) ? prev.filter((id) => id !== ticketId) : [...prev, ticketId]
      writeStorageJson(LS_FAVORITE_TICKET_IDS, next)
      return next
    })
  }, [ticketId])

  const basePrice = selectedOffer?.priceFrom ?? ticket?.price ?? 0
  const totalPreview = basePrice + baggageExtraUsd

  const continueBooking = () => {
    navigate('/booking')
  }

  if (!ticket) {
    return (
      <section className="page-shell" aria-label={t('ticketDetail.aria')}>
        <p className="page-muted">{t('ticketDetail.notFound')}</p>
        <Link to="/search/results" className="text-button">
          {t('ticketDetail.backToResults')}
        </Link>
      </section>
    )
  }

  return (
    <section className="page-shell" aria-label={t('ticketDetail.aria')}>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/search">{t('ticketDetail.search')}</Link>
        <span aria-hidden="true"> / </span>
        <Link to="/search/results">{t('ticketDetail.results')}</Link>
        <span aria-hidden="true"> / </span>
        <span>{t('ticketDetail.ticket')}</span>
      </nav>

      <header className="page-header">
        <h1 className="page-title">{t('ticketDetail.title')}</h1>
        <p className="page-muted">
          {t('ticketDetail.ticketId')} {ticketId ?? '—'}
        </p>
      </header>

      <div className="detail-grid">
        <div className="detail-card">
          <h2>{t('ticketDetail.itinerary')}</h2>
          <ul className="detail-list">
            <li>
              <strong>{t('ticketDetail.outbound')}</strong> — SVO 08:40 → IST 13:20
            </li>
            <li>
              <strong>{t('ticketDetail.return')}</strong> — IST 18:10 → SVO 21:35
            </li>
          </ul>
          <label className="field-block">
            <span>{t('ticketDetail.baggage')}</span>
            <select
              value={baggageOption}
              onChange={(e) => setBaggageOption(e.target.value as 'standard' | 'plus')}
            >
              <option value="standard">{t('ticketDetail.baggageStandard')}</option>
              <option value="plus">{t('ticketDetail.baggagePlus')}</option>
            </select>
          </label>
          <p className="page-muted" style={{ marginTop: 8 }}>
            {t('ticketDetail.fareSubtotal')} ${basePrice}
            {baggageOption === 'plus'
              ? ` · ${t('ticketDetail.baggageExtraShort', { amount: baggageExtraUsd })}`
              : ''}{' '}
            · {t('ticketDetail.estimatedTotal')} ${totalPreview}
          </p>
        </div>
        <div className="detail-card">
          <h2>{t('ticketDetail.fareRules')}</h2>
          <p className="page-muted">{t('ticketDetail.fareLead')}</p>
          <div className="detail-actions">
            <button type="button" className="primary-button" onClick={continueBooking}>
              {t('ticketDetail.continueBooking')}
            </button>
            <button
              type="button"
              className={`secondary-button ${isFavorite ? 'active' : ''}`}
              onClick={toggleFavorite}
            >
              {isFavorite ? t('ticketDetail.removeFavorites') : t('ticketDetail.addFavorites')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TicketDetailPage
