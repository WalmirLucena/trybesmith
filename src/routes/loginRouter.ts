import express from 'express';
import UserController from '../controller/UserController';
import { validateLogin } from '../middlewares/LoginValidations';

const routerLogin = express.Router();

routerLogin.post('/', validateLogin, UserController.login);

export default routerLogin;