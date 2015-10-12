/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import { Router } from 'express';
import Car from '../models/cars.js';

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    Car.find((err, cars) => {
      if (err) {
        next(err);
      }
      res.status(200).json(cars);
    });
    // const car = new Car();
    // car.name = 'bmw';

    // car.save(err => {
    //   if (err) {
    //     next(err);
    //   }

    //   res.json({ message: 'Car created!' });
    // });
  } catch (err) {
    next(err);
  }
});

export default router;
