import { ResultSetHeader } from 'mysql2';

import { User, IUser } from '../interface/User';
import connection from './connection';

const create = async ({ username, classe, level, password }: IUser): Promise<IUser> => {
  const query = 'INSERT INTO Trybesmith.User (username, classe, level, password) VALUES (?,?,?)';
  const [result] = await connection
    .execute<ResultSetHeader>(query, [username, classe, level, password]);
  
  const { insertId: id } = result;

  const insertedUser: User = { id, username, classe, level, password };

  return insertedUser;
};

export default { create };