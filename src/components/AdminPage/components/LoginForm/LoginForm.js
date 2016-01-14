/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

import withStyles from '../../../../decorators/withStyles';

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

  _getError(inputName) {
    const { errors } = this.state;

    return _.result(_.find(errors, { field: inputName }), 'message');
  }

  _renderInput(config) {
    const { label, type, placeholder, value, onChange, error } = config;
    const inputId = _.uniqueId();

    return (
      <div className="f-row">
        <div className="full-width">
          <label htmlFor={inputId}>{label}</label>
          {error && <span className="input-error">{error}</span>}
          <input
            id={inputId}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    );
  }

  _renderInputUsername() {
    return this._renderInput({
      label: 'Username',
      type: 'text',
      placeholder: 'Username',
      value: this.state.username,
      onChange: (e) => this._handleInputChange('username', e.target.value),
      error: this._getError('username'),
    });
  }

  _renderInputPassword() {
    return this._renderInput({
      label: 'Password',
      type: 'password',
      placeholder: 'Password',
      value: this.state.password,
      onChange: (e) => this._handleInputChange('password', e.target.value),
      error: this._getError('password'),
    });
  }

  _renderAuthError() {
    const error = this._getError('*');

    return error
      ? <div className="f-row auth-error">{error}</div>
      : null;
  }

  _renderSubmitButton() {
    return (
      <div className="f-row">
        <div className="full-width">
          <input type="submit" value="Login" className="btn color medium full" />
        </div>
      </div>
    );
  }

  render() {
    const title = 'Login';
    this.context.onSetTitle(title);

    return (
      <div id="LoginForm">
        <div className="wrap">
          <div className="row">
            <div className="content one-half modal">
              <div className="box">
                <form onSubmit={this._handleSubmit.bind(this)}>
                  {this._renderInputUsername()}
                  {this._renderInputPassword()}
                  {this._renderAuthError()}
                  {this._renderSubmitButton()}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default LoginForm;
