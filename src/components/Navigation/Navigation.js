import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
// import Link from '../Link';

class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
        <nav className="collapse navbar-collapse pull-right">
          <ul className="nav navbar-nav">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
    );
  }

}

export default Navigation;
