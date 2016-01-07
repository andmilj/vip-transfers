import React, { Component } from 'react';
// import withViewport from '../../decorators/withViewport';
// import Link from '../Link';

// @withViewport
class Footer extends Component {
  render() {
    return (
      <footer className="footer black" role="contentinfo">
        <div className="wrap">
          <div className="row">
            <article className="one-half">
              <h6>About us</h6>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.</p>
            </article>
            <article className="one-fourth">
              <h6>Need help?</h6>
              <p>Contact us via phone or email:</p>
              <p className="contact-data"><span className="ico phone"></span> +1 555 555 555</p>
              <p className="contact-data"><span className="ico email"></span> <a href="mailto:help@transfers.com">help@transfers.com</a></p>
            </article>
            <article className="one-fourth">
              <h6>Follow us</h6>
              <ul className="social">
                <li className="facebook"><a href="#" title="facebook">facebook</a></li>
                <li className="twitter"><a href="#" title="twitter">twitter</a></li>
                <li className="gplus"><a href="#" title="gplus">google plus</a></li>
                <li className="linkedin"><a href="#" title="linkedin">linkedin</a></li>
                <li className="vimeo"><a href="#" title="vimeo">vimeo</a></li>
                <li className="pinterest"><a href="#" title="pinterest">pinterest</a></li>
              </ul>
            </article>
          </div>

          <div className="copy">
            <p>Copyright 2014, Themeenergy. All rights reserved. </p>

            <nav role="navigation" className="foot-nav">
              <ul>
                <li><a href="#" title="Home">Home</a></li>
                <li><a href="#" title="Blog">Blog</a></li>
                <li><a href="#" title="About us">About us</a></li>
                <li><a href="#" title="Contact us">Contact us</a></li>
                <li><a href="#" title="Terms of use">Terms of use</a></li>
                <li><a href="#" title="Help">Help</a></li>
                <li><a href="#" title="For partners">For partners</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    );
  }

}

export default Footer;
