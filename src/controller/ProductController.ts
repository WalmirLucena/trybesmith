import { Request, Response } from 'express';
import { Product } from '../interface/Product';
import ProductService from '../service/ProductService';
import StatusCode from '../utils/StatusCode';

const create = async (req: Request, res: Response) => {
  const { name, amount } = req.body;

  const result: Product = await ProductService.create(name, amount);
    
  const { id } = result;
      
  return res.status(StatusCode.CREATED).json({ item: { id, name, amount } });
};

export default { create };