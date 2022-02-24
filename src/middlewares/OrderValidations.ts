import { NextFunction, Request, Response } from 'express';
import StatusCode from '../utils/StatusCode';

const validateProducts = async (req: Request, res: Response, next: NextFunction) => {
  const { products } = req.body;

  if (!products) {
    return res
      .status(StatusCode.BAD_REQUEST).send({ error: 'Products is required' });
  }

  if (Array.isArray(products) === false) {
    return res
      .status(StatusCode.UNPROCESSABLE_ENTITY)
      .send({ error: 'Products must be an array of numbers' });
  }

  if (products.length === 0) {
    return res
      .status(StatusCode.UNPROCESSABLE_ENTITY)
      .send({ error: 'Products can\'t be empty' });
  }

  next();
};

export default validateProducts;