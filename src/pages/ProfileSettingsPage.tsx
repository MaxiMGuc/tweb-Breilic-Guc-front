// Настройки: уведомления в localStorage; смена пароля — превью (T42, T43).
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadNotificationPrefs, saveNotificationPrefs, type NotificationPrefs } from '../utils/notificationPrefs.ts'

function ProfileSettingsPage() {
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
    setPwdHint('Password update would call the API; nothing was sent (preview).')
    window.setTimeout(() => setPwdHint(null), 4000)
  }

  return (
    <section className="page-shell" aria-label="Profile settings">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/profile">Profile</Link>
        <span aria-hidden="true"> / </span>
        <span>Settings</span>
      </nav>

      <header className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-lead">Notifications, security, and connected accounts.</p>
      </header>

      {pwdHint ? <p className="page-muted">{pwdHint}</p> : null}

      <div className="stack-form">
        <fieldset className="fieldset-card">
          <legend>Notifications</legend>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={prefs.priceAlerts}
              onChange={(e) => setPref({ priceAlerts: e.target.checked })}
            />
            Price alerts for saved routes
          </label>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={prefs.tripReminders}
              onChange={(e) => setPref({ tripReminders: e.target.checked })}
            />
            Trip reminders by email
          </label>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={prefs.promotions}
              onChange={(e) => setPref({ promotions: e.target.checked })}
            />
            Promotions and newsletters
          </label>
        </fieldset>

        <fieldset className="fieldset-card">
          <legend>Security</legend>
          <label className="field-block">
            <span>Current password</span>
            <input type="password" autoComplete="current-password" />
          </label>
          <label className="field-block">
            <span>New password</span>
            <input type="password" autoComplete="new-password" />
          </label>
          <button type="button" className="secondary-button" onClick={handleUpdatePassword}>
            Update password
          </button>
        </fieldset>
      </div>
    </section>
  )
}

export default ProfileSettingsPage
