import React, { Component, PropTypes } from 'react';
import ExtrasTable from './ExtrasTable.react';
import BookingSummary from './BookingSummary.react';
import moment from 'moment';
import classNames from 'classnames';

const queryShape = PropTypes.shape({
  from: PropTypes.string,
  to: PropTypes.string,
  persons: PropTypes.string,
  date: PropTypes.string,
});

class Extras extends Component {
  static contextTypes = {
    onStepBack: PropTypes.func.isRequired,
    query: queryShape,
    queryReturn: queryShape,
    returnEnabled: PropTypes.bool,
  }

  handleStepBack = (e) => {
    e.preventDefault();
    this.context.onStepBack();
  }

  renderReturnSummary = () => {
    if (!this.context.returnEnabled) {
      return null;
    }
    return (
      <div>
        <p>02.09.2014 <small>at</small> 17:00</p>
        <p>Berlin Central Train Station <small>to</small> Schonefeld Airport</p>
      </div>
    );
  }

  render() {
    const _date = moment(parseInt(this.context.query.date, 10));
    const c = classNames('output color', {
      twoway: this.context.returnEnabled,
    });
    return (
      <div>
        <div className={c}>
          <div className="wrap">
            <div>
              <p>{_date.format('DD.MM.YYYY')} <small>at</small> {_date.format('HH:mm')}</p>
              <p>{this.context.query.from} <small>to</small> {this.context.query.to}</p>
            </div>
            {this.renderReturnSummary()}
          </div>
        </div>

        <div className="wrap">
          <div className="row">
            <div className="full-width content">
              <h2>Baggage and extras</h2>
              <p>Please select the total number of pieces of baggage and extras for your transfers. If you arrive with more luggage than specified at booking, we cannot guarantee to transport them. In case we are able to transport them, we will charge you an additional fee.</p>
            </div>
            <div className="three-fourth">
              <form>
                <ExtrasTable />
                <div className="actions">
                  <button onClick={this.handleStepBack}
                    className="btn medium back">Go back
                  </button>
                  <a href="booking-step2.html"
                    className="btn medium color right">Continue
                  </a>
                </div>
              </form>
            </div>
            <BookingSummary />
          </div>
        </div>
      </div>
    );
  }
}

export default Extras;
