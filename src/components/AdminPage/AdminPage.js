/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './AdminPage.css';

@withStyles(styles)
class AdminPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    const title = 'Admin';
    this.context.onSetTitle(title);

    return (
      <div className="AdminPage">
        <div className="AdminPage-container">

          <div className="section anchor">
            <div className="light-wrapper">
              <div className="container inner">
                <h2>Hello!</h2>
                <p>Welcome to the Admin page!</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

}

export default AdminPage;
