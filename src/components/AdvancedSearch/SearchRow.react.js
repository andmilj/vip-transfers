import React, { PropTypes, Component } from 'react';
import { map, noop } from 'lodash';
import DateTimePicker from './DateTimePicker.react';

class SearchRow extends Component {
  static propTypes = {
    destinations: PropTypes.arrayOf(PropTypes.shape({
      city: PropTypes.string,
      primary: PropTypes.bool,
      type: PropTypes.oneOf(
        ['CITY', 'AIRPORT']
      ),
    })).isRequired,
    date: PropTypes.instanceOf(Date),
    from: PropTypes.string,
    to: PropTypes.string,
    dateTimeLabel: PropTypes.string,
    onDateChange: PropTypes.func.isRequired,
    onPickupChange: PropTypes.func,
    onDropoffChange: PropTypes.func,
  };

  static defaultProps = {
    destinations: [],
    date: null,
    dateTimeLabel: 'Departure date and time',
    from: '',
    to: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      selectsDisabled: !props.onPickupChange || !props.onDropoffChange,
    };
  }

  renderOptions() {
    return map(this.props.destinations, ({ city, type }) => {
      return (
        <option key={city} value={city}>
          {city}
        </option>
      );
    });
  }

  render() {
    return (
      <div className="f-row">
        <div className="form-group datepicker one-third">
          <label htmlFor="dep-date">{this.props.dateTimeLabel}</label>
          <DateTimePicker onDateTimeChange={this.props.onDateChange} date={this.props.date}/>
        </div>
        <div className="form-group select one-third">
          <label>Pick up location</label>
          <select onChange={this.props.onPickupChange}
                  disabled={this.state.selectsDisabled}
                  value={this.props.from}>
            <option value="">&nbsp;</option>
            <optgroup label="Croatia">
              {this.renderOptions()}
            </optgroup>
          </select>
        </div>
        <div className="form-group select one-third">
          <label>Drop off location</label>
          <select onChange={this.props.onDropoffChange}
                  disabled={this.state.selectsDisabled}
                  value={this.props.to}>
            <option value="">&nbsp;</option>
            <optgroup label="Croatia">
              {this.renderOptions()}
            </optgroup>
          </select>
        </div>
      </div>
    );
  }
}

export default SearchRow;
