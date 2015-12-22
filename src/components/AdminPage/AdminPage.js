/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import $ from 'jquery';
import _ from 'lodash';
import withStyles from '../../decorators/withStyles';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import styles from './AdminPage.scss';

@withStyles(styles)
class AdminPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      user: undefined
    };
  }

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  componentDidMount () {
    $.post('/api/auth/check')
      .done(res => {
        this.setState({
          isLoading: false,
          user: res
        });
      })
      .statusCode({
        401: () => {
          this.setState({
            isLoading: false
          });
        }
      });
  }

  _handleLogout = (e) => {
    e.preventDefault();

    $.post('/api/auth/destroy')
      .done(res => {
        this.setState({
          user: undefined
        });
      })
      .statusCode({
        401: () => {
          //
        }
      });
  }

  _handleLogin = (user) => {
    this.setState({user});
  }

  _renderContent () {
    const { user } = this.state;

    return user
      ? <Dashboard user={user} onLogout={this._handleLogout}/>
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

    console.log('render');

    return isLoading
      ? this._renderLoadingScreen()
      : this._renderContent();
  }

}

export default AdminPage;
