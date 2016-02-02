import React, { PropTypes, Component } from 'react';
import VehicleColumn from '../VehicleColumn';
import {map, findWhere, get} from 'lodash';

class ResultsPage extends Component {
  static propTypes = {
    prices: PropTypes.arrayOf(PropTypes.shape({
      price: PropTypes.any,
      vehicleType: PropTypes.string,
    })),
    vehicles: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      persons: PropTypes.string,
      pictureName: PropTypes.string,
      textMain: PropTypes.string,
    })),
    onVehicleTypeSelect: PropTypes.func,
  }

  static defaultProps = {
    prices: [],
  }

  componentDidMount() {
    $('body').removeClass();
  }

  _renderVehicles = () => {
    const { prices, vehicles } = this.props;
    return map(vehicles, ({type, persons, pictureName, textMain}) => {
      const price = findWhere(prices, {vehicleType: type});

      return (<VehicleColumn key={type}
                             vehicleType={type}
                             persons={persons}
                             pictureName={pictureName}
                             textMain={textMain}
                             price={get(price, 'price')}/>);
    });
  }

  render() {
    return (
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
    );
  }
}

export default ResultsPage;
