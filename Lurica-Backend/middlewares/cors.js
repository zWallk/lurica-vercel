// cors.js
import cors from 'cors';

const ACCEPTED_ORIGINS = [
    // Producción
    'https://luricaaccesorios.com', 
    'https://www.luricaaccesorios.com',
    'https://api.luricaaccesorios.com',
    
    // Vercel deployment
    process.env.FRONTEND_URL || '',
    process.env.BACKEND_URL || '',
    
    // Desarrollo
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:3001',
].filter(Boolean)

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
    origin: (origin, callback) => {
        // Sin origin o si el origin es uno de los aceptados
        if (!origin || acceptedOrigins.includes(origin)) {
            return callback(null, origin || true);
        }
        
        // Si el origen es algún subdominio de luricaaccesorios.com
        if (origin.endsWith('luricaaccesorios.com')) {
            return callback(null, origin);
        }

        console.log(`Origin blocked by CORS: ${origin}`);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
})