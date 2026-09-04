import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { productService } from '../../services/auth.service.js';
import SearchBar from './components/SearchBar.jsx';
import ProductList from './components/ProductList.jsx';
import './styles/Products.css';
import { IoReturnUpBack } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTags, setSearchTags] = useState([]);
    const [allTags, setAllTags] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productService.getProducts();
            
            if (response.products && response.products.length > 0) {
                setProducts(response.products);
                setFilteredProducts(response.products);
                
                // Extract all unique tags from products
                const tags = new Set();
                response.products.forEach(product => {
                    if (product.tags && Array.isArray(product.tags)) {
                        product.tags.forEach(tag => tags.add(tag));
                    }
                });
                setAllTags(Array.from(tags));
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (selectedTags) => {
        setSearchTags(selectedTags);
        
        if (selectedTags.length === 0) {
            // If no tags selected, show all products
            setFilteredProducts(products);
        } else {
            // Filter products that have at least one of the selected tags
            const filtered = products.filter(product => 
                product.tags && 
                selectedTags.some(tag => product.tags.includes(tag))
            );
            setFilteredProducts(filtered);
        }
    };

    // Page transition variants
    const pageVariants = {
        initial: { opacity: 0 },
        animate: { 
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        },
        exit: { opacity: 0 }
    };

    // Wholesale promo card variants
    const promoCardVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.5,
                delay: 0.3
            }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
            backgroundColor: "#25D366",
            transition: {
                duration: 0.3,
                yoyo: Infinity,
                ease: "easeOut"
            }
        },
        tap: {
            scale: 0.95
        }
    };

    return (
        <motion.div 
            className="bg-[#1B201E] min-h-screen w-full pb-16"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
        >   
            <Link 
                to="/" 
                className="fixed top-6 left-6 bg-[#C4BAA6] text-[#1B201E] p-3 rounded-full shadow-lg hover:bg-[#a59c89] transition-all duration-300 z-10"
            >
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <IoReturnUpBack className='text-[#1B201E] text-sm' />
                </motion.div>
            </Link>

            <div className="container mx-auto px-4 py-12">
                <motion.h1 
                    className="text-4xl lg:text-5xl font-['Playfair_Display'] text-[#C4BAA6] text-center mb-12 products-title"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    Nuestros Productos
                </motion.h1>
                
                {/* Wholesale promo card - Redesigned */}
                <motion.div
                    className="mb-12 max-w-4xl mx-auto"
                    variants={promoCardVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="bg-gradient-to-r from-[#232928] to-[#2a3230] rounded-lg shadow-xl overflow-hidden">
                        <div className="flex flex-col md:flex-row items-stretch">
                            {/* Left side with content */}
                            <div className="md:w-3/4 p-7 relative">
                                <div className="absolute w-1 h-12 bg-[#C4BAA6] left-0 top-7 rounded-r-md"></div>
                                <h3 className="text-[#C4BAA6] text-xl font-semibold mb-2 pl-4 products-title">Descuentos exclusivos para mayoristas</h3>
                                <p className="text-gray-300 mb-0 pl-4 pr-4">
                                    Obtén precios especiales y beneficios para tu negocio. Nuestras joyas artesanales están disponibles para distribuidores.
                                </p>
                            </div>
                            
                            {/* Right side with button */}
                            <div className="md:w-1/4 bg-[#1B201E]/40 flex items-center justify-center p-6">
                                <motion.a
                                    href="https://wa.me/573227149786"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#C4BAA6] hover:bg-[#b5ab97] text-[#1B201E] whatsapp-color py-3 px-5 rounded-md flex items-center gap-2 whitespace-nowrap font-medium shadow-md transition-all duration-300 group"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FaWhatsapp className="text-xl group-hover:text-[#25D366] transition-colors" />
                                    <span>Contactar</span>
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </motion.div>
                
                <SearchBar 
                    allTags={allTags} 
                    selectedTags={searchTags} 
                    onSearch={handleSearch} 
                />
                
                <AnimatePresence mode="wait">
                    <ProductList 
                        products={filteredProducts} 
                        loading={loading} 
                    />
                </AnimatePresence>
            </div>
        </motion.div>
    );
}