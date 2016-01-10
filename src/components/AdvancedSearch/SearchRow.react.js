import React, { PropTypes, Component } from 'react';
import { map } from 'lodash';
import DatePicker from '../ToolBox/DatePicker';

class SearchRow extends Component {
  static propTypes = {
    destinations: PropTypes.array,
    date: PropTypes.any,
    onDateChange: PropTypes.func.isRequired,
    onPickupChange: PropTypes.func.isRequired,
    onDropoffChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    destinations: [],
    date: undefined,
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
          <label htmlFor="dep-date">Departure date and time</label>
            <DatePicker name="date"
                        onChange={this.props.onDateChange}
                        value={this.props.date}/>
        </div>
        <div className="form-group select one-third">
          <label>Pick up location</label>
          <select onChange={this.props.onPickupChange} defaultValue="">
            <option value="">&nbsp;</option>
            <optgroup label="Croatia">
              {this.renderOptions()}
            </optgroup>
          </select>
        </div>
        <div className="form-group select one-third">
          <label>Drop off location</label>
          <select onChange={this.props.onDropoffChange} defaultValue="">
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
