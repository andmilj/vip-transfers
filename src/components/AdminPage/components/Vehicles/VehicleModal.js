/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

import withStyles from '../../../../decorators/withStyles';

import styles from './Vehicle.scss';

@withStyles(styles)
class Vehicle extends Component {
  static displayName = 'Vehicle';

  static propTypes = {
    vehicle: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    vehicle: {},
    onSubmit: _.noop,
    onCancel: _.noop,
  };

  constructor(props, context) {
    super(props, context);

    this.state = _.pick(props.vehicle, ['type', 'persons', 'pictureName']);
  }

  _handleInputChange(field, value) {
    this.setState({[field]: value});
  }

  _handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(_.extend({}, this.props.vehicle, this.state));
  }

  render() {
    const title = 'Vehicle';
    this.context.onSetTitle(title);

    return (
      <form id="Vehicle" onSubmit={this._handleSubmit}>
        <div>
          <div>
            <h1>Vehicle</h1>
            <br/>
            <div>
              <div>
                <label forHtml="vehicle[type]">Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="vehicle[type]"
                  placeholder="Type"
                  value={this.state.type}
                  onChange={e => this._handleInputChange('type', e.target.value)}
                />
                <p className="help-block">Please enter vehicle type.</p>
              </div>
              <div>
                <label forHtml="vehicle[persons]">Persons</label>
                <input
                  type="number"
                  step="1"
                  className="form-control"
                  id="vehicle[persons]"
                  placeholder="Persons"
                  value={this.state.persons}
                  onChange={e => this._handleInputChange('persons', e.target.value)}
                />
                <p className="help-block">Please enter persons number.</p>
              </div>
              <div>
                <label forHtml="vehicle[type]">Picture Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="vehicle[pictureName]"
                  placeholder="Picture Name"
                  value={this.state.pictureName}
                  onChange={e => this._handleInputChange('pictureName', e.target.value)}
                />
                <p className="help-block">Please enter picture name.</p>
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

export default Vehicle;
