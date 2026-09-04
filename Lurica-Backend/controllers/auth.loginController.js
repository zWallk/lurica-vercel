import { AuthRepository } from "../models/authModel.js";
import { validateLogin } from "../schemas/loginSchema.js";
import { validateRegister, validateUpdateUser } from "../schemas/registerSchema.js";
import { authenticateToken } from '../middlewares/authenticateToken.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export class AuthController {
    static register = async (req, res) => {
        const result = validateRegister(req.body);
    
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }
    
        const createResponse = await AuthRepository.create(result.data);
    
        res.send(createResponse);
    }

    static login = async (req, res) => {
        const result = validateLogin(req.body);

        if (!result.success) {
            return res.status(400).json({ status: 400, error: JSON.parse(result.error.message) });
        }

        const user = await AuthRepository.login(result.data);

        if (user.status !== 200) {
            return res.status(user.status).json({ status: user.status, message: user.message });
        }

        if (!user.user) {
            return res.status(500).json({ status: 400, message: 'Internal server error: user data is missing' });
        }

        // Excluir la contraseña del |ken
        const { password, ...userWithoutPassword } = user.user;

        const token = jwt.sign(
            userWithoutPassword,
            SECRET_KEY,
            { expiresIn: '1d' }
        );

        return res.status(200).json({ status: 200, message: user.message, token });
    };

    static async updateUser(req, res) {
        const result = validateUpdateUser(req.body);

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }

        const { id } = req.params;
        const input = result.data;

        if (Object.keys(input).length === 0) {
            return res.status(400).json({ status: 400, message: 'No fields to update' });
        }

        try {
            const updatedUser = await AuthRepository.updateUser({ id, input });
            return res.json(updatedUser);
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message });
        }
    }

    static token = async (req, res) => {
        authenticateToken(req, res, () => {
            res.status(200).json({ status: 200, user: req.user });
        });
    };

    static deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            
            if (!id) {
                return res.status(400).json({ 
                    status: 400, 
                    message: 'User ID is required' 
                });
            }

            const result = await AuthRepository.deleteUser(id);
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ 
                status: 500, 
                message: error.message 
            });
        }
    };
}