// Вход: mock login, редирект после входа, «Забыли пароль» — UI.
import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import EmailField from '../components/form/EmailField'
import PasswordField from '../components/form/PasswordField'
import { useAuth } from '../context/AuthContext.tsx'

function LoginPage() {
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/profile'

  const [forgotHint, setForgotHint] = useState<string | null>(null)

  const handleMockLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const email = String(fd.get('email') ?? '')
    const role = email.toLowerCase().includes('admin') ? 'admin' : 'user'
    login({ email, role })
    navigate(from, { replace: true })
  }

  const handleForgotPassword = () => {
    setForgotHint(t('login.forgotMockHint'))
    window.setTimeout(() => setForgotHint(null), 6000)
  }

  return (
    <section className="page-shell page-auth" aria-label={t('login.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('login.title')}</h1>
        <p className="page-lead">
          {t('login.lead')}{' '}
          <Link to="/auth/register">{t('login.createOne')}</Link>
        </p>
      </header>

      {forgotHint ? <p className="page-muted">{forgotHint}</p> : null}

      <form className="auth-form" onSubmit={handleMockLogin}>
        <EmailField label={t('common.email')} name="email" autoComplete="username" required />
        <PasswordField label={t('common.password')} autoComplete="current-password" />
        <label className="checkbox-row">
          <input type="checkbox" />
          {t('login.remember')}
        </label>
        <button type="submit" className="primary-button wide">
          {t('login.submit')}
        </button>
        <button type="button" className="text-button" onClick={handleForgotPassword}>
          {t('login.forgot')}
        </button>
      </form>
    </section>
  )
}

export default LoginPage
