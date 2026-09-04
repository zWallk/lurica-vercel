import { useEffect, useState } from 'react';
import { FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';
import { productService } from '../../../services/auth.service.js';
import { Link } from 'react-router-dom';
import '../styles/Products.css';
import { motion } from 'framer-motion';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        fetchProducts();
    }, []);
    
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productService.getProducts();
            
            // Get 3 random products from the API response
            if (response.products && response.products.length > 0) {
                const shuffled = [...response.products].sort(() => 0.5 - Math.random());
                const randomSelection = shuffled.slice(0, 3);
                setProducts(randomSelection);
                
                // Initialize quantities
                const initialQuantities = {};
                randomSelection.forEach(product => {
                    initialQuantities[product.id] = 1;
                });
                setQuantities(initialQuantities);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    // Format price with Colombian Peso
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    };

    // Handle quantity change
    const handleQuantityChange = (id, change) => {
        setQuantities(prev => {
            const newQuantity = Math.max(1, (prev[id] || 1) + change);
            return { ...prev, [id]: newQuantity };
        });
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const titleVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const buttonVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { 
            scale: 1, 
            opacity: 1,
            transition: { duration: 0.4, delay: 0.2, ease: "easeOut" }
        },
        hover: { 
            scale: 1.05,
            transition: { duration: 0.2 }
        }
    };

    return (
        <section className="bg-[#1B201E] pb-0 mb-0 overflow-hidden" id='productos'>
            <div className="container mx-auto px-4 py-12">
                <motion.h2 
                    className="text-3xl lg:text-4xl font-['Playfair_Display'] text-[#C4BAA6] h2-title text-center mb-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={titleVariants}
                >
                    Nuestros Productos
                </motion.h2>
                
                <motion.div 
                    className="max-w-6xl mx-auto flex justify-center my-3.5 lg:justify-end mb-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={buttonVariants}
                >
                    <Link 
                        to="/products" 
                        className="inline-block px-6 py-2 bg-[#C4BAA6] text-[#1B201E] rounded-lg font-medium hover:bg-[#a59c89] transition-colors duration-300 no-underline text-inherit products-link"
                    >
                        Ver todos los productos
                    </Link>
                </motion.div>
                
                {loading ? (
                    <div className="text-center text-[#C4BAA6]">Cargando productos...</div>
                ) : (
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {products.map((product, index) => (
                            <motion.div 
                                key={product.id}
                                className="bg-[#232928] rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
                                variants={itemVariants}
                                custom={index}
                            >
                                {/* Imagen - Arriba sin bordes */}
                                <div className="relative group overflow-hidden h-56">
                                    <motion.img 
                                        src={product.img} 
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/300x200?text=Producto+Lírica";
                                        }}
                                        initial={{ scale: 1.1, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#232928] via-transparent to-transparent opacity-60"></div>
                                </div>
                                
                                {/* Contenido - Pegado debajo de la imagen */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <motion.h3 
                                        className="text-[#C4BAA6] font-semibold text-xl mb-2 products-title3"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                                    >
                                        {product.title}
                                    </motion.h3>
                                    
                                    <motion.p 
                                        className="text-gray-300 mb-4 text-sm md:text-base line-clamp-2 flex-grow"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                    >
                                        {product.description}
                                    </motion.p>
                                    
                                    <motion.div 
                                        className="mt-auto space-y-4"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                    >
                                        <p className="text-[#C4BAA6] font-bold text-2xl">{formatPrice(product.price)}</p>
                                        
                                        <div className="flex items-center gap-3">
                                            {/* Quantity selector - Mejorado */}
                                            <div className="flex items-center bg-[#1B201E] rounded-lg overflow-hidden border border-[#C4BAA6]/20">
                                                <motion.button 
                                                    onClick={() => handleQuantityChange(product.id, -1)}
                                                    className="px-3 py-2 text-[#C4BAA6] hover:bg-[#C4BAA6]/10 transition-colors"
                                                    whileTap={{ scale: 0.9 }}
                                                    aria-label="Disminuir cantidad"
                                                >
                                                    <FaMinus size={14} />
                                                </motion.button>
                                                
                                                <span className="px-4 py-2 text-white font-medium min-w-[40px] text-center">
                                                    {quantities[product.id] || 1}
                                                </span>
                                                
                                                <motion.button 
                                                    onClick={() => handleQuantityChange(product.id, 1)}
                                                    className="px-3 py-2 text-[#C4BAA6] hover:bg-[#C4BAA6]/10 transition-colors"
                                                    whileTap={{ scale: 0.9 }}
                                                    aria-label="Aumentar cantidad"
                                                >
                                                    <FaPlus size={14} />
                                                </motion.button>
                                            </div>
                                            
                                            {/* Buy button - Mejorado */}
                                            <motion.a 
                                                href={`https://wa.me/573227149786?text=Hola,%20me%20interesa%20comprar%20${quantities[product.id] || 1}%20unidad(es)%20de:%20${encodeURIComponent(product.title)}%20a%20${encodeURIComponent(formatPrice(product.price))}%20cada%20uno.%20Total:%20${encodeURIComponent(formatPrice((product.price * (quantities[product.id] || 1))))}%20COP`} 
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 bg-[#C4BAA6] text-[#1B201E] px-4 py-2.5 rounded-lg hover:bg-[#d4c9b1] transition-colors font-semibold products-link"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <FaShoppingCart className="text-base products-link" />
                                                <span className='products-link'>Comprar</span>
                                            </motion.a>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}