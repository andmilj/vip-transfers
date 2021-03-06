import React, { PropTypes, Component } from 'react';
import { map, sortByOrder, filter } from 'lodash';
import DateTimePicker from './DateTimePicker.react';
import { cityName } from '../../utils/Format.utils';

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

  renderOptions(_primary = false) {
    const filtered = filter(this.props.destinations, ({ primary }) => primary === _primary);
    return map(sortByOrder(filtered, ['city', 'type']), ({ city, type }) => {
      return (
        <option key={city + '_' + type} value={city + '_' + type}>
          {cityName(city, type)}
        </option>
      );
    });
  }

  render() {
    return (
      <div className="f-row">
          <DateTimePicker className="one-third"
                          id="dep-date"
                          onDateTimeChange={this.props.onDateChange}
                          date={this.props.date}
                          label={this.props.dateTimeLabel}/>
        <div className="form-group select one-third">
          <label>Pick up location</label>
          <select onChange={this.props.onPickupChange}
                  disabled={this.state.selectsDisabled}
                  value={this.props.from}>
            <option value="">&nbsp;</option>
            <optgroup label="Main">
              {this.renderOptions(true)}
            </optgroup>
            <optgroup label="Secondary">
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
            <optgroup label="Main">
              {this.renderOptions(true)}
            </optgroup>
            <optgroup label="Secondary">
              {this.renderOptions()}
            </optgroup>
          </select>
        </div>
      </div>
    );
  }
}

export default SearchRow;
