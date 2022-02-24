import express from 'express';
import ProductController from '../controller/ProductController';
import { validateToken, validateName, validateAmount } from '../middlewares/ProductValidations';

const routerProducts = express.Router();

routerProducts.post('/', validateToken, validateName, validateAmount, ProductController.create);
routerProducts.get('/', validateToken, ProductController.getAll);

export default routerProducts;