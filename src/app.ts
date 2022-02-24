import express from 'express';
import routerLogin from './routes/loginRouter';
import routerOrder from './routes/orderRouter';
import routerProducts from './routes/productsRouter';
import router from './routes/userRouter';

const app = express();

app.use(express.json());

app.use('/users', router);
app.use('/login', routerLogin);
app.use('/products', routerProducts);
app.use('/orders', routerOrder);

export default app;
