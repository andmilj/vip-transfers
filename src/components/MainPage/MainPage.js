import React, { PropTypes, Component } from 'react';
import Intro from '../Intro/Intro.react';
import Services from '../Services/Services.react';

class MainPage extends Component {
  static propTypes = {
    destinations: PropTypes.array,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    destinations: [],
  };

  render() {
    const title = 'Main Page';
    this.context.onSetTitle(title);
    return (
      <main className="main" role="main">
        <Intro />
        <Services />
      </main>
    );
  }

}

export default MainPage;
