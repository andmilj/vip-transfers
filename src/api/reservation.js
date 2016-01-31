import { Router } from 'express';

const router = new Router();

router.post('/', async (req, res, next) => {
  try {
    res.status(200).json('reservation done');
  } catch (err) {
    next(err);
  }
});

export default router;
