import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { noop } from 'lodash';

class DateTimePicker extends Component {
  static propTypes = {
    onDateTimeChange: PropTypes.func,
    date: PropTypes.instanceOf(Date),
  }

  static defaultProps = {
    onDateTimeChange: noop,
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
    return (
      <input type="text" ref="dateTime"/>
    );
  }
}

export default DateTimePicker;
