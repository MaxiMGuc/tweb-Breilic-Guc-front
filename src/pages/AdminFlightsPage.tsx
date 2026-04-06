// Админ: рейсы (заглушка UI).
import { useTranslation } from 'react-i18next'

function AdminFlightsPage() {
  const { t } = useTranslation()

  return (
    <section className="page-shell page-admin" aria-label={t('adminFlights.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('adminFlights.title')}</h1>
        <p className="page-lead">{t('adminFlights.lead')}</p>
      </header>

      <div className="admin-toolbar">
        <input type="search" className="search-input-wide" placeholder={t('adminFlights.searchPlaceholder')} />
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
            <tr>
              <td>XY101</td>
              <td>SVO → IST</td>
              <td>28 Mar 08:40</td>
              <td>
                <span className="badge">{t('adminFlights.scheduled')}</span>
              </td>
              <td>
                <button type="button" className="text-button">
                  {t('adminFlights.edit')}
                </button>
              </td>
            </tr>
            <tr>
              <td>XY202</td>
              <td>IST → SVO</td>
              <td>2 Apr 18:10</td>
              <td>
                <span className="badge">{t('adminFlights.scheduled')}</span>
              </td>
              <td>
                <button type="button" className="text-button">
                  {t('adminFlights.edit')}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AdminFlightsPage
