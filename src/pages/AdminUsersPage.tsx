// Админ: пользователи.
function AdminUsersPage() {
  return (
    <section className="page-shell page-admin" aria-label="Admin users">
      <header className="page-header">
        <h1 className="page-title">Admin · Users</h1>
        <p className="page-lead">Search and moderate user accounts.</p>
      </header>

      <div className="admin-toolbar">
        <input type="search" className="search-input-wide" placeholder="Email or user ID…" />
        <label className="field-inline">
          <span>Role</span>
          <select defaultValue="all">
            <option value="all">All</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Registered</th>
              <th>Role</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>user@example.com</td>
              <td>2025-01-12</td>
              <td>User</td>
              <td>
                <button type="button" className="text-button">
                  View
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
