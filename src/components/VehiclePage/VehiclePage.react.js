import React, { PropTypes, Component } from 'react';
import VehicleTypes from '../../db/constants/vehicleTypes';
import { initTabs } from '../App/style/js/scripts';
import { map, values, includes } from 'lodash';

class VehiclePage extends Component {
  static propTypes = {
    vehicles: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      persons: PropTypes.number,
      pictureName: PropTypes.string,
    })),
    activeVehicleType: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    activeVehicleType: VehicleTypes.STANDARD,
  };

  componentDidMount() {
    initTabs();
  }

  renderTabOptions = () => {
    const { vehicles, activeVehicleType } = this.props;
    const _avt = includes(values(VehicleTypes), activeVehicleType) ? activeVehicleType : VehicleTypes.STANDARD;
    return map(vehicles, ({ type }, index) => {
      const activeClass = type === _avt ? 'active' : '';
      return (
        <li className={activeClass} key={type}>
          <a href={`#tab${index}`}>{type}</a>
        </li>
      );
    });
  }

  renderTabContent = () => {
    return map(this.props.vehicles, ({ type }, index) => {
      return (
        <article key={type} className="single hentry" id={`tab${index}`}>
          <div className="entry-featured">
            <img src="http://placehold.it/1024x768" alt="" />
          </div>
          <div className="entry-content">
            <h2>{type}</h2>
            <p className="lead">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. </p>
            <p>Duis autem vel eum iriure dolor in <a href="#">this is a link</a> velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing <strong>this is some bold text</strong> elit, sed diam nonummy nibh euismod tincidunt ut. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
          </div>
        </article>
      );
    });
  }

  render() {
    const title = 'Info Page';
    this.context.onSetTitle(title);
    return (
      <main className="main" role="main">
        <header className="site-title color">
          <div className="wrap">
            <div className="container">
              <h1>Vehicle Information</h1>
              <nav role="navigation" className="breadcrumbs">
                <ul>
                  <li><a href="/" title="Home">Home</a></li>
                  <li>Vehicle Information</li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <div className="wrap">
          <div className="row">
            <aside className="one-fourth sidebar left">
              <div className="widget">
                <ul className="categories">
                  {this.renderTabOptions()}
                </ul>
              </div>
            </aside>
            <div className="three-fourth content">
              {this.renderTabContent()}
            </div>
          </div>
        </div>
      </main>
    );
  }

}

export default VehiclePage;
