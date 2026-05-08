// Страница поиска: общий хук с главной формой и query-параметрами профиля.
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useSearchParams } from 'react-router-dom'
import { useTripSearchForm } from '../hooks/useTripSearchForm.ts'

function SearchPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const [searchError, setSearchError] = useState<string | null>(null)

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
    <section className="page-shell" aria-label={t('searchPage.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('searchPage.title')}</h1>
        <p className="page-lead">{t('searchPage.lead')}</p>
      </header>

      <div className="search-card page-search-card">
        <div className="trip-mode-tabs" role="tablist" aria-label={t('home.tripModeAria')}>
          {(['round', 'oneway', 'multi'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              role="tab"
              aria-selected={tripMode === mode}
              className={`trip-mode-tab ${tripMode === mode ? 'active' : ''}`}
              onClick={() => setTripMode(mode)}
            >
              {mode === 'round' ? t('home.roundTrip') : mode === 'oneway' ? t('home.oneWay') : t('home.multiCity')}
            </button>
          ))}
        </div>

        <div className="search-row">
          <label className="search-field">
            <span>{t('home.from')}</span>
            <input
              type="text"
              placeholder={t('searchPage.placeholderFrom')}
              autoComplete="off"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
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
            <input
              type="text"
              placeholder={t('searchPage.placeholderFrom')}
              autoComplete="off"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </label>
          <label className="search-field">
            <span>{t('home.dates')}</span>
            <input
              type="text"
              placeholder={tripMode === 'oneway' ? t('searchPage.placeholderDeparture') : t('searchPage.placeholderDates')}
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
            <span>{t('searchPage.passengersClass')}</span>
            <input type="text" placeholder={t('searchPage.placeholderPassengers')} readOnly />
          </label>
          <NavLink
            to={searchPath}
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
            {t('searchPage.search')}
          </NavLink>
        </div>

        {searchError ? <p className="page-muted">{searchError}</p> : null}

        <div className="search-options">
          <label>
            <input type="checkbox" checked={flexible} onChange={(e) => setFlexible(e.target.checked)} />
            {t('searchPage.flexibleDates')}
          </label>
          <label>
            <input
              type="checkbox"
              checked={nearbyAirports}
              onChange={(e) => setNearbyAirports(e.target.checked)}
            />
            {t('searchPage.nearbyAirports')}
          </label>
          <label>
            <input type="checkbox" checked={directOnly} onChange={(e) => setDirectOnly(e.target.checked)} />
            {t('searchPage.directOnly')}
          </label>
        </div>

        <div className="form-row-inline">
          <label className="field-inline">
            <span>{t('searchPage.currency')}</span>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="RUB">RUB</option>
            </select>
          </label>
          <label className="field-inline">
            <span>{t('searchPage.sortPreview')}</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="price">{t('searchPage.cheapestFirst')}</option>
              <option value="time">{t('searchPage.shortestTrip')}</option>
            </select>
          </label>
        </div>
      </div>
    </section>
  )
}

export default SearchPage
