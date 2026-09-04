import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extrae el token después de 'Bearer '
    
    console.log(`Petición de autenticación recibida con token: ${token}.`);

    if (!token) {
        return res.status(401).json({ status: 400, message: 'Access token is missing or invalid' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ status: 400, message: 'Invalid token' });
        }

        req.user = user;
        next();
    });
};