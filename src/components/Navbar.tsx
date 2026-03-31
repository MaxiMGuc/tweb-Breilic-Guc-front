// Верхняя панель навигации: ссылки по структуре проекта, выпадающие меню без бизнес-логики.
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="topbar">
      <NavLink to="/" className="brand" aria-label="Go to home page">
        Aviasales
      </NavLink>

      <nav className="topbar-menu" aria-label="Main services">
        <details className="nav-dropdown">
          <summary className="nav-dropdown-trigger">Flights</summary>
          <div className="nav-dropdown-panel" role="menu">
            <NavLink to="/search" className="nav-dropdown-link" role="menuitem">
              Search tickets
            </NavLink>
            <NavLink to="/search/results" className="nav-dropdown-link" role="menuitem">
              Search results
            </NavLink>
          </div>
        </details>

        <details className="nav-dropdown">
          <summary className="nav-dropdown-trigger">Booking</summary>
          <div className="nav-dropdown-panel" role="menu">
            <NavLink to="/booking" className="nav-dropdown-link" role="menuitem">
              Overview
            </NavLink>
            <NavLink to="/booking/passengers" className="nav-dropdown-link" role="menuitem">
              Passengers
            </NavLink>
            <NavLink to="/booking/payment" className="nav-dropdown-link" role="menuitem">
              Payment
            </NavLink>
            <NavLink to="/booking/success" className="nav-dropdown-link" role="menuitem">
              Success
            </NavLink>
          </div>
        </details>

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

        <details className="nav-dropdown">
          <summary className="nav-dropdown-trigger">Help</summary>
          <div className="nav-dropdown-panel" role="menu">
            <NavLink to="/help" className="nav-dropdown-link" role="menuitem">
              Help center
            </NavLink>
            <NavLink to="/help/faq" className="nav-dropdown-link" role="menuitem">
              FAQ
            </NavLink>
            <NavLink to="/help/support" className="nav-dropdown-link" role="menuitem">
              Support
            </NavLink>
          </div>
        </details>

        <details className="nav-dropdown">
          <summary className="nav-dropdown-trigger">Account</summary>
          <div className="nav-dropdown-panel" role="menu">
            <NavLink to="/profile" className="nav-dropdown-link" role="menuitem">
              Profile
            </NavLink>
            <NavLink to="/profile/settings" className="nav-dropdown-link" role="menuitem">
              Settings
            </NavLink>
            <NavLink to="/profile/history" className="nav-dropdown-link" role="menuitem">
              History
            </NavLink>
            <NavLink to="/auth/login" className="nav-dropdown-link" role="menuitem">
              Log in
            </NavLink>
            <NavLink to="/auth/register" className="nav-dropdown-link" role="menuitem">
              Register
            </NavLink>
          </div>
        </details>

        <details className="nav-dropdown">
          <summary className="nav-dropdown-trigger">Admin</summary>
          <div className="nav-dropdown-panel" role="menu">
            <NavLink to="/admin/flights" className="nav-dropdown-link" role="menuitem">
              Flights
            </NavLink>
            <NavLink to="/admin/users" className="nav-dropdown-link" role="menuitem">
              Users
            </NavLink>
            <NavLink to="/admin/bookings" className="nav-dropdown-link" role="menuitem">
              Bookings
            </NavLink>
          </div>
        </details>
      </nav>

      <div className="topbar-actions">
        <NavLink to="/auth/login" className="ghost-button">
          Log in
        </NavLink>
        <NavLink to="/auth/register" className="primary-outline-button">
          Sign up
        </NavLink>
      </div>
    </header>
  )
}

export default Navbar
