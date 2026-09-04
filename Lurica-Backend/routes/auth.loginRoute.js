import { Router } from 'express'
import { AuthController } from '../controllers/auth.loginController.js'
import { authenticateToken } from '../middlewares/authenticateToken.js'

export const authRoute = Router()

// Rutas públicas (no requieren autenticación)
authRoute.post('/register', AuthController.register)
authRoute.post('/login', AuthController.login)

// Rutas protegidas (requieren autenticación)
authRoute.post('/token', authenticateToken, AuthController.token)
authRoute.patch('/update-user/:id', authenticateToken, AuthController.updateUser)
authRoute.delete('/delete-user/:id', authenticateToken, AuthController.deleteUser)