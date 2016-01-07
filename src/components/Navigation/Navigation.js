import React, { PropTypes, Component } from 'react';
import Link from '../Link';

class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <nav role="navigation" className="main-nav">
        <ul>
          <li className="active"><a href="/" onClick={Link.handleClick} title="Home Page">Home</a></li>
          <li><a href="/admin" onClick={Link.handleClick}>Admin</a></li>
        </ul>
      </nav>
    );
  }

}

export default Navigation;
