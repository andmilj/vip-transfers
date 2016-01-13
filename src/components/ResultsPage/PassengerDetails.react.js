import React, { Component } from 'react';
import BookingSummary from './BookingSummary.react';
import DestinationSummary from './DestinationSummary.react';
import BookingActions from './BookingActions.react';

class PassengerDetails extends Component {
  render() {
    return (
    <div>
      <DestinationSummary />
      <div className="wrap">
        <div className="row">
          <div className="full-width content">
            <h2>Passenger details</h2>
            <p>Please ensure all of the required fields are completed at the time of booking. This information is imperative to ensure a smooth journey.<br />All fields are required.</p>
          </div>
          <div className="three-fourth">
            <form>
              <div className="f-row">
                <div className="one-half">
                  <label htmlFor="name">Name and surname</label>
                  <input type="text" id="name" />
                </div>
                <div className="one-half">
                  <label htmlFor="number">Mobile number</label>
                  <input type="number" id="number" />
                </div>
              </div>
              <div className="f-row">
                <div className="one-half">
                  <label htmlFor="email">Email address</label>
                  <input type="email" id="email" />
                </div>
                <div className="one-half">
                  <label htmlFor="email2">Confirm email address</label>
                  <input type="email" id="email2" />
                </div>
              </div>
              <div className="f-row">
                <div className="one-half">
                  <label htmlFor="address">Street address</label>
                  <input type="text" id="address" />
                </div>
                <div className="one-half">
                  <label htmlFor="zip">Zip code</label>
                  <input type="text" id="zip" />
                </div>
              </div>
              <div className="f-row">
                <div className="one-half">
                  <label htmlFor="city">City</label>
                  <input type="text" id="city" />
                </div>
                <div className="one-half">
                  <label htmlFor="country">Country</label>
                  <input type="text" id="country" />
                </div>
              </div>
              <div className="f-row">
                <div className="one-half">
                  <label htmlFor="payment">Select payment type</label>
                  <select id="payment">
                      <option selected>Paypal</option>
                      <option>Credit card</option>
                      <option>Bank transfer</option>
                  </select>
                </div>
                <div className="one-half">
                  <label htmlFor="promo">Do you have a promotional discount code?</label>
                  <input type="text" id="promo" />
                </div>
              </div>

              <BookingActions />
            </form>
          </div>
          <BookingSummary className="one-fourth"/>
        </div>
      </div>
    </div>
    );
  }
}

export default PassengerDetails;
