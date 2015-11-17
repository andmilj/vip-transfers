import React, { PropTypes, Component } from 'react';
import styles from './MainPage.css';
import withStyles from '../../decorators/withStyles';
import Select from 'react-select';

@withStyles(styles)
class MainPage extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    const title = 'Main Page';
    this.context.onSetTitle(title);

    const options = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
    ];

    return (
      <div className="MainPage-container">

        <div className="parallax parallax4">
          <div className="container inner text-center">
          </div>
        </div>

        <div className="section anchor">
          <div className="light-wrapper">
            <div className="container inner">
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
            </div>
          </div>
        </div>

        <div className="parallax parallax4">
          <div className="container inner text-center">
          </div>
        </div>
      </div>
    );
  }

}

export default MainPage;
