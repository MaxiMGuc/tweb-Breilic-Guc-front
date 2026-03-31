// Админ: пользователи — поиск, фильтр роли, превью «View» (T56, T57).
import { useMemo, useState } from 'react'
import { MOCK_ADMIN_USERS, type MockAdminUser } from '../data/mockAdmin.ts'

function AdminUsersPage() {
  const [query, setQuery] = useState('')
  const [role, setRole] = useState<'all' | 'user' | 'admin'>('all')
  const [selected, setSelected] = useState<MockAdminUser | null>(null)

  const rows = useMemo(() => {
    let list = MOCK_ADMIN_USERS
    if (role !== 'all') list = list.filter((u) => u.role === role)
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter((u) => u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q))
    }
    return list
  }, [query, role])

  return (
    <section className="page-shell page-admin" aria-label="Admin users">
      <header className="page-header">
        <h1 className="page-title">Admin · Users</h1>
        <p className="page-lead">Search and moderate user accounts (mock table).</p>
      </header>

      <div className="admin-toolbar">
        <input
          type="search"
          className="search-input-wide"
          placeholder="Email or user ID…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Filter users"
        />
        <label className="field-inline">
          <span>Role</span>
          <select value={role} onChange={(e) => setRole(e.target.value as typeof role)}>
            <option value="all">All</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
      </div>

      {selected ? (
        <p className="page-muted">
          Preview: {selected.email} ({selected.role}) — full profile would load from API.{' '}
          <button type="button" className="text-button" onClick={() => setSelected(null)}>
            Clear
          </button>
        </p>
      ) : null}

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Registered</th>
              <th>Role</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>{u.registered}</td>
                <td>{u.role === 'admin' ? 'Admin' : 'User'}</td>
                <td>
                  <button type="button" className="text-button" onClick={() => setSelected(u)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AdminUsersPage
