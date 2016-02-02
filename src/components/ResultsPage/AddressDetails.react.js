import React, { Component, PropTypes } from 'react';
import { isAirport } from '../../utils/Format.utils';
import FormElement from './FormElement.react';
import { includes } from 'lodash';

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
    errors: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    errors: [],
  }

  hasError = (id) => {
    return includes(this.props.errors, id);
  }

  handleChange = (event) => {
    this.props.onDetailsChange(event);
  }

  render() {
    const isAirportFrom = isAirport(this.props.from);
    const isAirportTo = isAirport(this.props.to);
    return (
        <div className="f-row">
          {isAirportFrom ? (
            <FormElement className="one-half"
                         id="arrivalFlightNumber"
                         error={this.hasError('arrivalFlightNumber')}
                         label="Arrival flight number"
                         onChange={this.handleChange}
                         value={this.props.arrivalFlightNumber}/>
            ) : (
            <FormElement className="one-half"
                         id="pickUpAddress"
                         error={this.hasError('pickUpAddress')}
                         label="Pick up Address"
                         onChange={this.handleChange}
                         value={this.props.pickUpAddress}/>
            )}
          {isAirportTo ? (
            <FormElement className="one-half"
                         id="departureFlightNumber"
                         error={this.hasError('departureFlightNumber')}
                         label="Departure flight number"
                         onChange={this.handleChange}
                         value={this.props.departureFlightNumber}/>
            ) : (
              <FormElement className="one-half"
                           id="dropOffAddress"
                           error={this.hasError('dropOffAddress')}
                           label="Drop off Address"
                           onChange={this.handleChange}
                           value={this.props.dropOffAddress}/>
            )}
        </div>
    );
  }
}

export default AddressDetails;
