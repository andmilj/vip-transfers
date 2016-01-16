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
      returnDate: null,
      passengerDetails: {
        name: null,
        number: null,
        email: null,
        country: null,
        city: null,
      },
    };
  }

  getChildContext() {
    return {
      extras: ExtrasJson,
      extrasDeparture: this.state.extrasDeparture,
      extrasReturn: this.state.extrasReturn,
      onDepartureValueChange: this.handleDepartureValueChange,
      onPassengerDetailsChange: this.handlePassengerDetailsChange,
      onStepBack: this.handleStepBack,
      onStepForward: this.handleStepForward,
      onReturnDateChange: this.handleReturnDateChange,
      onReturnToggle: this.handleReturnToggle,
      onReturnValueChange: this.handleReturnValueChange,
      onVehicleTypeSelect: this.handleVehicleTypeSelect,
      passengerDetails: this.state.passengerDetails,
      returnEnabled: this.state.returnEnabled,
      query: this.props.query,
      returnDate: this.state.returnDate,
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

  handleReturnDateChange = (returnDate) => {
    this.setState({
      returnDate,
    });
  }

  handlePassengerDetailsChange = (field, value) => {
    this.setState({
      passengerDetails: assign({}, this.state.passengerDetails, {
        [field]: value,
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
  passengerDetails: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.string,
    email: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
  }),
  onDepartureValueChange: PropTypes.func.isRequired,
  onPassengerDetailsChange: PropTypes.func.isRequired,
  onStepBack: PropTypes.func.isRequired,
  onStepForward: PropTypes.func.isRequired,
  onReturnDateChange: PropTypes.func,
  onReturnToggle: PropTypes.func,
  onReturnValueChange: PropTypes.func.isRequired,
  onVehicleTypeSelect: PropTypes.func.isRequired,
  returnEnabled: PropTypes.bool,
  returnDate: PropTypes.instanceOf(Date),
  query: queryShape,
  vehicleType: PropTypes.string,
  vehicleOneWayPrice: PropTypes.number,
};

export default ResultsPage;
