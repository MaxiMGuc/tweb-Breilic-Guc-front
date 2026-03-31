// Страница поиска билетов: режим рейса, swap, валюта и сортировка (T11, T12, T14).
import { useCallback, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LS_SEARCH_PREFS } from '../constants/storageKeys.ts'

export type TripMode = 'round' | 'oneway' | 'multi'

type SearchPrefs = {
  currency: string
  sortBy: string
}

function loadPrefs(): SearchPrefs {
  try {
    const raw = localStorage.getItem(LS_SEARCH_PREFS)
    if (!raw) return { currency: 'USD', sortBy: 'price' }
    const p = JSON.parse(raw) as Partial<SearchPrefs>
    return {
      currency: typeof p.currency === 'string' ? p.currency : 'USD',
      sortBy: typeof p.sortBy === 'string' ? p.sortBy : 'price',
    }
  } catch {
    return { currency: 'USD', sortBy: 'price' }
  }
}

function SearchPage() {
  const [tripMode, setTripMode] = useState<TripMode>('round')
  const [from, setFrom] = useState('Moscow')
  const [to, setTo] = useState('Istanbul')
  const [dates, setDates] = useState('28 Mar — 2 Apr')
  const [flexible, setFlexible] = useState(false)
  const [nearbyAirports, setNearbyAirports] = useState(false)
  const [directOnly, setDirectOnly] = useState(false)

  const [currency, setCurrency] = useState(() => loadPrefs().currency)
  const [sortBy, setSortBy] = useState(() => loadPrefs().sortBy)

  useEffect(() => {
    try {
      localStorage.setItem(LS_SEARCH_PREFS, JSON.stringify({ currency, sortBy }))
    } catch {
      /* ignore */
    }
  }, [currency, sortBy])

  const swapEndpoints = useCallback(() => {
    setFrom(to)
    setTo(from)
  }, [from, to])

  return (
    <section className="page-shell" aria-label="Flight search">
      <header className="page-header">
        <h1 className="page-title">Search flights</h1>
        <p className="page-lead">
          Enter your route and dates to compare offers from airlines and agencies.
        </p>
      </header>

      <div className="search-card page-search-card">
        <div className="trip-mode-tabs" role="tablist" aria-label="Trip mode">
          {(['round', 'oneway', 'multi'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              role="tab"
              aria-selected={tripMode === mode}
              className={`trip-mode-tab ${tripMode === mode ? 'active' : ''}`}
              onClick={() => setTripMode(mode)}
            >
              {mode === 'round' ? 'Round trip' : mode === 'oneway' ? 'One way' : 'Multi-city'}
            </button>
          ))}
        </div>

        <div className="search-row">
          <label className="search-field">
            <span>From</span>
            <input
              type="text"
              placeholder="City or airport"
              autoComplete="off"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </label>
          <button type="button" className="swap-button" aria-label="Swap departure and destination" onClick={swapEndpoints}>
            ↔
          </button>
          <label className="search-field">
            <span>To</span>
            <input
              type="text"
              placeholder="City or airport"
              autoComplete="off"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </label>
          <label className="search-field">
            <span>Dates</span>
            <input
              type="text"
              placeholder={tripMode === 'oneway' ? 'Departure' : 'Departure — return'}
              value={dates}
              onChange={(e) => setDates(e.target.value)}
            />
          </label>
          {tripMode === 'multi' ? (
            <p className="page-muted" style={{ gridColumn: '1 / -1', margin: 0 }}>
              Multi-city: add segments in a future iteration; using first leg for preview.
            </p>
          ) : null}
          <label className="search-field">
            <span>Passengers &amp; class</span>
            <input type="text" placeholder="1 adult, economy" readOnly />
          </label>
          <NavLink
            to={`/search/results?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&mode=${tripMode}&cur=${currency}&sort=${sortBy}`}
            className="search-button search-button-link"
          >
            Search
          </NavLink>
        </div>

        <div className="search-options">
          <label>
            <input type="checkbox" checked={flexible} onChange={(e) => setFlexible(e.target.checked)} />
            Flexible dates (±3 days)
          </label>
          <label>
            <input
              type="checkbox"
              checked={nearbyAirports}
              onChange={(e) => setNearbyAirports(e.target.checked)}
            />
            Include nearby airports
          </label>
          <label>
            <input type="checkbox" checked={directOnly} onChange={(e) => setDirectOnly(e.target.checked)} />
            Direct flights only
          </label>
        </div>

        <div className="form-row-inline">
          <label className="field-inline">
            <span>Currency</span>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="RUB">RUB</option>
            </select>
          </label>
          <label className="field-inline">
            <span>Sort by (preview)</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="price">Cheapest first</option>
              <option value="time">Shortest trip</option>
            </select>
          </label>
        </div>
      </div>
    </section>
  )
}

export default SearchPage
