// Общая оболочка входа/регистрации: табы AuthTabs (T60).
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AuthTabs } from '../components/auth/AuthTabs.tsx'

export default function AuthLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const currentPage = location.pathname.includes('register') ? 'register' : 'login'

  return (
    <div className="auth-layout-wrap">
      <AuthTabs
        currentPage={currentPage}
        onNavigate={(page) => navigate(page === 'login' ? '/auth/login' : '/auth/register')}
      />
      <Outlet />
    </div>
  )
}
