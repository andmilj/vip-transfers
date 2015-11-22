import React, {PropTypes, Component} from 'react';
import Select from 'react-select';
import DatePicker from '../ToolBox/DatePicker';
import Input from '../ToolBox/Input';

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
      date: undefined,
    };
  }

  _handlePrimarySelection = (city, destinations) => {
    this.setState({primarySelection: destinations[0]});
  }

  _handleSecondarySelection = (city, destinations) => {
    this.setState({secondarySelection: destinations[0]});
  }

  _handleDateChange = (date) => {
    this.setState({date: date});
  }

  render() {
    return (
      <form className="forms">
        <fieldset>
          <div className="row">
            <div className="col-sm-offset-3 col-sm-6">
              <Select placeholder="Select your starting point"
                      value={this.state.primarySelection}
                      options={this.props.destinations}
                      labelKey={'city'}
                      valueKey={'city'}
                      onChange={this._handlePrimarySelection}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-offset-3 col-sm-6">
              <Select placeholder="Select your ending point"
                      value={this.state.secondarySelection}
                      options={this.props.destinations}
                      labelKey={'city'}
                      valueKey={'city'}
                      onChange={this._handleSecondarySelection}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-offset-3 col-sm-3">
              <DatePicker label="Date"
                          onChange={this._handleDateChange}
                          value={this.state.date}/>
            </div>
            <div className="col-sm-3">
              <Input type="text" label="Name" name="name" value={this.state.name} />
            </div>
          </div>
          <div className="row">
            <div className="smooth text-center">
              <a href="#contact" className="btn btn-border">Search</a></div>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default SearchForm;
