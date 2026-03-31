// Страница поиска билетов: форма и опции (логика не подключена).
import { NavLink } from 'react-router-dom'

function SearchPage() {
  return (
    <section className="page-shell" aria-label="Flight search">
      <header className="page-header">
        <h1 className="page-title">Search flights</h1>
        <p className="page-lead">Enter your route and dates to compare offers from airlines and agencies.</p>
      </header>

      <div className="search-card page-search-card">
        <div className="trip-mode-tabs" role="tablist" aria-label="Trip mode">
          <button type="button" className="trip-mode-tab active">
            Round trip
          </button>
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
            <input type="text" placeholder="City or airport" autoComplete="off" />
          </label>
          <button type="button" className="swap-button" aria-label="Swap departure and destination">
            ↔
          </button>
          <label className="search-field">
            <span>To</span>
            <input type="text" placeholder="City or airport" autoComplete="off" />
          </label>
          <label className="search-field">
            <span>Dates</span>
            <input type="text" placeholder="Departure — return" />
          </label>
          <label className="search-field">
            <span>Passengers &amp; class</span>
            <input type="text" placeholder="1 adult, economy" readOnly />
          </label>
          <NavLink to="/search/results" className="search-button search-button-link">
            Search
          </NavLink>
        </div>

        <div className="search-options">
          <label>
            <input type="checkbox" />
            Flexible dates (±3 days)
          </label>
          <label>
            <input type="checkbox" />
            Include nearby airports
          </label>
          <label>
            <input type="checkbox" />
            Direct flights only
          </label>
        </div>

        <div className="form-row-inline">
          <label className="field-inline">
            <span>Currency</span>
            <select defaultValue="USD">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="RUB">RUB</option>
            </select>
          </label>
          <label className="field-inline">
            <span>Sort by (preview)</span>
            <select defaultValue="price">
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
