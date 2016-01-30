/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';

import withStyles from '../../decorators/withStyles';
import Link from '../Link';

import Dashboard from './components/Dashboard';
import Destinations from './components/Destinations';
import Vehicles from './components/Vehicles';
import Prices from './components/Prices';
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
        401: () => this.setState({isLoading: false}),
      });
  }

  _handleLogout(e) {
    e.preventDefault();

    $.post('/api/auth/destroy')
      .done(() => this.setState({user: undefined}))
      .fail(() => window.location.reload());
  }

  _handleLogin(user) {
    this.setState({ user });
  }

  _renderContent() {
    const { user } = this.state;

    let pageTitle;
    let pageContent;
    const pageUrl = window.location.pathname.split('/')[2];

    if (user) {
      switch (pageUrl) {
      case 'dashboard':
        pageTitle = 'Dashboard';
        pageContent = <Dashboard/>;
        break;
      case 'destinations':
        pageTitle = 'Destinations';
        pageContent = <Destinations/>;
        break;
      case 'vehicles':
        pageTitle = 'Vehicles';
        pageContent = <Vehicles/>;
        break;
      case 'prices':
        pageTitle = 'Prices';
        pageContent = <Prices/>;
        break;
      default:
        pageTitle = 'Dashboard';
        pageContent = <Dashboard/>;
      }
    } else {
      pageTitle = 'Login';
      pageContent = <LoginForm onLogin={this._handleLogin.bind(this)}/>;
    }

    return (
      <main className="main" role="main">
        <header className="site-title color">
          <div className="wrap">
            <div className="container">
              <h1>{pageTitle}</h1>
              {user && (
                <nav role="navigation" className="breadcrumbs">
                  <ul>
                    <li><Link to="/admin/dashboard">Dashboard</Link></li>
                    <li><Link to="/admin/destinations">Destinations</Link></li>
                    <li><Link to="/admin/vehicles">Vehicles</Link></li>
                    <li><Link to="/admin/prices">Prices</Link></li>
                    <li><a href="#" onClick={this._handleLogout.bind(this)}>Logout</a></li>
                    <li>{user.firstName}</li>
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </header>
        {pageContent}
      </main>
    );
  }

  _renderLoading() {
    return <div className="loading">Please wait...</div>;
  }

  render() {
    const title = 'Loading...';
    this.context.onSetTitle(title);

    const { isLoading } = this.state;

    return (
      <div id="AdminPage">
        {isLoading ? this._renderLoading() : this._renderContent()}
      </div>
    );
  }

}

export default AdminPage;
