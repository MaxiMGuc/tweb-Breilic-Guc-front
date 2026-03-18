/**
 * UI-страница входа пользователя.
 * Содержит клиентскую валидацию email/пароля и навигацию на регистрацию.
 */
import { useState } from 'react'
import type { AuthPage } from '../types/auth'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type LoginPageProps = {
  onNavigate: (page: AuthPage) => void
  onLogin: (name: string) => void
}

export const LoginPage = ({ onNavigate, onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleLogin = () => {
    const normalizedEmail = email.trim()
    let hasErrors = false

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setEmailError('Введите корректный e-mail.')
      hasErrors = true
    } else {
      setEmailError('')
    }

    if (password.trim().length === 0) {
      setPasswordError('Введите пароль.')
      hasErrors = true
    } else {
      setPasswordError('')
    }

    if (hasErrors) {
      return
    }

    // Для mock-режима используем e-mail как идентификатор пользователя.
    onLogin(normalizedEmail)
  }

  return (
    <form className="auth-form">
      <h2>Вход в систему</h2>
      <label>
        E-mail
        <input
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (emailError) {
              setEmailError('')
            }
          }}
        />
        {emailError ? <span className="field-error">{emailError}</span> : null}
      </label>
      <label>
        Пароль
        <input
          type="password"
          placeholder="Введите пароль"
          autoComplete="current-password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
            if (passwordError) {
              setPasswordError('')
            }
          }}
        />
        {passwordError ? <span className="field-error">{passwordError}</span> : null}
      </label>
      <button type="button" className="primary-button" onClick={handleLogin}>
        Войти
      </button>
      <button type="button" className="link-button">
        Забыли пароль?
      </button>
      <p className="helper-text">
        Нет аккаунта?{' '}
        <a
          href="/register"
          onClick={(event) => {
            event.preventDefault()
            onNavigate('register')
          }}
        >
          Зарегистрироваться
        </a>
      </p>
    </form>
  )
}

