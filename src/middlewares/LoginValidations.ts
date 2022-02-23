import { NextFunction, Request, Response } from 'express';
import StatusCode from '../utils/StatusCode';

export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  
  if (!username) {
    return res
      .status(StatusCode.BAD_REQUEST).send({ error: 'Username is required' });
  }

  if (!password) {
    return res
      .status(StatusCode.BAD_REQUEST).send({ error: 'Password is required' });
  }

  next();
};

export default { validateLogin };