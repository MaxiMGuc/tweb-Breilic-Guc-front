// Оплата бронирования: форма карты и биллинг (без реальной оплаты).
import { Link } from 'react-router-dom'

function PaymentPage() {
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
        <p className="page-lead">Total due: <strong>$412.00</strong> (placeholder)</p>
      </header>

      <div className="payment-layout">
        <div className="fieldset-card">
          <h2>Card</h2>
          <label className="field-block">
            <span>Card number</span>
            <input type="text" inputMode="numeric" placeholder="0000 0000 0000 0000" autoComplete="cc-number" />
          </label>
          <div className="form-grid-2">
            <label className="field-block">
              <span>Expiry</span>
              <input type="text" placeholder="MM/YY" autoComplete="cc-exp" />
            </label>
            <label className="field-block">
              <span>CVC</span>
              <input type="password" autoComplete="cc-csc" />
            </label>
          </div>
          <label className="field-block">
            <span>Cardholder name</span>
            <input type="text" autoComplete="cc-name" />
          </label>
        </div>

        <div className="fieldset-card">
          <h2>Billing address</h2>
          <label className="field-block">
            <span>Country</span>
            <select defaultValue="">
              <option value="" disabled>
                Select country
              </option>
              <option value="us">United States</option>
              <option value="ru">Russia</option>
              <option value="tr">Turkey</option>
            </select>
          </label>
          <label className="field-block">
            <span>City</span>
            <input type="text" />
          </label>
          <label className="field-block">
            <span>Address line</span>
            <input type="text" autoComplete="street-address" />
          </label>
          <label className="checkbox-row">
            <input type="checkbox" defaultChecked />
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
