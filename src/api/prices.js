import { Router } from 'express';
import vehicle from '../db/models/vehicle';

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    vehicle.find({}, (err, vehicles) => {
      if (err) {
        next(err);
      }
      res.status(200).json(vehicles);
    });
  } catch (err) {
    next(err);
  }
});

export default router;
