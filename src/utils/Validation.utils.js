import { omit, keys, map, union, without,
  intersection, includes, filter } from 'lodash';
import FormatUtils from './Format.utils';

function getInvalidPropKeys(_object) {
  return keys(omit(_object, value => !!value));
}

function errorMap(array, suffix) {
  return map(array, invalidProp => suffix + '.' + invalidProp);
}

function forAddressDetails(invalidPropKeys, from, to) {
  let invalids = [];
  let returnInvalids = [];
  if (FormatUtils.isAirport(from)) {
    invalids = without(invalidPropKeys, 'pickUpAddress');
  } else {
    invalids = without(invalidPropKeys, 'arrivalFlightNumber');
  }

  if (FormatUtils.isAirport(to)) {
    returnInvalids = without(invalidPropKeys, 'dropOffAddress');
  } else {
    returnInvalids = without(invalidPropKeys, 'departureFlightNumber');
  }

  return intersection(invalids, returnInvalids);
}

function withReturn(returnInvalids, returnEnabled) {
  return returnEnabled ? returnInvalids : [];
}

export function getAddressErrors(errorsArray, typeOfAddress = 'oneWayAddressDetails') {
  const errors = filter(errorsArray, error => {
    return includes(error, typeOfAddress);
  });

  return map(errors, error => error.replace(typeOfAddress + '.', ''));
}

export default {
  validateDetails({ passengerDetails = {}, oneWayAddressDetails = {}, returnWayAddressDetails = {} }, { from, to }, returnEnabled) {
    return union(
      errorMap(getInvalidPropKeys(passengerDetails), 'passengerDetails'),
      errorMap(forAddressDetails(getInvalidPropKeys(oneWayAddressDetails), from, to),
        'oneWayAddressDetails'),
      errorMap(forAddressDetails(withReturn(getInvalidPropKeys(returnWayAddressDetails), returnEnabled), to, from),
        'returnWayAddressDetails')
    );
  },
};
