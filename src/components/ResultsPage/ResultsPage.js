import React, { PropTypes, Component } from 'react';

import Extras from './Extras.react';
import ExtrasJson from '../../constants/Extras';
import Loader from '../Loader';
import PassengerDetails from './PassengerDetails.react';
import Success from './Success.react';
import Summary from './Summary.react';
import VehicleResults from './VehicleResults.react';
import { getPrice, getReturnPrice } from '../../utils/Price.utils';
import { validateDetails, validateReturnDate, getErrorsForInvalidKeys} from '../../utils/Validation.utils';
import { findDOMNode } from 'react-dom';

import { assign, without, union,
  isEmpty, defaults } from 'lodash';

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
      loading: false,
      returnEnabled: false,
      vehicleType: null,
      vehicleOneWayPrice: null,
      vehicleReturnPrice: null,
      returnDate: null,
      passengerDetails: {
        name: 'Andrej Miljus',
        number: '091 888 888',
        email: 'aaaaa@aaa.com',
        email2: 'aaaaa@aaa.com',
        country: 'aaaaa',
        city: 'aaaaa',
      },
      oneWayAddressDetails: {
        pickUpAddress: 'Adresa Neka 13',
        dropOffAddress: 'Adresa Neka 14',
        arrivalFlightNumber: 'aaaaa',
        departureFlightNumber: 'aaaaa',
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

  validate() {
    switch (this.state.bookingStep) {
    case 1:
      return validateReturnDate(this.state.returnEnabled, this.state.returnDate);
    case 3:
      return validateDetails(this.state, this.props.query, this.state.returnEnabled);
    default:
      return [];
    }
  }

  createReservation = () => {
    this.setState({
      loading: true,
    });

    setTimeout(() => {
      $.post('/api/reservation', (data) => {
        console.log(data);
      }).always(() => {
        this.setState({
          loading: false,
          bookingStep: this.state.bookingStep + 1,
        });
      });
    }, 2000);
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
    const price = getPrice(defaults({ vehicleOneWayPrice }, this.state), this.state.returnEnabled);
    this.handleStepForward({
      vehicleType: type,
      vehicleReturnPrice: getReturnPrice(vehicleOneWayPrice),
      vehicleOneWayPrice,
      price,
    });
  }

  handleStepBack = () => {
    findDOMNode(this).scrollIntoView();
    this.setState({
      bookingStep: this.state.bookingStep - 1,
      lastStep: this.state.bookingStep - 1 === 4,
    });
  }

  handleStepForward = (additionalState = {}) => {
    const validationArray = this.validate();
    if (!this.state.lastStep) {
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
    } else {
      this.createReservation();
    }
  }

  handleDepartureValueChange = (name, count) => {
    const extrasDeparture = assign({}, this.state.extrasDeparture, {
      [name]: count,
    });
    const price = getPrice(defaults({ extrasDeparture }, this.state), this.state.returnEnabled);

    this.setState({
      extrasDeparture,
      price,
    });
  }

  handleReturnValueChange = (name, count) => {
    const extrasReturn = assign({}, this.state.extrasReturn, {
      [name]: count,
    });
    const price = getPrice(defaults({ extrasReturn }, this.state), this.state.returnEnabled);

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
    const detailsObject = {
      [field]: value,
    };
    const newState = {
      [fieldToChange]: assign({}, this.state[fieldToChange], detailsObject),
    };
    const removedErrors = without(this.state.errors, fieldToChange + '.' + field);
    this.setState(assign(newState, {
      // email2 not checked
      errors: union(getErrorsForInvalidKeys(detailsObject, fieldToChange), removedErrors),
    }));
  }

  render() {
    const { bookingStep, loading } = this.state;
    if (loading) {
      return (
        <Loader />
      );
    }

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

    if (bookingStep === 5) {
      return (
        <Success />
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
