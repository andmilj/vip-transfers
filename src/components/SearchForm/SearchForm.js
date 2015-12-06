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
      from: null,
      to: null,
      persons: null,
      date: undefined,
    };
  }

  _handlePrimarySelection = (key, destination) => {
    this.setState({from: destination});
  }

  _handleSecondarySelection = (key, destination) => {
    this.setState({to: destination});
  }

  _handleDateChange = (date) => {
    this.setState({date});
  }

  _handlePersonsChange = (persons) => {
    this.setState({persons});
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    // TODO: validation and submit
    console.log(e);
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
      <form className="forms" action="/results" method="GET" onSubmit={this._handleSubmit}>
        <fieldset>
          <div className="row">
            <div className="col-sm-offset-3 col-sm-6">
              <Dropdown placeholder="Select your starting point"
                        name="from"
                        label="Starting point"
                        direction="down"
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
                          placeholder="Select date..."
                          onChange={this._handleDateChange}
                          value={this.state.date}/>
            </div>
            <div className="col-sm-3">
              <Dropdown direction="down"
                        placeholder="Select persons..."
                        icon="people"
                        label="Persons"
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
