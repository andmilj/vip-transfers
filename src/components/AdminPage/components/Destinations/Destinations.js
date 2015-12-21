/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import $ from 'jquery';
import _ from 'lodash';

import withStyles from '../../../../decorators/withStyles';
import Link from '../../../Link';

import DestinationModal from './DestinationModal';

import styles from './Destinations.scss';

@withStyles(styles)
class Destinations extends Component {
  static displayName = 'Destinations';

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoading: true,
      destinations: [],
      isModalShown: false,
    };
  }

  componentDidMount() {
    this._getDestinations();
  }

  _getDestinations = () => {
    $.get('/api/destinations')
      .done(res => {
        this.setState({
          isLoading: false,
          destinations: res,
        });
      })
      .statusCode({
        401: () => {
          this.setState({
            isLoading: false,
          });
        },
      });
  }

  _showDestinationModal(destinationId) {
    this.setState({
      isModalShown: true,
      destination: _.find(this.state.destinations, destination => destination._id === destinationId),
    });
  }

  _handleModalSubmit = destination => {
    $.post(`/api/destinations/${destination._id}`, destination)
      .done(() => {
        this.setState({
          isModalShown: false,
        }, this._getDestinations);
      })
      .fail(() => { alert('Whoops!'); }); // eslint-disable-line
  }

  _deleteDestination = destinationId => {
    if (confirm('Are you sure?')) {
      $.post(`/api/destinations/${destinationId}/delete`)
        .done(this._getDestinations);
    }
  }

  _handleModalClose = e => {
    e.preventDefault();
    this.setState({ isModalShown: false });
  }

  _renderModal() {
    return this.state.isModalShown
      ? (
        <DestinationModal
          destination={this.state.destination}
          onSubmit={this._handleModalSubmit}
          onClose={this._handleModalClose}
        />
      ) : null;
  }

  _renderTable() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
             <th width="50">#</th>
             <th width="100">Primary</th>
             <th>City</th>
             <th>Country</th>
             <th width="100">Type</th>
             <th width="100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.destinations.map(destination => {
            return (
              <tr key={destination._id}>
                <td>#</td>
                <td>{destination.primary ? 'Yes' : 'No'}</td>
                <td>{destination.city}</td>
                <td>{destination.country}</td>
                <td>{destination.type}</td>
                <td>
                  <button onClick={() => this._showDestinationModal(destination._id)}>Edit</button>
                  <span> | </span>
                  <button onClick={() => this._deleteDestination(destination._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    const title = 'Destinations';
    this.context.onSetTitle(title);

    return (
      <div className="Destinations">
        <h1>Destinations</h1>
        <br/>
        {this._renderModal()}
        {this._renderTable()}
      </div>
    );
  }
}

export default Destinations;
