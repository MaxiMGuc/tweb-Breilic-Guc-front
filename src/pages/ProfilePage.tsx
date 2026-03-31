// Профиль пользователя.
import { Link } from 'react-router-dom'

function ProfilePage() {
  return (
    <section className="page-shell" aria-label="Profile">
      <header className="page-header">
        <h1 className="page-title">Profile</h1>
        <p className="page-lead">Manage your personal information and preferences.</p>
      </header>

      <div className="profile-layout">
        <nav className="profile-nav" aria-label="Profile sections">
          <Link to="/profile/settings" className="profile-nav-link">
            Settings
          </Link>
          <Link to="/profile/history" className="profile-nav-link">
            Search history
          </Link>
        </nav>

        <div className="fieldset-card">
          <h2>Personal info</h2>
          <div className="form-grid-2">
            <label className="field-block">
              <span>Display name</span>
              <input type="text" />
            </label>
            <label className="field-block">
              <span>Phone</span>
              <input type="tel" />
            </label>
            <label className="field-block">
              <span>Preferred currency</span>
              <select defaultValue="USD">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </label>
            <label className="field-block">
              <span>Language</span>
              <select defaultValue="en">
                <option value="en">English</option>
                <option value="ru">Русский</option>
              </select>
            </label>
          </div>
          <button type="button" className="primary-button">
            Save changes
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
