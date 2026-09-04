
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';

import { mainPool } from '../config/db.connection.js';

export class AuthRepository{
    static async create({ email, username, password, name, lastname }) {
        console.log(`Peticion de creacion de usuario recibida para el usuario ${username}.`)
        const [alredyExists] = await mainPool.query('SELECT * FROM users WHERE username = ?', [username]);
    
        if (alredyExists.length > 0) {
            return { status: 400, message: 'User already exists' };
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        await mainPool.query('INSERT INTO users (email, username, password, name, lastname) VALUES (?, ?, ?, ?, ?)', [email, username, hashedPassword, name, lastname]);
    
        const [user] = await mainPool.query('SELECT id FROM users WHERE username = ?', [username]);
        
        console.log(`Peticion de creacion de usuario recibida para el usuario ${username} y correctamente ejecutada.`)
        return { status: 200, message: 'User created successfully', id: user[0].id };
    }

    static async login({ username, password }) {
        console.log(`Peticion de login recibida para el usuario ${username}.`)
        const [user] = await mainPool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (user.length === 0) {
            return { status: 400, message: 'User not found' };
        }

        const validPassword = bcrypt.compareSync(password, user[0].password);
        if (!validPassword) {
            return { status: 400, message: 'Invalid password' };
        }

        // Excluir la contraseña de la respuesta
        const { password: _, ...userWithoutPassword } = user[0];

        console.log(`Peticion de login recibida para el usuario ${username} y correctamente ejecutada.`)
        return { status: 200, message: 'Login successfully', user: userWithoutPassword };
    }

    static async updateUser({ id, input }) {
    
        if (Object.keys(input).length === 0) {
            throw new Error('No fields to update');
        }
    
        let updatedFields = { ...input };
    
        // Si hay password, hashearla antes de actualizar
        if (input.password) {
            const hashedPassword = await bcrypt.hash(input.password, 10);
            updatedFields.password = hashedPassword;
        }
    
        // Construir la consulta SQL con los campos actualizados
        const fields = Object.keys(updatedFields).map(key => `${key} = ?`).join(', ');
        const values = Object.values(updatedFields);
    
        try {
            await mainPool.query(`UPDATE users SET ${fields} WHERE id = ?`, [...values, id]);
            
            const [updatedUser] = await mainPool.query('SELECT * FROM users WHERE id = ?', [id]);
    
            if (!updatedUser || updatedUser.length === 0) {
                throw new Error('User not found');
            }
    
            const { password, ...userWithoutPassword } = updatedUser[0];
    
            return { status: 200, message: 'User updated', user: userWithoutPassword };
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Error updating user');
        }
    }
    static async deleteUser(id) {
        try {
            console.log(`Petición de eliminación recibida para el usuario ID: ${id}`);
            
            // Verificar si el usuario existe
            const [user] = await mainPool.query('SELECT * FROM users WHERE id = ?', [id]);
            
            if (user.length === 0) {
                return { status: 404, message: 'User not found' };
            }

            // Eliminar usuario
            await mainPool.query('DELETE FROM users WHERE id = ?', [id]);
            
            console.log(`Usuario ID: ${id} eliminado correctamente`);
            return { status: 200, message: 'User deleted successfully' };
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('Error deleting user');
        }
    }
}