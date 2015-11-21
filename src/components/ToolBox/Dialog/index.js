import React, {PropTypes, Component} from 'react';
import Button from '../Button';
import Overlay from '../Overlay';
import withStyles from '../../../decorators/withStyles';
import styles from './style';

@withStyles(styles)
class Dialog extends Component {
  static propTypes = {
    actions: PropTypes.array,
    active: PropTypes.bool,
    className: PropTypes.string,
    onOverlayClick: PropTypes.func,
    title: PropTypes.string,
    type: PropTypes.string,
  };

  static defaultProps = {
    actions: [],
    active: false,
    type: 'normal',
  };

  render() {
    const actions = this.props.actions.map((action, idx) => {
      let className = 'Dialog-button';
      if (action.className) className += ` ${action.className}`;
      return <Button key={idx} {...action} className={className} />;
    });

    let className = `Dialog Dialog-${this.props.type}`;
    if (this.props.active) className += ` Dialog-active`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <Overlay active={this.props.active} onClick={this.props.onOverlayClick}>
        <div data-react-toolbox="dialog" className={className}>
          <section role="body" className="Dialog-body">
            {this.props.title ? <h6 className="Dialog-title">{this.props.title}</h6> : null}
            {this.props.children}
          </section>
          <nav role="navigation" className="Dialog-navigation">
            { actions }
          </nav>
        </div>
      </Overlay>
    );
  }
}

export default Dialog;
