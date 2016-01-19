import React, {PropTypes, Component} from 'react';
import VehicleElement from './VehicleElement.react';
import { map } from 'lodash';

class VehicleInfo extends Component {
  static propTypes = {
    vehicles: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      persons: PropTypes.string,
      pictureName: PropTypes.string,
    })),
  };

  static defaultProps = {
    vehicles: [],
  };

  renderElements = () => {
    return map(this.props.vehicles, vehicle => {
      return (<VehicleElement className="one-fifth" {...vehicle}/>);
    });
  }


  render() {
    return (
      <div className="services boxed white" id="services">
        {this.renderElements()}
      </div>
    );
  }
}

export default VehicleInfo;
