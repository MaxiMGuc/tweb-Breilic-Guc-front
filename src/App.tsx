// Основной layout приложения: отображает шапку с навигацией по вкладкам и контейнер текущей страницы.
import './App.css'
import { NavLink, Outlet } from 'react-router-dom'

// Компонент-оболочка для всех страниц, подключенных через роутер.
function App() {
  return (
    <main className="app">
      <header className="topbar">
        <NavLink to="/" className="brand" aria-label="Go to home page">
          Aviasales
        </NavLink>
        <nav className="topbar-menu" aria-label="Main services">
          <NavLink to="/" end className={({ isActive }) => `service-link ${isActive ? 'active' : ''}`}>
            Flights
          </NavLink>
          <NavLink to="/hotels" className={({ isActive }) => `service-link ${isActive ? 'active' : ''}`}>
            Hotels
          </NavLink>
          <NavLink to="/shorts" className={({ isActive }) => `service-link ${isActive ? 'active' : ''}`}>
            Shorts
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => `service-link ${isActive ? 'active' : ''}`}
          >
            Favorites
          </NavLink>
        </nav>
        <nav className="topbar-actions" aria-label="Page navigation">
          <NavLink to="/" end className={({ isActive }) => `tab-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/help" className={({ isActive }) => `tab-link ${isActive ? 'active' : ''}`}>
            Help
          </NavLink>
          <button type="button" className="signin-button">
            Sign in
          </button>
        </nav>
      </header>
      <Outlet />
    </main>
  )
}

export default App
