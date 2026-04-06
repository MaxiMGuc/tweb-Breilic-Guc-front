/**
 * Компонент табов переключает между страницами входа и регистрации.
 * Не содержит бизнес-логики, только UI и вызов onNavigate.
 */
import type { AuthPage } from '../../types/auth'

type AuthTabsProps = {
  currentPage: AuthPage
  onNavigate: (page: AuthPage) => void
}

export const AuthTabs = ({ currentPage, onNavigate }: AuthTabsProps) => {
  return (
    <div className="auth-tabs" role="tablist" aria-label="Auth pages">
      <button
        type="button"
        role="tab"
        className={currentPage === 'login' ? 'tab active' : 'tab'}
        aria-selected={currentPage === 'login'}
        onClick={() => onNavigate('login')}
      >
        Вход
      </button>
      <button
        type="button"
        role="tab"
        className={currentPage === 'register' ? 'tab active' : 'tab'}
        aria-selected={currentPage === 'register'}
        onClick={() => onNavigate('register')}
      >
        Регистрация
      </button>
    </div>
  )
}

