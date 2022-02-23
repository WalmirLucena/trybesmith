import express from 'express';
import routerLogin from './routes/loginRouter';
import router from './routes/userRouter';

const app = express();

app.use(express.json());

app.use('/users', router);
app.use('/login', routerLogin);

export default app;
