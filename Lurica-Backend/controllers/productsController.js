import { ProductRepository } from "../models/productsModel.js";
import { validateProduct, validateUpdateProduct } from "../schemas/productSchema.js";

export class ProductController {
    static create = async (req, res) => {
        try {
            const result = validateProduct(req.body);

            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }

            delete result.data.id;
            const createResponse = await ProductRepository.create(result.data);
            res.status(createResponse.status).json(createResponse);
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }

    static getAll = async (req, res) => {
        try {
            const products = await ProductRepository.getAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }

    static getById = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json({ status: 400, message: 'Invalid ID format' });
            }

            const product = await ProductRepository.getById(id);
            
            if (product.status === 404) {
                return res.status(404).json(product);
            }

            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }

    static update = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json({ status: 400, message: 'Invalid ID format' });
            }

            const result = validateUpdateProduct(req.body);

            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }

            delete result.data.id;
            const updatedProduct = await ProductRepository.update({ id, input: result.data });
            res.status(updatedProduct.status).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }

    static delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json({ status: 400, message: 'Invalid ID format' });
            }

            const result = await ProductRepository.delete(id);
            
            if (result.status === 404) {
                return res.status(404).json(result);
            }

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }

    static getByTags = async (req, res) => {
        try {
            const { tags } = req.query;
            if (!tags) {
                return res.status(400).json({ status: 400, message: 'Tags are required' });
            }
            
            const products = await ProductRepository.getByTags(tags.split(','));
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }
}