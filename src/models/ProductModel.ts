import { IProduct, Product } from '../interface/Product';
import connection from './connection';

const createProduct = async ({ name, amount }: IProduct): Promise<Product> => {
  const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?,?)';
  const [result] = await connection
    .execute(query, [name, amount]);
  
  const [row] = result as Product[];

  return row;
};

export default { createProduct };