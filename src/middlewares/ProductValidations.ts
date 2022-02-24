import { NextFunction, Request, Response } from 'express';
import StatusCode from '../utils/StatusCode';
import utilsJWT from '../utils/utilsJWT';

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(StatusCode.UNAUTHORIZED).send({ error: 'Token not found' });
  }

  try {
    const decoded = utilsJWT.verifyToken(authorization);

    req.body = { ...req.body, decoded };

    next();
  } catch (err) {
    return res.status(StatusCode.UNAUTHORIZED).send({ error: 'Invalid token' });
  }
};

export const validateName = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  
  if (!name) {
    return res
      .status(StatusCode.BAD_REQUEST).send({ error: 'Name is required' });
  }

  if (typeof name !== 'string') {
    return res
      .status(StatusCode.UNPROCESSABLE_ENTITY).send({ error: 'Name must be a string' });
  }

  if (name.length < 3) {
    return res
      .status(StatusCode.UNPROCESSABLE_ENTITY)
      .send({ error: 'Name must be longer than 2 characters' });
  }

  next();
};

export const validateAmount = async (req: Request, res: Response, next: NextFunction) => {
  const { amount } = req.body;
  
  if (!amount) {
    return res
      .status(StatusCode.BAD_REQUEST).send({ error: 'Amount is required' });
  }

  if (typeof amount !== 'string') {
    return res
      .status(StatusCode.UNPROCESSABLE_ENTITY).send({ error: 'Amount must be a string' });
  }

  if (amount.length < 3) {
    return res
      .status(StatusCode.UNPROCESSABLE_ENTITY)
      .send({ error: 'Amount must be longer than 2 characters' });
  }

  next();
};
