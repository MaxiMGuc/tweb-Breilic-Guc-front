// Настройки профиля: уведомления и безопасность.
import { Link } from 'react-router-dom'

function ProfileSettingsPage() {
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

      <div className="stack-form">
        <fieldset className="fieldset-card">
          <legend>Notifications</legend>
          <label className="checkbox-row">
            <input type="checkbox" defaultChecked />
            Price alerts for saved routes
          </label>
          <label className="checkbox-row">
            <input type="checkbox" defaultChecked />
            Trip reminders by email
          </label>
          <label className="checkbox-row">
            <input type="checkbox" />
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
          <button type="button" className="secondary-button">
            Update password
          </button>
        </fieldset>
      </div>
    </section>
  )
}

export default ProfileSettingsPage
