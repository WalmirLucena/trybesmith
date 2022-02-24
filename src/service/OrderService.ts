import OrderModel from '../models/OrderModel';

const create = async (id: number) => {
  const result = await OrderModel.create(id);
  return result;
};

const getById = async (id: number) => {
  const result = await OrderModel.getById(id);
  return result;
};

export default { create, getById };