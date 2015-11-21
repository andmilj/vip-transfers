import React from 'react';
import FontIcon from '../FontIcon';
import Tooltip from '../Tooltip';
import withStyles from '../../../decorators/withStyles';
import styles from './style';

@withStyles(styles)
class Input extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.string,
    floating: React.PropTypes.bool,
    icon: React.PropTypes.string,
    label: React.PropTypes.string,
    maxLength: React.PropTypes.number,
    multiline: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    required: React.PropTypes.bool,
    tooltip: React.PropTypes.string,
    tooltipDelay: React.PropTypes.number,
    type: React.PropTypes.string,
    value: React.PropTypes.any,
  };

  static defaultProps = {
    className: '',
    disabled: false,
    floating: true,
    multiline: false,
    required: false,
    type: 'text',
  };

  renderInput() {
    let className = 'Input-input';
    if (this.props.value && this.props.value.length > 0) className += ` Input-filled`;
    if (this.props.multiline) {
      return <textarea ref='input' role='input' {...this.props} className={className} />;
    } else {
      return <input ref='input' role='input' {...this.props} className={className} />;
    }
  }

  renderUnderline () {
    const error = this.props.error ? <span className={'Input-error'}>{this.props.error}</span> : null;
    let counter = null;
    if (this.props.maxLength) {
      const length = this.props.value ? this.props.value.length : 0;
      if (length > 0) counter = <span className={'Input-counter'}>{length} / {this.props.maxLength}</span>;
    }
    if (error || counter) return <span className={'Input-underline'}>{error}{counter}</span>;
  }

  render() {
    let className = 'Input';
    let labelClassName = 'Input-label';
    if (this.props.error) className += ` Input-errored}`;
    if (this.props.disabled) className += ` Input-disabled}`;
    if (this.props.className) className += ` ${this.props.className}`;
    if (this.props.type === 'hidden') className += ` Input-hidden}`;
    if (this.props.icon) className += ` Input-with-icon}`;
    if (!this.props.floating) labelClassName += ` Input-fixed}`;

    return (
      <div data-react-toolbox='input' className={className}>
        { this.renderInput() }
        { this.props.icon ? <FontIcon className={'Input-icon'} value={this.props.icon} /> : null }
        <span className={'Input-bar'}></span>
        { this.props.label ? <label className={labelClassName}>{this.props.label}</label> : null }
        { this.renderUnderline() }
        { this.props.tooltip ? <Tooltip label={this.props.tooltip} delay={this.props.tooltipDelay}/> : null }
      </div>
    );
  }

  blur() {
    this.refs.input.blur();
  }

  focus() {
    this.refs.input.focus();
  }
}

export default Input;
