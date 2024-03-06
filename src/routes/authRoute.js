import express from 'express';
import authLogin from '../controller/authController/authLogin.js';
import authRegister from '../controller/authController/authRegister.js';

const authRouter = express.Router();

authRouter.post('/login', authLogin);
authRouter.post('/register', authRegister);

export default authRouter;
