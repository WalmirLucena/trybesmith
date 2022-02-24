import { ResultSetHeader } from 'mysql2';
import { Order, OrderWithProduct } from '../interface/Order';

import connection from './connection';

const create = async (userId: number): Promise<Order> => {
  const query = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?)';
  const [{ insertId: id }] = await connection
    .execute<ResultSetHeader>(query, [userId]);
      
  return { id, userId };
};

const getById = async (id: number): Promise<OrderWithProduct[]> => {
  console.log(id);
    
  const query = 'SELECT o.id, o.userId, p.id AS products FROM Trybesmith.Orders AS' 
  + ' o INNER JOIN Trybesmith.Products AS p ON p.orderId = o.id WHERE o.id = ?';
  const [result] = await connection.execute(query, [id]);
  const row = result as OrderWithProduct[] | [];
  console.log(row, 'model');
      
  return row;
}; 

export default { create, getById };