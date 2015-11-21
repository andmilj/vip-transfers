import React, {PropTypes, Component} from 'react';
import Select from 'react-select';

class SearchForm extends Component {
  static propTypes = {
    destinations: PropTypes.array,
  };

  static defaultProps = {
    destinations: [],
  };

  render() {
    console.log(this.props.destinations);
    return (
      <form className="forms">
        <fieldset>
          <div className="row">
            <div className="col-sm-offset-3 col-sm-6">
              <input placeholder="Select your starting point" type="text" name="name" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-offset-3 col-sm-6">
              <input placeholder="Select your destination point" type="text" name="name" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-offset-3 col-sm-3">
              <input placeholder="Date" type="text" name="name" />
            </div>
            <div className="col-sm-3">
              <input placeholder="Persons" type="text" name="email" />
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
