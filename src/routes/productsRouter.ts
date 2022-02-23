import express from 'express';
import ProductController from '../controller/ProductController';
import { validateToken } from '../middlewares/ProductValidations';

const routerProducts = express.Router();

routerProducts.post('/', validateToken, ProductController.create);

export default routerProducts;