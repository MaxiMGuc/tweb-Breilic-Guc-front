// Избранные маршруты: localStorage, сортировка, добавление/удаление.
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const [sort, setSort] = useState<SortKey>('recent')
  const [tick, setTick] = useState(0)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const list = useMemo(() => {
    void tick
    return sortRoutes(getFavorites(), sort)
  }, [sort, tick])

  const refresh = useCallback(() => setTick((n) => n + 1), [])

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
    <section className="page-shell" aria-label={t('favorites.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('favorites.title')}</h1>
        <p className="page-lead">{t('favorites.lead')}</p>
      </header>

      <div className="favorites-toolbar">
        <div className="form-grid-2" style={{ flex: 1, maxWidth: 480 }}>
          <label className="field-block">
            <span>{t('home.from')}</span>
            <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Moscow" />
          </label>
          <label className="field-block">
            <span>{t('home.to')}</span>
            <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Berlin" />
          </label>
        </div>
        <button type="button" className="primary-button" onClick={handleAdd}>
          {t('favorites.addRoute')}
        </button>
        <label className="field-inline">
          <span>{t('favorites.sort')}</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
            <option value="recent">{t('favorites.recent')}</option>
            <option value="name">{t('favorites.name')}</option>
          </select>
        </label>
      </div>

      <ul className="favorites-grid">
        {list.map((fav) => (
          <li key={fav.id} className="favorite-card">
            <p className="favorite-title">{fav.title}</p>
            <p className="page-muted">{fav.subtitle}</p>
            <div className="favorite-actions">
              <Link
                to={`/search?from=${encodeURIComponent(fav.from)}&to=${encodeURIComponent(fav.to)}`}
                className="text-button"
              >
                {t('favorites.searchFlights')}
              </Link>
              <button type="button" className="ghost-button small" onClick={() => handleRemove(fav.id)}>
                {t('favorites.remove')}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default FavoritesPage
