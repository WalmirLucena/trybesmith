import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { User } from '../interface/User';
import UserService from '../service/UserService';
import StatusCode from '../utils/StatusCode';

const secret = 'segredo';

const create = async (req: Request, res: Response) => {
  const result: User = await UserService.create(req.body);
  const { id, username } = result;

  const data = { id, username };

  const token = sign(data, secret, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
    
  return res.status(StatusCode.CREATED).json({ token });
};

const login = async (req:Request, res: Response) => {
  const result: User = await UserService.login(req.body);

  if (!result) {
    return res
      .status(StatusCode.UNAUTHORIZED).send({ error: 'Username or password invalid' });
  }

  const { id, username } = result;

  const data = { id, username };

  const token = sign(data, secret, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return res.status(StatusCode.OK).json({ token });
};

export default { create, login };