// Результаты поиска: фильтры и список предложений (данные статические).
import { Link } from 'react-router-dom'

function SearchResultsPage() {
  return (
    <section className="page-shell" aria-label="Search results">
      <header className="page-header">
        <h1 className="page-title">Search results</h1>
        <p className="page-lead">Refine results with filters and open a ticket for details.</p>
      </header>

      <div className="results-layout">
        <aside className="results-filters" aria-label="Filters">
          <h2 className="filters-title">Filters</h2>
          <label className="filter-block">
            <span>Max price</span>
            <input type="range" min={0} max={2000} defaultValue={800} />
          </label>
          <fieldset className="filter-block">
            <legend>Stops</legend>
            <label>
              <input type="checkbox" name="stops" /> Any
            </label>
            <label>
              <input type="checkbox" name="stops" /> Non-stop
            </label>
            <label>
              <input type="checkbox" name="stops" /> 1 stop
            </label>
          </fieldset>
          <label className="filter-block">
            <span>Airlines</span>
            <select multiple size={4} defaultValue={[]}>
              <option value="">All airlines</option>
              <option value="a1">Airline A</option>
              <option value="a2">Airline B</option>
            </select>
          </label>
          <label className="filter-block">
            <span>Departure time</span>
            <input type="text" placeholder="e.g. morning" />
          </label>
          <button type="button" className="secondary-button">
            Reset filters
          </button>
        </aside>

        <div className="results-main">
          <div className="results-toolbar">
            <label className="field-inline">
              <span>Sort</span>
              <select defaultValue="price">
                <option value="price">Price</option>
                <option value="duration">Duration</option>
                <option value="departure">Departure time</option>
              </select>
            </label>
            <div className="toolbar-actions">
              <button type="button" className="ghost-button small">
                Save search
              </button>
              <button type="button" className="ghost-button small">
                Share
              </button>
            </div>
          </div>

          <ul className="ticket-list">
            <li>
              <article className="ticket-card">
                <div>
                  <p className="airline">Sample Airline</p>
                  <p className="route">Moscow (SVO) → Istanbul (IST)</p>
                  <p className="date">28 Mar · 3h 40m · direct</p>
                </div>
                <div className="ticket-card-right">
                  <p className="price">from $189</p>
                  <Link to="/search/results/demo-ticket-1" className="text-button">
                    Select
                  </Link>
                </div>
              </article>
            </li>
            <li>
              <article className="ticket-card">
                <div>
                  <p className="airline">Another Carrier</p>
                  <p className="route">Moscow (VKO) → Istanbul (SAW)</p>
                  <p className="date">28 Mar · 5h 10m · 1 stop</p>
                </div>
                <div className="ticket-card-right">
                  <p className="price">from $156</p>
                  <Link to="/search/results/demo-ticket-2" className="text-button">
                    Select
                  </Link>
                </div>
              </article>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SearchResultsPage
