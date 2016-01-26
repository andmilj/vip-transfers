import cityTypes from '../db/constants/cityTypes';
import { pick } from 'lodash';

export default {
  cityName(_city, _type) {
    let city = _city;
    let type = _type;

    if (!type) {
      city = _city.split('_')[0];
      type = _city.split('_')[1];
    }

    const suffix = type === cityTypes.AIRPORT ? ' ' + cityTypes.AIRPORT : '';
    return city + suffix;
  },

  isAirport(_city, _type) {
    let type = _type;

    if (!type) {
      type = _city.split('_')[1];
    }

    return type === cityTypes.AIRPORT;
  },

  pickDetails(state) {
    return pick(state, 'passengerDetails', 'oneWayAddressDetails', 'returnWayAddressDetails');
  },
};
