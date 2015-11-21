import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from '../../../decorators/withStyles';
import styles from './style';

@withStyles(styles)
class Overlay extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func,
    opacity: React.PropTypes.number,
  };

  static defaultProps = {
    opacity: 0.5,
  };

  componentDidMount() {
    this.app = document.querySelector('[data-react-toolbox="app"]') || document.body;
    this.node = document.createElement('div');
    this.node.setAttribute('data-react-toolbox', 'overlay');
    this.app.appendChild(this.node);
    this.handleRender();
  }

  componentDidUpdate() {
    this.handleRender();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.node);
    this.app.removeChild(this.node);
  }

  handleRender() {
    let className = 'Overlay';
    const overlayStyle = {};

    if (this.props.active) {
      className += ` Overlay-active`;
      overlayStyle.opacity = this.props.opacity;
    }
    if (this.props.className) className += ` ${className}`;

    ReactDOM.render(
      <div className={className}>
        <div
          className={'Overlay-overlay'}
          onClick={this.props.onClick}
          style={overlayStyle}
        />
        {this.props.children}
      </div>
    , this.node);
  }

  render() {
    return React.DOM.noscript();
  }
}

export default Overlay;
