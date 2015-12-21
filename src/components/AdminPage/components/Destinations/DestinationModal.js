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
    onClose: PropTypes.func.isRequired,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    destination: {},
    onSubmit: _.noop,
    onClose: _.noop,
  };

  constructor(props, context) {
    super(props, context);

    this.state = _.pick(props.destination, ['city', 'country', 'type']);
  }

  _handleInputChange(field, value) {
    this.setState({[field]: value});
  }

  _handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(_.extend({}, this.props.destination, this.state));
  }

  render() {
    const title = 'Destination';
    this.context.onSetTitle(title);

    return (
      <form onSubmit={this._handleSubmit} className="Destination modal show" tabIndex="-1" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button onClick={this.props.onClose} type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Destination</h4>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label forHtml="destination[city]">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="destination[city]"
                  placeholder="City"
                  value={this.state.city}
                  onChange={(e) => this._handleInputChange('city', e.target.value)}
                />
                <p className="help-block">Please enter destination city.</p>
              </div>
              <div className="form-group">
                <label forHtml="destination[country]">Country</label>
                <input
                  type="text"
                  className="form-control"
                  id="destination[country]"
                  placeholder="Country"
                  value={this.state.country}
                  onChange={(e) => this._handleInputChange('country', e.target.value)}
                />
                <p className="help-block">Please enter destination country.</p>
              </div>
              <div className="form-group">
                <label forHtml="destination[type]">Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="destination[type]"
                  placeholder="Type"
                  value={this.state.type}
                  onChange={(e) => this._handleInputChange('type', e.target.value)}
                />
                <p className="help-block">Please enter destination type.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={this.props.onClose} type="button" className="btn btn-default">Close</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Destination;
