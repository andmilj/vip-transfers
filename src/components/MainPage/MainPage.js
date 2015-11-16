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
      <div className="MainPage-container parallax parallax4">
        <div className="container inner text-center">
          <div className="bg-front full-center">
            <div className="container">
              <div>
                <form>
                  <div className="row">
                    <div className="col-md-5">
                      <div className="form-group">
                        <label>Address 1</label>
                        <Select options={options} />
                        </div>
                    </div>
                    <div className="col-md-7">
                      <div className="input-daterange">
                        <div className="row">
                          <div className="col-md-3">
                            <div className="form-group">
                              <label>Check-in</label>
                              <input className="form-control" name="start" type="text" />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label>Check-out</label>
                              <input className="form-control" name="end" type="text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6"></div>
                    <div className="col-md-6"></div>
                  </div>
                  <button className="btn btn-primary btn-lg" type="submit">Search for Hotels</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default MainPage;
