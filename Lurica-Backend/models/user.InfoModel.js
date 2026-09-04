import { mainPool } from "../config/db.connection.js";

export class UserInfoRepository {
    static async getAll() {
        try {
            console.log('Petición de lista de usuarios recibida');
            
            const [users] = await mainPool.query('SELECT id, email, username, name, lastname, created_at, updated_at FROM users');

            if (!users || users.length === 0) {
                return { 
                    status: 404, 
                    message: 'No users found' 
                };
            }
            
            return {
                status: 200,
                totalUsers: users.length,
                message: 'Users retrieved successfully',
                users
            };
        } catch (error) {
            console.error('Error getting users:', error);
            throw new Error('Error retrieving users');
        }
    }
}