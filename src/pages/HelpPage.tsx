// Центр помощи: краткая инструкция по покупке билетов (вложена в HelpLayout).
function HelpPage() {
  return (
    <section className="help-inner help-page" aria-label="Help for customers">
      <h2>Help center: how to buy tickets</h2>
      <p className="help-intro">
        Follow this short guide to quickly find and purchase the best flight for your trip.
      </p>

      <ol className="help-steps">
        <li>
          <strong>Enter route details.</strong> Fill in your departure city, destination, and travel
          dates in the search form.
        </li>
        <li>
          <strong>Start search.</strong> Press <em>Search tickets</em> to see available options from
          different airlines.
        </li>
        <li>
          <strong>Compare offers.</strong> Check price, flight duration, number of stops, and baggage
          rules before choosing.
        </li>
        <li>
          <strong>Open the selected offer.</strong> Click the option you like to continue to booking.
        </li>
        <li>
          <strong>Complete passenger details.</strong> Enter traveler names exactly as in passports and
          verify all dates.
        </li>
        <li>
          <strong>Pay and save confirmation.</strong> After payment, save the booking confirmation and
          e-ticket to your phone or email.
        </li>
      </ol>

      <div className="help-tips">
        <h3>Useful tips</h3>
        <ul>
          <li>Book early to get lower prices and better schedules.</li>
          <li>Double-check baggage rules for each fare before payment.</li>
          <li>Arrive at the airport at least 2 hours before departure.</li>
        </ul>
      </div>
    </section>
  )
}

export default HelpPage
