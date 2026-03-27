// Админ: рейсы (заглушка UI).
function AdminFlightsPage() {
  return (
    <section className="page-shell page-admin" aria-label="Admin flights">
      <header className="page-header">
        <h1 className="page-title">Admin · Flights</h1>
        <p className="page-lead">Manage flight records and schedules.</p>
      </header>

      <div className="admin-toolbar">
        <input type="search" className="search-input-wide" placeholder="Search by flight number…" />
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
            <tr>
              <td>XY101</td>
              <td>SVO → IST</td>
              <td>28 Mar 08:40</td>
              <td>
                <span className="badge">Scheduled</span>
              </td>
              <td>
                <button type="button" className="text-button">
                  Edit
                </button>
              </td>
            </tr>
            <tr>
              <td>XY202</td>
              <td>IST → SVO</td>
              <td>2 Apr 18:10</td>
              <td>
                <span className="badge">Scheduled</span>
              </td>
              <td>
                <button type="button" className="text-button">
                  Edit
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
