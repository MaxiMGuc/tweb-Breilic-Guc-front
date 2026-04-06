// Избранные направления и сохранённые маршруты.
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function FavoritesPage() {
  const { t } = useTranslation()

  return (
    <section className="page-shell" aria-label={t('favorites.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('favorites.title')}</h1>
        <p className="page-lead">{t('favorites.lead')}</p>
      </header>

      <div className="favorites-toolbar">
        <button type="button" className="primary-button">
          {t('favorites.addRoute')}
        </button>
        <label className="field-inline">
          <span>{t('favorites.sort')}</span>
          <select defaultValue="recent">
            <option value="recent">{t('favorites.recent')}</option>
            <option value="name">{t('favorites.name')}</option>
          </select>
        </label>
      </div>

      <ul className="favorites-grid">
        <li className="favorite-card">
          <p className="favorite-title">Istanbul</p>
          <p className="page-muted">{t('favorites.fromMoscow')}</p>
          <div className="favorite-actions">
            <Link to="/search" className="text-button">
              {t('favorites.searchFlights')}
            </Link>
            <button type="button" className="ghost-button small">
              {t('favorites.remove')}
            </button>
          </div>
        </li>
        <li className="favorite-card">
          <p className="favorite-title">Dubai</p>
          <p className="page-muted">{t('favorites.fromSpb')}</p>
          <div className="favorite-actions">
            <Link to="/search" className="text-button">
              {t('favorites.searchFlights')}
            </Link>
            <button type="button" className="ghost-button small">
              {t('favorites.remove')}
            </button>
          </div>
        </li>
      </ul>
    </section>
  )
}

export default FavoritesPage
