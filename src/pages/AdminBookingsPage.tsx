// Admin: bookings / orders — search API, change status, delete order.
import { useCallback, useEffect, useState } from 'react'
import { adminService, orderAdminService, toApiError } from '../api/index.ts'
import { useAuth } from '../context/AuthContext.tsx'
import type { MockAdminBooking } from '../data/mockAdmin.ts'

const STATUS_OPTIONS = ['Pending', 'Paid', 'Cancelled', 'Delivered', 'Refunded'] as const

function AdminBookingsPage() {
  const { role } = useAuth()
  const canDeleteOrder = role === 'admin'
  const [query, setQuery] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [selected, setSelected] = useState<MockAdminBooking | null>(null)
  const [rows, setRows] = useState<MockAdminBooking[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const bookings = await adminService.getBookings({ query, dateFrom, dateTo })
      setRows(bookings)
    } catch (e) {
      setError(toApiError(e).message)
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [query, dateFrom, dateTo])

  useEffect(() => {
    const t = window.setTimeout(() => {
      void fetchBookings()
    }, 300)
    return () => window.clearTimeout(t)
  }, [fetchBookings])

  const changeStatus = async (b: MockAdminBooking, status: string) => {
    if (b.orderId == null) {
      setError('This row has no order id (mock data).')
      return
    }
    setError(null)
    try {
      await orderAdminService.updateStatus(b.orderId, status)
      await fetchBookings()
    } catch (e) {
      setError(toApiError(e).message)
    }
  }

  const removeBooking = async (b: MockAdminBooking) => {
    if (b.orderId == null) {
      setError('Cannot delete mock booking without order id.')
      return
    }
    if (!window.confirm(`Delete order #${b.orderId} (${b.ref})?`)) return
    setError(null)
    try {
      await orderAdminService.remove(b.orderId)
      if (selected?.orderId === b.orderId) setSelected(null)
      await fetchBookings()
    } catch (e) {
      setError(toApiError(e).message)
    }
  }

  return (
    <>
      <header className="page-header">
        <h2 className="page-title" style={{ fontSize: '1.35rem' }}>
          Bookings
        </h2>
        <p className="page-lead">
          Search orders by ref, route, customer name or email; delete is Admin-only on the API.
        </p>
      </header>

      {error ? <p className="page-muted">{error}</p> : null}
      {loading ? <p className="page-muted">Loading…</p> : null}

      <div className="admin-toolbar">
        <input
          type="search"
          className="search-input-wide"
          placeholder="Ref, route, name or email…"
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
        <button type="button" className="ghost-button" onClick={() => void fetchBookings()}>
          Refresh
        </button>
      </div>

      {selected ? (
        <p className="page-muted">
          Order <strong>{selected.ref}</strong>
          {selected.orderId != null ? ` (id ${selected.orderId})` : ''} — {selected.route}. Guest:{' '}
          <strong>{selected.customerFirstName ?? '—'}</strong>,{' '}
          <strong>{selected.customerEmail ?? '—'}</strong>.{' '}
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
              <th>Guest</th>
              <th>Email</th>
              <th>Route</th>
              <th>Created</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.orderId ?? b.ref}>
                <td>{b.ref}</td>
                <td>{b.customerFirstName ?? '—'}</td>
                <td>{b.customerEmail ?? '—'}</td>
                <td>{b.route}</td>
                <td>{b.created}</td>
                <td>
                  <span
                    className={`badge ${b.status === 'Paid' ? 'success' : b.status === 'Cancelled' ? '' : ''}`}
                  >
                    {b.status}
                  </span>
                </td>
                <td>
                  <button type="button" className="text-button" onClick={() => setSelected(b)}>
                    Select
                  </button>{' '}
                  <select
                    aria-label={`Status for ${b.ref}`}
                    value={STATUS_OPTIONS.includes(b.status as (typeof STATUS_OPTIONS)[number]) ? b.status : 'Pending'}
                    onChange={(e) => void changeStatus(b, e.target.value)}
                    disabled={b.orderId == null}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {canDeleteOrder ? (
                    <>
                      {' '}
                      <button
                        type="button"
                        className="text-button"
                        onClick={() => void removeBooking(b)}
                        disabled={b.orderId == null}
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

export default AdminBookingsPage
