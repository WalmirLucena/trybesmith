import { Request, Response } from 'express';
import { DataJWT, User } from '../interface/User';
import UserService from '../service/UserService';
import StatusCode from '../utils/StatusCode';
import utilsJWT from '../utils/utilsJWT';

const create = async (req: Request, res: Response) => {
  const result: User = await UserService.create(req.body);
  const { id, username } = result;

  const data: DataJWT = { id, username };

  const token = utilsJWT.createToken(data);

  return res.status(StatusCode.CREATED).json({ token });
};

const login = async (req:Request, res: Response) => {
  const result: User = await UserService.login(req.body);

  if (!result) {
    return res
      .status(StatusCode.UNAUTHORIZED).send({ error: 'Username or password invalid' });
  }

  const { id, username } = result;

  const data: DataJWT = { id, username };

  const token = utilsJWT.createToken(data);

  return res.status(StatusCode.OK).json({ token });
};

export default { create, login };