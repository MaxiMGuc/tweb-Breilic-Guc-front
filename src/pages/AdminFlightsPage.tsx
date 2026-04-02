// Админ: рейсы — клиентский поиск по мок-таблице (T53).
import { useMemo, useState } from 'react'

type FlightRow = {
  flight: string
  route: string
  departure: string
  status: string
}

const MOCK_ROWS: FlightRow[] = [
  { flight: 'XY101', route: 'SVO → IST', departure: '28 Mar 08:40', status: 'Scheduled' },
  { flight: 'XY202', route: 'IST → SVO', departure: '2 Apr 18:10', status: 'Scheduled' },
  { flight: 'XY303', route: 'DME → AYT', departure: '10 Apr 11:05', status: 'Scheduled' },
]

function AdminFlightsPage() {
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return MOCK_ROWS
    return MOCK_ROWS.filter(
      (r) =>
        r.flight.toLowerCase().includes(q) ||
        r.route.toLowerCase().includes(q) ||
        r.departure.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <section className="page-shell page-admin" aria-label="Admin flights">
      <header className="page-header">
        <h1 className="page-title">Admin · Flights</h1>
        <p className="page-lead">Manage flight records and schedules.</p>
      </header>

      <div className="admin-toolbar">
        <input
          type="search"
          className="search-input-wide"
          placeholder="Search by flight number…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Filter flights"
        />
        <button type="button" className="primary-button">
          Add flight
        </button>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Flight</th>
              <th>Route</th>
              <th>Departure</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="page-muted">
                  No flights match “{query}”.
                </td>
              </tr>
            ) : null}
            {rows.map((row) => (
              <tr key={row.flight}>
                <td>{row.flight}</td>
                <td>{row.route}</td>
                <td>{row.departure}</td>
                <td>
                  <span className="badge">{row.status}</span>
                </td>
                <td>
                  <button type="button" className="text-button">
                    Edit
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

export default AdminFlightsPage
