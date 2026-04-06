// Верхняя панель навигации: ссылки по структуре проекта, выпадающие меню без бизнес-логики.
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'

function Navbar() {
  const { t } = useTranslation()

  return (
    <header className="topbar">
      <NavLink to="/" className="brand" aria-label={t('nav.brandAria')}>
        {t('nav.brand')}
      </NavLink>

      <nav className="topbar-menu" aria-label="Main services">
        <details className="nav-dropdown">
          <summary className="nav-dropdown-trigger">{t('nav.flights')}</summary>
          <div className="nav-dropdown-panel" role="menu">
            <NavLink to="/search" className="nav-dropdown-link" role="menuitem">
              {t('nav.searchTickets')}
            </NavLink>
            <NavLink to="/search/results" className="nav-dropdown-link" role="menuitem">
              {t('nav.searchResults')}
            </NavLink>
          </div>
        </details>

        <details className="nav-dropdown">
          <summary className="nav-dropdown-trigger">{t('nav.booking')}</summary>
          <div className="nav-dropdown-panel" role="menu">
            <NavLink to="/booking" className="nav-dropdown-link" role="menuitem">
              {t('nav.overview')}
            </NavLink>
            <NavLink to="/booking/passengers" className="nav-dropdown-link" role="menuitem">
              {t('nav.passengers')}
            </NavLink>
            <NavLink to="/booking/payment" className="nav-dropdown-link" role="menuitem">
              {t('nav.payment')}
            </NavLink>
            <NavLink to="/booking/success" className="nav-dropdown-link" role="menuitem">
              {t('nav.success')}
            </NavLink>
          </div>
        </details>

        <NavLink
          to="/my-trips"
          className={({ isActive }) => `service-link ${isActive ? 'active' : ''}`}
        >
          {t('nav.myTrips')}
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => `service-link ${isActive ? 'active' : ''}`}
        >
          {t('nav.favorites')}
        </NavLink>

        <details className="nav-dropdown">
          <summary className="nav-dropdown-trigger">{t('nav.help')}</summary>
          <div className="nav-dropdown-panel" role="menu">
            <NavLink to="/help" className="nav-dropdown-link" role="menuitem">
              {t('nav.helpCenter')}
            </NavLink>
            <NavLink to="/help/faq" className="nav-dropdown-link" role="menuitem">
              {t('nav.faq')}
            </NavLink>
            <NavLink to="/help/support" className="nav-dropdown-link" role="menuitem">
              {t('nav.support')}
            </NavLink>
          </div>
        </details>

        <details className="nav-dropdown">
          <summary className="nav-dropdown-trigger">{t('nav.account')}</summary>
          <div className="nav-dropdown-panel" role="menu">
            <NavLink to="/profile" className="nav-dropdown-link" role="menuitem">
              {t('nav.profile')}
            </NavLink>
            <NavLink to="/profile/settings" className="nav-dropdown-link" role="menuitem">
              {t('nav.settings')}
            </NavLink>
            <NavLink to="/profile/history" className="nav-dropdown-link" role="menuitem">
              {t('nav.history')}
            </NavLink>
            <NavLink to="/auth/login" className="nav-dropdown-link" role="menuitem">
              {t('nav.logIn')}
            </NavLink>
            <NavLink to="/auth/register" className="nav-dropdown-link" role="menuitem">
              {t('nav.register')}
            </NavLink>
          </div>
        </details>

        <details className="nav-dropdown">
          <summary className="nav-dropdown-trigger">{t('nav.admin')}</summary>
          <div className="nav-dropdown-panel" role="menu">
            <NavLink to="/admin/flights" className="nav-dropdown-link" role="menuitem">
              {t('nav.adminFlights')}
            </NavLink>
            <NavLink to="/admin/users" className="nav-dropdown-link" role="menuitem">
              {t('nav.adminUsers')}
            </NavLink>
            <NavLink to="/admin/bookings" className="nav-dropdown-link" role="menuitem">
              {t('nav.adminBookings')}
            </NavLink>
          </div>
        </details>
      </nav>

      <div className="topbar-actions">
        <LanguageSwitcher />
        <NavLink to="/auth/login" className="ghost-button">
          {t('nav.logIn')}
        </NavLink>
        <NavLink to="/auth/register" className="primary-outline-button">
          {t('nav.signUp')}
        </NavLink>
      </div>
    </header>
  )
}

export default Navbar
