import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoChevronBackOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import './NotFound.css';

export default function NotFoundPage() {
    return (
        <div className="bg-[#1B201E] min-h-screen flex flex-col items-center justify-center px-4 py-16">
            <motion.div 
                className="max-w-2xl w-full text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Error code */}
                <motion.div
                    className="mb-12" // Añadido margen inferior para separación
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <h1 className="error-code">
                        404
                    </h1>
                </motion.div>

                {/* Title and description - Con separación clara */}
                <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <h2 className="error-title">
                        Página no encontrada
                    </h2>
                    <p className="text-gray-300 text-lg mb-10 max-w-lg mx-auto">
                        La página que estás buscando no existe o ha sido movida a otra ubicación.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link 
                                to="/" 
                                className="bg-[#C4BAA6] hover:bg-[#b5ab97] text-[#1B201E] py-3 px-8 rounded-md flex items-center justify-center gap-2 font-medium transition-all duration-300 shadow-md back-fix"
                            >
                                <IoChevronBackOutline /> 
                                Volver al inicio
                            </Link>
                        </motion.div>
                        
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <a 
                                href="https://wa.me/573227149786" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-[#C4BAA6] text-[#C4BAA6] hover:bg-[#C4BAA6]/10 py-3 px-8 rounded-md flex items-center justify-center gap-2 font-medium transition-all duration-300"
                            >
                                <FaWhatsapp /> 
                                Contactar por WhatsApp
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-[#C4BAA6]/5 to-transparent blur-3xl"
                    animate={{ 
                        x: [0, 10, 0, -10, 0],
                        y: [0, -10, 0, 10, 0],
                    }}
                    transition={{ 
                        repeat: Infinity, 
                        duration: 8,
                        ease: "easeInOut" 
                    }}
                />
                <motion.div 
                    className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-[#C4BAA6]/5 to-transparent blur-3xl"
                    animate={{ 
                        x: [0, -15, 0, 15, 0],
                        y: [0, 15, 0, -15, 0],
                    }}
                    transition={{ 
                        repeat: Infinity, 
                        duration: 10,
                        ease: "easeInOut" 
                    }}
                />
            </div>
        </div>
    );
}