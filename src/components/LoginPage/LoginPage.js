/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './LoginPage.css';
import withStyles from '../../decorators/withStyles';
import UserActions from '../../actions/UserActions';
import Input from '../ToolBox/Input';
import Button from '../ToolBox/Button';

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
      <Input
        label="Username"
        type="text"
        placeholder="Username"
        value={this.state.username}
        onChange={(e) => this._handleInputChange('username', e.target.value)}
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
      />
    );
  }

  _renderSubmitButton() {
    return (
      <Button type="submit">Login</Button>
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
            {this._renderSubmitButton()}
          </form>
        </div>
      </div>
    );
  }

}

export default LoginPage;
