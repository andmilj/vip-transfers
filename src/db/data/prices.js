import vehicleTypes from '../constants/vehicleTypes';
import cityTypes from '../constants/cityTypes';
export default [{
  price: 500,
  persons: 3,
  vehicleType: vehicleTypes.STANDARD,
  destinations: [
    {city: 'Split', countryShort: 'ST', type: cityTypes.CITY, primary: true},
    {city: 'Rijeka', countryShort: 'RI', type: cityTypes.CITY, primary: false},
  ],
}, {
  price: 600,
  persons: 3,
  vehicleType: vehicleTypes.STANDARD_VIP,
  destinations: [
    {city: 'Split', countryShort: 'ST', type: cityTypes.CITY, primary: true},
    {city: 'Rijeka', countryShort: 'RI', type: cityTypes.CITY, primary: false},
  ],
}, {
  price: 700,
  persons: 3,
  vehicleType: vehicleTypes.MINIBUS,
  destinations: [
    {city: 'Split', countryShort: 'ST', type: cityTypes.CITY, primary: true},
    {city: 'Rijeka', countryShort: 'RI', type: cityTypes.CITY, primary: false},
  ],
}, {
  price: 800,
  persons: 3,
  vehicleType: vehicleTypes.MINIBUS_VIP,
  destinations: [
    {city: 'Split', countryShort: 'ST', type: cityTypes.CITY, primary: true},
    {city: 'Rijeka', countryShort: 'RI', type: cityTypes.CITY, primary: false},
  ],
}];
