import React, { Component } from 'react';
import Navigation from '../Navigation';

class Header extends Component {

  render() {
    return (
      <header className="header" role="banner">
        <div className="wrap">
          <div className="logo">
            <a href="index.html" title="Transfers">
              <img src={require('./transfers.jpg')} alt="Transfers" />
            </a>
          </div>
          <Navigation />
        </div>
      </header>
    );
  }

}

export default Header;
