/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

import withStyles from '../../../../decorators/withStyles';

import styles from './Price.scss';

@withStyles(styles)
class Price extends Component {
  static displayName = 'Price';

  static propTypes = {
    price: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    price: {},
    onSubmit: _.noop,
    onCancel: _.noop,
  };

  constructor(props, context) {
    super(props, context);

    this.state = _.pick(props.price, ['price', 'vehicleType', 'destinations', 'persons']);
  }

  _handleInputChange(field, value) {
    this.setState({[field]: value});
  }

  _handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(_.extend({}, this.props.price, this.state));
  }

  render() {
    const title = 'Price';
    this.context.onSetTitle(title);

    return (
      <form id="Price" onSubmit={this._handleSubmit}>
        <div>
          <div>
            <h1>Price</h1>
            <br/>
            <div>
              <div>
                <label forHtml="price[price]">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="price[price]"
                  placeholder="Price"
                  value={this.state.price}
                  onChange={e => this._handleInputChange('price', e.target.value)}
                />
                <p className="help-block">Please enter price.</p>
              </div>
              <div>
                <label forHtml="price[vehicleType]">Vehicle Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="price[vehicleType]"
                  placeholder="Vehicle Type"
                  value={this.state.vehicleType}
                  onChange={e => this._handleInputChange('vehicleType', e.target.value)}
                />
                <p className="help-block">Please enter price short vehicle type.</p>
              </div>
              <div>
                <label forHtml="price[destinationFrom]">From</label>
                <input
                  type="text"
                  className="form-control"
                  id="price[destinationFrom]"
                  placeholder="From"
                  value={this.state.destinations[0].city}
                  onChange={e => this._handleInputChange('destinationFrom', e.target.value)}
                />
                <p className="help-block">Please enter destination from.</p>
              </div>
              <div>
                <label forHtml="price[destinationTo]">To</label>
                <input
                  type="text"
                  className="form-control"
                  id="price[destinationTo]"
                  placeholder="To"
                  value={this.state.destinations[1].city}
                  onChange={e => this._handleInputChange('destinationTo', e.target.value)}
                />
                <p className="help-block">Please enter destination to.</p>
              </div>
              <div>
                <label forHtml="price[persons]">Persons</label>
                <input
                  type="text"
                  className="form-control"
                  id="price[persons]"
                  placeholder="Persons"
                  value={this.state.persons}
                  onChange={e => this._handleInputChange('persons', e.target.value)}
                />
                <p className="help-block">Please enter number of persons.</p>
              </div>
            </div>
            <div className="right">
              <button type="submit" className="btn medium color">Save</button>
              <span> </span>
              <button type="button" className="btn medium" onClick={this.props.onCancel}>Cancel</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Price;
