import React, { PropTypes, Component } from 'react';
import Extras from './Extras.react';
import ExtrasJson from '../../constants/Extras';
import PassengerDetails from './PassengerDetails.react';
import VehicleResults from './VehicleResults.react';

import { findDOMNode } from 'react-dom';

import { assign } from 'lodash';

class ResultsPage extends Component {
  static defaultProps = {
    prices: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      bookingStep: 1,
      extrasDeparture: {},
      extrasReturn: {},
      returnEnabled: false,
      vehicleType: null,
      vehicleOneWayPrice: null,
      queryReturn: {
        from: null,
        to: null,
        persons: null,
        date: null,
      },
    };
  }

  getChildContext() {
    return {
      extras: ExtrasJson,
      extrasDeparture: this.state.extrasDeparture,
      extrasReturn: this.state.extrasReturn,
      onDepartureValueChange: this.handleDepartureValueChange,
      onReturnValueChange: this.handleReturnValueChange,
      onStepBack: this.handleStepBack,
      onStepForward: this.handleStepForward,
      onReturnToggle: this.handleReturnToggle,
      onVehicleTypeSelect: this.handleVehicleTypeSelect,
      returnEnabled: this.state.returnEnabled,
      query: this.props.query,
      queryReturn: this.state.queryReturn,
      vehicleType: this.state.vehicleType,
      vehicleOneWayPrice: this.state.vehicleOneWayPrice,
    };
  }

  componentDidMount() {
    $('body').removeClass();
  }

  handleReturnToggle = () => {
    this.setState({
      returnEnabled: !this.state.returnEnabled,
    });
  }

  handleVehicleTypeSelect = (type, price) => {
    this.handleStepForward({
      vehicleType: type,
      vehicleOneWayPrice: price,
    });
  }

  handleStepBack = () => {
    findDOMNode(this).scrollIntoView();
    this.setState({
      bookingStep: this.state.bookingStep - 1,
    });
  }

  handleStepForward = (additionalState = {}) => {
    findDOMNode(this).scrollIntoView();
    this.setState(assign({}, {
      bookingStep: this.state.bookingStep + 1,
    }, additionalState));
  }

  handleDepartureValueChange = (name, count) => {
    this.setState({
      extrasDeparture: assign({}, this.state.extrasDeparture, {
        [name]: count,
      }),
    });
  }

  handleReturnValueChange = (name, count) => {
    this.setState({
      extrasReturn: assign({}, this.state.extrasReturn, {
        [name]: count,
      }),
    });
  }

  render() {
    const { bookingStep } = this.state;

    if (bookingStep === 1) {
      return (
        <VehicleResults {...this.props}/>
      );
    }

    if (bookingStep === 2) {
      return (
        <Extras />
      );
    }

    if (bookingStep === 3) {
      return (
        <PassengerDetails />
      );
    }
  }
}

const queryShape = PropTypes.shape({
  from: PropTypes.string,
  to: PropTypes.string,
  persons: PropTypes.string,
  date: PropTypes.string,
});

ResultsPage.propTypes = {
  query: queryShape,
  prices: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.any,
    vehicleType: PropTypes.string,
  })),
  vehicles: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    persons: PropTypes.string,
    pictureName: PropTypes.string,
  })),
  destinations: PropTypes.arrayOf(PropTypes.shape({
    city: PropTypes.string,
    primary: PropTypes.bool,
  })),
};

ResultsPage.childContextTypes = {
  extras: PropTypes.arrayOf(PropTypes.shape({
    info: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  extrasDeparture: PropTypes.object,
  extrasReturn: PropTypes.object,
  onDepartureValueChange: PropTypes.func.isRequired,
  onReturnValueChange: PropTypes.func.isRequired,
  onStepBack: PropTypes.func.isRequired,
  onStepForward: PropTypes.func.isRequired,
  onReturnToggle: PropTypes.func,
  onVehicleTypeSelect: PropTypes.func.isRequired,
  returnEnabled: PropTypes.bool,
  query: queryShape,
  queryReturn: queryShape,
  vehicleType: PropTypes.string,
  vehicleOneWayPrice: PropTypes.number,
};

export default ResultsPage;
