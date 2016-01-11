import React, { PropTypes, Component } from 'react';
import { noop } from 'lodash';

class ExtrasTableRow extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    price: PropTypes.any.isRequired,
    returnEnabled: PropTypes.bool,
    onDepartureValueChange: PropTypes.func,
    onReturnValueChange: PropTypes.func,
  };

  static defaultProps = {
    returnEnabled: false,
    onDepartureValueChange: noop,
    onReturnValueChange: noop,
  }

  _renderReturnSelect = () => {
    if (!this.props.returnEnabled) {
      return null;
    }

    return (
      <td>
        <select defaultValue="0"
                onChange={this.props.onReturnValueChange}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </td>
    );
  }

  render() {
    return (
      <tr>
        <td>{this.props.name}
          <i>{this.props.info}</i>
        </td>
        <td>{this.props.price}</td>
        <td>
          <select defaultValue="0"
                  onChange={this.props.onDepartureValueChange}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </td>
        {this._renderReturnSelect()}
      </tr>
    );
  }
}

export default ExtrasTableRow;
