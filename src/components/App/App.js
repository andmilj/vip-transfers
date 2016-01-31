/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withContext from '../../decorators/withContext';
import Header from '../Header';
import Footer from '../Footer';
import { initSlickNav, initResponsiveTables } from './style/js/scripts';

import './App.css';

@withContext
// @withStyles(toolboxCommonStyles)
class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  componentDidMount() {
    initSlickNav();
    initResponsiveTables();
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
