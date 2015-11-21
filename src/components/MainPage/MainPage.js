import React, { PropTypes, Component } from 'react';
import styles from './MainPage.css';
import withStyles from '../../decorators/withStyles';
import Parallax from '../Shared/Parallax.react';
import SearchForm from '../SearchForm/SearchForm';

@withStyles(styles)
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
      <div className="MainPage-container">

        <Parallax ordinal={4} />

        <div className="section anchor">
          <div className="light-wrapper">
            <div className="container inner">
              <SearchForm {...this.props} />
            </div>
          </div>
        </div>

        <Parallax ordinal={4} />
      </div>
    );
  }

}

export default MainPage;
