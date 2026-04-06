// Настройки профиля: уведомления и безопасность.
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import PasswordField from '../components/form/PasswordField'

function ProfileSettingsPage() {
  const { t } = useTranslation()

  return (
    <section className="page-shell" aria-label={t('profileSettings.aria')}>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/profile">{t('profileSettings.breadcrumbProfile')}</Link>
        <span aria-hidden="true"> / </span>
        <span>{t('profileSettings.breadcrumbSettings')}</span>
      </nav>

      <header className="page-header">
        <h1 className="page-title">{t('profileSettings.title')}</h1>
        <p className="page-lead">{t('profileSettings.lead')}</p>
      </header>

      <div className="stack-form">
        <fieldset className="fieldset-card">
          <legend>{t('profileSettings.notifications')}</legend>
          <label className="checkbox-row">
            <input type="checkbox" defaultChecked />
            {t('profileSettings.priceAlerts')}
          </label>
          <label className="checkbox-row">
            <input type="checkbox" defaultChecked />
            {t('profileSettings.tripReminders')}
          </label>
          <label className="checkbox-row">
            <input type="checkbox" />
            {t('profileSettings.promotions')}
          </label>
        </fieldset>

        <fieldset className="fieldset-card">
          <legend>{t('profileSettings.security')}</legend>
          <PasswordField
            label={t('profileSettings.currentPassword')}
            name="currentPassword"
            autoComplete="current-password"
          />
          <PasswordField
            label={t('profileSettings.newPassword')}
            name="newPassword"
            autoComplete="new-password"
            showStrengthHint
          />
          <button type="button" className="secondary-button">
            {t('profileSettings.updatePassword')}
          </button>
        </fieldset>
      </div>
    </section>
  )
}

export default ProfileSettingsPage
