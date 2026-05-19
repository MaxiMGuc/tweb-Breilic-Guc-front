// Избранные маршруты: localStorage, сортировка, добавление/удаление (T45–T48 на клиенте).
import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { addFavorite, getFavorites, removeFavorite, type FavoriteRoute } from '../utils/favorites.ts'

type SortKey = 'recent' | 'name'

function sortRoutes(list: FavoriteRoute[], sort: SortKey): FavoriteRoute[] {
  const copy = [...list]
  if (sort === 'name') {
    copy.sort((a, b) => a.title.localeCompare(b.title))
  } else {
    copy.sort((a, b) => (a.addedAt < b.addedAt ? 1 : -1))
  }
  return copy
}

function FavoritesPage() {
  const [sort, setSort] = useState<SortKey>('recent')
  const [tick, setTick] = useState(0)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const list = useMemo(() => {
    void tick
    return sortRoutes(getFavorites(), sort)
  }, [sort, tick])

  const refresh = useCallback(() => setTick((t) => t + 1), [])

  const handleAdd = () => {
    addFavorite(from, to)
    setFrom('')
    setTo('')
    refresh()
  }

  const handleRemove = (id: string) => {
    removeFavorite(id)
    refresh()
  }

  return (
    <section className="page-shell" aria-label="Favorites">
      <header className="page-header">
        <h1 className="page-title">Favorite destinations</h1>
        <p className="page-lead">Saved routes on this device (prototype).</p>
      </header>

      <div className="favorites-toolbar">
        <div className="form-grid-2" style={{ flex: 1, maxWidth: 480 }}>
          <label className="field-block">
            <span>From</span>
            <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Moscow" />
          </label>
          <label className="field-block">
            <span>To</span>
            <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Berlin" />
          </label>
        </div>
        <button type="button" className="primary-button" onClick={handleAdd}>
          Add route
        </button>
        <label className="field-inline">
          <span>Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
            <option value="recent">Recently added</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>

      <ul className="favorites-grid">
        {list.map((f) => (
          <li key={f.id} className="favorite-card">
            <p className="favorite-title">{f.title}</p>
            <p className="page-muted">{f.subtitle}</p>
            <div className="favorite-actions">
              <Link
                to={`/search?from=${encodeURIComponent(f.from)}&to=${encodeURIComponent(f.to)}`}
                className="text-button"
              >
                Search flights
              </Link>
              <button type="button" className="ghost-button small" onClick={() => handleRemove(f.id)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default FavoritesPage
