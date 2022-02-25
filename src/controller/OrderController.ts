import { Request, Response } from 'express';
import OrderService from '../service/OrderService';
import StatusCode from '../utils/StatusCode';

const create = async (req: Request, res: Response) => {
  const { products, decoded } = req.body;

  const result = await OrderService.create(decoded.id, products);
    
  const { userId } = result;
      
  return res.status(StatusCode.CREATED).json({ order: { userId, products } });
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
 
  const result = await OrderService.getById(Number(id));
  
  if (result.error) {
    return res.status(StatusCode.NOT_FOUND).send({ error: result.error });
  }

  return res.status(StatusCode.OK).json(result);
};

export default { create, getById };