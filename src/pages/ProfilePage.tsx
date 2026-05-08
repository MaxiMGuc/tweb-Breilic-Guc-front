// Профиль: персональные данные в localStorage.
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { loadProfile, saveProfile, type ProfileData } from '../utils/profileStorage.ts'

function ProfilePage() {
  const { t } = useTranslation()
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
    <section className="page-shell" aria-label={t('profile.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('profile.title')}</h1>
        <p className="page-lead">{t('profile.lead')}</p>
      </header>

      {saved ? <p className="page-muted">{t('profile.savedNotice')}</p> : null}

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
              <input
                type="text"
                value={data.displayName}
                onChange={(e) => update({ displayName: e.target.value })}
              />
            </label>
            <label className="field-block">
              <span>{t('profile.phone')}</span>
              <input type="tel" value={data.phone} onChange={(e) => update({ phone: e.target.value })} />
            </label>
            <label className="field-block">
              <span>{t('profile.preferredCurrency')}</span>
              <select value={data.currency} onChange={(e) => update({ currency: e.target.value })}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </label>
            <label className="field-block">
              <span>{t('profile.language')}</span>
              <select value={data.language} onChange={(e) => update({ language: e.target.value })}>
                <option value="en">{t('profile.langEn')}</option>
                <option value="ru">{t('profile.langRu')}</option>
              </select>
            </label>
          </div>
          <button type="button" className="primary-button" onClick={handleSave}>
            {t('profile.save')}
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
