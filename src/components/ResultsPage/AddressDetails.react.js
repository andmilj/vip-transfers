import React, { Component, PropTypes } from 'react';
import FormatUtils from '../../utils/Format.utils';

class AddressDetails extends Component {
  static propTypes = {
    arrivalFlightNumber: PropTypes.string,
    pickUpAddress: PropTypes.string,
    departureFlightNumber: PropTypes.string,
    dropOffAddress: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string,
    onDetailsChange: PropTypes.func.isRequired,
    returnEnabled: PropTypes.bool,
  }

  handleChange = (event) => {
    this.props.onDetailsChange(event);
  }

  render() {
    const isAirportFrom = FormatUtils.isAirport(this.props.from);
    const isAirportTo = FormatUtils.isAirport(this.props.to);
    return (
        <div className="f-row">
          {isAirportFrom ? (
              <div className="one-half">
                <label htmlFor="arrivalFlightNumber">Arrival flight number</label>
                <input value={this.props.arrivalFlightNumber}
                       onChange={this.handleChange}
                       type="text"
                       id="arrivalFlightNumber" />
              </div>
            ) : (
              <div className="one-half">
                <label htmlFor="pickUpAddress">Pick up Address</label>
                <input value={this.props.pickUpAddress}
                       onChange={this.handleChange}
                       type="text"
                       id="pickUpAddress" />
              </div>
            )}
          {isAirportTo ? (
              <div className="one-half">
                <label htmlFor="departureFlightNumber">Departure flight number</label>
                <input value={this.props.departureFlightNumber}
                       onChange={this.handleChange}
                       type="text"
                       id="departureFlightNumber" />
              </div>
            ) : (
              <div className="one-half">
                <label htmlFor="dropOffAddress">Drop off Address</label>
                <input value={this.props.dropOffAddress}
                       onChange={this.handleChange}
                       type="text"
                       id="dropOffAddress" />
              </div>
            )}
        </div>
    );
  }
}

export default AddressDetails;
