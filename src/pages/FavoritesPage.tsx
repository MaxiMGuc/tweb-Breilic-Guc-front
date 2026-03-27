// Избранные направления и сохранённые маршруты.
import { Link } from 'react-router-dom'

function FavoritesPage() {
  return (
    <section className="page-shell" aria-label="Favorites">
      <header className="page-header">
        <h1 className="page-title">Favorite destinations</h1>
        <p className="page-lead">Saved routes and price alerts will appear here.</p>
      </header>

      <div className="favorites-toolbar">
        <button type="button" className="primary-button">
          Add route
        </button>
        <label className="field-inline">
          <span>Sort</span>
          <select defaultValue="recent">
            <option value="recent">Recently added</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>

      <ul className="favorites-grid">
        <li className="favorite-card">
          <p className="favorite-title">Istanbul</p>
          <p className="page-muted">From Moscow · tracked</p>
          <div className="favorite-actions">
            <Link to="/search" className="text-button">
              Search flights
            </Link>
            <button type="button" className="ghost-button small">
              Remove
            </button>
          </div>
        </li>
        <li className="favorite-card">
          <p className="favorite-title">Dubai</p>
          <p className="page-muted">From Saint Petersburg</p>
          <div className="favorite-actions">
            <Link to="/search" className="text-button">
              Search flights
            </Link>
            <button type="button" className="ghost-button small">
              Remove
            </button>
          </div>
        </li>
      </ul>
    </section>
  )
}

export default FavoritesPage
