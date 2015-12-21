import user from './models/user';
import destination from './models/destination';
import vehicle from './models/vehicle';
import price from './models/price';

import vehicleTypes from './constants/vehicleTypes';
import cityTypes from './constants/cityTypes';
import priceData from './data/prices';
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
      type: cityTypes.CITY,
      // schema will alter this value before save
      primary: false,
    }).save();
  });
}

/* eslint-disable no-console */
export function seedDatabase(drop) {
  if (drop) {
    user.remove({}, () => {
      console.log('Users removed!');
    });
  }

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
        },
      ]);
      console.log('Users seeded!');
    }
  });

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

  if (drop) {
    vehicle.remove({}, () => {
      console.log('Vehicles removed!');
    });
  }

  vehicle.find({}, (error, vehicles) => {
    if (vehicles.length === 0) {
      _.forIn(vehicleTypes, value => {
        vehicle({
          type: value,
          persons: 3,
          pictureName: 'car.jpg',
        }).save();
      });
      console.log('Vehicles seeded!');
    }
  });

  if (drop) {
    price.remove({}, () => {
      console.log('All prices removed!');
    });
  }

  price.find({}, (error, prices) => {
    if (prices.length === 0) {
      priceData.forEach(priceDataBlock => {
        price(priceDataBlock).save();
      });
      console.log('Prices seeded!');
    }
  });
}
