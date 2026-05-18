// Вход через реальный бэкенд /api/session/auth.
import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'
import { ApiError } from '../api/index.ts'

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/profile'

  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [forgotHint, setForgotHint] = useState<string | null>(null)

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)
    const email = String(fd.get('email') ?? '').trim()
    const password = String(fd.get('password') ?? '')
    if (!email || !password) {
      setError('Email and password are required.')
      return
    }
    setBusy(true)
    try {
      await login({ email, password })
      navigate(from, { replace: true })
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setError('Invalid email or password.')
      } else {
        setError('Cannot reach the server. Please try again.')
      }
    } finally {
      setBusy(false)
    }
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

      {error ? <p className="page-muted" role="alert">{error}</p> : null}
      {forgotHint ? <p className="page-muted">{forgotHint}</p> : null}

      <form className="auth-form" onSubmit={handleLogin}>
        <label className="field-block">
          <span>Email</span>
          <input name="email" type="email" autoComplete="username" required />
        </label>
        <label className="field-block">
          <span>Password</span>
          <input name="password" type="password" autoComplete="current-password" required />
        </label>
        <label className="checkbox-row">
          <input type="checkbox" />
          Remember me on this device
        </label>
        <button type="submit" className="primary-button wide" disabled={busy}>
          {busy ? 'Signing in…' : 'Log in'}
        </button>
        <button type="button" className="text-button" onClick={handleForgotPassword}>
          Forgot password?
        </button>
      </form>
    </section>
  )
}

export default LoginPage
