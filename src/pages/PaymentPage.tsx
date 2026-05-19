// Учебный проект: оплата симуляция — любые данные, всегда переход на успех.
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SS_PAYMENT_DRAFT } from '../constants/storageKeys.ts'
import { readVersionedStorage, writeVersionedStorage } from '../utils/storage.ts'
import { useBooking } from '../context/BookingContext.tsx'
import { ordersService } from '../api/index.ts'

type PaymentDraft = {
  cardNumber: string
  expiry: string
  cvc: string
  holder: string
  country: string
  city: string
  address: string
}

type PersistedPaymentDraft = Pick<PaymentDraft, 'country' | 'city' | 'address'>

function loadDraft(): PaymentDraft {
  const persisted = readVersionedStorage<Partial<PersistedPaymentDraft>>(SS_PAYMENT_DRAFT, {
    area: 'session',
    expectedVersion: 1,
    fallback: {},
  })
  return {
    cardNumber: '',
    expiry: '',
    cvc: '',
    holder: '',
    country: String(persisted.country ?? ''),
    city: String(persisted.city ?? ''),
    address: String(persisted.address ?? ''),
  }
}

function PaymentPage() {
  const [draft, setDraft] = useState<PaymentDraft>(() => loadDraft())
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()
  const { selectedOffer } = useBooking()

  const totalLabel =
    selectedOffer != null
      ? `${selectedOffer.currency ?? '$'}${selectedOffer.priceFrom?.toFixed?.(2) ?? selectedOffer.priceFrom}`
      : '—'

  const handlePay = async () => {
    setBusy(true)
    let ref = `DEMO-${Date.now().toString(36).toUpperCase()}`

    const productId = selectedOffer?.ticketId ? Number(selectedOffer.ticketId) : NaN
    if (Number.isFinite(productId) && productId > 0) {
      try {
        const order = await ordersService.create({
          items: [{ productId, qua: 1 }],
        })
        ref = `ORD-${order.id}`
      } catch {
        /* демо: заказ в БД не обязателен */
      }
    }

    navigate('/booking/success', {
      state: { ref, demoPayment: true },
    })
    setBusy(false)
  }

  useEffect(() => {
    const safeDraft: PersistedPaymentDraft = {
      country: draft.country,
      city: draft.city,
      address: draft.address,
    }
    writeVersionedStorage(SS_PAYMENT_DRAFT, safeDraft, { area: 'session', version: 1 })
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
        <h1 className="page-title">Payment (demo)</h1>
        <p className="page-lead">
          Учебная симуляция: реальных платежей нет. Укажите любые данные и нажмите кнопку — бронирование завершится.
        </p>
        <p className="page-muted">
          К оплате (ориентир): <strong>{totalLabel}</strong>
        </p>
      </header>

      <div className="payment-layout">
        <div className="fieldset-card">
          <h2>Card (примерная форма)</h2>
          <label className="field-block">
            <span>Card number</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Любые цифры"
              autoComplete="off"
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
                autoComplete="off"
                value={draft.expiry}
                onChange={(e) => setField('expiry', e.target.value)}
              />
            </label>
            <label className="field-block">
              <span>CVC</span>
              <input
                type="text"
                autoComplete="off"
                placeholder="123"
                value={draft.cvc}
                onChange={(e) => setField('cvc', e.target.value)}
              />
            </label>
          </div>
          <label className="field-block">
            <span>Cardholder name</span>
            <input
              type="text"
              autoComplete="off"
              placeholder="Имя как угодно"
              value={draft.holder}
              onChange={(e) => setField('holder', e.target.value)}
            />
          </label>
        </div>

        <div className="fieldset-card">
          <h2>Billing (необязательно)</h2>
          <label className="field-block">
            <span>Country</span>
            <select value={draft.country} onChange={(e) => setField('country', e.target.value)}>
              <option value="">—</option>
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
              autoComplete="off"
              value={draft.address}
              onChange={(e) => setField('address', e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="detail-actions">
        <button type="button" className="primary-button" onClick={() => void handlePay()} disabled={busy}>
          {busy ? 'Завершаем…' : 'Подтвердить (демо-оплата)'}
        </button>
        <Link to="/booking/passengers" className="text-button">
          Back
        </Link>
      </div>
    </section>
  )
}

export default PaymentPage
