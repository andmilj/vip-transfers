import { Router } from 'express';
import reservation from '../db/models/reservation';

const router = new Router();

router.post('/', async (req, res, next) => {
  try {
    reservation(req.body).save((err, _reservation) => {
      res.status(200).json(_reservation);
    });
  } catch (err) {
    next(err);
  }
});

export default router;
