import React, { PropTypes, Component } from 'react';

import Extras from './Extras.react';
import ExtrasJson from '../../constants/Extras';
import PassengerDetails from './PassengerDetails.react';
import Summary from './Summary.react';
import VehicleResults from './VehicleResults.react';
import PriceUtils from '../../utils/Price.utils';
import ValidationUtil from '../../utils/Validation.utils';
import FormatUtils from '../../utils/Format.utils';
import { findDOMNode } from 'react-dom';

import { assign, without,
  isEmpty, reduce, defaults, find } from 'lodash';

class ResultsPage extends Component {
  static defaultProps = {
    prices: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      bookingStep: 1,
      extrasDeparture: {},
      extrasReturn: {},
      lastStep: false,
      returnEnabled: false,
      vehicleType: null,
      vehicleOneWayPrice: null,
      vehicleReturnPrice: null,
      returnDate: null,
      passengerDetails: {
        name: null,
        number: null,
        email: null,
        country: null,
        city: null,
      },
      oneWayAddressDetails: {
        pickUpAddress: null,
        dropOffAddress: null,
        arrivalFlightNumber: null,
        departureFlightNumber: null,
      },
      returnWayAddressDetails: {
        pickUpAddress: null,
        dropOffAddress: null,
        arrivalFlightNumber: null,
        departureFlightNumber: null,
      },
      price: 0,
    };
  }

  getChildContext() {
    return {
      errors: this.state.errors,
      extras: ExtrasJson,
      extrasDeparture: this.state.extrasDeparture,
      extrasReturn: this.state.extrasReturn,
      lastStep: this.state.lastStep,
      onDepartureValueChange: this.handleDepartureValueChange,
      onDetailsChange: this.handleDetailsChange,
      onStepBack: this.handleStepBack,
      onStepForward: this.handleStepForward,
      onReturnDateChange: this.handleReturnDateChange,
      onReturnToggle: this.handleReturnToggle,
      onReturnValueChange: this.handleReturnValueChange,
      onVehicleTypeSelect: this.handleVehicleTypeSelect,
      passengerDetails: this.state.passengerDetails,
      price: this.state.price,
      returnEnabled: this.state.returnEnabled,
      query: this.props.query,
      returnDate: this.state.returnDate,
      vehicleType: this.state.vehicleType,
      vehicleOneWayPrice: this.state.vehicleOneWayPrice,
      oneWayAddressDetails: this.state.oneWayAddressDetails,
      returnWayAddressDetails: this.state.returnWayAddressDetails,
    };
  }

  componentDidMount() {
    $('body').removeClass();
  }

  getPrice = ({ extrasDeparture, extrasReturn, vehicleOneWayPrice }) => {
    const priceExDeparture = this.reducePriceFromExtras(extrasDeparture);
    const priceExReturn = this.reducePriceFromExtras(extrasReturn);

    const priceReturn = this.state.returnEnabled ? (PriceUtils.getReturnPrice(vehicleOneWayPrice) + priceExReturn) : 0;

    return vehicleOneWayPrice + priceReturn + priceExDeparture;
  }

  reducePriceFromExtras = (extraType) => {
    return reduce(extraType, (result, value, name) => {
      return result + find(ExtrasJson, { name }).price * value;
    }, 0);
  }

  validateReturnDate() {
    if (this.state.returnEnabled && !this.state.returnDate) {
      return ['returnDate'];
    }
    return [];
  }

  validate() {
    switch (this.state.bookingStep) {
    case 1:
      return this.validateReturnDate();
    case 3:
      return ValidationUtil.validateDetails(this.state, this.props.query, this.state.returnEnabled);
    default:
      return [];
    }
  }

  handleReturnToggle = () => {
    this.setState({
      returnEnabled: !this.state.returnEnabled,
      errors: [],
      returnWayAddressDetails: {
        pickUpAddress: null,
        dropOffAddress: null,
        arrivalFlightNumber: null,
        departureFlightNumber: null,
      },
    });
  }

  handleVehicleTypeSelect = (type, vehicleOneWayPrice) => {
    const price = this.getPrice(defaults({ vehicleOneWayPrice }, this.state));
    this.handleStepForward({
      vehicleType: type,
      vehicleReturnPrice: PriceUtils.getReturnPrice(vehicleOneWayPrice),
      vehicleOneWayPrice,
      price,
    });
  }

  handleStepBack = () => {
    findDOMNode(this).scrollIntoView();
    this.setState({
      bookingStep: this.state.bookingStep - 1,
      lastStep: (this.state.bookingStep + 1) === 4,
    });
  }

  handleStepForward = (additionalState = {}) => {
    const validationArray = this.validate();
    if (isEmpty(validationArray)) {
      findDOMNode(this).scrollIntoView();
      this.setState(assign({}, {
        bookingStep: this.state.bookingStep + 1,
        lastStep: (this.state.bookingStep + 1) === 4,
      }, additionalState));
    } else {
      this.setState({
        errors: validationArray,
      });
    }
  }

  handleDepartureValueChange = (name, count) => {
    const extrasDeparture = assign({}, this.state.extrasDeparture, {
      [name]: count,
    });
    const price = this.getPrice(defaults({ extrasDeparture }, this.state));

    this.setState({
      extrasDeparture,
      price,
    });
  }

  handleReturnValueChange = (name, count) => {
    const extrasReturn = assign({}, this.state.extrasReturn, {
      [name]: count,
    });
    const price = this.getPrice(defaults({ extrasReturn }, this.state));

    this.setState({
      extrasReturn,
      price,
    });
  }

  handleReturnDateChange = (returnDate) => {
    this.setState({
      returnDate,
      errors: without(this.state.errors, 'returnDate'),
    });
  }

  handleDetailsChange = (field, value, fieldToChange = 'passengerDetails') => {
    const newState = {
      [fieldToChange]: assign({}, this.state[fieldToChange], {
        [field]: value,
      }),
    };
    this.setState(assign(newState, {
      errors: ValidationUtil.validateDetails(
          defaults(newState, FormatUtils.pickDetails(this.state)),
          this.props.query,
          this.state.returnEnabled
        ),
    }));
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

    if (bookingStep === 4) {
      return (
        <Summary />
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
  errors: PropTypes.arrayOf(PropTypes.string),
  extras: PropTypes.arrayOf(PropTypes.shape({
    info: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  extrasDeparture: PropTypes.object,
  extrasReturn: PropTypes.object,
  lastStep: PropTypes.bool,
  passengerDetails: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.string,
    email: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
  }),
  oneWayAddressDetails: PropTypes.shape({
    pickUpAddress: PropTypes.string,
    dropOffAddress: PropTypes.string,
    arrivalFlightNumber: PropTypes.string,
    departureFlightNumber: PropTypes.string,
  }),
  returnWayAddressDetails: PropTypes.shape({
    pickUpAddress: PropTypes.string,
    dropOffAddress: PropTypes.string,
    arrivalFlightNumber: PropTypes.string,
    departureFlightNumber: PropTypes.string,
  }),
  price: PropTypes.number.isRequired,
  onDepartureValueChange: PropTypes.func.isRequired,
  onDetailsChange: PropTypes.func.isRequired,
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
