// История поисков в профиле.
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function ProfileHistoryPage() {
  const { t } = useTranslation()

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

      <ul className="history-list">
        <li className="history-item">
          <span>Moscow → Antalya · Apr 2025</span>
          <Link to="/search" className="text-button">
            {t('profileHistory.repeat')}
          </Link>
        </li>
        <li className="history-item">
          <span>Saint Petersburg → Dubai · Jun 2025</span>
          <Link to="/search" className="text-button">
            {t('profileHistory.repeat')}
          </Link>
        </li>
      </ul>
    </section>
  )
}

export default ProfileHistoryPage
