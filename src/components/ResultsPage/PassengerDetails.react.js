import React, { Component, PropTypes } from 'react';
import BookingSummary from './BookingSummary.react';
import DestinationSummary from './DestinationSummary.react';
import BookingActions from './BookingActions.react';
import withStyles from '../../decorators/withStyles';
import AddressDetails from './AddressDetails.react';
import FormElement from './FormElement.react';
import _, { partial, includes } from 'lodash';
import { getAddressErrors } from '../../utils/Validation.utils';
import styles from './styles';

@withStyles(styles)
class PassengerDetails extends Component {
  static contextTypes = {
    errors: PropTypes.arrayOf(PropTypes.string),
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

  hasError = (id) => {
    return includes(this.context.errors, 'passengerDetails.' + id);
  }

  handleChange = ({ target }, fieldToChange = 'passengerDetails') => {
    this.context.onDetailsChange(target.id, target.value, fieldToChange);
  }

  renderReturnAddressDetails = () => {
    if (!this.context.returnEnabled) {
      return null;
    }
    const errors = getAddressErrors(this.context.errors, 'returnWayAddressDetails');

    return (
      <div>
        <div className="content">
          <h2>Return way destinastion details</h2>
          <p>All fields are required.</p>
        </div>
        <form className="address-details">
          <AddressDetails {...this.context.returnWayAddressDetails}
                          from={this.context.query.to}
                          to={this.context.query.from}
                          errors={errors}
                          onDetailsChange={partial(this.handleChange, _, 'returnWayAddressDetails')} />
        </form>
      </div>
    );
  }

  render() {
    const errors = getAddressErrors(this.context.errors);

    return (
    <div>
      <DestinationSummary />
      <div className="wrap">
        <div className="row">
          <div className="three-fourth">
            <div className="content">
              <h2>First way destinastion details</h2>
              <p>Please ensure all of the required fields are completed at the time of booking. This information is imperative to ensure a smooth journey.<br />All fields are required.</p>
            </div>
            <form className="address-details">
              <AddressDetails {...this.context.oneWayAddressDetails}
                              from={this.context.query.from}
                              to={this.context.query.to}
                              errors={errors}
                              onDetailsChange={partial(this.handleChange, _, 'oneWayAddressDetails')} />
            </form>
            {this.renderReturnAddressDetails()}
            <div className="content">
              <h2>Passenger details</h2>
              <p>All fields are required.</p>
            </div>
            <form>
              <div className="f-row">
                <FormElement className="one-half"
                             id="name"
                             error={this.hasError('name')}
                             label="Name and surname"
                             onChange={this.handleChange}
                             value={this.context.passengerDetails.name}/>
                <FormElement className="one-half"
                             id="number"
                             error={this.hasError('number')}
                             type="number"
                             label="Mobile number"
                             onChange={this.handleChange}
                             value={this.context.passengerDetails.number}/>
              </div>
              <div className="f-row">
                <FormElement className="one-half"
                             id="email"
                             type="email"
                             error={this.hasError('email')}
                             label="Email address"
                             onChange={this.handleChange}
                             value={this.context.passengerDetails.email}/>
                <div className="one-half">
                  <label htmlFor="email2">Confirm email address</label>
                  <input type="email" id="email2" />
                </div>
              </div>
              <div className="f-row">
                <FormElement className="one-half"
                             id="country"
                             error={this.hasError('country')}
                             label="Country"
                             onChange={this.handleChange}
                             value={this.context.passengerDetails.country}/>
                <FormElement className="one-half"
                             id="city"
                             error={this.hasError('city')}
                             label="City"
                             onChange={this.handleChange}
                             value={this.context.passengerDetails.city}/>
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
