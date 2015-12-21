/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import $ from 'jquery';

import withStyles from '../../decorators/withStyles';
import Link from '../Link';

import Dashboard from './components/Dashboard';
import Destinations from './components/Destinations';
import LoginForm from './components/LoginForm';

import styles from './AdminPage.scss';

@withStyles(styles)
class AdminPage extends Component {
  static displayName = 'AdminPage';

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

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
      .fail(() => window.location.reload());
  }

  _handleLogin = (user) => {
    this.setState({ user });
  }

  _renderPage() {
    const { user } = this.state;

    let pageContent;
    const pageUrl = window.location.pathname.split('/')[2];

    switch (pageUrl) {
    case 'dashboard':
      pageContent = <Dashboard/>;
      break;
    case 'destinations':
      pageContent = <Destinations/>;
      break;
    default:
      pageContent = <Dashboard/>;
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <ul className="nav nav-pills">
              <li role="presentation"><Link to="/admin/dashboard">Dashboard</Link></li>
              <li role="presentation"><Link to="/admin/destinations">Destinations</Link></li>
            </ul>
          </div>
          <div className="col-md-6">
            <div className="text-right">
              <span>Welcome back, <strong>{user.firstName}</strong>! </span>
              <a href="#" className="navbar-link" onClick={this._handleLogout}>Logout</a>
            </div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-12">
            {pageContent}
          </div>
        </div>
      </div>
    );
  }

  _renderContent() {
    const { user } = this.state;

    return user
      ? this._renderPage()
      : <LoginForm onLogin={this._handleLogin}/>;
  }

  _renderLoading() {
    return <div className="loading">Please wait...</div>;
  }

  render() {
    const title = 'Loading...';
    this.context.onSetTitle(title);

    const { isLoading } = this.state;

    return (
      <div className="AdminPage">
        <div className="container">
          {isLoading ? this._renderLoading() : this._renderContent()}
        </div>
      </div>
    );
  }

}

export default AdminPage;
