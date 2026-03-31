// Верхняя панель навигации: выпадающие меню с единовременно одним открытым блоком (T01),
// mock-auth для видимости пунктов (T02–T04).
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'

type MenuId = 'flights' | 'booking' | 'help' | 'account' | 'admin'

function Navbar() {
  const { isAuthenticated, logout } = useAuth()
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
      <NavLink to="/" className="brand" aria-label="Go to home page">
        Aviasales
      </NavLink>

      <nav ref={navRef} className="topbar-menu" aria-label="Main services">
        {dropdown(
          'flights',
          'Flights',
          <>
            <NavLink to="/search" className="nav-dropdown-link" role="menuitem" onClick={closeMenus}>
              Search tickets
            </NavLink>
            <NavLink
              to="/search/results"
              className="nav-dropdown-link"
              role="menuitem"
              onClick={closeMenus}
            >
              Search results
            </NavLink>
          </>,
        )}

        {dropdown(
          'booking',
          'Booking',
          <>
            <NavLink to="/booking" className="nav-dropdown-link" role="menuitem" onClick={closeMenus}>
              Overview
            </NavLink>
            <NavLink
              to="/booking/passengers"
              className="nav-dropdown-link"
              role="menuitem"
              onClick={closeMenus}
            >
              Passengers
            </NavLink>
            <NavLink
              to="/booking/payment"
              className="nav-dropdown-link"
              role="menuitem"
              onClick={closeMenus}
            >
              Payment
            </NavLink>
            <NavLink
              to="/booking/success"
              className="nav-dropdown-link"
              role="menuitem"
              onClick={closeMenus}
            >
              Success
            </NavLink>
          </>,
        )}

        <NavLink
          to="/my-trips"
          className={({ isActive }) => `service-link ${isActive ? 'active' : ''}`}
        >
          My trips
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => `service-link ${isActive ? 'active' : ''}`}
        >
          Favorites
        </NavLink>

        {dropdown(
          'help',
          'Help',
          <>
            <NavLink to="/help" className="nav-dropdown-link" role="menuitem" onClick={closeMenus}>
              Help center
            </NavLink>
            <NavLink to="/help/faq" className="nav-dropdown-link" role="menuitem" onClick={closeMenus}>
              FAQ
            </NavLink>
            <NavLink
              to="/help/support"
              className="nav-dropdown-link"
              role="menuitem"
              onClick={closeMenus}
            >
              Support
            </NavLink>
          </>,
        )}

        {dropdown(
          'account',
          'Account',
          <>
            <NavLink to="/profile" className="nav-dropdown-link" role="menuitem" onClick={closeMenus}>
              Profile
            </NavLink>
            <NavLink
              to="/profile/settings"
              className="nav-dropdown-link"
              role="menuitem"
              onClick={closeMenus}
            >
              Settings
            </NavLink>
            <NavLink
              to="/profile/history"
              className="nav-dropdown-link"
              role="menuitem"
              onClick={closeMenus}
            >
              History
            </NavLink>
            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/auth/login"
                  className="nav-dropdown-link"
                  role="menuitem"
                  onClick={closeMenus}
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/auth/register"
                  className="nav-dropdown-link"
                  role="menuitem"
                  onClick={closeMenus}
                >
                  Register
                </NavLink>
              </>
            ) : null}
          </>,
        )}

        {dropdown(
          'admin',
          'Admin',
          <>
            <NavLink
              to="/admin/flights"
              className="nav-dropdown-link"
              role="menuitem"
              onClick={closeMenus}
            >
              Flights
            </NavLink>
            <NavLink
              to="/admin/users"
              className="nav-dropdown-link"
              role="menuitem"
              onClick={closeMenus}
            >
              Users
            </NavLink>
            <NavLink
              to="/admin/bookings"
              className="nav-dropdown-link"
              role="menuitem"
              onClick={closeMenus}
            >
              Bookings
            </NavLink>
          </>,
        )}
      </nav>

      <div className="topbar-actions">
        {isAuthenticated ? (
          <>
            <NavLink to="/profile" className="ghost-button">
              Profile
            </NavLink>
            <button type="button" className="primary-outline-button" onClick={() => logout()}>
              Log out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/auth/login" className="ghost-button">
              Log in
            </NavLink>
            <NavLink to="/auth/register" className="primary-outline-button">
              Sign up
            </NavLink>
          </>
        )}
      </div>
    </header>
  )
}

export default Navbar
