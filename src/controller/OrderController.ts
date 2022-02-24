import { Request, Response } from 'express';
import OrderService from '../service/OrderService';
import StatusCode from '../utils/StatusCode';

const create = async (req: Request, res: Response) => {
  const { products, decoded } = req.body;

  const result = await OrderService.create(decoded.id);
    
  const { userId } = result;
      
  return res.status(StatusCode.CREATED).json({ order: { userId, products } });
};

export default { create };