import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext.jsx';
import { AdminNavBar } from '../components/admin.NavBar.jsx';
import { SearchBar } from './components/SearchBar.jsx';
import { ProductTable } from './components/ProductTable.jsx';
import { ProductForm } from './components/ProductForm.jsx';
import { productService } from '../../../services/auth.service.js';

export default function AdminProductsPage() {
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useAuthContext();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login');
            return;
        }
        fetchProducts();
    }, [isAuthenticated, loading, navigate]);

    const fetchProducts = async () => {
        try {
            const response = await productService.getProducts();
            setProducts(response.products);
            setFilteredProducts(response.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setPageLoading(false);
        }
    };

    const handleSearch = (searchTerm) => {
        const filtered = products.filter(product => 
            Object.values(product).some(value => 
                value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredProducts(filtered);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        setProductToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await productService.deleteProduct(productToDelete);
            await fetchProducts();
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            if (selectedProduct) {
                await productService.updateProduct(selectedProduct.id, formData);
            } else {
                await productService.createProduct(formData);
            }
            setShowForm(false);
            setSelectedProduct(null);
            await fetchProducts();
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    if (loading || pageLoading) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <AdminNavBar />
                <main className="flex-1 md:ml-[70px] p-4 md:p-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminNavBar />
            <main className="flex-1 md:ml-[70px] p-4 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">Gestión de Productos</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
                    >
                        Crear Producto
                    </button>
                </div>

                <SearchBar onSearch={handleSearch} />

                <div className="mt-6 overflow-hidden bg-white rounded shadow">
                    <ProductTable
                        products={filteredProducts}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>

                {showForm && (
                    <ProductForm
                        product={selectedProduct}
                        onSubmit={handleSubmit}
                        onClose={() => {
                            setShowForm(false);
                            setSelectedProduct(null);
                        }}
                    />
                )}

                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded p-6 max-w-sm w-full">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Confirmar eliminación
                            </h3>
                            <p className="text-gray-600 mb-6">
                                ¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-200"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition-colors duration-200"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}