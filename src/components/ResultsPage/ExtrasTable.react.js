import React, { Component, PropTypes } from 'react';
import ExtrasTableRow from './ExtrasTableRow.react';
import { map } from 'lodash';

class ExtrasTable extends Component {
  static propTypes = {
    extras: PropTypes.arrayOf(PropTypes.shape({
      info: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
    })),
    onDepartureValueChange: PropTypes.func.isRequired,
    onReturnValueChange: PropTypes.func.isRequired,
    returnEnabled: PropTypes.bool,
  }

  static defaultProps = {
    extras: [],
    returnEnabled: false,
  }

  handleDepartureValueChange = (name, count) => {
    console.log(name);
    this.props.onDepartureValueChange(name, count);
  }

  handleReturnValueChange = (name, count) => {
    console.log(name);
    this.props.onReturnValueChange(name, count);
  }

  _renderRows = () => {
    return map(this.props.extras, extra => {
      return (<ExtrasTableRow {...extra}
                              returnEnabled={this.props.returnEnabled}
                              onDepartureValueChange={this.handleDepartureValueChange}
                              onReturnValueChange={this.handleReturnValueChange}/>);
    });
  }

  render() {
    const { returnEnabled } = this.props;
    return (
      <table className="data responsive">
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
