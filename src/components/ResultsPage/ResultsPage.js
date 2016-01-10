import React, { PropTypes, Component } from 'react';
import VehicleColumn from '../VehicleColumn';
import {map, findWhere, get} from 'lodash';
import AdvancedSearch from '../AdvancedSearch/AdvancedSearch.react';

class ResultsPage extends Component {
  static propTypes = {
    query: PropTypes.object,
    prices: PropTypes.array,
    vehicles: PropTypes.array,
  }

  static defaultProps = {
    prices: [],
  }

  componentDidMount() {
    $('body').removeClass();
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
        <AdvancedSearch twoWayEnabled/>
        <div className="wrap">
          <div className="row">
            <div className="full-width content">
              <h2>Select transfer type for your DEPARTURE</h2>
              <div className="results">
                {this._renderVehicles()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResultsPage;
