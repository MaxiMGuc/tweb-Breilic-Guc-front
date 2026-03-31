// Точка входа приложения: инициализирует React, роутер и карту маршрутов.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/AuthContext.tsx'
import { BookingProvider } from './context/BookingContext.tsx'
import App from './App.tsx'
import HelpLayout from './components/HelpLayout.tsx'
import AdminBookingsPage from './pages/AdminBookingsPage.tsx'
import AdminFlightsPage from './pages/AdminFlightsPage.tsx'
import AdminUsersPage from './pages/AdminUsersPage.tsx'
import BookingPage from './pages/BookingPage.tsx'
import BookingSuccessPage from './pages/BookingSuccessPage.tsx'
import FavoritesPage from './pages/FavoritesPage.tsx'
import HelpFAQPage from './pages/HelpFAQPage.tsx'
import HelpPage from './pages/HelpPage.tsx'
import HomePage from './pages/HomePage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import MyTripsPage from './pages/MyTripsPage.tsx'
import PassengersPage from './pages/PassengersPage.tsx'
import PaymentPage from './pages/PaymentPage.tsx'
import ProfileHistoryPage from './pages/ProfileHistoryPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import ProfileSettingsPage from './pages/ProfileSettingsPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import SearchPage from './pages/SearchPage.tsx'
import SearchResultsPage from './pages/SearchResultsPage.tsx'
import SupportPage from './pages/SupportPage.tsx'
import TicketDetailPage from './pages/TicketDetailPage.tsx'
import TripDetailPage from './pages/TripDetailPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/results" element={<SearchResultsPage />} />
          <Route path="search/results/:ticketId" element={<TicketDetailPage />} />
          <Route path="booking" element={<BookingPage />} />
          <Route path="booking/passengers" element={<PassengersPage />} />
          <Route path="booking/payment" element={<PaymentPage />} />
          <Route path="booking/success" element={<BookingSuccessPage />} />
          <Route path="my-trips" element={<MyTripsPage />} />
          <Route path="my-trips/:id" element={<TripDetailPage />} />
          <Route path="auth/login" element={<LoginPage />} />
          <Route path="auth/register" element={<RegisterPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/settings" element={<ProfileSettingsPage />} />
          <Route path="profile/history" element={<ProfileHistoryPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="help" element={<HelpLayout />}>
            <Route index element={<HelpPage />} />
            <Route path="faq" element={<HelpFAQPage />} />
            <Route path="support" element={<SupportPage />} />
          </Route>
          <Route path="admin/flights" element={<AdminFlightsPage />} />
          <Route path="admin/users" element={<AdminUsersPage />} />
          <Route path="admin/bookings" element={<AdminBookingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
