import cityTypes from '../db/constants/cityTypes';
import { pick, find } from 'lodash';

export function cityName(_city, _type) {
  let city = _city;
  let type = _type;

  if (!type) {
    city = _city.split('_')[0];
    type = _city.split('_')[1];
  }

  const suffix = type === cityTypes.AIRPORT ? ' ' + cityTypes.AIRPORT : '';
  return city + suffix;
}

export function isAirport(_city, _type) {
  let type = _type;

  if (!type) {
    type = _city.split('_')[1];
  }

  return type === cityTypes.AIRPORT;
}

export function timestampToDate(timestamp) {
  return new Date(parseInt(timestamp, 10));
}

export function pickDetails(state) {
  return pick(state, 'passengerDetails', 'addressDetailsOneWay', 'addressDetailsReturn');
}

function findDestination(collection, cityWithType) {
  const _cityWithType = cityWithType.split('_');
  const result = find(collection, {city: _cityWithType[0], type: _cityWithType[1]});
  return pick(result, 'city', 'type');
}

function findPrice(collection, vehicleType) {
  return pick(find(collection, { vehicleType }), 'price', 'vehicleType');
}

export function constructReservation({ passengerDetails, addressDetailsOneWay, addressDetailsReturn,
    price, returnDate, extrasReturn, extrasDeparture, vehicleType},
    {from, to, persons, date}, destinations, prices) {
  return { passengerDetails, addressDetailsOneWay, addressDetailsReturn, extrasReturn,
    extrasDeparture, returnDate, persons,
    totalPrice: price,
    date: timestampToDate(date),
    from: findDestination(destinations, from),
    to: findDestination(destinations, to),
    price: findPrice(prices, vehicleType),
   };
}
