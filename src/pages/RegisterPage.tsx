// Регистрация: mock — сохранение сессии и переход в профиль.
import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import EmailField from '../components/form/EmailField'
import PasswordField from '../components/form/PasswordField'
import { useAuth } from '../context/AuthContext.tsx'

function RegisterPage() {
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const pass = String(fd.get('password') ?? '')
    const confirm = String(fd.get('confirm') ?? '')
    const terms = fd.get('terms') === 'on'
    if (pass.length < 8) {
      setError(t('register.errPasswordShort'))
      return
    }
    if (pass !== confirm) {
      setError(t('register.errMismatch'))
      return
    }
    if (!terms) {
      setError(t('register.errTerms'))
      return
    }
    setError(null)
    const email = String(fd.get('email') ?? '')
    login({ email, role: 'user' })
    navigate('/profile', { replace: true })
  }

  return (
    <section className="page-shell page-auth" aria-label={t('register.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('register.title')}</h1>
        <p className="page-lead">
          {t('register.lead')}{' '}
          <Link to="/auth/login">{t('register.logInLink')}</Link>
        </p>
      </header>

      {error ? <p className="page-muted">{error}</p> : null}

      <form className="auth-form" onSubmit={handleRegister}>
        <EmailField label={t('common.email')} name="email" autoComplete="email" required />
        <PasswordField
          label={t('common.password')}
          name="password"
          autoComplete="new-password"
          showStrengthHint
          required
        />
        <PasswordField
          label={t('register.confirmPassword')}
          name="confirm"
          autoComplete="new-password"
          minLength={8}
          showStrengthHint={false}
          required
        />
        <label className="checkbox-row">
          <input name="terms" type="checkbox" />
          {t('register.terms')}
        </label>
        <button type="submit" className="primary-button wide">
          {t('register.submit')}
        </button>
      </form>
    </section>
  )
}

export default RegisterPage
