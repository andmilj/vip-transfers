import React, {PropTypes, Component} from 'react';
import withStyles from '../../../decorators/withStyles';
import styles from './style';

@withStyles(styles)
class FontIcon extends Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    let className = this.props.value;
    if (this.props.className) className += ` ${this.props.className}`;
    return (
      <i data-react-toolbox="icon" {...this.props} className={className}>
        {this.props.children}
      </i>
    );
  }
}

export default FontIcon;
