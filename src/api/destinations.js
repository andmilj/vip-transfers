/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import _ from 'lodash';
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

router.post('/:id', async (req, res, next) => {
  try {
    destination.findOne({ _id: req.params.id }, (err, _destination) => {
      if (err) {
        next(err);
      }

      _.extend(_destination, {
        city: req.body.city,
        country: req.body.country,
        type: req.body.type,
      });

      _destination.save(_err => {
        if (_err) {
          next(_err);
        }

        res.status(200).json(_destination);
      });
    });
  } catch (err) {
    next(err);
  }
});

export default router;
