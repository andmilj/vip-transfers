import { omit, keys, map, union, without, curry,
  intersection, includes, filter } from 'lodash';
import { isAirport } from './Format.utils';

function getInvalidPropKeys(_object) {
  return keys(omit(_object, value => !!value));
}

const errorMap = curry((suffix, array) => {
  return map(array, invalidProp => suffix + '.' + invalidProp);
});

export function getErrorsForInvalidKeys(_object, suffix) {
  return errorMap(suffix, getInvalidPropKeys(_object));
}

const filterAddressDetails = curry((from, to, invalidPropKeys) => {
  let invalids = [];
  let returnInvalids = [];
  if (isAirport(from)) {
    invalids = without(invalidPropKeys, 'pickUpAddress');
  } else {
    invalids = without(invalidPropKeys, 'arrivalFlightNumber');
  }

  if (isAirport(to)) {
    returnInvalids = without(invalidPropKeys, 'dropOffAddress');
  } else {
    returnInvalids = without(invalidPropKeys, 'departureFlightNumber');
  }

  return intersection(invalids, returnInvalids);
});

function withReturn(returnInvalids, returnEnabled) {
  return returnEnabled ? returnInvalids : [];
}

export function getAddressErrors(errorsArray, typeOfAddress = 'addressDetailsOneWay') {
  const errors = filter(errorsArray, error => {
    return includes(error, typeOfAddress);
  });

  return map(errors, error => error.replace(typeOfAddress + '.', ''));
}

export function validateReturnDate(returnEnabled, returnDate) {
  if (returnEnabled && !returnDate) {
    return ['returnDate'];
  }
  return [];
}

function checkEmails({ email, email2 }) {
  return email === email2 ? [] : ['email2'];
}


export function validateDetails({ passengerDetails = {}, addressDetailsOneWay = {}, addressDetailsReturn = {} }, { from, to }, returnEnabled) {
  const errorMapForPassenger = errorMap('passengerDetails');
  const errorMapForAddress = errorMap('addressDetailsOneWay');
  const errorMapForReturnAddress = errorMap('addressDetailsReturn');

  const filterFirstWayDetails = filterAddressDetails(from, to);
  const filterReturnDetails = filterAddressDetails(to, from);

  return union(
    errorMapForPassenger(checkEmails(passengerDetails)),
    errorMapForPassenger(getInvalidPropKeys(omit(passengerDetails, 'email2'))),
    errorMapForAddress(filterFirstWayDetails(getInvalidPropKeys(addressDetailsOneWay))),
    errorMapForReturnAddress(
      filterReturnDetails(withReturn(getInvalidPropKeys(addressDetailsReturn), returnEnabled)))
  );
}
