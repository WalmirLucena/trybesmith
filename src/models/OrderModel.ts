import { ResultSetHeader } from 'mysql2';
import { Order } from '../interface/Order';

import connection from './connection';

const create = async (userId: number): Promise<Order> => {
  const query = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?)';
  const [result] = await connection
    .execute<ResultSetHeader>(query, [userId]);
  
  const { insertId: id } = result;
  const insertedProduct = { id, userId };
    
  return insertedProduct;
};

export default { create };