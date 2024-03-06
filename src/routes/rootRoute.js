import express from 'express';
import authRouter from './authRoute.js';
import resRouter from './resRoute.js';

const rootRouter = express.Router();

rootRouter.get('/', async (req, res) => {
  res.json({
    class: 'NODEJS 39',
    name: 'Phu Nguyen',
    email: 'icaluca12@gmail.com',
    project: 'sequelize-food_app',
  });
});

rootRouter.use('/auth', authRouter);
rootRouter.use('/res', resRouter);

export default rootRouter;
