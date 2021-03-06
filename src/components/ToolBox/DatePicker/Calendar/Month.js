import React from 'react';
import time from '../../utils/time';
import utils from '../../utils/utils';
import Day from './Day';

class Month extends React.Component {
  static propTypes = {
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onDayClick: React.PropTypes.func,
    selectedDate: React.PropTypes.object,
    viewDate: React.PropTypes.object,
  };

  handleDayClick = (day) => {
    if (this.props.onDayClick) this.props.onDayClick(day);
  };

  renderWeeks() {
    return utils.range(0, 7).map(i => {
      return <span key={i}>{ time.getFullDayOfWeek(i).charAt(0) }</span>;
    });
  }

  renderDays() {
    return utils.range(1, time.getDaysInMonth(this.props.viewDate) + 1).map(i => {
      const date = new Date(this.props.viewDate.getFullYear(), this.props.viewDate.getMonth(), i);
      const disabled = time.dateOutOfRange(date, this.props.minDate, this.props.maxDate);

      return (
        <Day
          key={i}
          day={i}
          disabled={disabled}
          onClick={!disabled ? this.handleDayClick.bind(this, i) : null}
          selectedDate={this.props.selectedDate}
          viewDate={this.props.viewDate}
        />
      );
    });
  }

  render() {
    return (
      <div className="Calendar-month">
        <span className="Calendar-title">
          { time.getFullMonth(this.props.viewDate)} { this.props.viewDate.getFullYear() }
        </span>
        <div className="Calendar-week">{ this.renderWeeks() }</div>
        <div className="Calendar-days">{ this.renderDays() }</div>
      </div>
    );
  }
}

export default Month;
