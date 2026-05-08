// Верхняя панель навигации: один открытый выпадающий блок, mock-auth, i18n.
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'
import LanguageSwitcher from './LanguageSwitcher'

type MenuId = 'flights' | 'booking' | 'help' | 'account' | 'admin'

function Navbar() {
  const { t } = useTranslation()
  const { isAuthenticated, role, logout } = useAuth()
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const baseId = useId()

  const closeMenus = useCallback(() => setOpenMenu(null), [])

  const toggleMenu = useCallback((id: MenuId) => {
    setOpenMenu((prev) => (prev === id ? null : id))
  }, [])

  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null)
    }
    document.addEventListener('mousedown', onDocMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const dropdown = (id: MenuId, label: string, children: React.ReactNode) => {
    const expanded = openMenu === id
    const panelId = `${baseId}-${id}-panel`
    return (
      <div className="nav-dropdown">
        <button
          type="button"
          className="nav-dropdown-trigger"
          aria-expanded={expanded}
          aria-controls={panelId}
          id={`${baseId}-${id}-btn`}
          onClick={() => toggleMenu(id)}
        >
          {label}
        </button>
        {expanded ? (
          <div
            id={panelId}
            role="menu"
            className="nav-dropdown-panel"
            aria-labelledby={`${baseId}-${id}-btn`}
          >
            {children}
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <header className="topbar">
      <NavLink to="/" className="brand" aria-label={t('nav.brandAria')}>
        {t('nav.brand')}
      </NavLink>

      <nav ref={navRef} className="topbar-menu" aria-label="Main services">
        {dropdown(
          'flights',
          t('nav.flights'),
          <>
            <NavLink to="/search" className="nav-dropdown-link" role="menuitem" onClick={closeMenus}>
              {t('nav.searchTickets')}
            </NavLink>
            <NavLink
              to="/search/results"
              className="nav-dropdown-link"
              role="menuitem"
              onClick={closeMenus}
            >
              {t('nav.searchResults')}
            </NavLink>
          </>,
        )}

        {dropdown(
          'booking',
          t('nav.booking'),
          <>
            <NavLink to="/booking" className="nav-dropdown-link" role="menuitem" onClick={closeMenus}>
              {t('nav.overview')}
            </NavLink>
            <NavLink
              to="/booking/passengers"
              className="nav-dropdown-link"
              role="menuitem"
              onClick={closeMenus}
            >
              {t('nav.passengers')}
            </NavLink>
            <NavLink
              to="/booking/payment"
              className="nav-dropdown-link"
              role="menuitem"
              onClick={closeMenus}
            >
              {t('nav.payment')}
            </NavLink>
            <NavLink
              to="/booking/success"
              className="nav-dropdown-link"
              role="menuitem"
              onClick={closeMenus}
            >
              {t('nav.success')}
            </NavLink>
          </>,
        )}

        <NavLink
          to="/my-trips"
          className={({ isActive }) => `service-link ${isActive ? 'active' : ''}`}
          onClick={closeMenus}
        >
          {t('nav.myTrips')}
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => `service-link ${isActive ? 'active' : ''}`}
          onClick={closeMenus}
        >
          {t('nav.favorites')}
        </NavLink>

        {dropdown(
          'help',
          t('nav.help'),
          <>
            <NavLink to="/help" className="nav-dropdown-link" role="menuitem" onClick={closeMenus}>
              {t('nav.helpCenter')}
            </NavLink>
            <NavLink to="/help/faq" className="nav-dropdown-link" role="menuitem" onClick={closeMenus}>
              {t('nav.faq')}
            </NavLink>
            <NavLink
              to="/help/support"
              className="nav-dropdown-link"
              role="menuitem"
              onClick={closeMenus}
            >
              {t('nav.support')}
            </NavLink>
          </>,
        )}

        {dropdown(
          'account',
          t('nav.account'),
          <>
            <NavLink to="/account" className="nav-dropdown-link" role="menuitem" onClick={closeMenus}>
              {t('nav.account')}
            </NavLink>
            <NavLink to="/profile" className="nav-dropdown-link" role="menuitem" onClick={closeMenus}>
              {t('nav.profile')}
            </NavLink>
            <NavLink
              to="/profile/settings"
              className="nav-dropdown-link"
              role="menuitem"
              onClick={closeMenus}
            >
              {t('nav.settings')}
            </NavLink>
            <NavLink
              to="/profile/history"
              className="nav-dropdown-link"
              role="menuitem"
              onClick={closeMenus}
            >
              {t('nav.history')}
            </NavLink>
            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/auth/login"
                  className="nav-dropdown-link"
                  role="menuitem"
                  onClick={closeMenus}
                >
                  {t('nav.logIn')}
                </NavLink>
                <NavLink
                  to="/auth/register"
                  className="nav-dropdown-link"
                  role="menuitem"
                  onClick={closeMenus}
                >
                  {t('nav.register')}
                </NavLink>
              </>
            ) : null}
          </>,
        )}

        {isAuthenticated && role === 'admin'
          ? dropdown(
              'admin',
              t('nav.admin'),
              <>
                <NavLink
                  to="/admin/flights"
                  className="nav-dropdown-link"
                  role="menuitem"
                  onClick={closeMenus}
                >
                  {t('nav.adminFlights')}
                </NavLink>
                <NavLink
                  to="/admin/users"
                  className="nav-dropdown-link"
                  role="menuitem"
                  onClick={closeMenus}
                >
                  {t('nav.adminUsers')}
                </NavLink>
                <NavLink
                  to="/admin/bookings"
                  className="nav-dropdown-link"
                  role="menuitem"
                  onClick={closeMenus}
                >
                  {t('nav.adminBookings')}
                </NavLink>
              </>,
            )
          : null}
      </nav>

      <div className="topbar-actions">
        <LanguageSwitcher />
        {isAuthenticated ? (
          <>
            <NavLink to="/profile" className="ghost-button" onClick={closeMenus}>
              {t('nav.profile')}
            </NavLink>
            <button type="button" className="primary-outline-button" onClick={() => logout()}>
              {t('account.logout')}
            </button>
          </>
        ) : (
          <>
            <NavLink to="/auth/login" className="ghost-button" onClick={closeMenus}>
              {t('nav.logIn')}
            </NavLink>
            <NavLink to="/auth/register" className="primary-outline-button" onClick={closeMenus}>
              {t('nav.signUp')}
            </NavLink>
          </>
        )}
      </div>
    </header>
  )
}

export default Navbar
