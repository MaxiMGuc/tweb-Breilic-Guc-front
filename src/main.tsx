// Точка входа приложения: инициализирует React, роутер и карту маршрутов.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import FavoritesPage from './pages/FavoritesPage.tsx'
import HelpPage from './pages/HelpPage.tsx'
import HotelsPage from './pages/HotelsPage.tsx'
import MultiCityPage from './pages/MultiCityPage.tsx'
import HomePage from './pages/HomePage.tsx'
import OneWayPage from './pages/OneWayPage.tsx'
import ShortsPage from './pages/ShortsPage.tsx'

// Рендер дерева приложения с маршрутизацией между главной страницей и страницей помощи.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="hotels" element={<HotelsPage />} />
          <Route path="shorts" element={<ShortsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="one-way" element={<OneWayPage />} />
          <Route path="multi-city" element={<MultiCityPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
