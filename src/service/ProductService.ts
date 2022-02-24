import { IProduct } from '../interface/Product';
import ProductModel from '../models/ProductModel';

const create = async (name: string, amount: string) => {
  const data: IProduct = { name, amount };

  const product = await ProductModel.createProduct(data);
  return product;
};

const getAll = async () => {
  const products = await ProductModel.getAll();
  return products;
};

export default { create, getAll };