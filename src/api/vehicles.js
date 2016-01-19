/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import _ from 'lodash';
import { Router } from 'express';
import Vehicle from '../db/models/vehicle';

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    Vehicle.find({}, (err, vehicles) => {
      if (err) {
        next(err);
      }
      res.status(200).json(vehicles);
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const _vehicle = new Vehicle();

    _vehicle
      .set({
        type: req.body.type,
        persons: req.body.persons,
        pictureName: req.body.pictureName,
      })
      .save(_err => {
        if (_err) {
          next(_err);
        }

        res.status(200).json(_vehicle);
      });
  } catch (err) {
    next(err);
  }
});

router.post('/:id', async (req, res, next) => {
  try {
    Vehicle.findOne({ _id: req.params.id }, (err, _vehicle) => {
      if (err) {
        next(err);
      }

      _.extend(_vehicle, {
        type: req.body.type,
        persons: req.body.persons,
        pictureName: req.body.pictureName,
      });

      _vehicle.save(_err => {
        if (_err) {
          next(_err);
        }

        res.status(200).json(_vehicle);
      });
    });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/delete', async (req, res, next) => {
  try {
    Vehicle.findOne({ _id: req.params.id }, (err, _vehicle) => {
      if (err) {
        next(err);
      }

      _vehicle.remove(_err => {
        if (_err) {
          next(_err);
        }

        res.sendStatus(204);
      });
    });
  } catch (err) {
    next(err);
  }
});

export default router;
