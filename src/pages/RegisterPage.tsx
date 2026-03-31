// Регистрация пользователя.
import { Link } from 'react-router-dom'

function RegisterPage() {
  return (
    <section className="page-shell page-auth" aria-label="Register">
      <header className="page-header">
        <h1 className="page-title">Create account</h1>
        <p className="page-lead">
          Already have an account? <Link to="/auth/login">Log in</Link>
        </p>
      </header>

      <form className="auth-form">
        <label className="field-block">
          <span>Email</span>
          <input type="email" autoComplete="email" />
        </label>
        <label className="field-block">
          <span>Password</span>
          <input type="password" autoComplete="new-password" />
        </label>
        <label className="field-block">
          <span>Confirm password</span>
          <input type="password" autoComplete="new-password" />
        </label>
        <label className="checkbox-row">
          <input type="checkbox" />
          I agree to the terms of service and privacy policy
        </label>
        <button type="button" className="primary-button wide">
          Register
        </button>
      </form>
    </section>
  )
}

export default RegisterPage
