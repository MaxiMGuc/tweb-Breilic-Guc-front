// Регистрация через реальный бэкенд /api/reg, затем автологин.
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'
import { ApiError } from '../api/index.ts'

const SHOW_BOOTSTRAP_FIELD = import.meta.env.VITE_SHOW_ADMIN_BOOTSTRAP === 'true'

function RegisterPage() {
  const { register, login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const fd = new FormData(e.currentTarget)
    const email = String(fd.get('email') ?? '').trim()
    const password = String(fd.get('password') ?? '')
    const confirm = String(fd.get('confirm') ?? '')
    const firstName = String(fd.get('firstName') ?? '').trim()
    const username = String(fd.get('username') ?? '').trim() || email.split('@')[0]
    const phone = String(fd.get('phone') ?? '').trim()
    const terms = fd.get('terms') === 'on'
    const bootstrapSecret = SHOW_BOOTSTRAP_FIELD
      ? String(fd.get('bootstrapSecret') ?? '').trim()
      : undefined

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (!terms) {
      setError('Please accept the terms to continue.')
      return
    }

    setBusy(true)
    try {
      await register({
        firstName,
        username,
        email,
        password,
        phone,
        ...(bootstrapSecret ? { bootstrapSecret } : {}),
      })
      await login({ email, password })
      navigate('/profile', { replace: true })
    } catch (err) {
      if (err instanceof ApiError && err.status === 400) {
        setError('Email is already in use or input is invalid.')
      } else {
        setError('Cannot reach the server. Please try again.')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="page-shell page-auth" aria-label="Register">
      <header className="page-header">
        <h1 className="page-title">Create account</h1>
        <p className="page-lead">
          Already have an account? <Link to="/auth/login">Log in</Link>
        </p>
      </header>

      {error ? <p className="page-muted" role="alert">{error}</p> : null}

      <form className="auth-form" onSubmit={handleRegister}>
        <label className="field-block">
          <span>First name</span>
          <input name="firstName" type="text" autoComplete="given-name" required />
        </label>
        <label className="field-block">
          <span>Username</span>
          <input name="username" type="text" autoComplete="username" />
        </label>
        <label className="field-block">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className="field-block">
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        {SHOW_BOOTSTRAP_FIELD ? (
          <label className="field-block">
            <span>First-time setup code (optional)</span>
            <input
              name="bootstrapSecret"
              type="password"
              autoComplete="off"
              placeholder="Only if creating the first administrator"
            />
          </label>
        ) : null}
        <label className="field-block">
          <span>Password</span>
          <input name="password" type="password" autoComplete="new-password" minLength={6} required />
        </label>
        <label className="field-block">
          <span>Confirm password</span>
          <input name="confirm" type="password" autoComplete="new-password" minLength={6} required />
        </label>
        <label className="checkbox-row">
          <input name="terms" type="checkbox" />
          I agree to the terms of service and privacy policy
        </label>
        <button type="submit" className="primary-button wide" disabled={busy}>
          {busy ? 'Creating…' : 'Register'}
        </button>
      </form>
    </section>
  )
}

export default RegisterPage
