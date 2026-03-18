/**
 * Временный mock-хук авторизации.
 * Нужен для локальной разработки UI до подключения backend и базы данных.
 */
import { useMemo, useState } from 'react'

const AUTH_STORAGE_KEY = 'mock_auth_user'

const readInitialUser = (): string | null => {
  const savedUser = window.localStorage.getItem(AUTH_STORAGE_KEY)
  return savedUser && savedUser.trim().length > 0 ? savedUser : null
}

export const useMockAuth = () => {
  const [userName, setUserName] = useState<string | null>(() => readInitialUser())

  const isAuthenticated = useMemo(() => userName !== null, [userName])

  const login = (rawName: string) => {
    const normalizedName = rawName.trim()
    const nextName = normalizedName.length > 0 ? normalizedName : 'Гость'

    window.localStorage.setItem(AUTH_STORAGE_KEY, nextName)
    setUserName(nextName)
  }

  const logout = () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    setUserName(null)
  }

  return { isAuthenticated, userName, login, logout }
}

