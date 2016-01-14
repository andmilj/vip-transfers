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
      <div id="Dashboard">
        <div className="wrap">
          <div className="row">
            <div className="content">
              <div className="box">
                <h1>Dashboard</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
