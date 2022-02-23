import { ResultSetHeader } from 'mysql2';
import { IProduct, Product } from '../interface/Product';
import connection from './connection';

const createProduct = async ({ name, amount }: IProduct): Promise<Product> => {
  const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?,?)';
  const [result] = await connection
    .execute<ResultSetHeader>(query, [name, amount]);
  
  const { insertId: id } = result;
  const insertedProduct: Product = { id, name, amount };
    
  return insertedProduct;
};

export default { createProduct };