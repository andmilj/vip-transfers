/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

import withStyles from '../../../../decorators/withStyles';

import PriceModal from './PriceModal';

import styles from './Prices.scss';

@withStyles(styles)
class Prices extends Component {
  static displayName = 'Prices';

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoading: true,
      prices: [],
      isModalShown: false,
    };
  }

  componentDidMount() {
    this._getPrices();
  }

  _getPrices = () => {
    $.get('/api/prices')
      .done(res => {
        this.setState({
          isLoading: false,
          prices: res,
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

  _showPriceModal(priceId) {
    this.setState({
      isModalShown: true,
      price: _.find(this.state.prices, price => price._id === priceId),
    });
  }

  _handleModalSubmit = price => {
    return price._id ? this._updatePrice(price) : this._createPrice(price);
  }

  _updatePrice(price) {
    $.post(`/api/prices/${price._id}`, price)
      .done(() => {
        this.setState({
          isModalShown: false,
        }, this._getPrices);
      })
      .fail(() => { alert('Whoops!'); }); // eslint-disable-line
  }

  _createPrice(price) {
    $.post('/api/prices', price)
      .done(() => {
        this.setState({
          isModalShown: false,
        }, this._getPrices);
      })
      .fail(() => { alert('Whoops!'); }); // eslint-disable-line
  }

  _deletePrice = priceId => {
    if (confirm('Are you sure?')) {
      $.post(`/api/prices/${priceId}/delete`)
        .done(this._getPrices);
    }
  }

  _handleModalCancel = e => {
    e.preventDefault();
    this.setState({ isModalShown: false });
  }

  _showCreatePriceModal = () => {
    this.setState({
      isModalShown: true,
      price: {},
    });
  }

  _renderModal() {
    return this.state.isModalShown
      ? (
        <PriceModal
          price={this.state.price}
          onSubmit={this._handleModalSubmit}
          onCancel={this._handleModalCancel}
        />
      ) : null;
  }

  _renderPageHeader() {
    return !this.state.isModalShown
      ? (
        <div>
          <button className="btn color medium right" onClick={this._showCreatePriceModal}>Create</button>
          <h1>Prices</h1>
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
               <th>Price</th>
               <th>Vehicle Type</th>
               <th>From</th>
               <th>To</th>
               <th width="100">Persons</th>
               <th width="190">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.prices.map(price => {
              return (
                <tr key={price._id}>
                  <td>#</td>
                  <td>{price.price}</td>
                  <td>{price.vehicleType}</td>
                  <td>{price.destinations[0].city}</td>
                  <td>{price.destinations[1].city}</td>
                  <td>{price.persons}</td>
                  <td>
                    <button className="btn small color" onClick={() => this._showPriceModal(price._id)}>Edit</button>
                    <span> | </span>
                    <button className="btn small color" onClick={() => this._deletePrice(price._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null;
  }

  render() {
    const title = 'Prices';
    this.context.onSetTitle(title);

    return (
      <div id="Prices">
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

export default Prices;
