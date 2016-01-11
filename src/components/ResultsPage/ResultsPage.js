import React, { PropTypes, Component } from 'react';
import { omit, pick } from 'lodash';
import AdvancedSearch from '../AdvancedSearch/AdvancedSearch.react';
import Results from './Results.react';
import Extras from './Extras.react';
import ExtrasJson from '../../constants/Extras';

class ResultsPage extends Component {
  static defaultProps = {
    prices: [],
  }

  getChildContext() {
    return {
      extras: ExtrasJson,
      onDepartureValueChange: this.handleDepartureValueChange,
      onReturnValueChange: this.handleReturnValueChange,
      returnEnabled: true,
    };
  }

  componentDidMount() {
    $('body').removeClass();
  }

  handleDepartureValueChange = (name, count) => {
    console.log(name);
    console.log(count);
  }

  handleReturnValueChange = (name, count) => {
    console.log(name);
  }

  render() {
    const _date = new Date(parseInt(this.props.query.date, 10));

    return (
      <div>
        <AdvancedSearch twoWayEnabled
                        destinations={this.props.destinations}
                        {...omit(this.props.query, 'date')}
                        date={_date}/>
        <Results {...pick(this.props, 'vehicles', 'prices')}/>
        <Extras />
      </div>
    );
  }
}

ResultsPage.propTypes = {
  query: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
    persons: PropTypes.string,
    date: PropTypes.string,
  }),
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
  returnEnabled: PropTypes.bool,
};

export default ResultsPage;
