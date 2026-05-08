// Результаты поиска: фильтры, сохранение, шаринг, выбор оффера (T15–T18).
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { searchService } from '../api/index.ts'
import { LS_SAVED_SEARCH } from '../constants/storageKeys.ts'
import { useBooking } from '../context/BookingContext.tsx'
import type { MockTicket } from '../data/mockSearchResults.ts'
import { appendSearchHistory } from '../utils/searchHistory.ts'
import { writeVersionedStorage } from '../utils/storage.ts'

const INITIAL_MAX_PRICE = 800
const INITIAL_STOPS = { any: true, nonstop: false, one: false }

function SearchResultsPage() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { setSelectedOffer, setSearchResultsReturnPath } = useBooking()

  const [maxPrice, setMaxPrice] = useState(INITIAL_MAX_PRICE)
  const [stops, setStops] = useState(INITIAL_STOPS)
  const [airlineFilter, setAirlineFilter] = useState<string[]>([])
  const [departureHint, setDepartureHint] = useState('')
  const [toolbarSort, setToolbarSort] = useState<'price' | 'duration' | 'departure'>('price')
  const [shareHint, setShareHint] = useState<string | null>(null)
  const [tickets, setTickets] = useState<MockTicket[]>([])

  useEffect(() => {
    setSearchResultsReturnPath(`${location.pathname}${location.search}`)
  }, [location.pathname, location.search, setSearchResultsReturnPath])

  const fromQ = searchParams.get('from') ?? 'Moscow'
  const toQ = searchParams.get('to') ?? 'Istanbul'

  useEffect(() => {
    appendSearchHistory(fromQ, toQ)
  }, [fromQ, toQ])

  useEffect(() => {
    const controller = new AbortController()
    searchService
      .searchTickets({ from: fromQ, to: toQ }, controller.signal)
      .then((data) => setTickets(data))
      .catch(() => setTickets([]))
    return () => controller.abort()
  }, [fromQ, toQ])

  const resetFilters = useCallback(() => {
    setMaxPrice(INITIAL_MAX_PRICE)
    setStops(INITIAL_STOPS)
    setAirlineFilter([])
    setDepartureHint('')
  }, [])

  const saveSearch = useCallback(() => {
    const payload = {
      path: location.pathname + location.search,
      maxPrice,
      stops,
      airlineFilter,
      departureHint,
      toolbarSort,
      savedAt: new Date().toISOString(),
    }
    const saved = writeVersionedStorage(LS_SAVED_SEARCH, payload, { version: 1 })
    if (saved) {
      setShareHint(t('searchResults.saveOk'))
      window.setTimeout(() => setShareHint(null), 2500)
    } else {
      setShareHint(t('searchResults.saveFail'))
      window.setTimeout(() => setShareHint(null), 2500)
    }
  }, [airlineFilter, departureHint, location.pathname, location.search, maxPrice, stops, t, toolbarSort])

  const shareSearch = useCallback(async () => {
    const url = `${window.location.origin}${location.pathname}${location.search}`
    try {
      if (navigator.share) {
        await navigator.share({ title: t('searchResults.shareTitle'), url })
        return
      }
    } catch {
      /* fall through */
    }
    try {
      await navigator.clipboard.writeText(url)
      setShareHint(t('searchResults.shareCopied'))
    } catch {
      setShareHint(url)
    }
    window.setTimeout(() => setShareHint(null), 4000)
  }, [location.pathname, location.search, t])

  const filteredTickets = useMemo(() => {
    let list = tickets.filter((ticket) => ticket.price <= maxPrice)

    if (!stops.any) {
      const want0 = stops.nonstop
      const want1 = stops.one
      if (want0 || want1) {
        list = list.filter((ticket) => (want0 && ticket.stops === 0) || (want1 && ticket.stops === 1))
      }
    }

    if (airlineFilter.length > 0) {
      list = list.filter((ticket) => airlineFilter.includes(ticket.airlineCode))
    }

    if (departureHint.trim()) {
      const q = departureHint.toLowerCase()
      list = list.filter((ticket) => ticket.date.toLowerCase().includes(q))
    }

    const sorted = [...list]
    if (toolbarSort === 'price') sorted.sort((a, b) => a.price - b.price)
    if (toolbarSort === 'duration') sorted.sort((a, b) => a.durationMin - b.durationMin)
    if (toolbarSort === 'departure') sorted.sort((a, b) => a.route.localeCompare(b.route))

    return sorted
  }, [airlineFilter, departureHint, maxPrice, stops, tickets, toolbarSort])

  const selectTicket = (ticket: MockTicket) => {
    const currency = searchParams.get('cur') ?? 'USD'
    setSelectedOffer({
      ticketId: ticket.id,
      routeLabel: ticket.route,
      priceFrom: ticket.price,
      currency,
      airline: ticket.airline,
    })
    navigate(`/search/results/${ticket.id}`)
  }

  return (
    <section className="page-shell" aria-label={t('searchResults.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('searchResults.title')}</h1>
        <p className="page-lead">
          {fromQ} → {toQ} · {t('searchResults.lead')}
        </p>
      </header>

      {shareHint ? <p className="page-muted">{shareHint}</p> : null}

      <div className="results-layout">
        <aside className="results-filters" aria-label={t('searchResults.filtersAria')}>
          <h2 className="filters-title">{t('searchResults.filters')}</h2>
          <label className="filter-block">
            <span>{t('searchResults.maxPrice')}</span>
            <input
              type="range"
              min={0}
              max={2000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <span className="page-muted">${maxPrice}</span>
          </label>
          <fieldset className="filter-block">
            <legend>{t('searchResults.stops')}</legend>
            <label>
              <input
                type="checkbox"
                checked={stops.any}
                onChange={() => setStops({ any: true, nonstop: false, one: false })}
              />{' '}
              {t('searchResults.any')}
            </label>
            <label>
              <input
                type="checkbox"
                checked={stops.nonstop}
                onChange={() =>
                  setStops((s) => ({ any: false, nonstop: !s.nonstop, one: s.one }))
                }
              />{' '}
              {t('searchResults.nonStop')}
            </label>
            <label>
              <input
                type="checkbox"
                checked={stops.one}
                onChange={() =>
                  setStops((s) => ({ any: false, nonstop: s.nonstop, one: !s.one }))
                }
              />{' '}
              {t('searchResults.oneStop')}
            </label>
          </fieldset>
          <label className="filter-block">
            <span>{t('searchResults.airlines')}</span>
            <select
              multiple
              size={4}
              value={airlineFilter}
              onChange={(e) => {
                const opts = Array.from(e.target.selectedOptions).map((o) => o.value)
                setAirlineFilter(opts)
              }}
            >
              <option value="a1">Airline A</option>
              <option value="a2">Airline B</option>
            </select>
            <span className="page-muted" style={{ fontSize: 12 }}>
              {t('searchResults.airlineMultiHint')}
            </span>
          </label>
          <label className="filter-block">
            <span>{t('searchResults.departureTime')}</span>
            <input
              type="text"
              placeholder={t('searchResults.depPlaceholder')}
              value={departureHint}
              onChange={(e) => setDepartureHint(e.target.value)}
            />
          </label>
          <button type="button" className="secondary-button" onClick={resetFilters}>
            {t('searchResults.resetFilters')}
          </button>
        </aside>

        <div className="results-main">
          <div className="results-toolbar">
            <label className="field-inline">
              <span>{t('searchResults.sort')}</span>
              <select
                value={toolbarSort}
                onChange={(e) => setToolbarSort(e.target.value as typeof toolbarSort)}
              >
                <option value="price">{t('searchResults.price')}</option>
                <option value="duration">{t('searchResults.duration')}</option>
                <option value="departure">{t('searchResults.departure')}</option>
              </select>
            </label>
            <div className="toolbar-actions">
              <button type="button" className="ghost-button small" onClick={saveSearch}>
                {t('searchResults.saveSearch')}
              </button>
              <button type="button" className="ghost-button small" onClick={shareSearch}>
                {t('searchResults.share')}
              </button>
            </div>
          </div>

          <ul className="ticket-list">
            {filteredTickets.length === 0 ? (
              <li className="page-muted">{t('searchResults.noTickets')}</li>
            ) : null}
            {filteredTickets.map((ticket) => (
              <li key={ticket.id}>
                <article className="ticket-card">
                  <div>
                    <p className="airline">{ticket.airline}</p>
                    <p className="route">{ticket.route}</p>
                    <p className="date">{ticket.date}</p>
                  </div>
                  <div className="ticket-card-right">
                    <p className="price">{t('searchResults.fromUsd', { price: ticket.price })}</p>
                    <button type="button" className="text-button" onClick={() => selectTicket(ticket)}>
                      {t('searchResults.select')}
                    </button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SearchResultsPage
