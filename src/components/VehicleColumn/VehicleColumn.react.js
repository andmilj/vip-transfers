import React, {PropTypes, Component} from 'react';

class VehicleColumn extends Component {
  static propTypes = {
    persons: PropTypes.number.isRequired,
    pictureName: PropTypes.string,
    price: PropTypes.string,
    vehicleType: PropTypes.string.isRequired,
  };

  static contextTypes = {
    onVehicleTypeSelect: PropTypes.func,
    returnEnabled: PropTypes.bool,
  };

  static defaultProps = {
    price: '-',
    pictureName: 'car.jpg',
  };


  constructor(props) {
    super(props);

    this.state = {
      showInformation: false,
    };
  }

  toggleInformation = (e) => {
    e.preventDefault();
    this.setState({
      showInformation: !this.state.showInformation,
    });
  }

  _renderInformation() {
    if (!this.state.showInformation) {
      return null;
    }

    return (
      <div className="full-width information">
        <a href="#"
          className="close color"
          title="Close"
          onClick={this.toggleInformation}>x</a>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
      </div>
    );
  }

  _renderReturnPrice = () => {
    if (this.props.price === '-') {
      return '- USD';
    }

    if (this.context.returnEnabled) {
      const price = parseInt(this.props.price, 10);
      const newPrice = price - price / 100 * 5;
      return `+ ${newPrice} USD`;
    }

    return 'no return trip';
  }

  handleVehicleTypeSelect = () => {
    this.context.onVehicleTypeSelect(this.props.vehicleType, parseInt(this.props.price, 10));
  }

  render() {
    return (
      <article className="result">
        <div className="one-fourth heightfix">
          <img src={`/cars/${this.props.pictureName}`} alt="" />
        </div>
        <div className="one-half heightfix">
          <h3>{this.props.vehicleType}
            <a href="#"
              onClick={this.toggleInformation}
              className="trigger color"
              title="Read more">?</a>
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
            <span className="meta">{this._renderReturnPrice()}</span>
            <button className="btn grey large"
                    onClick={this.handleVehicleTypeSelect}>select</button>
          </div>
        </div>
        {this._renderInformation()}
      </article>
    );
  }
}

export default VehicleColumn;
