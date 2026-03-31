// Главная страница приложения: собирает ключевые секции поиска и витрины предложений.
import HeroSection from '../components/HeroSection'
import PopularOffers from '../components/PopularOffers'
import SearchCard from '../components/SearchCard'
import { popularTickets } from '../data/popularTickets'

// Компонуем главную из отдельных независимых UI-компонентов.
function HomePage() {
  return (
    <>
      <HeroSection />
      <SearchCard />
      <PopularOffers tickets={popularTickets} />
    </>
  )
}

export default HomePage
