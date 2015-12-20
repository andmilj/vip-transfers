import { Router } from 'express';
import price from '../db/models/price';
import vehicle from '../db/models/vehicle';
import _ from 'lodash';

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    price.find({$and: [
      {'destinations.city': req.query.from},
      {'destinations.city': req.query.to},
      {'persons': req.query.persons}]}, (err, prices) => {
      if (err) {
        next(err);
      }
      vehicle.find({}, (err, vehicles) => {
        if (err) {
          next(err);
        }
        res.status(200).json(_.assign({prices}, {vehicles}));
      });
    });
  } catch (err) {
    next(err);
  }
});

export default router;
