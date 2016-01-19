/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

import withStyles from '../../../../decorators/withStyles';

import VehicleModal from './VehicleModal';

import styles from './Vehicles.scss';

@withStyles(styles)
class Vehicles extends Component {
  static displayName = 'Vehicles';

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoading: true,
      vehicles: [],
      isModalShown: false,
    };
  }

  componentDidMount() {
    this._getVehicles();
  }

  _getVehicles = () => {
    $.get('/api/vehicles')
      .done(res => {
        this.setState({
          isLoading: false,
          vehicles: res,
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

  _showVehicleModal(vehicleId) {
    this.setState({
      isModalShown: true,
      vehicle: _.find(this.state.vehicles, vehicle => vehicle._id === vehicleId),
    });
  }

  _handleModalSubmit = vehicle => {
    return vehicle._id ? this._updateVehicle(vehicle) : this._createVehicle(vehicle);
  }

  _updateVehicle(vehicle) {
    $.post(`/api/vehicles/${vehicle._id}`, vehicle)
      .done(() => {
        this.setState({
          isModalShown: false,
        }, this._getVehicles);
      })
      .fail(() => { alert('Whoops!'); }); // eslint-disable-line
  }

  _createVehicle(vehicle) {
    $.post('/api/vehicles', vehicle)
      .done(() => {
        this.setState({
          isModalShown: false,
        }, this._getVehicles);
      })
      .fail(() => { alert('Whoops!'); }); // eslint-disable-line
  }

  _deleteVehicle = vehicleId => {
    if (confirm('Are you sure?')) {
      $.post(`/api/vehicles/${vehicleId}/delete`)
        .done(this._getVehicles);
    }
  }

  _handleModalCancel = e => {
    e.preventDefault();
    this.setState({ isModalShown: false });
  }

  _showCreateVehicleModal = () => {
    this.setState({
      isModalShown: true,
      vehicle: {},
    });
  }

  _renderModal() {
    return this.state.isModalShown
      ? (
        <VehicleModal
          vehicle={this.state.vehicle}
          onSubmit={this._handleModalSubmit}
          onCancel={this._handleModalCancel}
        />
      ) : null;
  }

  _renderPageHeader() {
    return !this.state.isModalShown
      ? (
        <div>
          <button className="btn color medium right" onClick={this._showCreateVehicleModal}>Create</button>
          <h1>Vehicles</h1>
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
               <th>Type</th>
               <th>Persons</th>
               <th>Picture Name</th>
               <th width="190">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.vehicles.map(vehicle => {
              return (
                <tr key={vehicle._id}>
                  <td>#</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.persons}</td>
                  <td>{vehicle.pictureName}</td>
                  <td>
                    <button className="btn small color" onClick={() => this._showVehicleModal(vehicle._id)}>Edit</button>
                    <span> | </span>
                    <button className="btn small color" onClick={() => this._deleteVehicle(vehicle._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null;
  }

  render() {
    const title = 'Vehicles';
    this.context.onSetTitle(title);

    return (
      <div id="Vehicles">
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

export default Vehicles;
