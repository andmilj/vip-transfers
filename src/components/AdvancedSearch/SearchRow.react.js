import React, { PropTypes, Component } from 'react';
import { map } from 'lodash';
import DateTimePicker from './DateTimePicker.react';

class SearchRow extends Component {
  static propTypes = {
    destinations: PropTypes.array,
    date: PropTypes.instanceOf(Date),
    from: PropTypes.string,
    to: PropTypes.string,
    dateTimeLabel: PropTypes.string,
    onDateChange: PropTypes.func.isRequired,
    onPickupChange: PropTypes.func.isRequired,
    onDropoffChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    destinations: [],
    date: null,
    dateTimeLabel: 'Departure date and time',
    from: '',
    to: '',
  };

  renderOptions() {
    return map(this.props.destinations, ({ city }) => {
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
          <select onChange={this.props.onPickupChange} value={this.props.from}>
            <option value="">&nbsp;</option>
            <optgroup label="Croatia">
              {this.renderOptions()}
            </optgroup>
          </select>
        </div>
        <div className="form-group select one-third">
          <label>Drop off location</label>
          <select onChange={this.props.onDropoffChange} value={this.props.to}>
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
