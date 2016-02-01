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

function createCroatianDestinations(cityNames, type) {
  _.forEach(cityNames, name => {
    destination({
      city: name,
      country: 'Croatia',
      countryShort: 'Cro',
      type: type || cityTypes.CITY,
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
      createCroatianDestinations(['Split', 'Zagreb'], cityTypes.AIRPORT);
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
      vehicle({
        type: vehicleTypes.STANDARD,
        persons: 3,
        textMain: `Standard vehicle are up to 3 persons, includes 1 hand baggage up to
          5kg, and 1 baggage up to 15kg per person.
          ( Škoda Octavia, VW Passat, WV caddy, Opel Insignia...depends
          on vehicles availability )`,
        pictureName: 'car.jpg',
      }).save();
      vehicle({
        type: vehicleTypes.STANDARD_VIP,
        persons: 3,
        textMain: `Standard VIP vehicle are up to 3 persons, includes 1 hand baggage up to 5kg,
          and 1 baggage up to 15kg per person, free wi-fi, highway fees, one bottle of
          water per person. (Mercedes benz E classe, Bmw 5 series, Audi A6..depends on
          vehicle availability.)`,
        pictureName: 'car.jpg',
      }).save();
      vehicle({
        type: vehicleTypes.KOMBI_VIP,
        persons: 3,
        textMain: `No Details`,
        pictureName: 'kombi.jpg',
      }).save();
      vehicle({
        type: vehicleTypes.KOMBI,
        persons: 3,
        textMain: `No Details`,
        pictureName: 'kombi.jpg',
      }).save();
      vehicle({
        type: vehicleTypes.MINIBUS,
        persons: 3,
        textMain: `Minibus vehicles are up to 8 persons, includes 1 hand baggage up to 5kg, and
          1 baggage up to 15kg per person. (Opel Vivaro, Renault Trafic, Peugeot Boxer...depends
          on vehicle availability.)`,
        pictureName: 'van.jpg',
      }).save();
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
