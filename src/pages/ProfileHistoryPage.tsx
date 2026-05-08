// История поисков из localStorage; «Повторить поиск» с query (T44).
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { getSearchHistory } from '../utils/searchHistory.ts'

function ProfileHistoryPage() {
  const { t } = useTranslation()
  const [version, setVersion] = useState(0)
  const items = useMemo(() => {
    void version
    return getSearchHistory()
  }, [version])

  const refresh = () => setVersion((v) => v + 1)

  return (
    <section className="page-shell" aria-label={t('profileHistory.aria')}>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/profile">{t('profileHistory.breadcrumbProfile')}</Link>
        <span aria-hidden="true"> / </span>
        <span>{t('profileHistory.breadcrumbHistory')}</span>
      </nav>

      <header className="page-header">
        <h1 className="page-title">{t('profileHistory.title')}</h1>
        <p className="page-lead">{t('profileHistory.lead')}</p>
      </header>

      <p className="page-muted">
        <button type="button" className="text-button" onClick={refresh}>
          {t('profileHistory.refreshList')}
        </button>
      </p>

      <ul className="history-list">
        {items.length === 0 ? (
          <li className="page-muted">{t('profileHistory.empty')}</li>
        ) : null}
        {items.map((h) => (
          <li key={h.id} className="history-item">
            <span>{h.label}</span>
            <Link
              to={`/search?from=${encodeURIComponent(h.from)}&to=${encodeURIComponent(h.to)}`}
              className="text-button"
            >
              {t('profileHistory.repeat')}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProfileHistoryPage
