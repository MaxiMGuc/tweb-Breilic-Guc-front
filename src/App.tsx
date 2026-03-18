/**
 * Корневой компонент auth-раздела: собирает общий layout и подключает нужную страницу
 * (главная/вход/регистрация) в зависимости от текущего URL.
 */
import './App.css'
import { AuthInfoPanel } from './components/auth/AuthInfoPanel'
import { AuthTabs } from './components/auth/AuthTabs'
import { useAuthPage } from './hooks/useAuthPage'
import { useMockAuth } from './hooks/useMockAuth'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

/**
 * Отвечает только за композицию экрана, без бизнес-логики авторизации.
 */
function App() {
  const { currentPage, navigateTo } = useAuthPage()
  const { isAuthenticated, userName, login, logout } = useMockAuth()

  const handleLogin = (name: string) => {
    login(name)
    navigateTo('home')
  }

  const handleRegister = (name: string) => {
    login(name)
    navigateTo('home')
  }

  if (currentPage === 'home') {
    return (
      <HomePage
        isAuthenticated={isAuthenticated}
        userName={userName}
        onLogout={() => {
          logout()
          navigateTo('login')
        }}
        onOpenLogin={() => navigateTo('login')}
      />
    )
  }

  return (
    <main className="auth-layout">
      <AuthInfoPanel />

      <section className="auth-card" aria-label="Авторизация">
        <AuthTabs currentPage={currentPage} onNavigate={navigateTo} />
        {currentPage === 'login' ? (
          <LoginPage onNavigate={navigateTo} onLogin={handleLogin} />
        ) : (
          <RegisterPage onNavigate={navigateTo} onRegister={handleRegister} />
        )}
      </section>
    </main>
  )
}

export default App
