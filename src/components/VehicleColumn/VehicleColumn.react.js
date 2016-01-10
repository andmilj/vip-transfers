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
      <article className="result">
        <div className="one-fourth heightfix">
          <img src={`/cars/${this.props.pictureName}`} alt="" />
        </div>
        <div className="one-half heightfix">
          <h3>{this.props.vehicleType}
            <a href="#" className="trigger color" title="Read more">?</a>
          </h3>
          <ul>
            <li>
              <span className="ico people"></span>
              <p>Max <strong>{this.props.persons} people</strong> <br />per vehicle</p>
              </li>
            <li>
              <span className="ico luggage"></span>
              <p>Max <strong>3 suitcases</strong> <br />per vehicle</p>
              </li>
            <li>
              <span className="ico time"></span>
              <p>Estimated time <br /><strong>50 mins</strong></p>
            </li>
          </ul>
        </div>
        <div className="one-fourth heightfix">
          <div>
            <div className="price">{this.props.price} <small>USD</small></div>
            <span className="meta">per passenger</span>
            <a href="booking-step1.html" className="btn grey large">select</a>
          </div>
        </div>
        <div className="full-width information">
          <a href="#" className="close color" title="Close">x</a>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
        </div>
      </article>
    );
  }
}

export default VehicleColumn;
