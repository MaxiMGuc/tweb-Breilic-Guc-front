// FAQ: раскрывающиеся ответы и поиск по тексту (T49–T51).
import { useMemo, useState } from 'react'

type FaqItem = { q: string; a: string }

const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'How do I change or cancel a ticket?',
    a: 'Fare rules depend on the airline. Use “Manage booking” in My trips when available.',
  },
  {
    q: 'When will I receive my e-ticket?',
    a: 'After successful payment, confirmation is sent by email (placeholder).',
  },
  {
    q: 'Can I choose seats?',
    a: 'Seat maps and fees vary by carrier; options appear before payment.',
  },
  {
    q: 'What payment methods are supported?',
    a: 'Cards and local methods shown at checkout are for demo; production would use a payment provider.',
  },
  {
    q: 'How do baggage allowances work?',
    a: 'Each fare tier lists included baggage; extra bags can often be added for a fee before departure.',
  },
]

function HelpFAQPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return FAQ_ITEMS
    return FAQ_ITEMS.filter((item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q))
  }, [query])

  return (
    <section className="help-inner" aria-label="FAQ">
      <header className="page-header">
        <h1 className="page-title">FAQ</h1>
        <p className="page-lead">Quick answers about booking, baggage, and changes.</p>
      </header>

      <label className="field-block" style={{ marginBottom: 16 }}>
        <span>Search questions</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to filter…"
          aria-label="Filter FAQ"
        />
      </label>

      <div className="faq-list">
        {filtered.length === 0 ? <p className="page-muted">No questions match your search.</p> : null}
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
