import React, { Component } from 'react';
import ExtrasTable from './ExtrasTable.react';
import BookingSummary from './BookingSummary.react';
import DestinationSummary from './DestinationSummary.react';
import BookingActions from './BookingActions.react';

class Extras extends Component {
  render() {
    return (
      <div>
        <DestinationSummary />
        <div className="wrap">
          <div className="row">
            <div className="full-width content">
              <h2>Baggage and extras</h2>
              <p>Please select the total number of pieces of baggage and extras for your transfers. If you arrive with more luggage than specified at booking, we cannot guarantee to transport them. In case we are able to transport them, we will charge you an additional fee.</p>
            </div>
            <div className="three-fourth">
              <form>
                <ExtrasTable />
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

export default Extras;
