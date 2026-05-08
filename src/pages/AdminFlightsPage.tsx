// Админ: рейсы — клиентский поиск по мок-таблице (T53).
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
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
    <section className="page-shell page-admin" aria-label={t('adminFlights.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('adminFlights.title')}</h1>
        <p className="page-lead">{t('adminFlights.lead')}</p>
      </header>

      <div className="admin-toolbar">
        <input
          type="search"
          className="search-input-wide"
          placeholder={t('adminFlights.searchPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={t('adminFlights.filterAria')}
        />
        <button type="button" className="primary-button">
          {t('adminFlights.addFlight')}
        </button>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>{t('adminFlights.colFlight')}</th>
              <th>{t('adminFlights.colRoute')}</th>
              <th>{t('adminFlights.colDeparture')}</th>
              <th>{t('adminFlights.colStatus')}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="page-muted">
                  {t('adminFlights.noMatches', { query })}
                </td>
              </tr>
            ) : null}
            {rows.map((row) => (
              <tr key={row.flight}>
                <td>{row.flight}</td>
                <td>{row.route}</td>
                <td>{row.departure}</td>
                <td>
                  <span className="badge">{t('adminFlights.scheduled')}</span>
                </td>
                <td>
                  <button type="button" className="text-button">
                    {t('adminFlights.edit')}
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
