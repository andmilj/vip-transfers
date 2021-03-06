import React from 'react';
import Calendar from './Calendar';
import Dialog from '../Dialog';
import time from '../utils/time';
import withStyles from '../../../decorators/withStyles';
import styles from './style';

@withStyles(styles)
class CalendarDialog extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onDismiss: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    value: React.PropTypes.object,
  };

  static defaultProps = {
    active: false,
    value: new Date(),
  };

  state = {
    date: this.props.value,
    display: 'months',
  };

  handleCalendarChange = (value) => {
    const state = {display: 'months', date: value};
    if (time.dateOutOfRange(value, this.props.minDate, this.props.maxDate)) {
      state.date = this.props.maxDate || this.props.minDate;
    }
    this.setState(state);
  };

  handleSelect = () => {
    if (this.props.onSelect) this.props.onSelect(this.state.date);
  };

  handleSwitchDisplay = (display) => {
    this.setState({ display });
  };

  actions = [
    { label: 'Cancel', className: 'DatePicker-button', onClick: this.props.onDismiss },
    { label: 'Ok', className: 'DatePicker-button', onClick: this.handleSelect },
  ];

  render() {
    const display = `display-${this.state.display}`;
    const headerClassName = `DatePicker-header DatePicker-${display}`;

    return (
      <Dialog active={this.props.active} type="custom" className="DatePicker-dialog" actions={this.actions}>
          <header className={headerClassName}>
            <span className="DatePicker-year" onClick={this.handleSwitchDisplay.bind(this, 'years')}>
              {this.state.date.getFullYear()}
            </span>
            <h3 className="DatePicker-date" onClick={this.handleSwitchDisplay.bind(this, 'months')}>
              {time.getShortDayOfWeek(this.state.date.getDay())}, {time.getShortMonth(this.state.date)} {this.state.date.getDate()}
            </h3>
          </header>

          <div className="DatePicker-wrapper">
            <Calendar
              display={this.state.display}
              maxDate={this.props.maxDate}
              minDate={this.props.minDate}
              onChange={this.handleCalendarChange}
              selectedDate={this.state.date} />
          </div>
      </Dialog>
    );
  }
}

export default CalendarDialog;
