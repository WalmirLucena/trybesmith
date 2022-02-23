import { ILogin, User } from '../interface/User';
import UserModel from '../models/UserModel';

const create = async (data: User) => {
  const result = await UserModel.create(data);
  return result;
};

const login = async (data: ILogin) => {
  const result = await UserModel.getUserByPassword(data);

  return result;
};

export default { create, login };