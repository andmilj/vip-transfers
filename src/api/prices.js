import { Router } from 'express';
import price from '../db/models/price';

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
      console.log(prices);
      res.status(200).json(prices);
    });
  } catch (err) {
    next(err);
  }
});

export default router;
