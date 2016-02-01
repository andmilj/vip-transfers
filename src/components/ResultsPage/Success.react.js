import React, { Component } from 'react';
import BookingHelp from './BookingHelp.react';

class Success extends Component {
  render() {
    return (
      <div>
        <header className="site-title color">
          <div className="wrap">
          <div className="container">
            <h1>Confirmation</h1>
            <nav role="navigation" className="breadcrumbs">
              <ul>
                <li><a href="index.html" title="Home">Home</a></li>
                <li>Confirmation</li>
              </ul>
            </nav>
          </div>
          </div>
        </header>
        <div className="wrap">
          <div className="row">
            <div className="three-fourth">
              <div className="content">
                <h2>Your reservation was successfull!</h2>
                <p className="lead">
                  Thank you for choosing us. You will receive SMS 24h before your
                  journey as remark. If you have any further questions, please contact us.
                </p>
              </div>
            </div>
            <aside className="sidebar right one-fourth">
              <BookingHelp />
              <div className="widget">
                <h4>Advertisment</h4>
                <a href="#"><img src="http://placehold.it/800x600" alt="" /></a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }
}

export default Success;
