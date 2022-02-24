import { Request, Response } from 'express';
import { Product } from '../interface/Product';
import ProductService from '../service/ProductService';
import StatusCode from '../utils/StatusCode';

const create = async (req: Request, res: Response) => {
  const { name, amount, decoded } = req.body;

  const result: Product = await ProductService.create(name, amount, decoded.id);
    
  const { id } = result;
      
  return res.status(StatusCode.CREATED).json({ item: { id, name, amount } });
};

const getAll = async (req: Request, res: Response) => {
  const products: Product[] = await ProductService.getAll();
   
  return res.status(StatusCode.OK).json(products);
};

export default { create, getAll };