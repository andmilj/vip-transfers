import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

class VehicleElement extends Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    persons: PropTypes.string,
    pictureName: PropTypes.string,
  };

  static defaultProps = {
    vehicles: [],
  };


  render() {
    const classes = classNames(this.props.className, {
      wow: true,
      fadeI: true,
    });
    return (
      <article className={classes}>
        <figure className="featured-image">
          <img src="http://placehold.it/1024x768" alt="" />
          <div className="overlay">
            <a href="services.html" className="expand">+</a>
          </div>
        </figure>
        <div className="details">
          <h4>
            <a href="services.html">{this.props.type}</a>
          </h4>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
          <a className="more" title="Read more" href="services.html">Read more</a>
        </div>
      </article>
    );
  }
}

export default VehicleElement;
