// Результаты поиска: фильтры, сохранение, шаринг, выбор оффера (T15–T18).
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LS_SAVED_SEARCH } from '../constants/storageKeys.ts'
import { useBooking } from '../context/BookingContext.tsx'
import { MOCK_TICKETS, type MockTicket } from '../data/mockSearchResults.ts'
import { appendSearchHistory } from '../utils/searchHistory.ts'

const INITIAL_MAX_PRICE = 800
const INITIAL_STOPS = { any: true, nonstop: false, one: false }

function SearchResultsPage() {
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

  useEffect(() => {
    setSearchResultsReturnPath(`${location.pathname}${location.search}`)
  }, [location.pathname, location.search, setSearchResultsReturnPath])

  const fromQ = searchParams.get('from') ?? 'Moscow'
  const toQ = searchParams.get('to') ?? 'Istanbul'

  useEffect(() => {
    appendSearchHistory(fromQ, toQ)
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
    try {
      localStorage.setItem(LS_SAVED_SEARCH, JSON.stringify(payload))
      setShareHint('Search saved on this device.')
      window.setTimeout(() => setShareHint(null), 2500)
    } catch {
      setShareHint('Could not save (storage unavailable).')
      window.setTimeout(() => setShareHint(null), 2500)
    }
  }, [airlineFilter, departureHint, location.pathname, location.search, maxPrice, stops, toolbarSort])

  const shareSearch = useCallback(async () => {
    const url = `${window.location.origin}${location.pathname}${location.search}`
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Flight search', url })
        return
      }
    } catch {
      /* fall through */
    }
    try {
      await navigator.clipboard.writeText(url)
      setShareHint('Link copied to clipboard.')
    } catch {
      setShareHint(url)
    }
    window.setTimeout(() => setShareHint(null), 4000)
  }, [location.pathname, location.search])

  const filteredTickets = useMemo(() => {
    let list = MOCK_TICKETS.filter((t) => t.price <= maxPrice)

    if (!stops.any) {
      const want0 = stops.nonstop
      const want1 = stops.one
      if (want0 || want1) {
        list = list.filter((t) => (want0 && t.stops === 0) || (want1 && t.stops === 1))
      }
    }

    if (airlineFilter.length > 0) {
      list = list.filter((t) => airlineFilter.includes(t.airlineCode))
    }

    if (departureHint.trim()) {
      const q = departureHint.toLowerCase()
      list = list.filter((t) => t.date.toLowerCase().includes(q))
    }

    const sorted = [...list]
    if (toolbarSort === 'price') sorted.sort((a, b) => a.price - b.price)
    if (toolbarSort === 'duration') sorted.sort((a, b) => a.durationMin - b.durationMin)
    if (toolbarSort === 'departure') sorted.sort((a, b) => a.route.localeCompare(b.route))

    return sorted
  }, [airlineFilter, departureHint, maxPrice, stops, toolbarSort])

  const selectTicket = (t: MockTicket) => {
    const currency = searchParams.get('cur') ?? 'USD'
    setSelectedOffer({
      ticketId: t.id,
      routeLabel: t.route,
      priceFrom: t.price,
      currency,
      airline: t.airline,
    })
    navigate(`/search/results/${t.id}`)
  }

  return (
    <section className="page-shell" aria-label="Search results">
      <header className="page-header">
        <h1 className="page-title">Search results</h1>
        <p className="page-lead">
          {fromQ} → {toQ} · Refine results with filters and open a ticket for details.
        </p>
      </header>

      {shareHint ? <p className="page-muted">{shareHint}</p> : null}

      <div className="results-layout">
        <aside className="results-filters" aria-label="Filters">
          <h2 className="filters-title">Filters</h2>
          <label className="filter-block">
            <span>Max price</span>
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
            <legend>Stops</legend>
            <label>
              <input
                type="checkbox"
                checked={stops.any}
                onChange={() => setStops({ any: true, nonstop: false, one: false })}
              />{' '}
              Any
            </label>
            <label>
              <input
                type="checkbox"
                checked={stops.nonstop}
                onChange={() =>
                  setStops((s) => ({ any: false, nonstop: !s.nonstop, one: s.one }))
                }
              />{' '}
              Non-stop
            </label>
            <label>
              <input
                type="checkbox"
                checked={stops.one}
                onChange={() =>
                  setStops((s) => ({ any: false, nonstop: s.nonstop, one: !s.one }))
                }
              />{' '}
              1 stop
            </label>
          </fieldset>
          <label className="filter-block">
            <span>Airlines</span>
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
              Hold Ctrl/Cmd to select airlines; empty = all
            </span>
          </label>
          <label className="filter-block">
            <span>Departure time</span>
            <input
              type="text"
              placeholder="e.g. morning"
              value={departureHint}
              onChange={(e) => setDepartureHint(e.target.value)}
            />
          </label>
          <button type="button" className="secondary-button" onClick={resetFilters}>
            Reset filters
          </button>
        </aside>

        <div className="results-main">
          <div className="results-toolbar">
            <label className="field-inline">
              <span>Sort</span>
              <select
                value={toolbarSort}
                onChange={(e) => setToolbarSort(e.target.value as typeof toolbarSort)}
              >
                <option value="price">Price</option>
                <option value="duration">Duration</option>
                <option value="departure">Departure time</option>
              </select>
            </label>
            <div className="toolbar-actions">
              <button type="button" className="ghost-button small" onClick={saveSearch}>
                Save search
              </button>
              <button type="button" className="ghost-button small" onClick={shareSearch}>
                Share
              </button>
            </div>
          </div>

          <ul className="ticket-list">
            {filteredTickets.length === 0 ? (
              <li className="page-muted">No tickets match filters.</li>
            ) : null}
            {filteredTickets.map((t) => (
              <li key={t.id}>
                <article className="ticket-card">
                  <div>
                    <p className="airline">{t.airline}</p>
                    <p className="route">{t.route}</p>
                    <p className="date">{t.date}</p>
                  </div>
                  <div className="ticket-card-right">
                    <p className="price">from ${t.price}</p>
                    <button type="button" className="text-button" onClick={() => selectTicket(t)}>
                      Select
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
