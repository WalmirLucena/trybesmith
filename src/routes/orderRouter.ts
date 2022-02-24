import express from 'express';
import OrderController from '../controller/OrderController';
import validateProducts from '../middlewares/OrderValidations';
import { validateToken } from '../middlewares/ProductValidations';

const routerOrder = express.Router();

routerOrder.post('/', validateToken, validateProducts, OrderController.create);
routerOrder.get('/:id', validateToken, OrderController.getById);

export default routerOrder;