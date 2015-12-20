import React, {PropTypes, Component} from 'react';

class VehicleColumn extends Component {
  static propTypes = {
    persons: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
  };

  static defaultProps = {
  };

  render() {
    return (
      <div className={`col-sm-${this.props.size}`}>
          <div className="plan">
            <h3>{this.props.type}</h3>
            <h4>
              <span className="amount">
                <span>$</span>{this.props.price}</span>
            </h4>
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
