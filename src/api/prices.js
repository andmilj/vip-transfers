import { Router } from 'express';
import price from '../db/models/price';
import vehicle from '../db/models/vehicle';

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    const from = req.query.from.split('_');
    const to = req.query.to.split('_');
    const query = {$and: [
      {'destinations.city': from[0]},
      {'destinations.city': to[0]},
      {'destinations.type': from[1]},
      {'destinations.type': to[1]},
      {'persons': req.query.persons}]};

    price.find(query, (err, prices) => {
      if (err) {
        next(err);
      }
      vehicle.find({}, (err, vehicles) => {
        if (err) {
          next(err);
        }

        res.status(200).json({prices, vehicles});
      });
    });
  } catch (err) {
    next(err);
  }
});

export default router;
