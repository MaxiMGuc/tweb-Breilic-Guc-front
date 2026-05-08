// FAQ: раскрывающиеся ответы и поиск по тексту.
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const FAQ_INDEX = [1, 2, 3, 4, 5] as const

function HelpFAQPage() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')

  const faqItems = useMemo(
    () =>
      FAQ_INDEX.map((i) => ({
        q: t(`helpFaq.q${i}`),
        a: t(`helpFaq.a${i}`),
      })),
    [t],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return faqItems
    return faqItems.filter((item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q))
  }, [faqItems, query])

  return (
    <section className="help-inner" aria-label={t('helpFaq.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('helpFaq.title')}</h1>
        <p className="page-lead">{t('helpFaq.lead')}</p>
      </header>

      <label className="field-block" style={{ marginBottom: 16 }}>
        <span>{t('helpFaq.searchQuestions')}</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('helpFaq.searchPlaceholder')}
          aria-label={t('helpFaq.filterAria')}
        />
      </label>

      <div className="faq-list">
        {filtered.length === 0 ? <p className="page-muted">{t('helpFaq.noMatch')}</p> : null}
        {filtered.map((item) => (
          <details key={item.q} className="faq-item">
            <summary>{item.q}</summary>
            <p className="page-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export default HelpFAQPage
