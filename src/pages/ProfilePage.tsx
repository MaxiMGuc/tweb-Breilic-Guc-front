// Профиль пользователя.
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function ProfilePage() {
  const { t } = useTranslation()

  return (
    <section className="page-shell" aria-label={t('profile.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('profile.title')}</h1>
        <p className="page-lead">{t('profile.lead')}</p>
      </header>

      <div className="profile-layout">
        <nav className="profile-nav" aria-label={t('profile.navAria')}>
          <Link to="/profile/settings" className="profile-nav-link">
            {t('nav.settings')}
          </Link>
          <Link to="/profile/history" className="profile-nav-link">
            {t('profile.navSearchHistory')}
          </Link>
        </nav>

        <div className="fieldset-card">
          <h2>{t('profile.personalInfo')}</h2>
          <div className="form-grid-2">
            <label className="field-block">
              <span>{t('profile.displayName')}</span>
              <input type="text" />
            </label>
            <label className="field-block">
              <span>{t('profile.phone')}</span>
              <input type="tel" />
            </label>
            <label className="field-block">
              <span>{t('profile.preferredCurrency')}</span>
              <select defaultValue="USD">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </label>
            <label className="field-block">
              <span>{t('profile.language')}</span>
              <select defaultValue="en">
                <option value="en">{t('profile.langEn')}</option>
                <option value="ru">{t('profile.langRu')}</option>
              </select>
            </label>
          </div>
          <button type="button" className="primary-button">
            {t('profile.save')}
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
