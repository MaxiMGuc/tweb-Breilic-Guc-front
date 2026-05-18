// Форма поиска на главной: те же режимы/swap/чекбоксы, что на /search (исполнитель B: T05–T07, T09).
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTripSearchForm } from '../hooks/useTripSearchForm.ts'

function SearchCard() {
  const {
    tripMode,
    setTripMode,
    from,
    setFrom,
    to,
    setTo,
    dates,
    setDates,
    nearbyAirports,
    setNearbyAirports,
    hotelDeals,
    setHotelDeals,
    swapEndpoints,
    buildResultsPath,
  } = useTripSearchForm()

  const [searchError, setSearchError] = useState<string | null>(null)
  const resultsPath = buildResultsPath({ includePageOptions: false, includeHotel: true })

  return (
    <section className="search-card" aria-label="Flight search">
      <div className="trip-mode-tabs" role="tablist" aria-label="Trip mode">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `trip-mode-tab ${isActive ? 'active' : ''}`}
          onClick={() => setTripMode('round')}
        >
          Round trip
        </NavLink>
        <button
          type="button"
          role="tab"
          aria-selected={tripMode === 'oneway'}
          className={`trip-mode-tab ${tripMode === 'oneway' ? 'active' : ''}`}
          onClick={() => setTripMode('oneway')}
        >
          One way
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tripMode === 'multi'}
          className={`trip-mode-tab ${tripMode === 'multi' ? 'active' : ''}`}
          onClick={() => setTripMode('multi')}
        >
          Multi-city
        </button>
      </div>

      <div className="search-row">
        <label className="search-field">
          <span>From</span>
          <input type="text" placeholder="Moscow" value={from} onChange={(e) => setFrom(e.target.value)} />
        </label>
        <button type="button" className="swap-button" aria-label="Swap departure and destination" onClick={swapEndpoints}>
          ↔
        </button>
        <label className="search-field">
          <span>To</span>
          <input type="text" placeholder="Istanbul" value={to} onChange={(e) => setTo(e.target.value)} />
        </label>
        <label className="search-field">
          <span>Dates</span>
          <input
            type="text"
            placeholder={tripMode === 'oneway' ? 'Departure' : '28 Mar - 2 Apr'}
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
          <span>Passengers</span>
          <input type="text" placeholder="1 passenger, economy" readOnly />
        </label>
        <NavLink
          to={resultsPath}
          className="search-button search-button-link"
          onClick={(e) => {
            if (!from.trim() || !to.trim()) {
              e.preventDefault()
              setSearchError('Enter both departure and destination.')
              window.setTimeout(() => setSearchError(null), 4000)
            } else {
              setSearchError(null)
            }
          }}
        >
          Search tickets
        </NavLink>
      </div>

      {searchError ? <p className="page-muted">{searchError}</p> : null}

      <div className="search-options">
        <label>
          <input type="checkbox" checked={hotelDeals} onChange={(e) => setHotelDeals(e.target.checked)} />
          Open-hotel deals
        </label>
        <label>
          <input type="checkbox" checked={nearbyAirports} onChange={(e) => setNearbyAirports(e.target.checked)} />
          Include nearby airports
        </label>
      </div>
    </section>
  )
}

export default SearchCard
