import React, { PropTypes, Component } from 'react';
import Parallax from '../Shared/Parallax.react';
import VehicleColumn from '../VehicleColumn';
import {map} from 'lodash';

class ResultsPage extends Component {
  static propTypes = {
    query: PropTypes.object,
    prices: PropTypes.array,
  }

  static defaultProps = {
    prices: [],
  }

  _renderVehicles = () => {
    const { prices } = this.props;
    const size = 12 / prices.length;

    return map(prices, price => {
      return (<VehicleColumn key={price.vehicleType}
                             size={size} {...price}
                             persons={price.persons}
                             price={price.price}
                             type={prices.type}/>);
    });
  }

  render() {
    return (
      <div>
          <Parallax ordinal={1} />
          <div className="section anchor">
            <div className="light-wrapper">
              <div className="container inner">
                <div className="row pricing">
                  {this._renderVehicles()}
                </div>
              </div>
            </div>
          </div>
          <Parallax ordinal={1} />
      </div>
    );
  }
}

export default ResultsPage;
