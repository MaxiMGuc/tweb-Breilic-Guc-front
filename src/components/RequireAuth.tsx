// Защита маршрутов профиля: редирект на вход (исполнитель B: T41).
import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { type AuthRole, useAuth } from '../context/AuthContext.tsx'

type RequireAuthProps = {
  children: ReactNode
  allowedRoles?: AuthRole[]
}

export function RequireAuth({ children, allowedRoles }: RequireAuthProps) {
  const { isAuthenticated, role } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />
  }

  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return <Navigate to="/profile" replace />
  }

  return <>{children}</>
}
