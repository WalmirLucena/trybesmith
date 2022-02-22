import { Request, Response } from 'express';
import UserService from '../service/UserService';
import StatusCode from '../utils/StatusCode';

const create = async (req: Request, res: Response) => {
  const result = await UserService.create(req.body);
  
  return res.status(StatusCode.CREATED).json(result);
};

export default { create };