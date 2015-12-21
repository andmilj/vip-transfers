/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';

import withStyles from '../../../../decorators/withStyles';
import Link from '../../../Link';

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
      destinations: [{
        id: 1,
        name: 'Split',
      }, {
        id: 2,
        name: 'Zagreb',
      }],
    };
  }

  _renderTable() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
             <th width="50">#</th>
             <th>Destination</th>
             <th width="100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.destinations.map(destination => {
            return (
              <tr>
                <th scope="row">{destination.id}</th>
                  <td>{destination.name}</td>
                  <td>
                    <Link to={`/admin/destinations/${destination.id}`}>Edit</Link>
                    <span> | </span>
                    <Link to={`/admin/destinations/${destination.id}/delete`}>Delete</Link>
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
        {this._renderTable()}
      </div>
    );
  }
}

export default Destinations;
