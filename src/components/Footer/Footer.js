import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer black" role="contentinfo">
        <div className="wrap">
          <div className="row">
            <article className="one-half">
              <h6>About us</h6>
              <p>we are company with headquarters in Split, Croatia. Long-time experienced,
                profesional drivers will make your journey safe and comfortable.</p>
            </article>
            <article className="one-fourth">
              <h6>Need help?</h6>
              <p>Contact us via phone or email:</p>
              <p className="contact-data"><span className="ico phone"></span> +385 91 123 456</p>
              <p className="contact-data"><span className="ico email"></span> <a href="mailto:help@transfers.com">help@vip-transfers.com</a></p>
            </article>
            <article className="one-fourth">
              <h6>Follow us</h6>
              <ul className="social">
                <li className="facebook"><a href="#" title="facebook">facebook</a></li>
                <li className="twitter"><a href="#" title="twitter">twitter</a></li>
                <li className="gplus"><a href="#" title="gplus">google plus</a></li>
                <li className="linkedin"><a href="#" title="linkedin">linkedin</a></li>
              </ul>
            </article>
          </div>

          <div className="copy">
            <p>Copyright 2014, Vip transfers. All rights reserved. </p>

            <nav role="navigation" className="foot-nav">
              <ul>
                <li><a href="#" title="Home">Home</a></li>
                <li><a href="#" title="About us">About us</a></li>
                <li><a href="#" title="Contact us">Contact us</a></li>
                <li><a href="#" title="Terms of use">Terms of use</a></li>
                <li><a href="#" title="Help">Help</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    );
  }

}

export default Footer;
