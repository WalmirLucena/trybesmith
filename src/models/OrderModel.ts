import { ResultSetHeader } from 'mysql2';
import { Order, OrderWithProduct } from '../interface/Order';

import connection from './connection';

const create = async (userId: number): Promise<Order> => {
  const query = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?)';
  const [{ insertId: id }] = await connection
    .execute<ResultSetHeader>(query, [userId]);
      
  return { id, userId };
};

const update = async (orderId: number, product: number) => {
  const query = 'UPDATE Trybesmith.Products SET orderId = ? WHERE id= ?';
  const [result] = await connection.execute<ResultSetHeader>(query, [orderId, product]);
  
  return result;
};

const getById = async (id: number): Promise<OrderWithProduct[]> => {
  const query = 'SELECT o.id, o.userId, p.id AS products FROM Trybesmith.Orders AS' 
  + ' o INNER JOIN Trybesmith.Products AS p ON p.orderId = o.id WHERE o.id = ?';
  const [result] = await connection.execute(query, [id]);
  const row = result as OrderWithProduct[] | [];
       
  return row;
};

const getAll = async (): Promise<OrderWithProduct[]> => {
  const query = 'SELECT o.id, o.userId, p.id AS products FROM Trybesmith.Orders AS' 
  + ' o INNER JOIN Trybesmith.Products AS p ON p.orderId = o.id GROUP BY products';
  const [result] = await connection.execute(query);
  const row = result as OrderWithProduct[] | [];
       
  return row;
};

export default { create, getById, update, getAll };