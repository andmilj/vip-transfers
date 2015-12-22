import React, { PropTypes, Component } from 'react';
import Parallax from '../Shared/Parallax.react';
import VehicleColumn from '../VehicleColumn';
import {map, findWhere, get} from 'lodash';

class ResultsPage extends Component {
  static propTypes = {
    query: PropTypes.object,
    prices: PropTypes.array,
    vehicles: PropTypes.array,
  }

  static defaultProps = {
    prices: [],
  }

  _renderVehicles = () => {
    const { prices, vehicles } = this.props;
    return map(vehicles, ({type, persons, pictureName}) => {
      const price = findWhere(prices, {vehicleType: type});

      return (<VehicleColumn key={type}
                             vehicleType={type}
                             persons={persons}
                             pictureName={pictureName}
                             price={get(price, 'price')}/>);
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
