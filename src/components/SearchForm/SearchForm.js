import React, {PropTypes, Component} from 'react';
import DatePicker from '../ToolBox/DatePicker';
import Input from '../ToolBox/Input';
import Dropdown from '../ToolBox/Dropdown';

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
      name: null,
    };
  }

  _handlePrimarySelection = (city) => {
    this.setState({primarySelection: city});
  }

  _handleSecondarySelection = (city) => {
    this.setState({secondarySelection: city});
  }

  _handleDateChange = (date) => {
    this.setState({date: date});
  }

  render() {
    const source = {'ES-es': 'Spain', 'TH-th': 'Thailand', 'EN-gb': 'England', 'EN-en': 'USA'};

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
                        source={source} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-offset-3 col-sm-6">
              <Dropdown direction="down"
                        placeholder="Select your ending point"
                        label="Ending point"
                        onChange={this._handleSecondarySelection}
                        value={this.state.secondarySelection}
                        source={source} />
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
              <Input type="text" label="Persons" placeholder="Select persons..." name="persons" error value={this.state.name} />
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
