import user from './models/user';
import destination from './models/destination';
import _ from 'lodash';

function createUsers(users) {
  _.forEach(users, data => {
    user(data).save();
  });
}

function createCroatianDestinations(cityNames) {
  _.forEach(cityNames, name => {
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
  user.find({}, (error, users) => {
    if (users.length === 0) {
      createUsers([
        {
          firstName: 'Danijel',
          lastName: 'Madunic',
          username: 'dmadunic',
          password: 'viptransfers',
        }, {
          firstName: 'Andrej',
          lastName: 'Miljus',
          username: 'amiljus',
          password: 'developer',
        }, {
          firstName: 'Matko',
          lastName: 'Bulic',
          username: 'bulicmatko',
          password: 'developer',
        }
      ]);
      console.log('Users seeded!');
    }
  });

  destination.find({}, (error, destinations) => {
    if (destinations.length === 0) {
      createCroatianDestinations([
        'Split', 'Rijeka', 'Zagreb', 'Pula', 'Dubrovnik', 'Vodice', 'Trogir']);
      console.log('Destinastions seeded!');
    }
  });
}
