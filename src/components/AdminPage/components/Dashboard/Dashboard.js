/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../../../decorators/withStyles';

import styles from './Dashboard.scss';

@withStyles(styles)
class Dashboard extends Component {
  static displayName = 'Dashboard';

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    const title = 'Dashboard';
    this.context.onSetTitle(title);

    return (
      <div className="Dashboard">
        <h1>Dashboard</h1>
        <br/>
        <p>Welcome to Dashboard!</p>
      </div>
    );
  }
}

export default Dashboard;
