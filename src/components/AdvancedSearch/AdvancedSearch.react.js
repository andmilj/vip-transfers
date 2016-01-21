import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import SearchRow from './SearchRow.react';
import DateTimePicker from './DateTimePicker.react';
import withStyles from '../../decorators/withStyles';
import { initUniform } from '../App/style/js/scripts';
import style from './style.scss';
import classNames from 'classnames';

@withStyles(style)
class AdvancedSearch extends Component {
  static propTypes = {
    from: PropTypes.string,
    to: PropTypes.string,
    persons: PropTypes.any,
    date: PropTypes.instanceOf(Date),
    twoWayEnabled: PropTypes.bool,
    destinations: PropTypes.arrayOf(PropTypes.shape({
      city: PropTypes.string,
      primary: PropTypes.bool,
      type: PropTypes.oneOf(
        ['CITY', 'AIRPORT']
      ),
    })),
    onDateChange: PropTypes.func,
    onReturnDateChange: PropTypes.func,
    onPersonChange: PropTypes.func,
    onDropoffChange: PropTypes.func,
    onPickupChange: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  static contextTypes = {
    onReturnToggle: PropTypes.func,
    returnEnabled: PropTypes.bool,
    returnDate: PropTypes.instanceOf(Date),
    onReturnDateChange: PropTypes.func,
  }

  static defaultProps = {
    destinations: [],
    from: null,
    to: null,
    persons: null,
    date: null,
    twoWayEnabled: false,
  };

  componentDidMount() {
    const { advancedSearch } = this.refs;
    initUniform(findDOMNode(advancedSearch));
  }

  componentDidUpdate() {
    const { advancedSearch } = this.refs;
    initUniform(findDOMNode(advancedSearch));
  }

  _handleRadio = () => {
    this.context.onReturnToggle();
  }

  _handleSubmit= (e) => {
    e.preventDefault();
    this.props.onSubmit();
  }

  _renderReturnSearchRow() {
    if (!this.props.twoWayEnabled) {
      return null;
    }
    const datepicker = !this.context.returnEnabled ? null : (
      <div className="form-group datepicker one-third">
        <label htmlFor="dep-date">RETURN DATE AND TIME</label>
        <DateTimePicker onDateTimeChange={this.context.onReturnDateChange}
                        date={this.context.returnDate}/>
      </div>
    );
    const c = classNames('form-group datepicker', {
      'one-third': this.context.returnEnabled,
      'two-third': !this.context.returnEnabled,
    });
    return (
      <div className="advanced-search black">
        <div className="wrap">
            <div className="f-row">
              {this._renderRadioButtons()}
              <div className={c}>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              {datepicker}
            </div>
        </div>
      </div>
    );
  }

  _renderRadioButtons() {
    if (!this.props.twoWayEnabled) {
      return null;
    }

    return (
      <div className="form-group radios one-third">
        <div>
          <input type="radio"
            name="radio"
            value="return"
            onChange={this._handleRadio}
            checked={this.context.returnEnabled}/>
          <label htmlFor="return">Return</label>
        </div>
        <div>
          <input type="radio"
                name="radio"
                value="oneway"
                onChange={this._handleRadio}
                checked={!this.context.returnEnabled} />
          <label htmlFor="oneway">One way</label>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="advancedSearch" ref="advancedSearch">
        <div id="booking" className="advanced-search color">
          <div className="wrap">
            <form role="form" action="/results" method="GET" onSubmit={this._handleSubmit}>
            <SearchRow {...this.props} />
            <div className="f-row">
              <div className="form-group spinner">
                <label htmlFor="people">How many people <small>(including children)</small>?</label>
                <input type="number"
                        value={this.props.persons}
                        onChange={this.props.onPersonChange}
                        id="people"
                        min="1" />
              </div>
              <div className="form-group right">
                <button type="submit" className="btn large black">
                  Find a transfer
                </button>
              </div>
            </div>
            </form>
          </div>
        </div>
        {this._renderReturnSearchRow()}
      </div>
    );
  }
}

export default AdvancedSearch;
