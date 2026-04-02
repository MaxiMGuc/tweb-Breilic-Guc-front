// Точка входа «Аккаунт»: редирект на вход или профиль (T61).
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'

export default function AccountPage() {
  const { isAuthenticated } = useAuth()
  return <Navigate to={isAuthenticated ? '/profile' : '/auth/login'} replace />
}
