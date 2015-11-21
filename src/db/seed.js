import destination from './models/destination';
import _ from 'lodash';

function createCroatianDestinations(cityNames) {
  _.forEach(cityNames, name => {
    destination({
      city: name,
      country: 'Croatia',
      countryShort: 'Cro',
      type: ['City'],
      // schema will alter this value before save
      primary: false,
    }).save();
  });
}

/* eslint-disable no-console */
export function seedDatabase(drop) {
  if (drop) {
    destination.remove({}, () => {
      console.log('Destinastions removed!');
    });
  }

  destination.find({}, (error, destinations) => {
    if (destinations.length === 0) {
      createCroatianDestinations([
        'Split', 'Rijeka', 'Zagreb', 'Pula', 'Dubrovnik', 'Vodice', 'Trogir']);
      console.log('Destinastions seeded!');
    }
  });
}
