import React, { Component } from 'react';
import withStyles from '../../decorators/withStyles';
// import Link from '../Link';
import Navigation from '../Navigation';

class Header extends Component {

  render() {
    return (
        <div className="navbar default">
          <div className="navbar-header">
            <div className="container">
              <div className="basic-wrapper">
                  <a className="btn responsive-menu pull-right"
                     data-toggle="collapse"
                     data-target=".navbar-collapse">
                      <i className="icon-menu-1"></i>
                  </a>
                  <a className="navbar-brand"
                      href="">
                       <img src={require('./logo.png')}
                           alt=""
                           data-src={require('./logo.png')}
                           data-ret={require('./logo@2x.png')}
                           className="retina" />
                  </a>
              </div>
              <Navigation />
            </div>
          </div>
        </div>
    );
  }

}

export default Header;
