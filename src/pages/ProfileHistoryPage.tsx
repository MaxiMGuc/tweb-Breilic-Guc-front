// История поисков из localStorage; «Повторить поиск» с query (T44).
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSearchHistory } from '../utils/searchHistory.ts'

function ProfileHistoryPage() {
  const [version, setVersion] = useState(0)
  const items = useMemo(() => {
    void version
    return getSearchHistory()
  }, [version])

  const refresh = () => setVersion((v) => v + 1)

  return (
    <section className="page-shell" aria-label="Search history">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/profile">Profile</Link>
        <span aria-hidden="true"> / </span>
        <span>History</span>
      </nav>

      <header className="page-header">
        <h1 className="page-title">Search history</h1>
        <p className="page-lead">Recently searched routes on this device.</p>
      </header>

      <p className="page-muted">
        <button type="button" className="text-button" onClick={refresh}>
          Refresh list
        </button>
      </p>

      <ul className="history-list">
        {items.length === 0 ? (
          <li className="page-muted">No history yet — run a search from the home or search page.</li>
        ) : null}
        {items.map((h) => (
          <li key={h.id} className="history-item">
            <span>{h.label}</span>
            <Link
              to={`/search?from=${encodeURIComponent(h.from)}&to=${encodeURIComponent(h.to)}`}
              className="text-button"
            >
              Repeat search
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProfileHistoryPage
