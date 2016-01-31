import React, { Component, PropTypes } from 'react';
import BookingActions from './BookingActions.react';
import BookingHelp from './BookingHelp.react';
import FormatUtils from '../../utils/Format.utils';
import SummaryRow from './SummaryRow.react';
import moment from 'moment';

const queryShape = PropTypes.shape({
  from: PropTypes.string,
  to: PropTypes.string,
  persons: PropTypes.string,
  date: PropTypes.string,
});

class Summary extends Component {
  static contextTypes = {
    passengerDetails: PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.string,
      email: PropTypes.string,
      country: PropTypes.string,
      city: PropTypes.string,
    }).isRequired,
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
    price: PropTypes.number.isRequired,
    query: queryShape.isRequired,
    returnEnabled: PropTypes.bool,
    returnDate: PropTypes.instanceOf(Date),
    vehicleType: PropTypes.string.isRequired,
    extrasDeparture: PropTypes.object,
    extrasReturn: PropTypes.object,
  }

  renderReturn = () => {
    const { returnDate, query, vehicleType, returnWayAddressDetails } = this.context;
    const _date = moment(returnDate).format('DD.MM.YYYY HH:mm');

    if (!this.context.returnEnabled) {
      return null;
    }

    return (
      <div>
        <h3 style={{borderTop: '1px solid #DFDFD0', marginTop: 10, paddingTop: 20}}>
          Return Transfer details
        </h3>
        <SummaryRow label="Date" value={_date} />
        <SummaryRow label="From" value={FormatUtils.cityName(query.to)} />
        {returnWayAddressDetails.pickUpAddress ? (
          <SummaryRow label="Drop off address" value={returnWayAddressDetails.pickUpAddress} />
          ) : (
          <SummaryRow label="Arrival flight number" value={returnWayAddressDetails.arrivalFlightNumber} />
          )
        }
        <SummaryRow label="To" value={FormatUtils.cityName(query.from)} />
        {returnWayAddressDetails.dropOffAddress ? (
          <SummaryRow label="Drop off address" value={returnWayAddressDetails.dropOffAddress} />
          ) : (
          <SummaryRow label="Departure flight number" value={returnWayAddressDetails.departureFlightNumber} />
          )
        }
        <SummaryRow label="Vehicle" value={vehicleType} />
        <SummaryRow label="Date" value={_date} />
      </div>
    );
  }

  render() {
    const { passengerDetails, query, vehicleType, oneWayAddressDetails } = this.context;
    const _date = moment(parseInt(query.date, 10)).format('DD.MM.YYYY HH:mm');
    return (
    <div>
      <header className="site-title color">
        <div className="wrap">
          <div className="container">
            <h1>Please verify your data.</h1>
          </div>
        </div>
      </header>
      <div className="wrap">
        <div className="row">
          <div className="three-fourth">
            <form className="box readonly">
              <h3>Passenger details</h3>
              <SummaryRow label="Name and surname" value={passengerDetails.name} />
              <SummaryRow label="Mobile number" value={passengerDetails.number} />
              <SummaryRow label="Email address" value={passengerDetails.email} />
              <SummaryRow label="City" value={passengerDetails.city} />
              <SummaryRow label="Country" value={passengerDetails.country} />

              <h3>First way transfer details</h3>
              <SummaryRow label="Date" value={_date} />
                <SummaryRow label="From" value={FormatUtils.cityName(query.from)} />
                {oneWayAddressDetails.pickUpAddress ? (
                  <SummaryRow label="Drop off address" value={oneWayAddressDetails.pickUpAddress} />
                  ) : (
                  <SummaryRow label="Arrival flight number" value={oneWayAddressDetails.arrivalFlightNumber} />
                  )
                }
                <SummaryRow label="To" value={FormatUtils.cityName(query.to)} />
                {oneWayAddressDetails.dropOffAddress ? (
                  <SummaryRow label="Drop off address" value={oneWayAddressDetails.dropOffAddress} />
                  ) : (
                  <SummaryRow label="Departure flight number" value={oneWayAddressDetails.departureFlightNumber} />
                  )
                }
              <SummaryRow label="Vehicle" value={vehicleType} />
              <SummaryRow label="Date" value={_date} />

              {this.renderReturn()}

              <h3>TOTAL: {this.context.price} USD</h3>
            </form>
            <BookingActions />
          </div>
          <aside className="one-fourth sidebar right">
            <BookingHelp />
          </aside>
        </div>
      </div>
    </div>
    );
  }
}

export default Summary;
