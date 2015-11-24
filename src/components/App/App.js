/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import Footer from '../Footer';

import styles from './App.css';
import toolboxCommonStyles from '../ToolBox/commons';

@withContext
@withStyles(toolboxCommonStyles, styles)
class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  render() {
    return !this.props.error ? (
      <div className="body-wrapper">
        <Header />
        {this.props.children}
        <Footer />
      </div>
    ) : this.props.children;
  }

}

export default App;
