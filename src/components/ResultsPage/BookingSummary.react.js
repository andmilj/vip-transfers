import React, { Component, PropTypes } from 'react';
import moment from 'moment';

const queryShape = PropTypes.shape({
  from: PropTypes.string,
  to: PropTypes.string,
  persons: PropTypes.string,
  date: PropTypes.string,
});

class BookingSummary extends Component {
  static contextTypes = {
    extrasDeparture: PropTypes.object,
    extrasReturn: PropTypes.object,
    query: queryShape,
    queryReturn: queryShape,
    vehicleType: PropTypes.string,
    returnEnabled: PropTypes.bool,
  }

  renderReturnSummary = () => {
    if (!this.context.returnEnabled) {
      return null;
    }
    return (
      <div>
        <h5>RETURN</h5>
        <dl>
          <dt>Date</dt>
          <dd>02.09.2014 17:00</dd>
          <dt>From</dt>
          <dd>London airport</dd>
          <dt>To</dt>
          <dd>London bus station</dd>
          <dt>Vehicle</dt>
          <dd>Private shuttle</dd>
        </dl>
      </div>
    );
  }

  render() {
    const _date = moment(parseInt(this.context.query.date, 10));

    return (
      <aside className="one-fourth sidebar right">
        <div className="widget">
          <h4>Booking summary</h4>
          <div className="summary">
            <div>
              <h5>DEPARTURE</h5>
              <dl>
                <dt>Date</dt>
                <dd>{_date.format('DD.MM.YYYY HH:mm')}</dd>
                <dt>From</dt>
                <dd>{this.context.query.from}</dd>
                <dt>To</dt>
                <dd>{this.context.query.to}</dd>
                <dt>Vehicle</dt>
                <dd>{this.context.vehicleType}</dd>
              </dl>
            </div>
            {this.renderReturnSummary()}
            <dl className="total">
              <dt>Total</dt>
              <dd>800,00 usd</dd>
            </dl>
          </div>
        </div>
      </aside>
    );
  }
}

export default BookingSummary;
