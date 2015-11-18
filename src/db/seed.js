import destination from './models/destination';
import __ from 'lodash';

function createCroatianDestinations(cityNames) {
  __.forEach(cityNames, name => {
    destination({
      city: name,
      country: 'Croatia',
      countryShort: 'Cro',
      type: ['City'],
    }).save();
  });
}

/* eslint-disable no-console */
export function seedDatabase() {
  destination.find({}, (error, destinations) => {
    if (destinations.length === 0) {
      createCroatianDestinations([
        'Split', 'Rijeka', 'Zagreb', 'Pula', 'Dubrovnik', 'Vodice', 'Trogir']);
      console.log('Destinastions seeded!');
    }
  });
}
