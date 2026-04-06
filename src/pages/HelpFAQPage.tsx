// Часто задаваемые вопросы.
import { useTranslation } from 'react-i18next'

function HelpFAQPage() {
  const { t } = useTranslation()

  return (
    <section className="help-inner" aria-label={t('helpFaq.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('helpFaq.title')}</h1>
        <p className="page-lead">{t('helpFaq.lead')}</p>
      </header>

      <div className="faq-list">
        <details className="faq-item">
          <summary>{t('helpFaq.q1')}</summary>
          <p className="page-muted">{t('helpFaq.a1')}</p>
        </details>
        <details className="faq-item">
          <summary>{t('helpFaq.q2')}</summary>
          <p className="page-muted">{t('helpFaq.a2')}</p>
        </details>
        <details className="faq-item">
          <summary>{t('helpFaq.q3')}</summary>
          <p className="page-muted">{t('helpFaq.a3')}</p>
        </details>
      </div>
    </section>
  )
}

export default HelpFAQPage
