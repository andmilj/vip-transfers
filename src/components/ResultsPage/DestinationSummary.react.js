import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import classNames from 'classnames';

const queryShape = PropTypes.shape({
  from: PropTypes.string,
  to: PropTypes.string,
  persons: PropTypes.string,
  date: PropTypes.string,
});

class DestinationSummary extends Component {
  static contextTypes = {
    query: queryShape,
    returnDate: PropTypes.instanceOf(Date),
    returnEnabled: PropTypes.bool,
  }

  renderReturnSummary = () => {
    const _date = moment(this.context.returnDate);

    if (!this.context.returnEnabled) {
      return null;
    }

    return (
      <div>
        <p>{_date.format('DD.MM.YYYY')} <small>at</small> {_date.format('HH:mm')}</p>
        <p>{this.context.query.to} <small>to</small> {this.context.query.from}</p>
      </div>
    );
  }

  render() {
    const _date = moment(parseInt(this.context.query.date, 10));
    const c = classNames('output color', {
      twoway: this.context.returnEnabled,
    });
    return (
        <div className={c}>
          <div className="wrap">
            <div>
              <p>{_date.format('DD.MM.YYYY')} <small>at</small> {_date.format('HH:mm')}</p>
              <p>{this.context.query.from} <small>to</small> {this.context.query.to}</p>
            </div>
            {this.renderReturnSummary()}
          </div>
        </div>
    );
  }
}

export default DestinationSummary;
