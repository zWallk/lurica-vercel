// api/index.js
import express from 'express';
import { json } from 'express';
import { authRoute } from '../routes/auth.loginRoute.js';
import { corsMiddleware } from '../middlewares/cors.js';
import { testConnections } from '../config/db.connection.js';
import dotenv from 'dotenv';
import { userInfoRoute } from '../routes/user.InfoRoute.js';
import { productsRouter } from '../routes/product.productsRoute.js';

dotenv.config();

const app = express();

app.use(corsMiddleware());
app.use(json());

testConnections();

app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to lurica api' });
});

app.use('/auth', authRoute);
app.use('/userinfo', userInfoRoute);
app.use('/products', productsRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
