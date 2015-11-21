/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './LoginPage.css';
import withStyles from '../../decorators/withStyles';
import UserActions from '../../actions/UserActions';

@withStyles(styles)
class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  _handleInputChange(field, value) {
    this.setState({[field]: value});
  }

  _handleSubmit(e) {
    e.preventDefault();

    const {username, password} = this.state;

    UserActions.authenticateUser(username, password);
  }

  _renderInputUsername() {
    return (
      <div className="form-group">
        <label htmlFor="LoginForm[Username]">Username</label>
        <input
          id="LoginForm[Username]"
          type="text"
          placeholder="Username"
          value={this.state.username}
          onChange={(e) => this._handleInputChange('username', e.target.value)}
        />
      </div>
    );
  }

  _renderInputPassword() {
    return (
      <div className="form-group">
        <label htmlFor="LoginForm[Password]">Password</label>
        <input
          id="LoginForm[Password]"
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={(e) => this._handleInputChange('password', e.target.value)}
        />
      </div>
    );
  }

  render() {
    const title = 'Login';
    this.context.onSetTitle(title);
    return (
      <div className="LoginPage">
        <div className="LoginPage-container">
          <form className="LoginForm" onSubmit={this._handleSubmit.bind(this)}>
            <h1>{title}</h1>
            <br/>
            {this._renderInputUsername()}
            {this._renderInputPassword()}
            <button type="submit" className="btn">Login</button>
          </form>
        </div>
      </div>
    );
  }

}

export default LoginPage;
