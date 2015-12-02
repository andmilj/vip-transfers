import React, { PropTypes, Component } from 'react';
import Link from '../Link';

class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
        <nav className="collapse navbar-collapse pull-right">
          <ul className="nav navbar-nav">
            <li><a href="/" onClick={Link.handleClick}>Home</a></li>
            <li><a href="/login" onClick={Link.handleClick}>Log In</a></li>
          </ul>
        </nav>
    );
  }

}

export default Navigation;
