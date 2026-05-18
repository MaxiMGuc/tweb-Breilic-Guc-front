// Общая оболочка раздела помощи: боковое меню и вложенные страницы.
import { NavLink, Outlet } from 'react-router-dom'

function HelpLayout() {
  return (
    <div className="help-layout">
      <aside className="help-sidebar" aria-label="Help section navigation">
        <nav className="help-sidebar-nav">
          <NavLink to="/help" end className={({ isActive }) => `help-sidebar-link ${isActive ? 'active' : ''}`}>
            Help center
          </NavLink>
          <NavLink to="/help/faq" className={({ isActive }) => `help-sidebar-link ${isActive ? 'active' : ''}`}>
            FAQ
          </NavLink>
          <NavLink to="/help/support" className={({ isActive }) => `help-sidebar-link ${isActive ? 'active' : ''}`}>
            Support
          </NavLink>
        </nav>
      </aside>
      <div className="help-layout-main">
        <Outlet />
      </div>
    </div>
  )
}

export default HelpLayout
