// Профиль: персональные данные в localStorage (T40).
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadProfile, saveProfile, type ProfileData } from '../utils/profileStorage.ts'

function ProfilePage() {
  const [data, setData] = useState<ProfileData>(() => loadProfile())
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setData(loadProfile())
  }, [])

  const update = (patch: Partial<ProfileData>) => {
    setData((d) => ({ ...d, ...patch }))
    setSaved(false)
  }

  const handleSave = () => {
    saveProfile(data)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2500)
  }

  return (
    <section className="page-shell" aria-label="Profile">
      <header className="page-header">
        <h1 className="page-title">Profile</h1>
        <p className="page-lead">Manage your personal information and preferences.</p>
      </header>

      {saved ? <p className="page-muted">Changes saved on this device.</p> : null}

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
              <input
                type="text"
                value={data.displayName}
                onChange={(e) => update({ displayName: e.target.value })}
              />
            </label>
            <label className="field-block">
              <span>Phone</span>
              <input type="tel" value={data.phone} onChange={(e) => update({ phone: e.target.value })} />
            </label>
            <label className="field-block">
              <span>Preferred currency</span>
              <select value={data.currency} onChange={(e) => update({ currency: e.target.value })}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </label>
            <label className="field-block">
              <span>Language</span>
              <select value={data.language} onChange={(e) => update({ language: e.target.value })}>
                <option value="en">English</option>
                <option value="ru">Русский</option>
              </select>
            </label>
          </div>
          <button type="button" className="primary-button" onClick={handleSave}>
            Save changes
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
