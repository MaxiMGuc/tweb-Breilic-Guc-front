// Вход в аккаунт.
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import EmailField from '../components/form/EmailField'
import PasswordField from '../components/form/PasswordField'

function LoginPage() {
  const { t } = useTranslation()

  return (
    <section className="page-shell page-auth" aria-label={t('login.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('login.title')}</h1>
        <p className="page-lead">
          {t('login.lead')}{' '}
          <Link to="/auth/register">{t('login.createOne')}</Link>
        </p>
      </header>

      <form className="auth-form" noValidate>
        <EmailField label={t('common.email')} name="email" autoComplete="username" required />
        <PasswordField label={t('common.password')} autoComplete="current-password" />
        <label className="checkbox-row">
          <input type="checkbox" />
          {t('login.remember')}
        </label>
        <button type="button" className="primary-button wide">
          {t('login.submit')}
        </button>
        <button type="button" className="text-button">
          {t('login.forgot')}
        </button>
      </form>
    </section>
  )
}

export default LoginPage
