// Верхний промо-блок главной страницы: объясняет ценность сервиса и задает контекст поиска.
// Переиспользуется в составе HomePage.
import { useTranslation } from 'react-i18next'

function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="hero">
      <p className="hero-caption">{t('home.heroCaption')}</p>
      <h1>{t('home.heroTitle')}</h1>
      <p>{t('home.heroLead')}</p>
    </section>
  )
}

export default HeroSection
