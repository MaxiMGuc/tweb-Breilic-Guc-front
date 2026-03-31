// Админ: бронирования.
function AdminBookingsPage() {
  return (
    <section className="page-shell page-admin" aria-label="Admin bookings">
      <header className="page-header">
        <h1 className="page-title">Admin · Bookings</h1>
        <p className="page-lead">Inspect and assist with reservations.</p>
      </header>

      <div className="admin-toolbar">
        <input type="search" className="search-input-wide" placeholder="PNR or booking ref…" />
        <label className="field-inline">
          <span>Date from</span>
          <input type="date" />
        </label>
        <label className="field-inline">
          <span>Date to</span>
          <input type="date" />
        </label>
      </div>

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
            <tr>
              <td>ABC123</td>
              <td>Moscow → Istanbul</td>
              <td>2025-03-20</td>
              <td>
                <span className="badge success">Paid</span>
              </td>
              <td>
                <button type="button" className="text-button">
                  Open
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
