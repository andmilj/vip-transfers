/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import $ from 'jquery';

import withStyles from '../../../../decorators/withStyles';

import Input from '../../../ToolBox/Input';

import styles from './LoginForm.scss';

@withStyles(styles)
class LoginForm extends Component {
  static displayName = 'LoginForm';

  static propTypes = {
    onLogin: PropTypes.func.isRequired,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onLogin: _.noop,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      username: '',
      password: '',
      errors: [],
    };
  }

  _handleInputChange(field, value) {
    this.setState({[field]: value});
  }

  _handleSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;

    $.post('/api/auth/create', { username, password })
      .done(res => this.props.onLogin(res))
      .fail(({responseJSON}) => {
        this.setState({
          errors: _.isArray(responseJSON) ? responseJSON : [responseJSON],
        });
      });
  }

  _getInputError(inputName) {
    const { errors } = this.state;

    return _.result(_.find(errors, { field: inputName }), 'message');
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
      ? <div className="error-message alert alert-danger text-center">{error}</div>
      : null;
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
      <form className="LoginForm" onSubmit={this._handleSubmit.bind(this)}>
        {this.state.user
          ? this._renderLoginSuccess()
          : (
              <div>
                <h1>{title}</h1>
                <br/>
                {this._renderAuthError()}
                {this._renderInputUsername()}
                {this._renderInputPassword()}
                <br/>
                {this._renderSubmitButton()}
              </div>
            )
        }
      </form>
    );
  }

}

export default LoginForm;
