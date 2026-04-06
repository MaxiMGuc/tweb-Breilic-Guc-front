// Админ: бронирования.
import { useTranslation } from 'react-i18next'

function AdminBookingsPage() {
  const { t } = useTranslation()

  return (
    <section className="page-shell page-admin" aria-label={t('adminBookings.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('adminBookings.title')}</h1>
        <p className="page-lead">{t('adminBookings.lead')}</p>
      </header>

      <div className="admin-toolbar">
        <input type="search" className="search-input-wide" placeholder={t('adminBookings.searchPlaceholder')} />
        <label className="field-inline">
          <span>{t('adminBookings.dateFrom')}</span>
          <input type="date" />
        </label>
        <label className="field-inline">
          <span>{t('adminBookings.dateTo')}</span>
          <input type="date" />
        </label>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>{t('adminBookings.colRef')}</th>
              <th>{t('adminBookings.colRoute')}</th>
              <th>{t('adminBookings.colCreated')}</th>
              <th>{t('adminBookings.colStatus')}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ABC123</td>
              <td>Moscow → Istanbul</td>
              <td>2025-03-20</td>
              <td>
                <span className="badge success">{t('adminBookings.paid')}</span>
              </td>
              <td>
                <button type="button" className="text-button">
                  {t('adminBookings.open')}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AdminBookingsPage
