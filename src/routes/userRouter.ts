import express from 'express';
import UserController from '../controller/UserController';
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

export default router;