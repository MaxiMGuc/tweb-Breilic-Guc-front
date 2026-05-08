// Оплата: в sessionStorage сохраняются только безопасные billing-поля (без данных карты).
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SS_PAYMENT_DRAFT } from '../constants/storageKeys.ts'
import { readVersionedStorage, writeVersionedStorage } from '../utils/storage.ts'

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

type PersistedPaymentDraft = Pick<PaymentDraft, 'country' | 'city' | 'address' | 'terms'>

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
    terms: persisted.terms !== false,
  }
}

function PaymentPage() {
  const { t } = useTranslation()
  const [draft, setDraft] = useState<PaymentDraft>(() => loadDraft())

  useEffect(() => {
    const safeDraft: PersistedPaymentDraft = {
      country: draft.country,
      city: draft.city,
      address: draft.address,
      terms: draft.terms,
    }
    writeVersionedStorage(SS_PAYMENT_DRAFT, safeDraft, { area: 'session', version: 1 })
  }, [draft])

  const setField = <K extends keyof PaymentDraft>(key: K, value: PaymentDraft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }))
  }

  return (
    <section className="page-shell" aria-label={t('payment.aria')}>
      <ol className="booking-steps" aria-label={t('bookingFlow.stepsAria')}>
        <li>
          <Link to="/booking">{t('bookingFlow.overview')}</Link>
        </li>
        <li>
          <Link to="/booking/passengers">{t('bookingFlow.passengers')}</Link>
        </li>
        <li className="active">{t('bookingFlow.payment')}</li>
        <li>{t('bookingFlow.confirmation')}</li>
      </ol>

      <header className="page-header">
        <h1 className="page-title">{t('payment.title')}</h1>
        <p className="page-lead">
          {t('payment.leadPrefix')} <strong>$412.00</strong> {t('payment.leadSuffix')}
        </p>
      </header>

      <div className="payment-layout">
        <div className="fieldset-card">
          <h2>{t('payment.card')}</h2>
          <label className="field-block">
            <span>{t('payment.cardNumber')}</span>
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
              <span>{t('payment.expiry')}</span>
              <input
                type="text"
                placeholder="MM/YY"
                autoComplete="cc-exp"
                value={draft.expiry}
                onChange={(e) => setField('expiry', e.target.value)}
              />
            </label>
            <label className="field-block">
              <span>{t('payment.cvc')}</span>
              <input
                type="password"
                autoComplete="cc-csc"
                value={draft.cvc}
                onChange={(e) => setField('cvc', e.target.value)}
              />
            </label>
          </div>
          <label className="field-block">
            <span>{t('payment.cardholder')}</span>
            <input
              type="text"
              autoComplete="cc-name"
              value={draft.holder}
              onChange={(e) => setField('holder', e.target.value)}
            />
          </label>
        </div>

        <div className="fieldset-card">
          <h2>{t('payment.billing')}</h2>
          <label className="field-block">
            <span>{t('payment.country')}</span>
            <select value={draft.country} onChange={(e) => setField('country', e.target.value)}>
              <option value="" disabled>
                {t('payment.selectCountry')}
              </option>
              <option value="us">{t('payment.countryUs')}</option>
              <option value="ru">{t('payment.countryRu')}</option>
              <option value="tr">{t('payment.countryTr')}</option>
            </select>
          </label>
          <label className="field-block">
            <span>{t('payment.city')}</span>
            <input type="text" value={draft.city} onChange={(e) => setField('city', e.target.value)} />
          </label>
          <label className="field-block">
            <span>{t('payment.addressLine')}</span>
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
            {t('payment.agreeFare')}
          </label>
        </div>
      </div>

      <div className="detail-actions">
        <Link to="/booking/success" className="primary-button">
          {t('payment.payNow')}
        </Link>
        <Link to="/booking/passengers" className="text-button">
          {t('payment.back')}
        </Link>
      </div>
    </section>
  )
}

export default PaymentPage
