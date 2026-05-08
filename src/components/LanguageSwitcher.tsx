// Выпадающее меню выбора языка интерфейса (EN / RU).
import { useTranslation } from 'react-i18next'

function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const current = i18n.language.startsWith('ru') ? 'ru' : 'en'

  return (
    <details className="nav-dropdown lang-dropdown">
      <summary className="nav-dropdown-trigger">{t('language.label')}</summary>
      <div className="nav-dropdown-panel" role="menu">
        <button
          type="button"
          className={`nav-dropdown-link ${current === 'en' ? 'active' : ''}`}
          role="menuitem"
          onClick={() => {
            void i18n.changeLanguage('en')
          }}
        >
          {t('language.en')}
        </button>
        <button
          type="button"
          className={`nav-dropdown-link ${current === 'ru' ? 'active' : ''}`}
          role="menuitem"
          onClick={() => {
            void i18n.changeLanguage('ru')
          }}
        >
          {t('language.ru')}
        </button>
      </div>
    </details>
  )
}

export default LanguageSwitcher
