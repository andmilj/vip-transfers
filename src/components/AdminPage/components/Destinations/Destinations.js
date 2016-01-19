/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

import withStyles from '../../../../decorators/withStyles';

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
    return destination._id ? this._updateDestination(destination) : this._createDestination(destination);
  }

  _updateDestination(destination) {
    $.post(`/api/destinations/${destination._id}`, destination)
      .done(() => {
        this.setState({
          isModalShown: false,
        }, this._getDestinations);
      })
      .fail(() => { alert('Whoops!'); }); // eslint-disable-line
  }

  _createDestination(destination) {
    $.post('/api/destinations', destination)
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

  _handleModalCancel = e => {
    e.preventDefault();
    this.setState({ isModalShown: false });
  }

  _showCreateDestinationModal = () => {
    this.setState({
      isModalShown: true,
      destination: {},
    });
  }

  _renderModal() {
    return this.state.isModalShown
      ? (
        <DestinationModal
          destination={this.state.destination}
          onSubmit={this._handleModalSubmit}
          onCancel={this._handleModalCancel}
        />
      ) : null;
  }

  _renderPageHeader() {
    return !this.state.isModalShown
      ? (
        <div>
          <button className="btn color medium right" onClick={this._showCreateDestinationModal}>Create</button>
          <h1>Destinations</h1>
          <br/>
        </div>
      ) : null;
  }

  _renderTable() {
    return !this.state.isModalShown
      ? (
        <table className="table">
          <thead>
            <tr>
               <th width="50">#</th>
               <th>City</th>
               <th>Country</th>
               <th>Country Short</th>
               <th width="100">Type</th>
               <th width="190">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.destinations.map(destination => {
              return (
                <tr key={destination._id}>
                  <td>#</td>
                  <td>{destination.city}</td>
                  <td>{destination.country}</td>
                  <td>{destination.countryShort}</td>
                  <td>{destination.type}</td>
                  <td>
                    <button className="btn small color" onClick={() => this._showDestinationModal(destination._id)}>Edit</button>
                    <span> | </span>
                    <button className="btn small color" onClick={() => this._deleteDestination(destination._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null;
  }

  render() {
    const title = 'Destinations';
    this.context.onSetTitle(title);

    return (
      <div id="Destinations">
        <div className="wrap">
          <div className="row">
            <div className="content">
              <div className="box">
                {this._renderPageHeader()}
                {this._renderTable()}
                {this._renderModal()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Destinations;
