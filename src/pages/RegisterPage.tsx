// Регистрация: mock — сохранение сессии и переход в профиль (T39).
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'

function RegisterPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const pass = String(fd.get('password') ?? '')
    const confirm = String(fd.get('confirm') ?? '')
    const terms = fd.get('terms') === 'on'
    if (pass.length < 4) {
      setError('Password must be at least 4 characters (demo).')
      return
    }
    if (pass !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (!terms) {
      setError('Please accept the terms to continue.')
      return
    }
    setError(null)
    const email = String(fd.get('email') ?? '')
    login({ email, role: 'user' })
    navigate('/profile', { replace: true })
  }

  return (
    <section className="page-shell page-auth" aria-label="Register">
      <header className="page-header">
        <h1 className="page-title">Create account</h1>
        <p className="page-lead">
          Already have an account? <Link to="/auth/login">Log in</Link>
        </p>
      </header>

      {error ? <p className="page-muted">{error}</p> : null}

      <form className="auth-form" onSubmit={handleRegister}>
        <label className="field-block">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className="field-block">
          <span>Password</span>
          <input name="password" type="password" autoComplete="new-password" required />
        </label>
        <label className="field-block">
          <span>Confirm password</span>
          <input name="confirm" type="password" autoComplete="new-password" required />
        </label>
        <label className="checkbox-row">
          <input name="terms" type="checkbox" />
          I agree to the terms of service and privacy policy
        </label>
        <button type="submit" className="primary-button wide">
          Register
        </button>
      </form>
    </section>
  )
}

export default RegisterPage
