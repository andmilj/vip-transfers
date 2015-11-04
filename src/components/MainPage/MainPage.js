import React, { PropTypes, Component } from 'react';
import styles from './MainPage.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class MainPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    const title = 'Main Page';
    this.context.onSetTitle(title);
    return (
      <div className="MainPage-container parallax parallax4">
        <div className="container inner text-center">
        </div>
      </div>
    );
  }

}

export default MainPage;
