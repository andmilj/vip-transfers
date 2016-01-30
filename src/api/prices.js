/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import _ from 'lodash';
import { Router } from 'express';
import Price from '../db/models/price';

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    Price.find({}, (err, prices) => {
      if (err) {
        next(err);
      }
      res.status(200).json(prices);
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const _price = new Price();

    _price
      .set({
        price: req.body.price,
        vehicleType: req.body.vehicleType,
        persons: req.body.persons,
        destinations: req.body.destinations,
      })
      .save(_err => {
        if (_err) {
          next(_err);
        }

        res.status(200).json(_price);
      });
  } catch (err) {
    next(err);
  }
});

router.post('/:id', async (req, res, next) => {
  try {
    Price.findOne({ _id: req.params.id }, (err, _price) => {
      if (err) {
        next(err);
      }

      _.extend(_price, {
        price: req.body.price,
        vehicleType: req.body.vehicleType,
        persons: req.body.persons,
        destinations: req.body.destinations,
      });

      _price.save(_err => {
        if (_err) {
          next(_err);
        }

        res.status(200).json(_price);
      });
    });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/delete', async (req, res, next) => {
  try {
    Price.findOne({ _id: req.params.id }, (err, _price) => {
      if (err) {
        next(err);
      }

      _price.remove(_err => {
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

// import { Router } from 'express';
// import price from '../db/models/price';
// import vehicle from '../db/models/vehicle';

// const router = new Router();

// router.get('/', async (req, res, next) => {
//   try {
//     const from = req.query.from.split('_');
//     const to = req.query.to.split('_');
//     const query = {$and: [
//       {'destinations.city': from[0]},
//       {'destinations.city': to[0]},
//       {'destinations.type': from[1]},
//       {'destinations.type': to[1]},
//       {'persons': req.query.persons}]};

//     price.find(query, (err, prices) => {
//       if (err) {
//         next(err);
//       }
//       vehicle.find({}, (err, vehicles) => {
//         if (err) {
//           next(err);
//         }

//         res.status(200).json({prices, vehicles});
//       });
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// export default router;
