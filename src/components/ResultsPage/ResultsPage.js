import React, { PropTypes, Component } from 'react';
import { omit, pick, assign } from 'lodash';
import AdvancedSearch from '../AdvancedSearch/AdvancedSearch.react';
import Results from './Results.react';
import Extras from './Extras.react';
import ExtrasJson from '../../constants/Extras';

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
      onDepartureValueChange: this.handleDepartureValueChange,
      onReturnValueChange: this.handleReturnValueChange,
      onVehicleTypeSelect: this.handleVehicleTypeSelect,
      returnEnabled: this.state.returnEnabled,
      onStepBack: this.handleStepBack,
      extrasDeparture: this.state.extrasDeparture,
      extrasReturn: this.state.extrasReturn,
      query: this.props.query,
      queryReturn: this.state.queryReturn,
      vehicleType: this.state.vehicleType,
    };
  }

  componentDidMount() {
    $('body').removeClass();
  }

  handleVehicleTypeSelect = (type) => {
    this.setState({
      vehicleType: type,
      bookingStep: 2,
    });
  }

  handleStepBack = () => {
    this.setState({
      bookingStep: this.state.bookingStep - 1,
    });
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
    const _date = new Date(parseInt(this.props.query.date, 10));

    if (bookingStep === 1) {
      return (
        <div>
          <AdvancedSearch twoWayEnabled
                          destinations={this.props.destinations}
                          {...omit(this.props.query, 'date')}
                          date={_date}/>
          <Results {...pick(this.props, 'vehicles', 'prices')}/>
        </div>
      );
    }

    if (bookingStep === 2) {
      return (
        <Extras />
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
  onDepartureValueChange: PropTypes.func.isRequired,
  onReturnValueChange: PropTypes.func.isRequired,
  onVehicleTypeSelect: PropTypes.func.isRequired,
  returnEnabled: PropTypes.bool,
  onStepBack: PropTypes.func.isRequired,
  extrasDeparture: PropTypes.object,
  extrasReturn: PropTypes.object,
  query: queryShape,
  queryReturn: queryShape,
  vehicleType: PropTypes.string,
};

export default ResultsPage;
