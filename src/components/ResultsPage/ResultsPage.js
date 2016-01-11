import React, { PropTypes, Component } from 'react';
import { omit, pick } from 'lodash';
import AdvancedSearch from '../AdvancedSearch/AdvancedSearch.react';
import Results from './Results.react';
import Extras from './Extras.react';

class ResultsPage extends Component {
  static defaultProps = {
    prices: [],
  }

  componentDidMount() {
    $('body').removeClass();
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

export default ResultsPage;
