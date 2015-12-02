import React from 'react';
import FontIcon from '../FontIcon';
import Tooltip from '../Tooltip';
import events from '../utils/events';
import withStyles from '../../../decorators/withStyles';
import styles from './style';

@withStyles(styles)
class Button extends React.Component {
  static propTypes = {
    accent: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    flat: React.PropTypes.bool,
    floating: React.PropTypes.bool,
    icon: React.PropTypes.string,
    label: React.PropTypes.string,
    loading: React.PropTypes.bool,
    mini: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    raised: React.PropTypes.bool,
    toggle: React.PropTypes.bool,
    tooltip: React.PropTypes.string,
    tooltipDelay: React.PropTypes.number,
    type: React.PropTypes.string,
  };

  static defaultProps = {
    accent: false,
    className: '',
    flat: false,
    floating: false,
    loading: false,
    mini: false,
    primary: false,
    raised: false,
    toggle: false,
  };

  handleMouseDown = (event) => {
    events.pauseEvent(event);
    if (this.props.onMouseDown) this.props.onMouseDown(event);
  };

  handleTouchStart = (event) => {
    events.pauseEvent(event);
    if (this.props.onTouchStart) this.props.onTouchStart(event);
  };

  render() {
    const {accent, flat, floating, href, icon, label,
           loading, mini, primary, raised, toggle,
           tooltip, tooltipDelay, ...others} = this.props;
    const element = href ? 'a' : 'button';
    const level = primary ? 'primary' : accent ? 'accent' : 'neutral';
    const shape = flat ? 'flat' : raised ? 'raised' : floating ? 'floating' : toggle ? 'toggle' : 'flat';
    let className = `Button-${shape} Button-${level}`;

    if (this.props.className) className += ` ${this.props.className}`;
    if (mini) className += ` Button-${mini}`;

    const props = {
      ...others,
      href,
      className,
      disabled: this.props.disabled || this.props.loading,
      onMouseDown: this.handleMouseDown,
      onTouchStart: this.handleTouchStart,
    };

    return React.createElement(element, props,
      tooltip ? <Tooltip className={'tooltip'} delay={tooltipDelay} label={tooltip}/> : null,
      icon ? <FontIcon className={'icon'} value={icon}/> : null,
      label ? label : this.props.children
    );
  }
}

export default Button;
