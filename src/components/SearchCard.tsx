// Форма поиска билетов на главной странице.
// Пока статическая и нужна как базовый UI-скелет без бизнес-логики.
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

// Отображает вкладки режимов поиска и базовые поля формы для текущего (round trip) сценария.
function SearchCard() {
  const { t } = useTranslation()

  return (
    <section className="search-card" aria-label={t('home.searchAria')}>
      <div className="trip-mode-tabs" role="tablist" aria-label={t('home.tripModeAria')}>
        <NavLink to="/" end className={({ isActive }) => `trip-mode-tab ${isActive ? 'active' : ''}`}>
          {t('home.roundTrip')}
        </NavLink>
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
          <input type="text" placeholder="Moscow" />
        </label>
        <button type="button" className="swap-button" aria-label={t('home.swapAria')}>
          ↔
        </button>
        <label className="search-field">
          <span>{t('home.to')}</span>
          <input type="text" placeholder="Istanbul" />
        </label>
        <label className="search-field">
          <span>{t('home.dates')}</span>
          <input type="text" placeholder="28 Mar - 2 Apr" />
        </label>
        <label className="search-field">
          <span>{t('home.passengers')}</span>
          <input type="text" placeholder="1 passenger, economy" />
        </label>
        <NavLink to="/search/results" className="search-button search-button-link">
          {t('home.searchTickets')}
        </NavLink>
      </div>

      <div className="search-options">
        <label>
          <input type="checkbox" />
          {t('home.openHotelDeals')}
        </label>
        <label>
          <input type="checkbox" />
          {t('home.nearbyAirports')}
        </label>
      </div>
    </section>
  )
}

export default SearchCard
