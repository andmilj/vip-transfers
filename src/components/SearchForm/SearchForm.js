import React, {PropTypes, Component} from 'react';
import DatePicker from '../ToolBox/DatePicker';
import Dropdown from '../ToolBox/Dropdown';
import Link from '../Link';
import {filter, get, defaults} from 'lodash';

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
      from: null,
      to: null,
      persons: null,
      date: undefined,
      error: {},
    };
  }

  _handlePrimarySelection = (key, destination) => {
    const error = defaults({ from: null }, this.state.error);
    this.setState({
      from: destination,
      error,
    });
  }

  _handleSecondarySelection = (key, destination) => {
    const error = defaults({ to: null }, this.state.error);
    this.setState({
      to: destination,
      error,
    });
  }

  _handleDateChange = (date) => {
    const error = defaults({ date: null }, this.state.error);
    this.setState({date, error});
  }

  _handlePersonsChange = (persons) => {
    const error = defaults({ persons: null }, this.state.error);
    this.setState({persons, error});
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    const {from, to, persons, date} = this.state;
    const error = {};

    if (from && to && persons && date) {
      this.refs.searchForm.submit();
      return;
    }

    error.from = !from ? 'Destination missing' : null;
    error.to = !to ? 'Destination missing' : null;
    error.date = !date ? 'Select Date' : null;
    error.persons = !persons ? 'Select persons' : null;

    this.setState({
      error: error,
    });
  }

  _filterSource(otherSelection) {
    const {destinations} = this.props;

    if (get(otherSelection, 'primary')) {
      return filter(destinations, {primary: false});
    }

    return destinations;
  }

  _createQuery() {
    const {persons, from, to, date} = this.state;

    return {
      from: get(from, 'city'),
      to: get(to, 'city'),
      date: date ? date.getTime() : null,
      persons,
    };
  }

  render() {
    return (
      <form ref="searchForm" className="forms" action="/results" method="GET" onSubmit={this._handleSubmit}>
        <fieldset>
          <div className="row">
            <div className="col-sm-offset-3 col-sm-6">
              <Dropdown placeholder="Select your starting point"
                        name="from"
                        label="Starting point"
                        direction="down"
                        error={this.state.error.from}
                        value={this.state.from}
                        onChange={this._handlePrimarySelection}
                        source={this._filterSource(this.state.to)}
                        sourceValueKey={'city'}
                        sourceLabelKey={'city'} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-offset-3 col-sm-6">
              <Dropdown direction="down"
                        name="to"
                        placeholder="Select your ending point"
                        label="Ending point"
                        error={this.state.error.to}
                        onChange={this._handleSecondarySelection}
                        value={this.state.to}
                        source={this._filterSource(this.state.from)}
                        sourceValueKey={'city'}
                        sourceLabelKey={'city'} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-offset-3 col-sm-3">
              <DatePicker label="Date"
                          name="date"
                          placeholder="Select date..."
                          onChange={this._handleDateChange}
                          error={this.state.error.date}
                          value={this.state.date}/>
            </div>
            <div className="col-sm-3">
              <Dropdown direction="down"
                        name="persons"
                        placeholder="Select persons..."
                        icon="people"
                        label="Persons"
                        error={this.state.error.persons}
                        onChange={this._handlePersonsChange}
                        value={this.state.persons}
                        source={[1, 2, 3, 4, 5]} />
            </div>
          </div>
          <div className="row">
            <div className="smooth text-center">
              <button type="submit" className="btn btn-border">Search</button>
            </div>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default SearchForm;
