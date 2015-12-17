import vehicleTypes from '../constants/vehicleTypes';
import cityTypes from '../constants/cityTypes';
export default [{
  price: 500,
  vehicleType: vehicleTypes.STANDARD,
  destinations: [
    {city: 'Split', countryShort: 'ST', type: cityTypes.CITY, primary: true},
    {city: 'Rijeka', countryShort: 'RI', type: cityTypes.CITY, primary: false},
  ],
}, {
  price: 600,
  vehicleType: vehicleTypes.STANDARD_VIP,
  destinations: [
    {city: 'Split', countryShort: 'ST', type: cityTypes.CITY, primary: true},
    {city: 'Rijeka', countryShort: 'RI', type: cityTypes.CITY, primary: false},
  ],
}, {
  price: 700,
  vehicleType: vehicleTypes.MINIBUS,
  destinations: [
    {city: 'Split', countryShort: 'ST', type: cityTypes.CITY, primary: true},
    {city: 'Rijeka', countryShort: 'RI', type: cityTypes.CITY, primary: false},
  ],
}, {
  price: 800,
  vehicleType: vehicleTypes.MINIBUS_VIP,
  destinations: [
    {city: 'Split', countryShort: 'ST', type: cityTypes.CITY, primary: true},
    {city: 'Rijeka', countryShort: 'RI', type: cityTypes.CITY, primary: false},
  ],
}];
