import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ExtrasTableRow from './ExtrasTableRow.react';
import { map } from 'lodash';
import { initUniform } from '../App/style/js/scripts';

class ExtrasTable extends Component {
  static contextTypes = {
    extras: PropTypes.arrayOf(PropTypes.shape({
      info: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
    })),
    returnEnabled: PropTypes.bool,
  };

  componentDidMount() {
    initUniform(findDOMNode(this.refs.table));
  }

  componentDidUpdate() {
    initUniform(findDOMNode(this.refs.table));
  }

  _renderRows = () => {
    return map(this.context.extras, extra => {
      return (<ExtrasTableRow key={extra.name} {...extra} />);
    });
  }

  render() {
    const { returnEnabled } = this.context;
    return (
      <table ref="table" className="data responsive">
        <thead>
          <tr>
            <th>Baggage type</th>
            <th>Price</th>
            <th>Departure</th>
            {returnEnabled ? <th>Return</th> : null}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hand baggage up to 5kg <i>and max dimensions 40 x 22 x 55 cm</i></td>
            <td>Free</td>
            <td>Free</td>
            {returnEnabled ? <td>Free</td> : null}
          </tr>
          {this._renderRows()}
        </tbody>
      </table>
    );
  }
}

export default ExtrasTable;
