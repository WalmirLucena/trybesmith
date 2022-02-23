import { NextFunction, Request, Response } from 'express';
import StatusCode from '../utils/StatusCode';
import utilsJWT from '../utils/utilsJWT';

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(StatusCode.UNAUTHORIZED).send({ error: 'Token not found' });
  }

  try {
    utilsJWT.verifyToken(authorization);
  } catch (err) {
    return res.status(StatusCode.UNAUTHORIZED).send({ error: 'Invalid token' });
  }

  next();
};

export default { validateToken };