import React, {Component, PropTypes} from 'react';
import CalendarDialog from './Dialog';
import events from '../utils/events';
import time from '../utils/time';

class DatePicker extends Component {
  static propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.object,
  };

  state = {
    active: false,
  };

  handleDismiss = () => {
    this.setState({active: false});
  };

  handleInputMouseDown = (event) => {
    events.pauseEvent(event);
    this.setState({active: true});
  };

  handleSelect = (value) => {
    if (this.props.onChange) this.props.onChange(value);
    this.setState({active: false});
  };

  render() {
    const { value, placeholder, label, maxDate, minDate, name } = this.props;
    const date = value ? `${value.getDate()} ${time.getFullMonth(value)} ${value.getFullYear()}` : null;

    return (
      <div data-toolbox="date-picker" className="DatePicker">
        <input
          onClick={this.handleInputMouseDown}
          label={label}
          placeholder={placeholder}
          readOnly
          type="text"
          value={date}
          name={name}
        />
        <CalendarDialog
          active={this.state.active}
          maxDate={maxDate}
          minDate={minDate}
          onDismiss={this.handleDismiss}
          onSelect={this.handleSelect}
          value={value}
        />
      </div>
    );
  }
}

export default DatePicker;
