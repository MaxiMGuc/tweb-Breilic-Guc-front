// Страница поиска билетов: общий хук с главной формой (исполнитель B — согласование с SearchCard).
import { useEffect } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import { useTripSearchForm } from '../hooks/useTripSearchForm.ts'

function SearchPage() {
  const [searchParams] = useSearchParams()
  const {
    tripMode,
    setTripMode,
    from,
    setFrom,
    to,
    setTo,
    dates,
    setDates,
    flexible,
    setFlexible,
    nearbyAirports,
    setNearbyAirports,
    directOnly,
    setDirectOnly,
    currency,
    setCurrency,
    sortBy,
    setSortBy,
    swapEndpoints,
    buildResultsPath,
  } = useTripSearchForm()

  useEffect(() => {
    const pf = searchParams.get('from')
    const pt = searchParams.get('to')
    if (pf) setFrom(pf)
    if (pt) setTo(pt)
    const mode = searchParams.get('mode') as 'round' | 'oneway' | 'multi' | null
    if (mode === 'round' || mode === 'oneway' || mode === 'multi') setTripMode(mode)
  }, [searchParams, setFrom, setTo, setTripMode])

  const searchPath = buildResultsPath({ includePageOptions: true, includeHotel: false })

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
          <button
            type="button"
            className="swap-button"
            aria-label="Swap departure and destination"
            onClick={swapEndpoints}
          >
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
          <NavLink to={searchPath} className="search-button search-button-link">
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
