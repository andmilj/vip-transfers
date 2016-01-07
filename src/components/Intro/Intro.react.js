import React, { Component } from 'react';

class Intro extends Component {
  render() {
    return (
      <div className="intro">
        <div className="wrap">
          <div className="textwidget">
            <h1 className="wow fadeInDown">Need a ride?</h1>
            <h2 className="wow fadeInUp">You've come to the right place.</h2>
            <div className="actions">
              <a href="#services" title="Our services" className="btn large white wow fadeInLeft anchor">Our services</a>
              <a href="#booking" title="Make a booking" className="btn large color wow fadeInRight anchor">Make a booking</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Intro;
