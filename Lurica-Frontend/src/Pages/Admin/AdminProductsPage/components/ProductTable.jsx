import { FaEdit, FaTrash } from 'react-icons/fa';

export function ProductTable({ products, onEdit, onDelete }) {
    // Helper function to safely format price
    const formatPrice = (price) => {
        // Convert to number and check if it's valid
        const numPrice = Number(price);
        return !isNaN(numPrice) ? numPrice.toFixed(2) : '0.00';
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="hidden md:table-cell px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                        <th className="hidden md:table-cell px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                            <td className="hidden md:table-cell px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                <img 
                                    src={product.img} 
                                    alt={product.title}
                                    className="h-10 w-10 rounded object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/40';
                                    }}
                                />
                            </td>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.title}</td>
                            <td className="hidden md:table-cell px-4 md:px-6 py-4 whitespace-nowrap">
                                <div className="flex flex-wrap gap-1">
                                    {product.tags.map((tag, index) => (
                                        <span 
                                            key={index} 
                                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                ${formatPrice(product.price)}
                            </td>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onEdit(product)}
                                        className="p-1.5 md:p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md"
                                        title="Editar"
                                    >
                                        <FaEdit size={14} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(product.id)}
                                        className="p-1.5 md:p-2 bg-red-600 text-white rounded hover:bg-red-700 transform hover:scale-105 transition-all duration-200 shadow-md"
                                        title="Eliminar"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}