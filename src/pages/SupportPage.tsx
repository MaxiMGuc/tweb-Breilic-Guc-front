// Обращение в поддержку.
function SupportPage() {
  return (
    <section className="help-inner" aria-label="Support">
      <header className="page-header">
        <h1 className="page-title">Support</h1>
        <p className="page-lead">Send a message to our team. Response times are indicative only.</p>
      </header>

      <form className="stack-form support-form">
        <label className="field-block">
          <span>Topic</span>
          <select defaultValue="booking">
            <option value="booking">Booking issue</option>
            <option value="payment">Payment</option>
            <option value="refund">Refund</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className="field-block">
          <span>Booking reference (optional)</span>
          <input type="text" placeholder="e.g. ABC123" />
        </label>
        <label className="field-block">
          <span>Message</span>
          <textarea rows={5} placeholder="Describe your question…" />
        </label>
        <label className="field-block">
          <span>Attachment (optional)</span>
          <input type="file" />
        </label>
        <button type="button" className="primary-button">
          Submit request
        </button>
      </form>
    </section>
  )
}

export default SupportPage
