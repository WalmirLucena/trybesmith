import { ResultSetHeader } from 'mysql2';
import { IProduct, Product } from '../interface/Product';
import connection from './connection';

const createProduct = async ({ name, amount }: IProduct): Promise<Product> => {
  const query = 'INSERT INTO Trybesmith.Products (name, amount, orderId) VALUES (?,?,?)';
  const [result] = await connection
    .execute<ResultSetHeader>(query, [name, amount]);
  
  const { insertId: id } = result;
  const insertedProduct: Product = { id, name, amount };
    
  return insertedProduct;
};

const getAll = async (): Promise<Product[]> => {
  const query = 'SELECT * FROM Trybesmith.Products';
  const [result] = await connection.execute(query);
  return result as Product[];
};

export default { createProduct, getAll };