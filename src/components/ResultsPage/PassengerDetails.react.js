import React, { Component, PropTypes } from 'react';
import BookingSummary from './BookingSummary.react';
import DestinationSummary from './DestinationSummary.react';
import BookingActions from './BookingActions.react';
import withStyles from '../../decorators/withStyles';
import AddressDetails from './AddressDetails.react';
import _, { partial } from 'lodash';
import styles from './styles';

@withStyles(styles)
class PassengerDetails extends Component {
  static contextTypes = {
    passengerDetails: PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.string,
      email: PropTypes.string,
      country: PropTypes.string,
      city: PropTypes.string,
    }),
    query: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
      persons: PropTypes.string,
      date: PropTypes.string,
    }),
    oneWayAddressDetails: PropTypes.shape({
      pickUpAddress: PropTypes.string,
      dropOffAddress: PropTypes.string,
      arrivalFlightNumber: PropTypes.string,
      departureFlightNumber: PropTypes.string,
    }),
    returnWayAddressDetails: PropTypes.shape({
      pickUpAddress: PropTypes.string,
      dropOffAddress: PropTypes.string,
      arrivalFlightNumber: PropTypes.string,
      departureFlightNumber: PropTypes.string,
    }),
    onDetailsChange: PropTypes.func.isRequired,
    returnEnabled: PropTypes.bool,
  }

  handleChange = ({ target }, fieldToChange = 'passengerDetails') => {
    this.context.onDetailsChange(target.id, target.value, fieldToChange);
  }

  renderReturnAddressDetails = () => {
    if (!this.context.returnEnabled) {
      return null;
    }

    return (
      <div>
        <div className="content">
          <h2>Retrun way destinastion details</h2>
          <p>All fields are required.</p>
        </div>
        <form className="address-details">
          <AddressDetails {...this.context.returnWayAddressDetails}
                          from={this.context.query.to}
                          to={this.context.query.from}
                          onDetailsChange={partial(this.handleChange, _, 'returnWayAddressDetails')} />
        </form>
      </div>
    );
  }

  render() {
    return (
    <div>
      <DestinationSummary />
      <div className="wrap">
        <div className="row">
          <div className="three-fourth">
            <div className="content">
              <h2>One way destinastion details</h2>
              <p>Please ensure all of the required fields are completed at the time of booking. This information is imperative to ensure a smooth journey.<br />All fields are required.</p>
            </div>
            <form className="address-details">
              <AddressDetails {...this.context.oneWayAddressDetails}
                              from={this.context.query.from}
                              to={this.context.query.to}
                              onDetailsChange={partial(this.handleChange, _, 'oneWayAddressDetails')} />
            </form>
            {this.renderReturnAddressDetails()}
            <div className="content">
              <h2>Passenger details</h2>
              <p>All fields are required.</p>
            </div>
            <form>
              <div className="f-row">
                <div className="one-half">
                  <label htmlFor="name">Name and surname</label>
                  <input value={this.context.passengerDetails.name}
                         onChange={this.handleChange}
                         type="text"
                         id="name" />
                </div>
                <div className="one-half">
                  <label htmlFor="number">Mobile number</label>
                  <input value={this.context.passengerDetails.number}
                         onChange={this.handleChange}
                         type="number"
                         id="number" />
                </div>
              </div>
              <div className="f-row">
                <div className="one-half">
                  <label htmlFor="email">Email address</label>
                  <input value={this.context.passengerDetails.email}
                         onChange={this.handleChange}
                          type="email" id="email" />
                </div>
                <div className="one-half">
                  <label htmlFor="email2">Confirm email address</label>
                  <input type="email" id="email2" />
                </div>
              </div>
              <div className="f-row">
                <div className="one-half">
                  <label htmlFor="country">Country</label>
                  <input value={this.context.passengerDetails.country}
                         onChange={this.handleChange}
                         type="text"
                         id="country" />
                </div>
                <div className="one-half">
                  <label htmlFor="city">City</label>
                  <input value={this.context.passengerDetails.city}
                         onChange={this.handleChange}
                         type="text"
                         id="city" />
                </div>
              </div>
              <BookingActions />
            </form>
          </div>
          <aside className="sidebar right one-fourth">
            <BookingSummary />
          </aside>
        </div>
      </div>
    </div>
    );
  }
}

export default PassengerDetails;
