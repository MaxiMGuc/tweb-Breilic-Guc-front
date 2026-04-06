// Админ: пользователи.
import { useTranslation } from 'react-i18next'

function AdminUsersPage() {
  const { t } = useTranslation()

  return (
    <section className="page-shell page-admin" aria-label={t('adminUsers.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('adminUsers.title')}</h1>
        <p className="page-lead">{t('adminUsers.lead')}</p>
      </header>

      <div className="admin-toolbar">
        <input type="search" className="search-input-wide" placeholder={t('adminUsers.searchPlaceholder')} />
        <label className="field-inline">
          <span>{t('adminUsers.role')}</span>
          <select defaultValue="all">
            <option value="all">{t('adminUsers.roleAll')}</option>
            <option value="user">{t('adminUsers.roleUser')}</option>
            <option value="admin">{t('adminUsers.roleAdmin')}</option>
          </select>
        </label>
      </div>

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
            <tr>
              <td>user@example.com</td>
              <td>2025-01-12</td>
              <td>{t('adminUsers.roleUser')}</td>
              <td>
                <button type="button" className="text-button">
                  {t('adminUsers.view')}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AdminUsersPage
