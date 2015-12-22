import React, {PropTypes, Component} from 'react';
import styles from './VehicleColumn.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class VehicleColumn extends Component {
  static propTypes = {
    persons: PropTypes.number.isRequired,
    pictureName: PropTypes.string,
    price: PropTypes.string,
    vehicleType: PropTypes.string.isRequired,
  };

  static defaultProps = {
    price: '-',
    pictureName: 'car.jpg',
  };

  render() {
    return (
      <div className={`col-sm-3 vehicle-column`}>
          <div className="plan">
            <h3>{this.props.vehicleType}</h3>
            <h4>
              <span className="amount">
                <span>$</span><span>{this.props.price}</span>
              </span>
            </h4>
            <div>
              <img src={`/cars/${this.props.pictureName}`} />
            </div>
            <div className="features">
              <ul>
                <li>MaxPersons: {this.props.persons}</li>
              </ul>
            </div>
            <div className="select">
              <div>
                <a href="#" className="btn inverse">Select</a>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default VehicleColumn;
