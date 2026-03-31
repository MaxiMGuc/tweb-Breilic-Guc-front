// Админ: бронирования — поиск по ref/route, фильтр по датам, превью Open (T58, T59).
import { useMemo, useState } from 'react'
import { MOCK_ADMIN_BOOKINGS, type MockAdminBooking } from '../data/mockAdmin.ts'

function AdminBookingsPage() {
  const [query, setQuery] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [selected, setSelected] = useState<MockAdminBooking | null>(null)

  const rows = useMemo(() => {
    let list = MOCK_ADMIN_BOOKINGS
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter((b) => b.ref.toLowerCase().includes(q) || b.route.toLowerCase().includes(q))
    }
    if (dateFrom) {
      list = list.filter((b) => b.created >= dateFrom)
    }
    if (dateTo) {
      list = list.filter((b) => b.created <= dateTo)
    }
    return list
  }, [query, dateFrom, dateTo])

  return (
    <section className="page-shell page-admin" aria-label="Admin bookings">
      <header className="page-header">
        <h1 className="page-title">Admin · Bookings</h1>
        <p className="page-lead">Inspect and assist with reservations (mock).</p>
      </header>

      <div className="admin-toolbar">
        <input
          type="search"
          className="search-input-wide"
          placeholder="PNR or booking ref…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Filter bookings"
        />
        <label className="field-inline">
          <span>Date from</span>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
        </label>
        <label className="field-inline">
          <span>Date to</span>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
        </label>
      </div>

      {selected ? (
        <p className="page-muted">
          Preview booking <strong>{selected.ref}</strong> — detail view would call API.{' '}
          <button type="button" className="text-button" onClick={() => setSelected(null)}>
            Clear
          </button>
        </p>
      ) : null}

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Ref</th>
              <th>Route</th>
              <th>Created</th>
              <th>Status</th>
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
                    Open
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
