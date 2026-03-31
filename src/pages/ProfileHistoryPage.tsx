// История поисков в профиле.
import { Link } from 'react-router-dom'

function ProfileHistoryPage() {
  return (
    <section className="page-shell" aria-label="Search history">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/profile">Profile</Link>
        <span aria-hidden="true"> / </span>
        <span>History</span>
      </nav>

      <header className="page-header">
        <h1 className="page-title">Search history</h1>
        <p className="page-lead">Recently viewed routes (placeholder data).</p>
      </header>

      <ul className="history-list">
        <li className="history-item">
          <span>Moscow → Antalya · Apr 2025</span>
          <Link to="/search" className="text-button">
            Repeat search
          </Link>
        </li>
        <li className="history-item">
          <span>Saint Petersburg → Dubai · Jun 2025</span>
          <Link to="/search" className="text-button">
            Repeat search
          </Link>
        </li>
      </ul>
    </section>
  )
}

export default ProfileHistoryPage
