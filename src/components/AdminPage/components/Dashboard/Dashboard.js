/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './Dashboard.css';
import withStyles from '../../../../decorators/withStyles';

@withStyles(styles)
class Dashboard extends Component {

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
    const title = 'Dashboard';
    this.context.onSetTitle(title);

    const { user } = this.props;

    return (
      <div className="Dashboard">
        <div className="Dashboard-container">
          <div className="container inner">
            <h1>Dashboard</h1>
            <p>
              <span>Welcome to Dashboard, <strong>{user.firstName}</strong>! </span>
              <a href="#" onClick={this.props.onLogout}>Logout</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

}

export default Dashboard;
