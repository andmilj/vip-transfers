/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import { Router } from 'express';
import User from '../db/models/user.js';

const router = new Router();

router.post('/check', async (req, res, next) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({
      message: 'Unauthorized!'
    });
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let errors = [];

    if (!username.trim()) {
      errors.push({
        field: 'username',
        message: 'Please enter your username'
      });
    }

    if (!password.trim()) {
      errors.push({
        field: 'password',
        message: 'Please enter your password'
      });
    }

    if (!errors.length) {
      User.findOne({username, password}, (err, user) => {
        if (err) { next(err); }

        if (user) {
          req.session.user = user;

          res.status(201).json(user);
        } else {
          res.status(401).json({
            field: '*',
            message: 'Wrong username/password combination!'
          });
        }
      });
    } else {
      res.status(400).json(errors);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/destroy', async (req, res, next) => {
  if (req.session.user) {
    delete req.session.user;
    res.status(200).json({
      message: 'Logout successful!'
    });
  } else {
    res.status(401).json({
      message: 'Unauthorized!'
    });
  }
});

export default router;
