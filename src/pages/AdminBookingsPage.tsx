// Админ: бронирования — фильтры и превью Open.
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { adminService } from '../api/index.ts'
import type { MockAdminBooking } from '../data/mockAdmin.ts'

function AdminBookingsPage() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [selected, setSelected] = useState<MockAdminBooking | null>(null)
  const [rows, setRows] = useState<MockAdminBooking[]>([])

  useEffect(() => {
    const controller = new AbortController()
    adminService
      .getBookings({ query, dateFrom, dateTo }, controller.signal)
      .then((bookings) => setRows(bookings))
      .catch(() => setRows([]))
    return () => controller.abort()
  }, [dateFrom, dateTo, query])

  return (
    <section className="page-shell page-admin" aria-label={t('adminBookings.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('adminBookings.title')}</h1>
        <p className="page-lead">{t('adminBookings.lead')}</p>
      </header>

      <div className="admin-toolbar">
        <input
          type="search"
          className="search-input-wide"
          placeholder={t('adminBookings.searchPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={t('adminBookings.filterAria')}
        />
        <label className="field-inline">
          <span>{t('adminBookings.dateFrom')}</span>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
        </label>
        <label className="field-inline">
          <span>{t('adminBookings.dateTo')}</span>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
        </label>
      </div>

      {selected ? (
        <p className="page-muted">
          {t('adminBookings.previewLine', { ref: selected.ref })}{' '}
          <button type="button" className="text-button" onClick={() => setSelected(null)}>
            {t('adminBookings.clearPreview')}
          </button>
        </p>
      ) : null}

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
            {rows.map((b) => (
              <tr key={b.ref}>
                <td>{b.ref}</td>
                <td>{b.route}</td>
                <td>{b.created}</td>
                <td>
                  <span
                    className={`badge ${b.status === 'Paid' ? 'success' : b.status === 'Pending' ? '' : ''}`}
                  >
                    {b.status}
                  </span>
                </td>
                <td>
                  <button type="button" className="text-button" onClick={() => setSelected(b)}>
                    {t('adminBookings.open')}
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

export default AdminBookingsPage
