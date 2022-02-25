import OrderModel from '../models/OrderModel';

const create = async (userId: number, products:number[]) => {
  const result = await OrderModel.create(userId);
  const { id } = result;

  const updateOrder = products.map(async (product) => {
    await OrderModel.update(id, product);
  });
  await Promise.all(updateOrder);

  return result;
};

const getById = async (orderId: number) => {
  const result = await OrderModel.getById(orderId);
  if (result.length === 0) return ({ error: 'Order not found' });
  
  const { id, userId } = result[0];

  const products = result.map((item) => item.products);
  return { id, userId, products };
};

export default { create, getById };