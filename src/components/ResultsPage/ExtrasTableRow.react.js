import React, { PropTypes, Component } from 'react';

class ExtrasTableRow extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    price: PropTypes.any.isRequired,
  };

  static contextTypes = {
    onDepartureValueChange: PropTypes.func,
    onReturnValueChange: PropTypes.func,
    returnEnabled: PropTypes.bool,
  }

  _onReturnValueChange = e => {
    this.context.onReturnValueChange(this.props.name, parseInt(e.target.value, 10));
  }

  _onDepartureValueChange = e => {
    this.context.onDepartureValueChange(this.props.name, parseInt(e.target.value, 10));
  }

  _renderReturnSelect = () => {
    if (!this.context.returnEnabled) {
      return null;
    }

    return (
      <td>
        <select defaultValue="0"
                onChange={this._onReturnValueChange}>
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
                  onChange={this._onDepartureValueChange}>
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
