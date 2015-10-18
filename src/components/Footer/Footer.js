import React, { Component } from 'react';
// import withViewport from '../../decorators/withViewport';
// import Link from '../Link';

// @withViewport
class Footer extends Component {
  render() {
    return (
        <footer className="footer">
          <div className="container inner">
            <p className="pull-left">© 2014 Frost. All rights reserved. Theme by <a href="http://elemisfreebies.com">elemis</a>.</p>
            <ul className="social pull-right">
              <li><a href="#"><i className="icon-s-rss"></i></a></li>
              <li><a href="#"><i className="icon-s-twitter"></i></a></li>
              <li><a href="#"><i className="icon-s-facebook"></i></a></li>
              <li><a href="#"><i className="icon-s-dribbble"></i></a></li>
              <li><a href="#"><i className="icon-s-pinterest"></i></a></li>
              <li><a href="#"><i className="icon-s-instagram"></i></a></li>
              <li><a href="#"><i className="icon-s-vimeo"></i></a></li>
            </ul>
          </div>
        </footer>
    );
  }

}

export default Footer;
