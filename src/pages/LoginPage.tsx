// Вход: mock login, редирект после входа, «Забыли пароль» — UI (T37, T38).
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/profile'

  const [forgotHint, setForgotHint] = useState<string | null>(null)

  const handleMockLogin = () => {
    login()
    navigate(from, { replace: true })
  }

  const handleForgotPassword = () => {
    setForgotHint('If an account exists for this email, we sent reset instructions (mock — no request sent).')
    window.setTimeout(() => setForgotHint(null), 6000)
  }

  return (
    <section className="page-shell page-auth" aria-label="Log in">
      <header className="page-header">
        <h1 className="page-title">Log in</h1>
        <p className="page-lead">
          No account yet? <Link to="/auth/register">Create one</Link>
        </p>
      </header>

      {forgotHint ? <p className="page-muted">{forgotHint}</p> : null}

      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <label className="field-block">
          <span>Email</span>
          <input type="email" autoComplete="username" required />
        </label>
        <label className="field-block">
          <span>Password</span>
          <input type="password" autoComplete="current-password" required />
        </label>
        <label className="checkbox-row">
          <input type="checkbox" />
          Remember me on this device
        </label>
        <button type="button" className="primary-button wide" onClick={handleMockLogin}>
          Log in
        </button>
        <button type="button" className="text-button" onClick={handleForgotPassword}>
          Forgot password?
        </button>
      </form>
    </section>
  )
}

export default LoginPage
