import { NavLink, Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <section className="page-shell page-admin" aria-label="Admin panel">
      <header className="page-header">
        <h1 className="page-title">Admin panel</h1>
        <p className="page-lead">
          Available to Admin and Manager roles. Admin can block users (cannot log in), hide flights from the catalog,
          delete accounts/products/orders; Managers cannot delete or change catalog/user active state.
        </p>
      </header>

      <nav className="admin-tabs" aria-label="Admin sections">
        <NavLink
          to="/admin/flights"
          className={({ isActive }) => `admin-tab ${isActive ? 'active' : ''}`}
          end
        >
          Products (flights)
        </NavLink>
        <NavLink to="/admin/users" className={({ isActive }) => `admin-tab ${isActive ? 'active' : ''}`}>
          Users
        </NavLink>
        <NavLink to="/admin/bookings" className={({ isActive }) => `admin-tab ${isActive ? 'active' : ''}`}>
          Bookings
        </NavLink>
      </nav>

      <Outlet />
    </section>
  )
}

export default AdminLayout
