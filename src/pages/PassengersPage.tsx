// Данные пассажиров для бронирования.
import { Link } from 'react-router-dom'

function PassengersPage() {
  return (
    <section className="page-shell" aria-label="Passenger details">
      <ol className="booking-steps" aria-label="Booking progress">
        <li>
          <Link to="/booking">Overview</Link>
        </li>
        <li className="active">Passengers</li>
        <li>
          <Link to="/booking/payment">Payment</Link>
        </li>
        <li>Confirmation</li>
      </ol>

      <header className="page-header">
        <h1 className="page-title">Passenger details</h1>
        <p className="page-lead">Names must match travel documents exactly.</p>
      </header>

      <form className="stack-form">
        <fieldset className="fieldset-card">
          <legend>Adult 1</legend>
          <div className="form-grid-2">
            <label className="field-block">
              <span>First name</span>
              <input type="text" autoComplete="given-name" />
            </label>
            <label className="field-block">
              <span>Last name</span>
              <input type="text" autoComplete="family-name" />
            </label>
            <label className="field-block">
              <span>Date of birth</span>
              <input type="date" />
            </label>
            <label className="field-block">
              <span>Gender</span>
              <select defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                <option value="f">Female</option>
                <option value="m">Male</option>
              </select>
            </label>
            <label className="field-block">
              <span>Document number</span>
              <input type="text" autoComplete="off" />
            </label>
            <label className="field-block">
              <span>Expiry date</span>
              <input type="date" />
            </label>
          </div>
        </fieldset>

        <label className="checkbox-row">
          <input type="checkbox" />
          Add frequent flyer number
        </label>

        <div className="detail-actions">
          <Link to="/booking/payment" className="primary-button">
            Continue to payment
          </Link>
          <Link to="/booking" className="text-button">
            Back
          </Link>
        </div>
      </form>
    </section>
  )
}

export default PassengersPage
