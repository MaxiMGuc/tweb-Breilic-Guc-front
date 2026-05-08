/**
 * Хук управляет "клиентской навигацией" между /, /login и /register без роутера.
 * Нужен, чтобы UI переключал страницу и корректно реагировал на back/forward в браузере.
 */
import { useCallback, useEffect, useState } from 'react'
import type { AppPage } from '../types/auth'

/**
 * Преобразует URL в внутренний тип текущей страницы приложения.
 */
const normalizePath = (path: string): AppPage => {
  if (path === '/') {
    return 'home'
  }

  if (path === '/register') {
    return 'register'
  }

  return 'login'
}

export const useAuthPage = () => {
  const [currentPage, setCurrentPage] = useState<AppPage>(normalizePath(window.location.pathname))

  useEffect(() => {
    const onPopState = () => {
      setCurrentPage(normalizePath(window.location.pathname))
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigateTo = useCallback((page: AppPage) => {
    const nextPath = page === 'home' ? '/' : page === 'login' ? '/login' : '/register'

    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath)
      setCurrentPage(page)
    }
  }, [])

  return { currentPage, navigateTo }
}
