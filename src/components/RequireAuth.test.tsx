import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { LS_AUTH_SESSION } from '../constants/storageKeys.ts'
import { AuthProvider, type AuthRole, type AuthSession } from '../context/AuthContext.tsx'
import { RequireAuth } from './RequireAuth.tsx'

function renderProtected(initialPath: string, allowedRoles?: AuthRole[]) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AuthProvider>
        <Routes>
          <Route path="/auth/login" element={<div>Login page</div>} />
          <Route path="/profile" element={<div>Profile page</div>} />
          <Route
            path="/protected"
            element={
              <RequireAuth allowedRoles={allowedRoles}>
                <div>Protected page</div>
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  )
}

function writeSession(role: AuthRole) {
  const now = Date.now()
  const session: AuthSession = {
    user: { id: 'u-1', email: 'user@example.com', displayName: 'User' },
    role,
    token: 'test-token',
    issuedAt: now,
    expiresAt: now + 60_000,
  }
  localStorage.setItem(
    LS_AUTH_SESSION,
    JSON.stringify({ version: 2, expiresAt: session.expiresAt, value: session }),
  )
}

describe('RequireAuth', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('redirects unauthenticated users to login', () => {
    renderProtected('/protected')
    expect(screen.getByText('Login page')).toBeInTheDocument()
  })

  it('allows authenticated users with allowed role', () => {
    writeSession('admin')
    renderProtected('/protected', ['admin'])
    expect(screen.getByText('Protected page')).toBeInTheDocument()
  })

  it('allows authenticated manager when role is allowed', () => {
    writeSession('manager')
    renderProtected('/protected', ['admin', 'manager'])
    expect(screen.getByText('Protected page')).toBeInTheDocument()
  })

  it('redirects manager when only admin is allowed', () => {
    writeSession('manager')
    renderProtected('/protected', ['admin'])
    expect(screen.getByText('Profile page')).toBeInTheDocument()
  })

  it('redirects authenticated users with disallowed role to profile', () => {
    writeSession('user')
    renderProtected('/protected', ['admin'])
    expect(screen.getByText('Profile page')).toBeInTheDocument()
  })
})