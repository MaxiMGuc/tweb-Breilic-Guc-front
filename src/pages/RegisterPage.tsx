// Регистрация пользователя.
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import EmailField from '../components/form/EmailField'
import PasswordField from '../components/form/PasswordField'

function RegisterPage() {
  const { t } = useTranslation()

  return (
    <section className="page-shell page-auth" aria-label={t('register.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('register.title')}</h1>
        <p className="page-lead">
          {t('register.lead')}{' '}
          <Link to="/auth/login">{t('register.logInLink')}</Link>
        </p>
      </header>

      <form className="auth-form" noValidate>
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
          name="confirmPassword"
          autoComplete="new-password"
          minLength={8}
          required
        />
        <label className="checkbox-row">
          <input type="checkbox" />
          {t('register.terms')}
        </label>
        <button type="button" className="primary-button wide">
          {t('register.submit')}
        </button>
      </form>
    </section>
  )
}

export default RegisterPage
