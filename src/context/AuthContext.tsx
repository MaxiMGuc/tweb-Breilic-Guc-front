import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  LS_AUTH_LEGACY,
  LS_AUTH_ROLE_LEGACY,
  LS_AUTH_SESSION,
} from '../constants/storageKeys.ts'
import {
  readStorageJson,
  readVersionedStorage,
  removeStorageKey,
  writeVersionedStorage,
} from '../utils/storage.ts'
import {
  AUTH_EXPIRED_EVENT,
  authService,
  setAuthToken,
  type LoginRequest,
  type RegisterRequest,
} from '../api/index.ts'

const DEFAULT_SESSION_TTL_MS = 12 * 60 * 60 * 1000

export type AuthRole = 'user' | 'admin' | 'manager'

export type AuthUser = {
  id: string
  email: string
  displayName: string
}

export type AuthSession = {
  user: AuthUser
  role: AuthRole
  token: string
  issuedAt: number
  expiresAt: number
}

type AuthContextValue = {
  isAuthenticated: boolean
  user: AuthUser | null
  role: AuthRole | null
  sessionExpiresAt: number | null
  login: (input: LoginRequest) => Promise<void>
  register: (input: RegisterRequest) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function mapBackendRole(role: string): AuthRole {
  const r = role.toLowerCase()
  if (r === 'admin') return 'admin'
  if (r === 'manager') return 'manager'
  return 'user'
}

function isSessionValid(session: AuthSession): boolean {
  return Boolean(
    session.user?.id &&
      session.user?.email &&
      session.user?.displayName &&
      session.token &&
      (session.role === 'user' || session.role === 'admin' || session.role === 'manager') &&
      Number.isFinite(session.issuedAt) &&
      Number.isFinite(session.expiresAt) &&
      session.expiresAt > Date.now(),
  )
}

function readStoredSession(): AuthSession | null {
  const parsed = readVersionedStorage<AuthSession | null>(LS_AUTH_SESSION, {
    expectedVersion: 2,
    fallback: null,
  })
  if (parsed && isSessionValid(parsed)) {
    return parsed
  }
  // Старые версии (v1 без токена и legacy mock-флаги) принудительно очищаем.
  removeStorageKey(LS_AUTH_SESSION)
  removeStorageKey(LS_AUTH_LEGACY)
  removeStorageKey(LS_AUTH_ROLE_LEGACY)
  // На всякий случай вычищаем мёртвые legacy-ключи, если они вдруг всё ещё лежат.
  readStorageJson<string | null>(LS_AUTH_LEGACY, { fallback: null })
  return null
}

function persistSession(session: AuthSession | null): void {
  if (!session) {
    removeStorageKey(LS_AUTH_SESSION)
    removeStorageKey(LS_AUTH_LEGACY)
    removeStorageKey(LS_AUTH_ROLE_LEGACY)
    setAuthToken(null)
    return
  }
  writeVersionedStorage(LS_AUTH_SESSION, session, {
    version: 2,
    ttlMs: Math.max(0, session.expiresAt - Date.now()),
  })
  removeStorageKey(LS_AUTH_LEGACY)
  removeStorageKey(LS_AUTH_ROLE_LEGACY)
  setAuthToken(session.token)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => {
    const restored = readStoredSession()
    if (restored) setAuthToken(restored.token)
    return restored
  })

  const login = useCallback(async (input: LoginRequest) => {
    const result = await authService.login(input)
    const now = Date.now()
    const email = input.email.trim().toLowerCase()
    const next: AuthSession = {
      user: {
        id: String(result.userId),
        email,
        displayName: result.username || email.split('@')[0] || 'Traveler',
      },
      role: mapBackendRole(result.role),
      token: result.token,
      issuedAt: now,
      expiresAt: now + DEFAULT_SESSION_TTL_MS,
    }
    persistSession(next)
    setSession(next)
  }, [])

  const register = useCallback(async (input: RegisterRequest) => {
    await authService.register(input)
  }, [])

  const logout = useCallback(() => {
    persistSession(null)
    setSession(null)
  }, [])

  useEffect(() => {
    if (!session) return
    const timeoutMs = Math.max(0, session.expiresAt - Date.now())
    const timer = window.setTimeout(() => {
      persistSession(null)
      setSession(null)
    }, timeoutMs)
    return () => window.clearTimeout(timer)
  }, [session])

  useEffect(() => {
    const handler = () => {
      persistSession(null)
      setSession(null)
    }
    window.addEventListener(AUTH_EXPIRED_EVENT, handler)
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, handler)
  }, [])

  const isAuthenticated = Boolean(session && isSessionValid(session))
  const user = isAuthenticated && session ? session.user : null
  const role = isAuthenticated && session ? session.role : null
  const sessionExpiresAt = isAuthenticated && session ? session.expiresAt : null

  const value = useMemo(
    () => ({ isAuthenticated, user, role, sessionExpiresAt, login, register, logout }),
    [isAuthenticated, user, role, sessionExpiresAt, login, register, logout],
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
