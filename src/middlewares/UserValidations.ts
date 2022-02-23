import { NextFunction, Request, Response } from 'express';
import StatusCode from '../utils/StatusCode';

const validateUsername = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;
  
  if (!username) {
    return res
      .status(StatusCode.BAD_REQUEST).send({ error: 'Username is required' });
  }

  if (typeof username !== 'string') {
    return res
      .status(StatusCode.UNPROCESSABLE_ENTITY).send({ error: 'Username must be a string' });
  }

  if (username.length < 3) {
    return res
      .status(StatusCode.UNPROCESSABLE_ENTITY)
      .send({ error: 'Username must be longer than 2 characters' });
  }

  next();
};

const validatePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  
  if (!password) {
    return res
      .status(StatusCode.BAD_REQUEST).send({ error: 'Password is required' });
  }

  if (typeof password !== 'string') {
    return res
      .status(StatusCode.UNPROCESSABLE_ENTITY).send({ error: 'Password must be a string' });
  }

  if (password.length < 8) {
    return res
      .status(StatusCode.UNPROCESSABLE_ENTITY)
      .send({ error: 'Password must be longer than 7 characters' });
  }

  next();
};

const validateLevel = async (req: Request, res: Response, next: NextFunction) => {
  const { level } = req.body;
  
  if (typeof level === 'undefined') {
    return res
      .status(StatusCode.BAD_REQUEST).send({ error: 'Level is required' });
  }

  if (typeof level !== 'number') {
    return res
      .status(StatusCode.UNPROCESSABLE_ENTITY).send({ error: 'Level must be a number' });
  }

  if (level <= 0) {
    return res
      .status(StatusCode.UNPROCESSABLE_ENTITY)
      .send({ error: 'Level must be greater than 0' });
  }

  next();
};

const validateClasse = async (req: Request, res: Response, next: NextFunction) => {
  const { classe } = req.body;
  
  if (!classe) {
    return res
      .status(StatusCode.BAD_REQUEST).send({ error: 'Classe is required' });
  }

  if (typeof classe !== 'string') {
    return res
      .status(StatusCode.UNPROCESSABLE_ENTITY).send({ error: 'Classe must be a string' });
  }

  if (classe.length < 3) {
    return res
      .status(StatusCode.UNPROCESSABLE_ENTITY)
      .send({ error: 'Classe must be longer than 2 characters' });
  }

  next();
};

export default {
  validateUsername,
  validatePassword,
  validateLevel,
  validateClasse,
};