import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { pick, map } from 'lodash';
import FormatUtils from '../../utils/Format.utils';

const queryShape = PropTypes.shape({
  from: PropTypes.string,
  to: PropTypes.string,
  persons: PropTypes.string,
  date: PropTypes.string,
});

class BookingSummary extends Component {
  static propTypes = {
    className: PropTypes.string,
  }

  static contextTypes = {
    extras: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
    })).isRequired,
    extrasDeparture: PropTypes.object,
    extrasReturn: PropTypes.object,
    price: PropTypes.number.isRequired,
    query: queryShape.isRequired,
    returnDate: PropTypes.instanceOf(Date),
    vehicleType: PropTypes.string.isRequired,
    returnEnabled: PropTypes.bool.isRequired,
    vehicleOneWayPrice: PropTypes.number,
  }

  renderExtras = (extras) => {
    return map(pick(extras, value => !!value), (times, name) => {
      return (
        <span>
          <dt>Extras</dt>
          <dd>{times} x {name}</dd>
        </span>
      );
    });
  }

  renderReturnSummary = () => {
    const _date = moment(this.context.returnDate);
    if (!this.context.returnEnabled) {
      return null;
    }
    return (
      <div>
        <h5>RETURN</h5>
        <dl>
          <dt>Date</dt>
          <dd>{_date.format('DD.MM.YYYY HH:mm')}</dd>
          <dt>From</dt>
          <dd>{FormatUtils.cityName(this.context.query.to)}</dd>
          <dt>To</dt>
          <dd>{FormatUtils.cityName(this.context.query.from)}</dd>
          <dt>Vehicle</dt>
          <dd>{this.context.vehicleType}</dd>
          {this.renderExtras(this.context.extrasReturn)}
        </dl>
      </div>
    );
  }

  render() {
    const _date = moment(parseInt(this.context.query.date, 10));
    return (
      <div className="widget">
        <h4>Booking summary</h4>
        <div className="summary">
          <div>
            <h5>DEPARTURE</h5>
            <dl>
              <dt>Date</dt>
              <dd>{_date.format('DD.MM.YYYY HH:mm')}</dd>
              <dt>From</dt>
              <dd>{FormatUtils.cityName(this.context.query.from)}</dd>
              <dt>To</dt>
              <dd>{FormatUtils.cityName(this.context.query.to)}</dd>
              <dt>Vehicle</dt>
              <dd>{this.context.vehicleType}</dd>
              {this.renderExtras(this.context.extrasDeparture)}
            </dl>
          </div>
          {this.renderReturnSummary()}
          <dl className="total">
            <dt>Total</dt>
            <dd>{this.context.price} usd</dd>
          </dl>
        </div>
      </div>
    );
  }
}

export default BookingSummary;
