/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import $ from 'jquery';
import _ from 'lodash';
import styles from './LoginPage.css';
import withStyles from '../../decorators/withStyles';
import UserActions from '../../actions/UserActions';
import Input from '../ToolBox/Input';

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

    $.post('/api/auth/create', {username, password})
      .done((res) => {
        console.log(res);
      }).fail(({responseJSON}) => {
        this.setState({
          errors: _.isArray(responseJSON) ? responseJSON : [responseJSON]
        });
      });
  }

  _getInputError(inputName) {
    const { errors } = this.state;

    return _.result(_.find(errors, {field: inputName}), 'message');
  }

  _renderInputUsername() {
    return (
      <Input
        label="Username"
        type="text"
        placeholder="Username"
        value={this.state.username}
        onChange={(e) => this._handleInputChange('username', e.target.value)}
        error={this._getInputError('username')}
      />
    );
  }

  _renderInputPassword() {
    return (
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        value={this.state.password}
        onChange={(e) => this._handleInputChange('password', e.target.value)}
        error={this._getInputError('password')}
      />
    );
  }

  _renderAuthError() {
    const error = this._getInputError('*');

    return error
      ? (
        <div>
          <div className="alert alert-danger text-center">{error}</div>
          <br/>
        </div>
      ) : null;
  }

  _renderSubmitButton() {
    return (
      <button type="submit" className="btn btn-border">Login</button>
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
            {this._renderAuthError()}
            {this._renderInputUsername()}
            {this._renderInputPassword()}
            <br/>
            {this._renderSubmitButton()}
          </form>
        </div>
      </div>
    );
  }

}

export default LoginPage;
