/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import { Router } from 'express';
import User from '../models/user.js';

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    User.find((err, users) => {
      if (err) {
        next(err);
      }
      res.status(200).json({users});
    });
  } catch (err) {
    next(err);
  }
});

export default router;
