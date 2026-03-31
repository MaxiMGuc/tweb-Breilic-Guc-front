// Форма поиска билетов на главной странице.
// Пока статическая и нужна как базовый UI-скелет без бизнес-логики.
import { NavLink } from 'react-router-dom'

// Отображает вкладки режимов поиска и базовые поля формы для текущего (round trip) сценария.
function SearchCard() {
  return (
    <section className="search-card" aria-label="Flight search">
      <div className="trip-mode-tabs" role="tablist" aria-label="Trip mode">
        <NavLink to="/" end className={({ isActive }) => `trip-mode-tab ${isActive ? 'active' : ''}`}>
          Round trip
        </NavLink>
        <button type="button" className="trip-mode-tab">
          One way
        </button>
        <button type="button" className="trip-mode-tab">
          Multi-city
        </button>
      </div>

      <div className="search-row">
        <label className="search-field">
          <span>From</span>
          <input type="text" placeholder="Moscow" />
        </label>
        <button type="button" className="swap-button" aria-label="Swap departure and destination">
          ↔
        </button>
        <label className="search-field">
          <span>To</span>
          <input type="text" placeholder="Istanbul" />
        </label>
        <label className="search-field">
          <span>Dates</span>
          <input type="text" placeholder="28 Mar - 2 Apr" />
        </label>
        <label className="search-field">
          <span>Passengers</span>
          <input type="text" placeholder="1 passenger, economy" />
        </label>
        <NavLink to="/search/results" className="search-button search-button-link">
          Search tickets
        </NavLink>
      </div>

      <div className="search-options">
        <label>
          <input type="checkbox" />
          Open-hotel deals
        </label>
        <label>
          <input type="checkbox" />
          Include nearby airports
        </label>
      </div>
    </section>
  )
}

export default SearchCard
