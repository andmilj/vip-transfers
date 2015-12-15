import React, { PropTypes, Component } from 'react';
import Parallax from '../Shared/Parallax.react';
import VehicleColumn from '../VehicleColumn';
import {map} from 'lodash';

class ResultsPage extends Component {
  static propTypes = {
    query: PropTypes.object,
    vehicles: PropTypes.array,
  }

  static defaultProps = {
    vehicles: [],
  }

  _renderVehicles = () => {
    return map(this.props.vehicles, vehicle => {
      return <VehicleColumn key={vehicle.type} {...vehicle}/>;
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
