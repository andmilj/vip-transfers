import React, { Component } from 'react';
import ExtrasTable from './ExtrasTable.react';
import ExtrasJson from '../../constants/Extras';

class Extras extends Component {
  render() {
    return (
      <div className="wrap">
        <div className="row">
          <div className="full-width content">
            <h2>Baggage and extras</h2>
            <p>Please select the total number of pieces of baggage and extras for your transfers. If you arrive with more luggage than specified at booking, we cannot guarantee to transport them. In case we are able to transport them, we will charge you an additional fee.</p>
          </div>
          <div className="three-fourth">
            <form>
              <ExtrasTable extras={ExtrasJson} />
              <div className="actions">
                <a href="search-results.html"
                  className="btn medium back">Go back
                </a>
                <a href="booking-step2.html"
                  className="btn medium color right">Continue
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Extras;
