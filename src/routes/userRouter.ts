import express from 'express';
import UserController from '../controller/UserController';
import { validateLogin } from '../middlewares/LoginValidations';
import UserValidations from '../middlewares/UserValidations';

const router = express.Router();

router.post(
  '/', 
  UserValidations.validateClasse,
  UserValidations.validateLevel,
  UserValidations.validatePassword,
  UserValidations.validateUsername,
  UserController.create,
);

router.post('/login', validateLogin, UserController.login);

export default router;