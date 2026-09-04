import { Router } from 'express';
import { ProductController } from '../controllers/productsController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

export const productsRouter = Router();

// Rutas públicas (no requieren autenticación)
productsRouter.get('/getall', ProductController.getAll);
productsRouter.get('/getbyid/:id', ProductController.getById);
productsRouter.get('/getbytags', ProductController.getByTags);

// Rutas protegidas (requieren autenticación)
productsRouter.post('/create', authenticateToken, ProductController.create);
productsRouter.patch('/update/:id', authenticateToken, ProductController.update);
productsRouter.delete('/delete/:id', authenticateToken, ProductController.delete);