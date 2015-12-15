import React, { PropTypes, Component } from 'react';
import Parallax from '../Shared/Parallax.react';

class ResultsPage extends Component {
  static propTypes = {
    query: PropTypes.object,
    prices: PropTypes.object,
  }

  render() {
    console.log(this.props);
    return (
      <div>
          <Parallax ordinal={1} />
            <div className="section anchor">
              <div className="light-wrapper">
                <div className="container inner">
                  Results
                </div>
              </div>
            </div>
          <Parallax ordinal={1} />
      </div>
    );
  }
}

export default ResultsPage;
