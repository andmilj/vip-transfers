/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import $ from 'jquery';
import withStyles from '../../decorators/withStyles';
import Dashboard from './components/Dashboard';
import Destinations from './components/Destinations';
import LoginForm from './components/LoginForm';
import styles from './AdminPage.css';

@withStyles(styles)
class AdminPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      user: undefined,
    };
  }

  componentDidMount() {
    $.post('/api/auth/check')
      .done(res => {
        this.setState({
          isLoading: false,
          user: res,
        });
      })
      .statusCode({
        401: () => {
          this.setState({
            isLoading: false,
          });
        },
      });
  }

  _handleLogout = (e) => {
    e.preventDefault();

    $.post('/api/auth/destroy')
      .done(() => {
        this.setState({
          user: undefined,
        });
      })
      .statusCode({
        401: () => {
          //
        },
      });
  }

  _handleLogin = (user) => {
    this.setState({user});
  }

  _renderPage() {
    const { user } = this.state;

    const page = window.location.pathname.split('/')[2];

    switch (page) {
    case 'dashboard':
      return <Dashboard user={user} onLogout={this._handleLogout}/>;
    case 'destinations':
      return <Destinations user={user} onLogout={this._handleLogout}/>;
    default:
      return <Dashboard user={user} onLogout={this._handleLogout}/>;
    }
  }

  _renderContent() {
    const { user } = this.state;

    return user
      ? this._renderPage()
      : <LoginForm onLogin={this._handleLogin}/>;
  }

  _renderLoadingScreen() {
    return (
      <div className="AdminPage">
        <div className="AdminPage-container">
          <h1 className="loading-text">Please wait...</h1>
        </div>
      </div>
    );
  }

  render() {
    const title = 'Loading...';
    this.context.onSetTitle(title);

    const { isLoading } = this.state;

    return isLoading
      ? this._renderLoadingScreen()
      : this._renderContent();
  }

}

export default AdminPage;
