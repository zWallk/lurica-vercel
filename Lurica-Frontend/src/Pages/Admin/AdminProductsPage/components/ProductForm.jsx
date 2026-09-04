import { useState, useEffect } from 'react';
import { validateProductForm } from '../../../../schemas/productSchema.js';

export function ProductForm({ product, onSubmit, onClose }) {
    const [formData, setFormData] = useState({
        title: product?.title || '',
        description: product?.description || '',
        tags: product?.tags?.join(', ') || '',
        stock: product?.stock || 0,
        img: product?.img || '',
        price: product?.price || 0
    });

    const [errors, setErrors] = useState({});

    // Actualizar formulario cuando cambia el producto
    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title || '',
                description: product.description || '',
                tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
                stock: product.stock || 0,
                img: product.img || '',
                price: parseFloat(product.price) || 0
            });
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validar con Zod
        const validation = validateProductForm(formData);
        
        if (!validation.success) {
            // Formatear errores de Zod para mostrarlos en el formulario
            const formattedErrors = {};
            validation.error.errors.forEach(err => {
                formattedErrors[err.path[0]] = err.message;
            });
            setErrors(formattedErrors);
            return;
        }
        
        // Si la validación es exitosa, limpiar errores y enviar datos
        setErrors({});
        onSubmit(validation.data);
    };

    // Función para formatear el precio en formato COP
    const formatCOP = (value) => {
        if (!value) return '';
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(value);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    {product ? 'Editar Producto' : 'Crear Producto'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className={`w-full rounded border ${errors.title ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                            required
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className={`w-full rounded border ${errors.description ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                            rows="4"
                            required
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL de la imagen</label>
                        <input
                            type="url"
                            value={formData.img}
                            onChange={(e) => setFormData({...formData, img: e.target.value})}
                            className={`w-full rounded border ${errors.img ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                            placeholder="https://ejemplo.com/imagen.jpg"
                        />
                        {errors.img && <p className="mt-1 text-sm text-red-600">{errors.img}</p>}
                        {formData.img && (
                            <div className="mt-2">
                                <img
                                    src={formData.img}
                                    alt="Preview"
                                    className="max-h-40 rounded"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Precio (COP)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                                    className={`w-full rounded border ${errors.price ? 'border-red-500' : 'border-gray-300'} pl-8 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                    min="0"
                                    step="1"
                                    required
                                    placeholder="0"
                                />
                            </div>
                            {formData.price > 0 && (
                                <p className="mt-1 text-xs text-gray-500">
                                    {formatCOP(formData.price)}
                                </p>
                            )}
                            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                                className={`w-full rounded border ${errors.stock ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                min="0"
                                required
                            />
                            {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags (separados por comas)</label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={(e) => setFormData({...formData, tags: e.target.value})}
                            className={`w-full rounded border ${errors.tags ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                            placeholder="tag1, tag2, tag3"
                            required
                        />
                        {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>}
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-200"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-200"
                        >
                            {product ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}