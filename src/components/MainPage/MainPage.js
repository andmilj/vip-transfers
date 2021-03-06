import React, { PropTypes, Component } from 'react';
import Intro from '../Intro/Intro.react';
import Services from '../Services/Services.react';
import AdvancedSearch from '../AdvancedSearch/AdvancedSearch.react';
import Link from '../Link';
import VehicleInfo from './VehicleInfo.react';
import { initScroll } from '../App/style/js/scripts';


class MainPage extends Component {
  static propTypes = {
    destinations: PropTypes.array,
    vehicles: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      persons: PropTypes.any,
      pictureName: PropTypes.string,
      textMain: PropTypes.string,
    })),
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    destinations: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      from: '',
      to: '',
      persons: null,
      date: undefined,
      return: false,
      error: {},
    };
  }

  componentDidMount() {
    $('body').removeClass(); // .addClass('home');
    initScroll();
  }

  _handleDateChange = (date) => {
    this.setState({ date });
  }

  _handleRadio = (e) => {
    this.setState({
      return: e.target.value === 'return',
    });
  }

  _handlePrimarySelection = (e) => {
    this.setState({
      from: e.target.value,
    });
  }

  _handleSecondarySelection = (e) => {
    this.setState({
      to: e.target.value,
    });
  }

  _handlePersonsChange = (e) => {
    this.setState({ persons: e.target.value });
  }

  _handleSubmit = () => {
    const {from, to, persons, date} = this.state;

    if (from && to && persons && date) {
      Link.redirectTo('/results', {
        from, to, persons,
        date: date.getTime()});
      return;
    }
  }

  render() {
    const title = 'Main Page';
    this.context.onSetTitle(title);
    return (
      <main className="main" role="main">
        <Intro />
        <AdvancedSearch {...this.props} {...this.state}
          onDateChange={this._handleDateChange}
          onPersonChange={this._handlePersonsChange}
          onPickupChange={this._handlePrimarySelection}
          onDropoffChange={this._handleSecondarySelection}
          onSubmit={this._handleSubmit} />
        <Services />
        <VehicleInfo vehicles={this.props.vehicles}/>
      </main>
    );
  }

}

export default MainPage;
