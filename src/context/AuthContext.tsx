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

const DEFAULT_SESSION_TTL_MS = 12 * 60 * 60 * 1000

export type AuthRole = 'user' | 'admin'

export type AuthUser = {
  id: string
  email: string
  displayName: string
}

export type AuthSession = {
  user: AuthUser
  role: AuthRole
  issuedAt: number
  expiresAt: number
}

type LoginInput = {
  email: string
  displayName?: string
  role?: AuthRole
}

type AuthContextValue = {
  isAuthenticated: boolean
  user: AuthUser | null
  role: AuthRole | null
  sessionExpiresAt: number | null
  login: (input: LoginInput) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function buildSession(input: LoginInput): AuthSession {
  const now = Date.now()
  const role = input.role ?? 'user'
  const email = input.email.trim().toLowerCase()
  return {
    user: {
      id: `mock-${email || 'user'}`,
      email,
      displayName: input.displayName?.trim() || email.split('@')[0] || 'Traveler',
    },
    role,
    issuedAt: now,
    expiresAt: now + DEFAULT_SESSION_TTL_MS,
  }
}

function isSessionValid(session: AuthSession): boolean {
  return Boolean(
    session.user?.id &&
      session.user?.email &&
      session.user?.displayName &&
      (session.role === 'user' || session.role === 'admin') &&
      Number.isFinite(session.issuedAt) &&
      Number.isFinite(session.expiresAt) &&
      session.expiresAt > Date.now(),
  )
}

function readLegacySession(): AuthSession | null {
  const isAuthenticated = readStorageJson<string | null>(LS_AUTH_LEGACY, {
    fallback: null,
  })
  if (isAuthenticated !== '1') {
    return null
  }
  const storedRole = readStorageJson<string | null>(LS_AUTH_ROLE_LEGACY, {
    fallback: null,
  })
  const role: AuthRole = storedRole === 'admin' ? 'admin' : 'user'
  return buildSession({
    email: role === 'admin' ? 'admin@mock.local' : 'user@mock.local',
    displayName: role === 'admin' ? 'Admin' : 'Traveler',
    role,
  })
}

function readStoredSession(): AuthSession | null {
  const parsed = readVersionedStorage<AuthSession | null>(LS_AUTH_SESSION, {
    expectedVersion: 1,
    fallback: null,
  })
  if (parsed && isSessionValid(parsed)) {
    return parsed
  }
  return readLegacySession()
}

function persistSession(session: AuthSession | null): void {
  if (!session) {
    removeStorageKey(LS_AUTH_SESSION)
    removeStorageKey(LS_AUTH_LEGACY)
    removeStorageKey(LS_AUTH_ROLE_LEGACY)
    return
  }
  writeVersionedStorage(LS_AUTH_SESSION, session, {
    version: 1,
    ttlMs: DEFAULT_SESSION_TTL_MS,
  })
  removeStorageKey(LS_AUTH_LEGACY)
  removeStorageKey(LS_AUTH_ROLE_LEGACY)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(readStoredSession)

  const login = useCallback((input: LoginInput) => {
    const nextSession = buildSession(input)
    persistSession(nextSession)
    setSession(nextSession)
  }, [])

  const logout = useCallback(() => {
    persistSession(null)
    setSession(null)
  }, [])

  useEffect(() => {
    if (!session) {
      return
    }
    const timeoutMs = Math.max(0, session.expiresAt - Date.now())
    const timer = window.setTimeout(() => {
      persistSession(null)
      setSession(null)
    }, timeoutMs)
    return () => window.clearTimeout(timer)
  }, [session])

  const isAuthenticated = Boolean(session && isSessionValid(session))
  const user = isAuthenticated && session ? session.user : null
  const role = isAuthenticated && session ? session.role : null
  const sessionExpiresAt = isAuthenticated && session ? session.expiresAt : null

  const value = useMemo(
    () => ({ isAuthenticated, user, role, sessionExpiresAt, login, logout }),
    [isAuthenticated, user, role, sessionExpiresAt, login, logout],
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
