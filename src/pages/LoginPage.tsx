// Вход в аккаунт.
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <section className="page-shell page-auth" aria-label="Log in">
      <header className="page-header">
        <h1 className="page-title">Log in</h1>
        <p className="page-lead">
          No account yet? <Link to="/auth/register">Create one</Link>
        </p>
      </header>

      <form className="auth-form">
        <label className="field-block">
          <span>Email</span>
          <input type="email" autoComplete="username" />
        </label>
        <label className="field-block">
          <span>Password</span>
          <input type="password" autoComplete="current-password" />
        </label>
        <label className="checkbox-row">
          <input type="checkbox" />
          Remember me on this device
        </label>
        <button type="button" className="primary-button wide">
          Log in
        </button>
        <button type="button" className="text-button">
          Forgot password?
        </button>
      </form>
    </section>
  )
}

export default LoginPage
