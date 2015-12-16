/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './Destinations.css';
import withStyles from '../../../../decorators/withStyles';

@withStyles(styles)
class Destinations extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const title = 'Destinations';
    this.context.onSetTitle(title);

    const { user } = this.props;

    return (
      <div className="Destinations">
        <div className="Destinations-container">
          <div className="container inner">
            <h1>Destinations</h1>
            <p>
              <span>Welcome to Destinations, <strong>{user.firstName}</strong>! </span>
              <a href="#" onClick={this.props.onLogout}>Logout</a>
            </p>
            <table className="table table-striped">
              <thead>
                <tr>
                   <th>#</th>
                   <th>Name</th>
                   <th>Actions</th>
                </tr>
             </thead>
             <tbody>
                <tr>
                   <th scope="row">1</th>
                   <td>Split</td>
                   <td>
                    <div className="btn-toolbar" role="toolbar" aria-label="...">
                      <div className="btn-group" role="group" aria-label="...">
                        <button className="btn btn-default">Edit</button>
                      </div>
                      <div className="btn-group" role="group" aria-label="...">
                        <button className="btn btn-danger">Delete</button>
                      </div>
                    </div>
                   </td>
                </tr>
                <tr>
                   <th scope="row">1</th>
                   <td>Zagreb</td>
                   <td>
                    <div className="btn-toolbar" role="toolbar" aria-label="...">
                      <div className="btn-group" role="group" aria-label="...">
                        <button className="btn btn-default">Edit</button>
                      </div>
                      <div className="btn-group" role="group" aria-label="...">
                        <button className="btn btn-danger">Delete</button>
                      </div>
                    </div>
                   </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

}

export default Destinations;
