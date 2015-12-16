/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './Destinations.css';
import withStyles from '../../../../decorators/withStyles';

@withStyles(styles)
class Destinations extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const title = 'Destinations';
    this.context.onSetTitle(title);

    const { user } = this.props;

    return (
      <div className="Destinations">
        <div className="Destinations-container">
          <div className="container inner">
            <h1>Destinations</h1>
            <p>
              <span>Welcome to Destinations, <strong>{user.firstName}</strong>! </span>
              <a href="#" onClick={this.props.onLogout}>Logout</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

}

export default Destinations;
