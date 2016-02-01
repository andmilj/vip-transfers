import React, { Component, PropTypes } from 'react';
import AdvancedSearch from '../AdvancedSearch/AdvancedSearch.react';
import Link from '../Link';
import Results from './Results.react';
import { omit, pick, assign } from 'lodash';

class VehicleResults extends Component {
  constructor(props) {
    super(props);

    this.state = assign({}, omit(props.query, 'date'), {
      date: new Date(parseInt(props.query.date, 10)),
      return: false,
    });
  }

  _handlePrimarySelection = (e) => {
    this.setState({
      from: e.target.value,
    });
  }

  _handleSecondarySelection = (e) => {
    this.setState({
      to: e.target.value,
    });
  }

  _handlePersonsChange = (e) => {
    this.setState({ persons: e.target.value });
  }

  _handleDateChange = (date) => {
    this.setState({ date });
  }

  _handleSubmit = () => {
    const {from, to, persons, date} = this.state;

    if (from && to && persons && date) {
      Link.redirectTo('/results', {
        from, to, persons,
        date: date.getTime()});
      return;
    }
  }

  render() {
    return (
      <div>
        <AdvancedSearch twoWayEnabled
                        destinations={this.props.destinations}
                        {...this.state}
                        onDateChange={this._handleDateChange}
                        onPersonChange={this._handlePersonsChange}
                        onPickupChange={this._handlePrimarySelection}
                        onDropoffChange={this._handleSecondarySelection}
                        onSubmit={this._handleSubmit} />
        <Results {...pick(this.props, 'vehicles', 'prices')}/>
      </div>
    );
  }
}

const queryShape = PropTypes.shape({
  from: PropTypes.string,
  to: PropTypes.string,
  persons: PropTypes.string,
  date: PropTypes.string,
});

VehicleResults.propTypes = {
  query: queryShape,
  prices: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.any,
    vehicleType: PropTypes.string,
  })),
  vehicles: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    persons: PropTypes.string,
    pictureName: PropTypes.string,
    textMain: PropTypes.string,
  })),
  destinations: PropTypes.arrayOf(PropTypes.shape({
    city: PropTypes.string,
    primary: PropTypes.bool,
  })),
};

export default VehicleResults;
