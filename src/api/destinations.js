/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import { Router } from 'express';
import destination from '../db/models/destination';

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    destination.find({}, (err, destinations) => {
      if (err) {
        next(err);
      }
      res.status(200).json(destinations);
    });
  } catch (err) {
    next(err);
  }
});

export default router;
