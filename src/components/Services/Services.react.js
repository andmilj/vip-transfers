import React, { Component } from 'react';

class Services extends Component {
  render() {
    return (
      <div className="services iconic white" id="services">
        <div className="wrap">
          <div className="row">
            <div className="one-third wow fadeIn">
              <span className="circle"><span className="ico pig"></span></span>
              <h3>Fixed rates</h3>
              <p>Prices are fixed and cannot be negotiable.</p>
            </div>

            <div className="one-third wow fadeIn" data-wow-delay=".2s">
              <span className="circle"><span className="ico lock"></span></span>
              <h3>Reliable transfers</h3>
              <p>Every transfer is reliable and secure.</p>
            </div>

            <div className="one-third wow fadeIn" data-wow-delay=".4s">
              <span className="circle"><span className="ico wallet"></span></span>
              <h3>No booking fees</h3>
              <p>All booking costs are free.</p>
            </div>

            <div className="one-third wow fadeIn">
              <span className="circle"><span className="ico heart"></span></span>
              <h3>Free cancellation</h3>
              <p>Reserved transfers can be canceled 24h before transfer with no extra costs.</p>
            </div>

            <div className="one-third wow fadeIn" data-wow-delay=".4s">
              <span className="circle"><span className="ico telephone"></span></span>
              <h3>24h customer service</h3>
              <p>All our cars are available 0/24 during all year.</p>
            </div>

            <div className="one-third wow fadeIn" data-wow-delay=".4s">
              <span className="circle"><span className="ico shuttle"></span></span>
              <h3>Quality vehicles</h3>
              <p>Vehicles are up to 5 years old and fully reliable.</p>
            </div>
          </div>
        </div>
      </div>
  );
  }
}
export default Services;
