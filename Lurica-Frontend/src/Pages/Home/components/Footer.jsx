import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../styles/Footer.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-gradient-to-b from-[#1B201E] to-[#232928] text-[#C4BAA6] pt-20 pb-8 relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#C4BAA6]/3 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C4BAA6]/3 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Logo and About */}
                    <motion.div 
                        className="lg:col-span-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-6">
                            <Link to="/" className="inline-block group">
                                <img 
                                    src="/img/lurica-logo.webp" 
                                    alt="Lurica Logo" 
                                    className="h-14 mb-5 transition-transform duration-300 group-hover:scale-105"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/160x60?text=Lurica";
                                    }}
                                />
                            </Link>
                            <p className="text-gray-400 mb-4">
                                Lurica Accesorios: Importadora directa de accesorios, se enfocan en la calidad y sus descuentos de ventas al por mayor
                            </p>
                        </div>
                        
                        {/* Social Media */}
                        <div>
                            <h3 className="text-[#C4BAA6] font-semibold text-lg mb-4">Síguenos</h3>
                            <div className="flex space-x-4">
                                <motion.a 
                                    href="https://facebook.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-[#181d1b] p-2 rounded-full hover:bg-[#C4BAA6] hover:text-[#1B201E] transition-colors duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaFacebook size={20} />
                                </motion.a>
                                <motion.a 
                                    href="https://www.instagram.com/luricaaccesorios?igsh=dmRhZ3N1MXpqd3Az" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-[#181d1b] p-2 rounded-full hover:bg-[#C4BAA6] hover:text-[#1B201E] transition-colors duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaInstagram size={20} />
                                </motion.a>
                                <motion.a 
                                    href="https://wa.me/573227149786" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-[#181d1b] p-2 rounded-full hover:bg-[#C4BAA6] hover:text-[#1B201E] transition-colors duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaWhatsapp size={20} />
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                    
                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="!text-[#C4BAA6] font-semibold text-base mb-6 font-['Playfair_Display']">Enlaces Rápidos</h3>
                        <ul className="space-y-3 p-0 m-0">
                            <li>
                                <a href="#inicio" className="!text-gray-400 hover:!text-[#C4BAA6] transition-all duration-300 flex items-center no-underline text-sm group">
                                    <span className="!text-[#C4BAA6] w-5 inline-block group-hover:translate-x-1 transition-transform">›</span>
                                    <span>Inicio</span>
                                </a>
                            </li>
                            <li>
                                <a href="#products" className="!text-gray-400 hover:!text-[#C4BAA6] transition-all duration-300 flex items-center no-underline text-sm group">
                                    <span className="!text-[#C4BAA6] w-5 inline-block group-hover:translate-x-1 transition-transform">›</span>
                                    <span>Productos</span>
                                </a>
                            </li>
                            <li>
                                <a href="#nosotros" className="!text-gray-400 hover:!text-[#C4BAA6] transition-all duration-300 flex items-center no-underline text-sm group">
                                    <span className="!text-[#C4BAA6] w-5 inline-block group-hover:translate-x-1 transition-transform">›</span>
                                    <span>Sobre Nosotros</span>
                                </a>
                            </li>
                            <li>
                                <a href="#contacto" className="!text-gray-400 hover:!text-[#C4BAA6] transition-all duration-300 flex items-center no-underline text-sm group">
                                    <span className="!text-[#C4BAA6] w-5 inline-block group-hover:translate-x-1 transition-transform">›</span>
                                    <span>Contacto</span>
                                </a>
                            </li>
                            <li>
                                <a href="#faq" className="!text-gray-400 hover:!text-[#C4BAA6] transition-all duration-300 flex items-center no-underline text-sm group">
                                    <span className="!text-[#C4BAA6] w-5 inline-block group-hover:translate-x-1 transition-transform">›</span>
                                    <span>Preguntas Frecuentes</span>
                                </a>
                            </li>
                            <li>
                                <Link to="/terms" className="!text-gray-400 hover:!text-[#C4BAA6] transition-all duration-300 flex items-center no-underline text-sm group">
                                    <span className="!text-[#C4BAA6] w-5 inline-block group-hover:translate-x-1 transition-transform">›</span>
                                    <span>Términos y Condiciones</span>
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                    
                    {/* Contact Info */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="!text-[#C4BAA6] font-semibold text-base mb-6 font-['Playfair_Display']">Información de Contacto</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div 
                                className="flex items-start bg-[#1B201E]/30 rounded-xl p-4 hover:bg-[#1B201E]/50 transition-all duration-300"
                                whileHover={{ x: 5 }}
                            >
                                <div className="w-10 h-10 min-w-[2.5rem] rounded-lg bg-gradient-to-br from-[#C4BAA6]/20 to-[#C4BAA6]/10 flex items-center justify-center mr-3 flex-shrink-0">
                                    <FaMapMarkerAlt className="!text-[#C4BAA6] text-sm" />
                                </div>
                                <div>
                                    <p className="!text-gray-500 text-xs mb-1 font-medium">Ubicación</p>
                                    <p className="!text-gray-300 text-sm leading-relaxed">
                                        Cra 5 #14-37 local C130<br />
                                        Centro Comercial Punto 14<br />
                                        Cali, Colombia
                                    </p>
                                </div>
                            </motion.div>
                            
                            <motion.div 
                                className="flex items-start bg-[#1B201E]/30 rounded-xl p-4 hover:bg-[#1B201E]/50 transition-all duration-300"
                                whileHover={{ x: 5 }}
                            >
                                <div className="w-10 h-10 min-w-[2.5rem] rounded-lg bg-gradient-to-br from-[#C4BAA6]/20 to-[#C4BAA6]/10 flex items-center justify-center mr-3 flex-shrink-0">
                                    <FaPhone className="!text-[#C4BAA6] text-sm" />
                                </div>
                                <div>
                                    <p className="!text-gray-500 text-xs mb-1 font-medium">Teléfonos</p>
                                    <a href="https://wa.me/573227149786" className="!text-gray-300 hover:!text-[#C4BAA6] transition-colors text-sm block mb-1 no-underline">
                                        Jenny: +57 322 714 9786
                                    </a>
                                    <a href="https://wa.me/573224827352" className="!text-gray-300 hover:!text-[#C4BAA6] transition-colors text-sm block no-underline">
                                        Carolina: +57 322 482 7352
                                    </a>
                                </div>
                            </motion.div>
                            
                            <motion.div 
                                className="flex items-start bg-[#1B201E]/30 rounded-xl p-4 hover:bg-[#1B201E]/50 transition-all duration-300 md:col-span-2"
                                whileHover={{ x: 5 }}
                            >
                                <div className="w-10 h-10 min-w-[2.5rem] rounded-lg bg-gradient-to-br from-[#C4BAA6]/20 to-[#C4BAA6]/10 flex items-center justify-center mr-3 flex-shrink-0">
                                    <FaEnvelope className="!text-[#C4BAA6] text-sm" />
                                </div>
                                <div>
                                    <p className="!text-gray-500 text-xs mb-1 font-medium">Email</p>
                                    <a href="mailto:contacto@luricaaccesorios.com" className="!text-gray-300 hover:!text-[#C4BAA6] transition-colors text-sm no-underline">
                                        contacto@luricaaccesorios.com
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
                
                {/* Divider */}
                <div className="border-t border-[#C4BAA6]/10 my-10"></div>
                
                {/* Copyright */}
                <motion.div 
                    className="flex flex-col md:flex-row justify-between items-center gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <p className="!text-gray-400 text-sm text-center md:text-left">
                        &copy; {currentYear} Lurica Accesorios. Todos los derechos reservados.
                    </p>
                    <p className="!text-gray-400 text-sm text-center md:text-right">
                        Desarrollado con ❤️ por{' '}
                        <a 
                            href="https://sasukemc.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="!text-[#C4BAA6] hover:!text-[#d4c9b1] transition-colors font-medium no-underline"
                        >
                            Sasuke
                        </a>
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}