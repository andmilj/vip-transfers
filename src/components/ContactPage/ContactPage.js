/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './ContactPage.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class ContactPage extends Component {

  static propTypes = {
    cars: PropTypes.array,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    const title = 'Contact Us';
    this.context.onSetTitle(title);
    console.log(this.props.cars);
    return (
      <div className="ContactPage">
        <div className="ContactPage-container">
          <h1>{title}</h1>
          <p>...</p>
        </div>
      </div>
    );
  }

}

export default ContactPage;
