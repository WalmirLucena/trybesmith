import { IUser } from '../interface/User';
import UserModel from '../models/UserModel';

const create = async (data: IUser) => {
  const result = await UserModel.create(data);
  return result;
};

export default { create };