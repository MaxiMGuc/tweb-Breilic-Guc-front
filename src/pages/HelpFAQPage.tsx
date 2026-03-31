// Часто задаваемые вопросы.
function HelpFAQPage() {
  return (
    <section className="help-inner" aria-label="FAQ">
      <header className="page-header">
        <h1 className="page-title">FAQ</h1>
        <p className="page-lead">Quick answers about booking, baggage, and changes.</p>
      </header>

      <div className="faq-list">
        <details className="faq-item">
          <summary>How do I change or cancel a ticket?</summary>
          <p className="page-muted">
            Fare rules depend on the airline. Use “Manage booking” in My trips when available.
          </p>
        </details>
        <details className="faq-item">
          <summary>When will I receive my e-ticket?</summary>
          <p className="page-muted">After successful payment, confirmation is sent by email (placeholder).</p>
        </details>
        <details className="faq-item">
          <summary>Can I choose seats?</summary>
          <p className="page-muted">Seat maps and fees vary by carrier; options appear before payment.</p>
        </details>
      </div>
    </section>
  )
}

export default HelpFAQPage
