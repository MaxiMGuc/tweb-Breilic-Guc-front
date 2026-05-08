// Настройки: уведомления в localStorage; смена пароля — превью (T42, T43).
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import PasswordField from '../components/form/PasswordField'
import {
  loadNotificationPrefs,
  saveNotificationPrefs,
  type NotificationPrefs,
} from '../utils/notificationPrefs.ts'

function ProfileSettingsPage() {
  const { t } = useTranslation()
  const [prefs, setPrefs] = useState<NotificationPrefs>(() => loadNotificationPrefs())
  const [pwdHint, setPwdHint] = useState<string | null>(null)

  useEffect(() => {
    setPrefs(loadNotificationPrefs())
  }, [])

  const setPref = (patch: Partial<NotificationPrefs>) => {
    const next = { ...prefs, ...patch }
    setPrefs(next)
    saveNotificationPrefs(next)
  }

  const handleUpdatePassword = () => {
    setPwdHint(t('profileSettings.passwordMockHint'))
    window.setTimeout(() => setPwdHint(null), 4000)
  }

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

      {pwdHint ? <p className="page-muted">{pwdHint}</p> : null}

      <div className="stack-form">
        <fieldset className="fieldset-card">
          <legend>{t('profileSettings.notifications')}</legend>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={prefs.priceAlerts}
              onChange={(e) => setPref({ priceAlerts: e.target.checked })}
            />
            {t('profileSettings.priceAlerts')}
          </label>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={prefs.tripReminders}
              onChange={(e) => setPref({ tripReminders: e.target.checked })}
            />
            {t('profileSettings.tripReminders')}
          </label>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={prefs.promotions}
              onChange={(e) => setPref({ promotions: e.target.checked })}
            />
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
          <button type="button" className="secondary-button" onClick={handleUpdatePassword}>
            {t('profileSettings.updatePassword')}
          </button>
        </fieldset>
      </div>
    </section>
  )
}

export default ProfileSettingsPage
