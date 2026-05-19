// Точка входа приложения: инициализирует React, роутер и карту маршрутов.
import { Suspense, lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/AuthContext.tsx'
import { BookingProvider } from './context/BookingContext.tsx'
import App from './App.tsx'
import HelpLayout from './components/HelpLayout.tsx'
import { RequireAuth } from './components/RequireAuth.tsx'

const AccountPage = lazy(() => import('./pages/AccountPage.tsx'))
const AuthLayout = lazy(() => import('./pages/AuthLayout.tsx'))
const AdminLayout = lazy(() => import('./components/AdminLayout.tsx'))
const AdminBookingsPage = lazy(() => import('./pages/AdminBookingsPage.tsx'))
const AdminFlightsPage = lazy(() => import('./pages/AdminFlightsPage.tsx'))
const AdminUsersPage = lazy(() => import('./pages/AdminUsersPage.tsx'))
const BookingPage = lazy(() => import('./pages/BookingPage.tsx'))
const BookingSuccessPage = lazy(() => import('./pages/BookingSuccessPage.tsx'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage.tsx'))
const HelpFAQPage = lazy(() => import('./pages/HelpFAQPage.tsx'))
const HelpPage = lazy(() => import('./pages/HelpPage.tsx'))
const HomePage = lazy(() => import('./pages/HomePage.tsx'))
const LoginPage = lazy(() => import('./pages/LoginPage.tsx'))
const MyTripsPage = lazy(() => import('./pages/MyTripsPage.tsx'))
const PassengersPage = lazy(() => import('./pages/PassengersPage.tsx'))
const PaymentPage = lazy(() => import('./pages/PaymentPage.tsx'))
const ProfileHistoryPage = lazy(() => import('./pages/ProfileHistoryPage.tsx'))
const ProfilePage = lazy(() => import('./pages/ProfilePage.tsx'))
const ProfileSettingsPage = lazy(() => import('./pages/ProfileSettingsPage.tsx'))
const RegisterPage = lazy(() => import('./pages/RegisterPage.tsx'))
const SearchPage = lazy(() => import('./pages/SearchPage.tsx'))
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage.tsx'))
const SupportPage = lazy(() => import('./pages/SupportPage.tsx'))
const TicketDetailPage = lazy(() => import('./pages/TicketDetailPage.tsx'))
const TripDetailPage = lazy(() => import('./pages/TripDetailPage.tsx'))

function RouteLoader() {
  return (
    <section className="page-shell" aria-label="Loading">
      <p className="page-muted">Loading page...</p>
    </section>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <Suspense fallback={<RouteLoader />}>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="search/results" element={<SearchResultsPage />} />
                <Route path="search/results/:ticketId" element={<TicketDetailPage />} />
                <Route
                  path="booking"
                  element={
                    <RequireAuth>
                      <BookingPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="booking/passengers"
                  element={
                    <RequireAuth>
                      <PassengersPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="booking/payment"
                  element={
                    <RequireAuth>
                      <PaymentPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="booking/success"
                  element={
                    <RequireAuth>
                      <BookingSuccessPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="my-trips"
                  element={
                    <RequireAuth>
                      <MyTripsPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="my-trips/:id"
                  element={
                    <RequireAuth>
                      <TripDetailPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="account"
                  element={
                    <RequireAuth>
                      <AccountPage />
                    </RequireAuth>
                  }
                />
                <Route path="auth" element={<AuthLayout />}>
                  <Route index element={<Navigate to="login" replace />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                </Route>
                <Route
                  path="profile"
                  element={
                    <RequireAuth>
                      <ProfilePage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="profile/settings"
                  element={
                    <RequireAuth>
                      <ProfileSettingsPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="profile/history"
                  element={
                    <RequireAuth>
                      <ProfileHistoryPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="favorites"
                  element={
                    <RequireAuth>
                      <FavoritesPage />
                    </RequireAuth>
                  }
                />
                <Route path="help" element={<HelpLayout />}>
                  <Route index element={<HelpPage />} />
                  <Route path="faq" element={<HelpFAQPage />} />
                  <Route path="support" element={<SupportPage />} />
                </Route>
                <Route
                  path="admin"
                  element={
                    <RequireAuth allowedRoles={['admin', 'manager']}>
                      <AdminLayout />
                    </RequireAuth>
                  }
                >
                  <Route index element={<Navigate to="flights" replace />} />
                  <Route path="flights" element={<AdminFlightsPage />} />
                  <Route path="users" element={<AdminUsersPage />} />
                  <Route path="bookings" element={<AdminBookingsPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </Suspense>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
