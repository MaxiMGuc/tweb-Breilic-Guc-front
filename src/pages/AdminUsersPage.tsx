// Admin: users from API; delete account (admin only on backend).
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  adminService,
  deleteUser,
  setUserActive,
  setUserRole,
  toApiError,
} from '../api/index.ts'
import type { StaffRole } from '../api/contracts.ts'
import { useAuth } from '../context/AuthContext.tsx'
import type { MockAdminUser } from '../data/mockAdmin.ts'

function roleLabel(r: MockAdminUser['role']): string {
  if (r === 'admin') return 'Admin'
  if (r === 'manager') return 'Manager'
  return 'User'
}

function roleToStaffRole(r: MockAdminUser['role']): StaffRole {
  if (r === 'admin') return 30
  if (r === 'manager') return 20
  return 1
}

function AdminUsersPage() {
  const { user, role: authRole } = useAuth()
  const canManageUsers = authRole === 'admin'
  const [query, setQuery] = useState('')
  const [role, setRole] = useState<'all' | 'user' | 'admin' | 'manager'>('all')
  const [accountFilter, setAccountFilter] = useState<'all' | 'active' | 'blocked'>('all')
  const [selected, setSelected] = useState<MockAdminUser | null>(null)
  const [users, setUsers] = useState<MockAdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [roleBusyId, setRoleBusyId] = useState<string | null>(null)
  const [activeBusyId, setActiveBusyId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const rows = await adminService.getUsers()
      setUsers(rows)
    } catch (e) {
      setError(toApiError(e).message)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const rows = useMemo(() => {
    let list = users
    if (role !== 'all') list = list.filter((u) => u.role === role)
    if (accountFilter === 'active') list = list.filter((u) => u.isActive)
    if (accountFilter === 'blocked') list = list.filter((u) => !u.isActive)
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (u) =>
          u.email.toLowerCase().includes(q) ||
          (u.username ?? '').toLowerCase().includes(q) ||
          u.id.toLowerCase().includes(q),
      )
    }
    return list
  }, [query, role, accountFilter, users])

  const handleDelete = async (u: MockAdminUser) => {
    if (u.id === user?.id) {
      setError('You cannot delete your own account while logged in.')
      return
    }
    if (!window.confirm(`Delete user ${u.email} (id ${u.id})?`)) return
    setError(null)
    try {
      await deleteUser(Number(u.id))
      setSelected(null)
      await load()
    } catch (e) {
      setError(toApiError(e).message)
    }
  }

  const handleRoleChange = async (u: MockAdminUser, nextRole: MockAdminUser['role']) => {
    if (u.role === nextRole) return
    if (u.id === user?.id) {
      setError('You cannot change your own role.')
      return
    }
    setError(null)
    setRoleBusyId(u.id)
    try {
      await setUserRole(Number(u.id), { role: roleToStaffRole(nextRole) })
      if (selected?.id === u.id) {
        setSelected({ ...u, role: nextRole })
      }
      await load()
    } catch (e) {
      setError(toApiError(e).message)
    } finally {
      setRoleBusyId(null)
    }
  }

  const handleActiveToggle = async (u: MockAdminUser, nextActive: boolean) => {
    if (u.isActive === nextActive) return
    if (u.id === user?.id) {
      setError('You cannot block or unblock your own account.')
      return
    }
    setError(null)
    setActiveBusyId(u.id)
    try {
      await setUserActive(Number(u.id), nextActive)
      await load()
    } catch (e) {
      setError(toApiError(e).message)
    } finally {
      setActiveBusyId(null)
    }
  }

  return (
    <>
      <header className="page-header">
        <h2 className="page-title" style={{ fontSize: '1.35rem' }}>
          Users
        </h2>
        <p className="page-lead">
          Blocked accounts cannot log in. Admins can assign roles, block/unblock, or permanently delete users (not
          themselves).
        </p>
      </header>

      {error ? <p className="page-muted">{error}</p> : null}
      {loading ? <p className="page-muted">Loading…</p> : null}

      <div className="admin-toolbar">
        <input
          type="search"
          className="search-input-wide"
          placeholder="Email, username, or id…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Filter users"
        />
        <label className="field-inline">
          <span>Role</span>
          <select value={role} onChange={(e) => setRole(e.target.value as typeof role)}>
            <option value="all">All</option>
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <label className="field-inline">
          <span>Account</span>
          <select
            value={accountFilter}
            onChange={(e) => setAccountFilter(e.target.value as typeof accountFilter)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </label>
        <button type="button" className="ghost-button" onClick={() => void load()}>
          Refresh
        </button>
      </div>

      {selected ? (
        <p className="page-muted">
          Selected: {selected.email} ({roleLabel(selected.role)}, id {selected.id}).{' '}
          <button type="button" className="text-button" onClick={() => setSelected(null)}>
            Clear
          </button>
        </p>
      ) : null}

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Username</th>
              <th>Registered</th>
              <th>Role</th>
              <th>Account</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && !loading ? (
              <tr>
                <td colSpan={7} className="page-muted">
                  No users match the filters.
                </td>
              </tr>
            ) : null}
            {rows.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.email}</td>
                <td>{u.username ?? '—'}</td>
                <td>{u.registered}</td>
                <td>
                  {canManageUsers && u.id !== user?.id ? (
                    <select
                      aria-label={`Role for ${u.email}`}
                      value={u.role}
                      disabled={roleBusyId === u.id}
                      onChange={(e) =>
                        void handleRoleChange(u, e.target.value as MockAdminUser['role'])
                      }
                    >
                      <option value="user">User</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    roleLabel(u.role)
                  )}
                </td>
                <td>
                  <span className={u.isActive ? 'badge success' : 'badge'}>
                    {u.isActive ? 'Active' : 'Blocked'}
                  </span>
                  {canManageUsers && u.id !== user?.id ? (
                    <>
                      {' '}
                      <button
                        type="button"
                        className="text-button"
                        disabled={activeBusyId === u.id}
                        onClick={() => void handleActiveToggle(u, !u.isActive)}
                      >
                        {u.isActive ? 'Block' : 'Unblock'}
                      </button>
                    </>
                  ) : null}
                </td>
                <td>
                  <button type="button" className="text-button" onClick={() => setSelected(u)}>
                    View
                  </button>
                  {canManageUsers ? (
                    <>
                      {' '}
                      <button
                        type="button"
                        className="text-button"
                        onClick={() => void handleDelete(u)}
                        disabled={u.id === user?.id}
                      >
                        Delete
                      </button>
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminUsersPage
