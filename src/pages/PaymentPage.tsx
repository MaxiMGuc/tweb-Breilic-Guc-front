// Оплата: черновик полей в sessionStorage чтобы «Back» не очищал форму (T27).
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PAYMENT_DRAFT_KEY = 'breilic_payment_draft_v1'

type PaymentDraft = {
  cardNumber: string
  expiry: string
  cvc: string
  holder: string
  country: string
  city: string
  address: string
  terms: boolean
}

const emptyDraft: PaymentDraft = {
  cardNumber: '',
  expiry: '',
  cvc: '',
  holder: '',
  country: '',
  city: '',
  address: '',
  terms: true,
}

function loadDraft(): PaymentDraft {
  try {
    const raw = sessionStorage.getItem(PAYMENT_DRAFT_KEY)
    if (!raw) return emptyDraft
    const p = JSON.parse(raw) as Partial<PaymentDraft>
    return {
      cardNumber: String(p.cardNumber ?? ''),
      expiry: String(p.expiry ?? ''),
      cvc: String(p.cvc ?? ''),
      holder: String(p.holder ?? ''),
      country: String(p.country ?? ''),
      city: String(p.city ?? ''),
      address: String(p.address ?? ''),
      terms: p.terms !== false,
    }
  } catch {
    return emptyDraft
  }
}

function PaymentPage() {
  const [draft, setDraft] = useState<PaymentDraft>(() => loadDraft())

  useEffect(() => {
    try {
      sessionStorage.setItem(PAYMENT_DRAFT_KEY, JSON.stringify(draft))
    } catch {
      /* ignore */
    }
  }, [draft])

  const setField = <K extends keyof PaymentDraft>(key: K, value: PaymentDraft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }))
  }

  return (
    <section className="page-shell" aria-label="Payment">
      <ol className="booking-steps" aria-label="Booking progress">
        <li>
          <Link to="/booking">Overview</Link>
        </li>
        <li>
          <Link to="/booking/passengers">Passengers</Link>
        </li>
        <li className="active">Payment</li>
        <li>Confirmation</li>
      </ol>

      <header className="page-header">
        <h1 className="page-title">Payment</h1>
        <p className="page-lead">
          Total due: <strong>$412.00</strong> (placeholder)
        </p>
      </header>

      <div className="payment-layout">
        <div className="fieldset-card">
          <h2>Card</h2>
          <label className="field-block">
            <span>Card number</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="0000 0000 0000 0000"
              autoComplete="cc-number"
              value={draft.cardNumber}
              onChange={(e) => setField('cardNumber', e.target.value)}
            />
          </label>
          <div className="form-grid-2">
            <label className="field-block">
              <span>Expiry</span>
              <input
                type="text"
                placeholder="MM/YY"
                autoComplete="cc-exp"
                value={draft.expiry}
                onChange={(e) => setField('expiry', e.target.value)}
              />
            </label>
            <label className="field-block">
              <span>CVC</span>
              <input
                type="password"
                autoComplete="cc-csc"
                value={draft.cvc}
                onChange={(e) => setField('cvc', e.target.value)}
              />
            </label>
          </div>
          <label className="field-block">
            <span>Cardholder name</span>
            <input
              type="text"
              autoComplete="cc-name"
              value={draft.holder}
              onChange={(e) => setField('holder', e.target.value)}
            />
          </label>
        </div>

        <div className="fieldset-card">
          <h2>Billing address</h2>
          <label className="field-block">
            <span>Country</span>
            <select
              value={draft.country}
              onChange={(e) => setField('country', e.target.value)}
            >
              <option value="">Select country</option>
              <option value="us">United States</option>
              <option value="ru">Russia</option>
              <option value="tr">Turkey</option>
            </select>
          </label>
          <label className="field-block">
            <span>City</span>
            <input type="text" value={draft.city} onChange={(e) => setField('city', e.target.value)} />
          </label>
          <label className="field-block">
            <span>Address line</span>
            <input
              type="text"
              autoComplete="street-address"
              value={draft.address}
              onChange={(e) => setField('address', e.target.value)}
            />
          </label>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={draft.terms}
              onChange={(e) => setField('terms', e.target.checked)}
            />
            I agree to the terms and fare rules
          </label>
        </div>
      </div>

      <div className="detail-actions">
        <Link to="/booking/success" className="primary-button">
          Pay now
        </Link>
        <Link to="/booking/passengers" className="text-button">
          Back
        </Link>
      </div>
    </section>
  )
}

export default PaymentPage
