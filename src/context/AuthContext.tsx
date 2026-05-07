import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'breilic_mock_auth'
const STORAGE_ROLE_KEY = 'breilic_mock_role'

export type AuthRole = 'user' | 'admin'

type AuthContextValue = {
  isAuthenticated: boolean
  role: AuthRole | null
  login: (role?: AuthRole) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readStoredAuth(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function readStoredRole(): AuthRole | null {
  try {
    const storedRole = localStorage.getItem(STORAGE_ROLE_KEY)
    if (storedRole === 'admin' || storedRole === 'user') {
      return storedRole
    }
    return null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(readStoredAuth)
  const [role, setRole] = useState<AuthRole | null>(readStoredRole)

  const login = useCallback((nextRole: AuthRole = 'user') => {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
      localStorage.setItem(STORAGE_ROLE_KEY, nextRole)
    } catch {
      /* ignore */
    }
    setIsAuthenticated(true)
    setRole(nextRole)
  }, [])

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(STORAGE_ROLE_KEY)
    } catch {
      /* ignore */
    }
    setIsAuthenticated(false)
    setRole(null)
  }, [])

  const value = useMemo(
    () => ({ isAuthenticated, role, login, logout }),
    [isAuthenticated, role, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
