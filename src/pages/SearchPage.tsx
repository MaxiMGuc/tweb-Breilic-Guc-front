// Страница поиска билетов: форма и опции (логика не подключена).
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

function SearchPage() {
  const { t } = useTranslation()

  return (
    <section className="page-shell" aria-label={t('searchPage.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('searchPage.title')}</h1>
        <p className="page-lead">{t('searchPage.lead')}</p>
      </header>

      <div className="search-card page-search-card">
        <div className="trip-mode-tabs" role="tablist" aria-label={t('home.tripModeAria')}>
          <button type="button" className="trip-mode-tab active">
            {t('home.roundTrip')}
          </button>
          <button type="button" className="trip-mode-tab">
            {t('home.oneWay')}
          </button>
          <button type="button" className="trip-mode-tab">
            {t('home.multiCity')}
          </button>
        </div>

        <div className="search-row">
          <label className="search-field">
            <span>{t('home.from')}</span>
            <input type="text" placeholder={t('searchPage.placeholderFrom')} autoComplete="off" />
          </label>
          <button type="button" className="swap-button" aria-label={t('home.swapAria')}>
            ↔
          </button>
          <label className="search-field">
            <span>{t('home.to')}</span>
            <input type="text" placeholder={t('searchPage.placeholderFrom')} autoComplete="off" />
          </label>
          <label className="search-field">
            <span>{t('home.dates')}</span>
            <input type="text" placeholder={t('searchPage.placeholderDates')} />
          </label>
          <label className="search-field">
            <span>{t('searchPage.passengersClass')}</span>
            <input type="text" placeholder={t('searchPage.placeholderPassengers')} readOnly />
          </label>
          <NavLink to="/search/results" className="search-button search-button-link">
            {t('searchPage.search')}
          </NavLink>
        </div>

        <div className="search-options">
          <label>
            <input type="checkbox" />
            {t('searchPage.flexibleDates')}
          </label>
          <label>
            <input type="checkbox" />
            {t('searchPage.nearbyAirports')}
          </label>
          <label>
            <input type="checkbox" />
            {t('searchPage.directOnly')}
          </label>
        </div>

        <div className="form-row-inline">
          <label className="field-inline">
            <span>{t('searchPage.currency')}</span>
            <select defaultValue="USD">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="RUB">RUB</option>
            </select>
          </label>
          <label className="field-inline">
            <span>{t('searchPage.sortPreview')}</span>
            <select defaultValue="price">
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
