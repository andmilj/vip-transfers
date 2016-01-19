/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

import withStyles from '../../../../decorators/withStyles';

import styles from './Destination.scss';

@withStyles(styles)
class Destination extends Component {
  static displayName = 'Destination';

  static propTypes = {
    destination: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    destination: {},
    onSubmit: _.noop,
    onCancel: _.noop,
  };

  constructor(props, context) {
    super(props, context);

    this.state = _.pick(props.destination, ['city', 'country', 'countryShort', 'type']);
  }

  _handleInputChange(field, value) {
    this.setState({[field]: value});
  }

  _handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(_.extend({}, this.props.destination, this.state));
  }

  render() {
    const title = 'Destination';
    this.context.onSetTitle(title);

    return (
      <form id="Destination" onSubmit={this._handleSubmit}>
        <div>
          <div>
            <h1>Destination</h1>
            <br/>
            <div>
              <div>
                <label forHtml="destination[city]">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="destination[city]"
                  placeholder="City"
                  value={this.state.city}
                  onChange={e => this._handleInputChange('city', e.target.value)}
                />
                <p className="help-block">Please enter destination city.</p>
              </div>
              <div>
                <label forHtml="destination[country]">Country</label>
                <input
                  type="text"
                  className="form-control"
                  id="destination[country]"
                  placeholder="Country"
                  value={this.state.country}
                  onChange={e => this._handleInputChange('country', e.target.value)}
                />
                <p className="help-block">Please enter destination short country name.</p>
              </div>
              <div>
                <label forHtml="destination[country-short]">Country Short</label>
                <input
                  type="text"
                  className="form-control"
                  id="destination[country-short]"
                  placeholder="Country Short"
                  value={this.state.countryShort}
                  onChange={e => this._handleInputChange('countryShort', e.target.value)}
                />
                <p className="help-block">Please enter destination country.</p>
              </div>
              <div>
                <label forHtml="destination[type]">Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="destination[type]"
                  placeholder="Type"
                  value={this.state.type}
                  onChange={e => this._handleInputChange('type', e.target.value)}
                />
                <p className="help-block">Please enter destination type.</p>
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

export default Destination;
