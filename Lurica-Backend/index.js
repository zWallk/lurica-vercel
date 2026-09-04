// index.js
import express from 'express';
import { json } from 'express';
import process from 'node:process';
import { authRoute } from './routes/auth.loginRoute.js';
import { corsMiddleware } from './middlewares/cors.js';
import { testConnections } from './config/db.connection.js';
import dotenv from 'dotenv';
import { userInfoRoute } from './routes/user.InfoRoute.js';
import { productsRouter } from './routes/product.productsRoute.js';

dotenv.config()

const app = express()

app.use(corsMiddleware())

app.use(json())
testConnections()

app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to lurica api' })
})

app.use('/auth', authRoute)
app.use('/userinfo', userInfoRoute)
app.use('/products', productsRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`
    ╔════════════════════════════════════╗
    ║           SERVER STARTED           ║
    ╠════════════════════════════════════╣
    ║ Local:  http://localhost:${PORT}      ║
    ║ Status: Online                     ║
    ╚════════════════════════════════════╝
    `)
})