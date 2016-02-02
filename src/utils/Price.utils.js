import { reduce, find } from 'lodash';
import ExtrasJson from '../constants/Extras';

export const getReturnPrice = (price) => {
  const _price = parseInt(price, 10);
  return (_price - _price / 100 * 5);
};

const reducePriceFromExtras = (extraType) => {
  return reduce(extraType, (result, value, name) => {
    return result + find(ExtrasJson, { name }).price * value;
  }, 0);
};

export const getPrice = ({ extrasDeparture, extrasReturn, vehicleOneWayPrice }, returnEnabled) => {
  const priceExDeparture = reducePriceFromExtras(extrasDeparture);
  const priceExReturn = reducePriceFromExtras(extrasReturn);

  const priceReturn = returnEnabled ? (getReturnPrice(vehicleOneWayPrice) + priceExReturn) : 0;

  return vehicleOneWayPrice + priceReturn + priceExDeparture;
};
