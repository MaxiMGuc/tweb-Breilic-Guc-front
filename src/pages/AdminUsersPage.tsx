// Админ: пользователи — поиск, фильтр роли, превью «View».
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { adminService } from '../api/index.ts'
import type { MockAdminUser } from '../data/mockAdmin.ts'

function AdminUsersPage() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [role, setRole] = useState<'all' | 'user' | 'admin'>('all')
  const [selected, setSelected] = useState<MockAdminUser | null>(null)
  const [users, setUsers] = useState<MockAdminUser[]>([])

  useEffect(() => {
    const controller = new AbortController()
    adminService
      .getUsers(controller.signal)
      .then((rows) => setUsers(rows))
      .catch(() => setUsers([]))
    return () => controller.abort()
  }, [])

  const rows = useMemo(() => {
    let list = users
    if (role !== 'all') list = list.filter((u) => u.role === role)
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter((u) => u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q))
    }
    return list
  }, [query, role, users])

  return (
    <section className="page-shell page-admin" aria-label={t('adminUsers.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('adminUsers.title')}</h1>
        <p className="page-lead">{t('adminUsers.lead')}</p>
      </header>

      <div className="admin-toolbar">
        <input
          type="search"
          className="search-input-wide"
          placeholder={t('adminUsers.searchPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={t('adminUsers.filterAria')}
        />
        <label className="field-inline">
          <span>{t('adminUsers.role')}</span>
          <select value={role} onChange={(e) => setRole(e.target.value as typeof role)}>
            <option value="all">{t('adminUsers.roleAll')}</option>
            <option value="user">{t('adminUsers.roleUser')}</option>
            <option value="admin">{t('adminUsers.roleAdmin')}</option>
          </select>
        </label>
      </div>

      {selected ? (
        <p className="page-muted">
          {t('adminUsers.previewLine', {
            email: selected.email,
            role: selected.role === 'admin' ? t('adminUsers.roleAdmin') : t('adminUsers.roleUser'),
          })}{' '}
          <button type="button" className="text-button" onClick={() => setSelected(null)}>
            {t('adminUsers.clearPreview')}
          </button>
        </p>
      ) : null}

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>{t('adminUsers.colUser')}</th>
              <th>{t('adminUsers.colRegistered')}</th>
              <th>{t('adminUsers.colRole')}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>{u.registered}</td>
                <td>{u.role === 'admin' ? t('adminUsers.roleAdmin') : t('adminUsers.roleUser')}</td>
                <td>
                  <button type="button" className="text-button" onClick={() => setSelected(u)}>
                    {t('adminUsers.view')}
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
