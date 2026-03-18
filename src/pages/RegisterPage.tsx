/**
 * UI-страница регистрации нового пользователя.
 * Содержит клиентскую проверку email и обязательное совпадение паролей.
 */
import { useState } from 'react'
import type { AuthPage } from '../types/auth'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type RegisterPageProps = {
  onNavigate: (page: AuthPage) => void
  onRegister: (name: string) => void
}

export const RegisterPage = ({ onNavigate, onRegister }: RegisterPageProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const handleRegister = () => {
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

    if (confirmPassword.trim().length === 0) {
      setConfirmPasswordError('Подтвердите пароль.')
      hasErrors = true
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Пароли не совпадают.')
      hasErrors = true
    } else {
      setConfirmPasswordError('')
    }

    if (hasErrors) {
      return
    }

    // Для mock-режима после регистрации пускаем на главную с корректно введенными данными.
    const enteredIdentity = name.trim().length > 0 ? name : email.trim().length > 0 ? email : password
    onRegister(enteredIdentity || confirmPassword)
  }

  return (
    <form className="auth-form">
      <h2>Создание аккаунта</h2>
      <label>
        Имя
        <input
          type="text"
          placeholder="Ваше имя"
          autoComplete="given-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
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
          placeholder="Придумайте пароль"
          autoComplete="new-password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
            if (passwordError) {
              setPasswordError('')
            }
            if (confirmPasswordError) {
              setConfirmPasswordError('')
            }
          }}
        />
        {passwordError ? <span className="field-error">{passwordError}</span> : null}
      </label>
      <label>
        Подтвердите пароль
        <input
          type="password"
          placeholder="Повторите пароль"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value)
            if (confirmPasswordError) {
              setConfirmPasswordError('')
            }
          }}
        />
        {confirmPasswordError ? <span className="field-error">{confirmPasswordError}</span> : null}
      </label>
      <label className="checkbox-row">
        <input type="checkbox" />
        <span>Я принимаю условия использования сервиса</span>
      </label>
      <button type="button" className="primary-button" onClick={handleRegister}>
        Зарегистрироваться
      </button>
      <p className="helper-text">
        Уже есть аккаунт?{' '}
        <a
          href="/login"
          onClick={(event) => {
            event.preventDefault()
            onNavigate('login')
          }}
        >
          Войти
        </a>
      </p>
    </form>
  )
}

