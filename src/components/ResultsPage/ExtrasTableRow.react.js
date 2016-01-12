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
    extrasDeparture: PropTypes.object,
    extrasReturn: PropTypes.object,
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
    const selectedValue = this.context.extrasReturn[this.props.name] || 0;
    return (
      <td>
        <select value={selectedValue}
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
    const selectedValue = this.context.extrasDeparture[this.props.name] || 0;
    return (
      <tr>
        <td>{this.props.name}
          <i>{this.props.info}</i>
        </td>
        <td>{this.props.price}</td>
        <td>
          <select value={selectedValue}
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
