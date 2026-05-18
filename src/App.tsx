// Основной layout приложения: шапка с навигацией и контейнер текущей страницы.
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.tsx'

function App() {
  return (
    <main className="app">
      <Navbar />
      <Outlet />
    </main>
  )
}

export default App
