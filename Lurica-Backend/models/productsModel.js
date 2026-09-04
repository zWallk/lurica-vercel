import { mainPool } from '../config/db.connection.js';

export class ProductRepository {
    static async create({ title, description, tags, img, stock, price }) {
        try {
            const [result] = await mainPool.query(
                'INSERT INTO products (title, description, tags, img, stock, price) VALUES (?, ?, ?, ?, ?, ?)',
                [title, description, JSON.stringify(tags), img, stock, price]
            );

            const [product] = await mainPool.query('SELECT * FROM products WHERE id = ?', [result.insertId]);
            
            console.log(`Producto creado exitosamente: ${title}`);
            return { 
                status: 200, 
                message: 'Product created successfully', 
                product: product[0] 
            };
        } catch (error) {
            console.error('Error creating product:', error);
            throw new Error('Error creating product');
        }
    }

    static async getAll() {
        try {
            const [products] = await mainPool.query('SELECT * FROM products');
            return { 
                status: 200, 
                message: 'Products retrieved successfully',
                totalProducts: products.length,
                products 
            };
        } catch (error) {
            console.error('Error getting products:', error);
            throw new Error('Error getting products');
        }
    }

    static async getById(id) {
        try {
            const [product] = await mainPool.query('SELECT * FROM products WHERE id = ?', [id]);
            
            if (product.length === 0) {
                return { status: 404, message: 'Product not found' };
            }

            return { 
                status: 200, 
                message: 'Product retrieved successfully',
                product: product[0] 
            };
        } catch (error) {
            console.error('Error getting product:', error);
            throw new Error('Error getting product');
        }
    }

    static async update({ id, input }) {
        try {
            if (input.tags && typeof input.tags === 'object') {
                input.tags = JSON.stringify(input.tags);
            }

            const fields = Object.keys(input).map(key => `${key} = ?`).join(', ');
            const values = [...Object.values(input), id];

            const [result] = await mainPool.query(
                `UPDATE products SET ${fields} WHERE id = ?`,
                values
            );

            if (result.affectedRows === 0) {
                return { status: 404, message: 'Product not found' };
            }

            const [updatedProduct] = await mainPool.query('SELECT * FROM products WHERE id = ?', [id]);
            return { 
                status: 200, 
                message: 'Product updated successfully',
                product: updatedProduct[0] 
            };
        } catch (error) {
            console.error('Error updating product:', error);
            throw new Error('Error updating product');
        }
    }

    static async delete(id) {
        try {
            const [result] = await mainPool.query('DELETE FROM products WHERE id = ?', [id]);
            
            if (result.affectedRows === 0) {
                return { status: 404, message: 'Product not found' };
            }

            return { status: 200, message: 'Product deleted successfully' };
        } catch (error) {
            console.error('Error deleting product:', error);
            throw new Error('Error deleting product');
        }
    }

    static async getByTags(tags) {
        try {
            const placeholders = tags.map(() => 'JSON_CONTAINS(tags, ?)').join(' OR ');
            const values = tags.map(tag => `"${tag}"`);
            
            const [products] = await mainPool.query(
                `SELECT * FROM products WHERE ${placeholders}`,
                values
            );

            return { 
                status: 200, 
                message: 'Products retrieved successfully',
                totalProducts: products.length,
                products 
            };
        } catch (error) {
            console.error('Error getting products by tags:', error);
            throw new Error('Error getting products by tags');
        }
    }
}