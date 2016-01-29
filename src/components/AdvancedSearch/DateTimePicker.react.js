import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { noop } from 'lodash';

class DateTimePicker extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onDateTimeChange: PropTypes.func,
    date: PropTypes.instanceOf(Date),
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    error: PropTypes.bool,
  }

  static defaultProps = {
    onDateTimeChange: noop,
    error: false,
  }

  componentDidMount() {
    const that = this;
    $(findDOMNode(this.refs.dateTime)).datetimepicker({
      value: that.props.date,
      onChangeDateTime: dp => {
        that.props.onDateTimeChange(dp);
      },
    });
  }

  render() {
    const cl = classNames(this.props.className, {
      'form-group': true,
      'datepicker': true,
      'form-error': this.props.error,
    });
    return (
      <div className={cl}>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input type="text" ref="dateTime" id={this.props.id}/>
      </div>
    );
  }
}

export default DateTimePicker;
