import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import SearchRow from './SearchRow.react';
import { initUniform } from '../App/style/js/scripts';

class AdvancedSearch extends Component {
  static propTypes = {
    from: PropTypes.string,
    to: PropTypes.string,
    persons: PropTypes.any,
    date: PropTypes.instanceOf(Date),
    twoWayEnabled: PropTypes.bool,
    destinations: PropTypes.array,
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
    if (!this.context.returnEnabled) {
      return null;
    }
    return (<SearchRow dateTimeLabel="RETURN DATE AND TIME"
                       destinations={this.props.destinations}
                       from={this.props.to}
                       to={this.props.from}
                       onDateChange={this.context.onReturnDateChange}/>);
  }

  _renderRadioButtons() {
    if (!this.props.twoWayEnabled) {
      return null;
    }

    return (
      <div className="form-group radios">
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
      <div className="advanced-search color" ref="advancedSearch" id="booking">
        <div className="wrap">
          <form role="form" action="/results" method="GET" onSubmit={this._handleSubmit}>
          <SearchRow {...this.props} />
          {this._renderReturnSearchRow()}
          <div className="f-row">
            <div className="form-group spinner">
            <label htmlFor="people">How many people <small>(including children)</small>?</label>
            <input type="number"
                    value={this.props.persons}
                    onChange={this.props.onPersonChange}
                    id="people"
                    min="1" />
            </div>
            {this._renderRadioButtons()}
            <div className="form-group right">
              <button type="submit" className="btn large black">
                Find a transfer
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AdvancedSearch;
