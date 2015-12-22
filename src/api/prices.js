import { Router } from 'express';
import price from '../db/models/price';
import vehicle from '../db/models/vehicle';

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    const query = {$and: [
      {'destinations.city': req.query.from},
      {'destinations.city': req.query.to},
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
