import React, {PropTypes, Component} from 'react';
import DatePicker from '../ToolBox/DatePicker';
import Dropdown from '../ToolBox/Dropdown';
import Link from '../Link';
import {filter, get} from 'lodash';

class SearchForm extends Component {
  static propTypes = {
    destinations: PropTypes.array,
  };

  static defaultProps = {
    destinations: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      primarySelection: null,
      secondarySelection: null,
      numberOfPersons: null,
      date: undefined,
      name: null,
    };
  }

  _handlePrimarySelection = (key, destination) => {
    this.setState({primarySelection: destination});
  }

  _handleSecondarySelection = (key, destination) => {
    this.setState({secondarySelection: destination});
  }

  _handleDateChange = (date) => {
    this.setState({date});
  }

  _handlePersonsChange = (numberOfPersons) => {
    this.setState({numberOfPersons});
  }

  _filterSource(otherSelection) {
    const {destinations} = this.props;

    if (get(otherSelection, 'primary')) {
      return filter(destinations, {primary: false});
    }

    return destinations;
  }

  _createQuery() {
    return {
      abc: 4,
    };
  }

  render() {
    return (
      <form className="forms">
        <fieldset>
          <div className="row">
            <div className="col-sm-offset-3 col-sm-6">
              <Dropdown placeholder="Select your starting point"
                        label="Starting point"
                        direction="down"
                        value={this.state.primarySelection}
                        onChange={this._handlePrimarySelection}
                        source={this._filterSource(this.state.secondarySelection)}
                        sourceValueKey={'city'}
                        sourceLabelKey={'city'} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-offset-3 col-sm-6">
              <Dropdown direction="down"
                        placeholder="Select your ending point"
                        label="Ending point"
                        onChange={this._handleSecondarySelection}
                        value={this.state.secondarySelection}
                        source={this._filterSource(this.state.primarySelection)}
                        sourceValueKey={'city'}
                        sourceLabelKey={'city'} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-offset-3 col-sm-3">
              <DatePicker label="Date"
                          placeholder="Select date..."
                          onChange={this._handleDateChange}
                          value={this.state.date}/>
            </div>
            <div className="col-sm-3">
              <Dropdown direction="down"
                        placeholder="Select persons..."
                        label="Persons"
                        onChange={this._handlePersonsChange}
                        value={this.state.numberOfPersons}
                        source={[1, 2, 3, 4, 5]} />
            </div>
          </div>
          <div className="row">
            <div className="smooth text-center">
              <Link to={'/results'} query={this._createQuery()} className="btn btn-border">Search</Link>
            </div>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default SearchForm;
