import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import DestinationSummaryElement from './DestinationSummaryElement.react';
import FormatUtils from '../../utils/Format.utils';

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
      <DestinationSummaryElement from={FormatUtils.cityName(this.context.query.to)}
                                 to={FormatUtils.cityName(this.context.query.from)}
                                 date={_date}/>
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
            <DestinationSummaryElement from={FormatUtils.cityName(this.context.query.from)}
                                       to={FormatUtils.cityName(this.context.query.to)}
                                       date={_date}/>
            {this.renderReturnSummary()}
          </div>
        </div>
    );
  }
}

export default DestinationSummary;
