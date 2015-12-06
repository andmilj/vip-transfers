/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import LoginPage from '../LoginPage';
import withStyles from '../../decorators/withStyles';
import styles from './AdminPage.css';

@withStyles(styles)
class AdminPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: undefined
    };
  }

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  _renderLoginPage() {
    const props = {
      onLoginSuccess: (user) => {
        this.setState({user});
      }
    };

    return <LoginPage {...props}/>;
  }

  _renderAdminPage() {
    const title = 'Admin';
    this.context.onSetTitle(title);

    const { user } = this.state;

    return (
      <div className="AdminPage">
        <div className="AdminPage-container">

          <div className="section anchor">
            <div className="light-wrapper">
              <div className="container inner">
                <h2>Hello!</h2>
                <p>Welcome back, <strong>{user.firstName}</strong>!</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  render() {
    const { user } = this.state;

    return user
      ? this._renderAdminPage()
      : this._renderLoginPage();
  }

}

export default AdminPage;
