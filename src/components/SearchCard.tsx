// Форма поиска на главной: режимы, swap и чекбоксы в связке с /search/results.
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useTripSearchForm } from '../hooks/useTripSearchForm.ts'

function SearchCard() {
  const { t } = useTranslation()
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
    <section className="search-card" aria-label={t('home.searchAria')}>
      <div className="trip-mode-tabs" role="tablist" aria-label={t('home.tripModeAria')}>
        <NavLink
          to="/"
          end
          className={({ isActive }) => `trip-mode-tab ${isActive ? 'active' : ''}`}
          onClick={() => setTripMode('round')}
        >
          {t('home.roundTrip')}
        </NavLink>
        <button
          type="button"
          role="tab"
          aria-selected={tripMode === 'oneway'}
          className={`trip-mode-tab ${tripMode === 'oneway' ? 'active' : ''}`}
          onClick={() => setTripMode('oneway')}
        >
          {t('home.oneWay')}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tripMode === 'multi'}
          className={`trip-mode-tab ${tripMode === 'multi' ? 'active' : ''}`}
          onClick={() => setTripMode('multi')}
        >
          {t('home.multiCity')}
        </button>
      </div>

      <div className="search-row">
        <label className="search-field">
          <span>{t('home.from')}</span>
          <input type="text" placeholder="Moscow" value={from} onChange={(e) => setFrom(e.target.value)} />
        </label>
        <button
          type="button"
          className="swap-button"
          aria-label={t('home.swapAria')}
          onClick={swapEndpoints}
        >
          ↔
        </button>
        <label className="search-field">
          <span>{t('home.to')}</span>
          <input type="text" placeholder="Istanbul" value={to} onChange={(e) => setTo(e.target.value)} />
        </label>
        <label className="search-field">
          <span>{t('home.dates')}</span>
          <input
            type="text"
            placeholder={tripMode === 'oneway' ? 'Departure' : '28 Mar - 2 Apr'}
            value={dates}
            onChange={(e) => setDates(e.target.value)}
          />
        </label>
        {tripMode === 'multi' ? (
          <p className="page-muted" style={{ gridColumn: '1 / -1', margin: 0 }}>
            {t('home.multiCityNotice')}
          </p>
        ) : null}
        <label className="search-field">
          <span>{t('home.passengers')}</span>
          <input type="text" placeholder="1 passenger, economy" readOnly />
        </label>
        <NavLink
          to={resultsPath}
          className="search-button search-button-link"
          onClick={(e) => {
            if (!from.trim() || !to.trim()) {
              e.preventDefault()
              setSearchError(t('home.searchNeedEndpoints'))
              window.setTimeout(() => setSearchError(null), 4000)
            } else {
              setSearchError(null)
            }
          }}
        >
          {t('home.searchTickets')}
        </NavLink>
      </div>

      {searchError ? <p className="page-muted">{searchError}</p> : null}

      <div className="search-options">
        <label>
          <input type="checkbox" checked={hotelDeals} onChange={(e) => setHotelDeals(e.target.checked)} />
          {t('home.openHotelDeals')}
        </label>
        <label>
          <input
            type="checkbox"
            checked={nearbyAirports}
            onChange={(e) => setNearbyAirports(e.target.checked)}
          />
          {t('home.nearbyAirports')}
        </label>
      </div>
    </section>
  )
}

export default SearchCard
