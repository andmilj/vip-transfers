/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withContext from '../../decorators/withContext';
// import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import Footer from '../Footer';
// import themeJs from './style/js/theme.js';

import './App.css';
// import toolboxCommonStyles from '../ToolBox/commons';

@withContext
// @withStyles(toolboxCommonStyles)
class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  componentDidMount() {
    // theme.js is using jQuery and is interacting with document
    // which is not available when server-side rendering occurres.
    // componentDidMount is postponing the script execution when
    // the componen has access to document
    // themeJs();
  }

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
