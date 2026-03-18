/**
 * Главная страница в первоначальном стиле проекта:
 * hero-блок, форма поиска и список популярных предложений.
 */
import './HomePage.css'

type HomePageProps = {
  isAuthenticated: boolean
  userName: string | null
  onLogout: () => void
  onOpenLogin: () => void
}

const popularTickets = [
  {
    id: 1,
    airline: 'S7 Airlines',
    price: '9 450 RUR',
    route: 'Moscow -> Sochi',
    date: '20 Mar, direct flight',
  },
  {
    id: 2,
    airline: 'Aeroflot',
    price: '12 180 RUR',
    route: 'Saint Petersburg -> Kaliningrad',
    date: '22 Mar, 1 stop',
  },
  {
    id: 3,
    airline: 'Utair',
    price: '8 790 RUR',
    route: 'Kazan -> Mineralnye Vody',
    date: '25 Mar, direct flight',
  },
]

export const HomePage = ({ isAuthenticated, userName, onLogout, onOpenLogin }: HomePageProps) => {
  return (
    <main className="app">
      <header className="topbar">
        <p className="brand">Aviasales</p>
        <nav className="topbar-actions">
          <button type="button">Help</button>
          {isAuthenticated ? (
            <>
              <span className="user-pill">{userName ?? 'Гость'}</span>
              <button type="button" onClick={onLogout}>
                Sign out
              </button>
            </>
          ) : (
            <button type="button" onClick={onOpenLogin}>
              Sign in
            </button>
          )}
        </nav>
      </header>

      <section className="hero">
        <h1>Find cheap flights in seconds</h1>
        <p>Compare hundreds of airlines and travel sites with one search.</p>
      </section>

      <section className="search-card" aria-label="Flight search">
        <form className="search-form">
          <label>
            From
            <input type="text" placeholder="Moscow" />
          </label>
          <label>
            To
            <input type="text" placeholder="Sochi" />
          </label>
          <label>
            Departure
            <input type="date" />
          </label>
          <label>
            Return
            <input type="date" />
          </label>
          <button type="button" className="search-button">
            Search tickets
          </button>
        </form>
      </section>

      <section className="results" aria-label="Popular offers">
        <div className="results-header">
          <h2>Popular offers</h2>
          <a href="/">See all</a>
        </div>
        <ul className="ticket-list">
          {popularTickets.map((ticket) => (
            <li key={ticket.id} className="ticket-card">
              <div>
                <p className="airline">{ticket.airline}</p>
                <p className="route">{ticket.route}</p>
                <p className="date">{ticket.date}</p>
              </div>
              <p className="price">{ticket.price}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

