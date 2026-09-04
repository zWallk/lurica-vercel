import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaSpinner, FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import { IoMailOutline, IoLocationOutline, IoSendSharp, IoCheckmarkCircle } from 'react-icons/io5';
import '../styles/Faq.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    
    const [focus, setFocus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulamos el envío del formulario con un timeout
        try {
            // Aquí iría la lógica real para enviar el formulario
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            console.log('Formulario enviado:', formData);
            setFormData({ name: '', email: '', phone: '', message: '' });
            setShowNotification(true);
            
            // Ocultar la notificación después de 5 segundos
            setTimeout(() => {
                setShowNotification(false);
            }, 5000);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contacto" className="bg-[#1B201E] py-20 overflow-hidden">
            <div className="container mx-auto px-4 relative">
                {/* Notificación de éxito */}
                <AnimatePresence>
                    {showNotification && (
                        <motion.div 
                            className="fixed top-5 right-5 z-[99999999] bg-[#2C3530] border-l-4 border-[#C4BAA6] text-white px-6 py-4 shadow-xl rounded-r-lg max-w-mz"
                            initial={{ opacity: 0, y: -50, x: 20 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <div className="flex items-center">
                                <IoCheckmarkCircle className="text-[#C4BAA6] text-2xl mr-3" />
                                <div>
                                    <h3 className="font-medium text-lg text-[#C4BAA6]">¡Mensaje enviado!</h3>
                                    <p className="text-gray-300 text-sm">Nos pondremos en contacto contigo lo antes posible.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] !text-[#C4BAA6] mb-4 relative inline-block pb-3 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-[2px] after:bg-[#C4BAA6]">
                        Contáctanos
                    </h2>
                    <p className="!text-gray-300 text-lg max-w-3xl mx-auto mt-6">
                        Estamos listos para atender tu negocio y convertirte en nuestro próximo distribuidor
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
                    {/* Columna de información de contacto */}
                    <motion.div 
                        className="lg:w-2/5"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-gradient-to-br from-[#232928] to-[#1B201E] rounded-2xl shadow-2xl p-8 h-full">
                            <h3 className="text-2xl font-semibold !text-[#C4BAA6] mb-6 font-['Playfair_Display']">
                                Información de Contacto
                            </h3>
                            <p className="!text-gray-300 mb-8 leading-relaxed">
                                Completa el formulario y nos pondremos en contacto contigo lo antes posible para resolver todas tus dudas.
                            </p>
                            
                            <div className="space-y-5">
                                <motion.div 
                                    className="flex items-center bg-[#1B201E]/50 rounded-xl p-4 hover:bg-[#1B201E]/80 transition-all duration-300"
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="w-12 h-12 min-w-[3rem] min-h-[3rem] rounded-xl bg-gradient-to-br from-[#C4BAA6]/20 to-[#C4BAA6]/10 flex items-center justify-center mr-4 flex-shrink-0">
                                        <FaWhatsapp className="text-[#C4BAA6] text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-xs !text-gray-400 mb-1 font-medium">WhatsApp</p>
                                        <a href="https://wa.me/573227149786" className="!text-gray-200 hover:!text-[#C4BAA6] transition-colors font-medium">
                                            +57 322 714 9786
                                        </a>
                                    </div>
                                </motion.div>
                                
                                <motion.div 
                                    className="flex items-center bg-[#1B201E]/50 rounded-xl p-4 hover:bg-[#1B201E]/80 transition-all duration-300"
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="w-12 h-12 min-w-[3rem] min-h-[3rem] rounded-xl bg-gradient-to-br from-[#C4BAA6]/20 to-[#C4BAA6]/10 flex items-center justify-center mr-4 flex-shrink-0">
                                        <IoMailOutline className="text-[#C4BAA6] text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-xs !text-gray-400 mb-1 font-medium">Email</p>
                                        <a href="mailto:contacto@luricaaccesorios.com" className="!text-gray-200 hover:!text-[#C4BAA6] transition-colors font-medium break-all">
                                            contacto@luricaaccesorios.com
                                        </a>
                                    </div>
                                </motion.div>
                                
                                <motion.div 
                                    className="flex items-center bg-[#1B201E]/50 rounded-xl p-4 hover:bg-[#1B201E]/80 transition-all duration-300"
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="w-12 h-12 min-w-[3rem] min-h-[3rem] rounded-xl bg-gradient-to-br from-[#C4BAA6]/20 to-[#C4BAA6]/10 flex items-center justify-center mr-4 flex-shrink-0">
                                        <IoLocationOutline className="text-[#C4BAA6] text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-xs !text-gray-400 mb-1 font-medium">Ubicación</p>
                                        <p className="!text-gray-200 font-medium text-sm leading-relaxed">
                                            Cra 5 #14-37 local C130 centro comercial punto 14<br />
                                            Cali, Colombia
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                            
                            <div className="mt-10 pt-8 border-t border-[#C4BAA6]/20">
                                <p className="!text-gray-300 text-sm mb-5 font-medium">Síguenos en redes sociales</p>
                                <div className="flex gap-3">
                                    <motion.a 
                                        href="https://www.instagram.com/luricaaccesorios" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C4BAA6]/20 to-[#C4BAA6]/10 flex items-center justify-center hover:from-[#C4BAA6] hover:to-[#d4c9b1] transition-all duration-300 group"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FaInstagram className="text-[#C4BAA6] group-hover:!text-[#1B201E] text-xl transition-colors" />
                                    </motion.a>
                                    <motion.a 
                                        href="https://www.facebook.com/profile.php?id=61572444310924" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C4BAA6]/20 to-[#C4BAA6]/10 flex items-center justify-center hover:from-[#C4BAA6] hover:to-[#d4c9b1] transition-all duration-300 group"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FaFacebookF className="text-[#C4BAA6] group-hover:!text-[#1B201E] text-xl transition-colors" />
                                    </motion.a>
                                    <motion.a 
                                        href="https://www.tiktok.com/@lurica.accesorios" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C4BAA6]/20 to-[#C4BAA6]/10 flex items-center justify-center hover:from-[#C4BAA6] hover:to-[#d4c9b1] transition-all duration-300 group"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FaTiktok className="text-[#C4BAA6] group-hover:!text-[#1B201E] text-xl transition-colors" />
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Formulario de contacto */}
                    <motion.div 
                        className="lg:w-3/5"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <form 
                            onSubmit={handleSubmit}
                            className="bg-gradient-to-br from-[#232928] to-[#1B201E] rounded-2xl shadow-2xl p-8 relative"
                        >
                            {/* Overlay de carga durante envío */}
                            <AnimatePresence>
                                {isSubmitting && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 bg-[#1B201E]/80 flex flex-col items-center justify-center z-10 rounded-lg backdrop-blur-sm"
                                    >
                                        <motion.div 
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="text-[#C4BAA6] text-3xl mb-3"
                                        >
                                            <FaSpinner />
                                        </motion.div>
                                        <p className="text-[#C4BAA6]">Enviando mensaje...</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label 
                                        htmlFor="name" 
                                        className={`block text-sm font-medium mb-2 transition-colors ${focus === 'name' ? '!text-[#C4BAA6]' : '!text-gray-300'}`}
                                    >
                                        Nombre completo
                                    </label>
                                    <div className={`relative transition-all duration-300 rounded-lg ${focus === 'name' ? 'ring-2 ring-[#C4BAA6]/50' : ''}`}>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onFocus={() => setFocus('name')}
                                            onBlur={() => setFocus(null)}
                                            className="w-full bg-[#1B201E] !text-gray-200 border-0 rounded-lg py-3 px-4 focus:outline-none transition-colors"
                                            placeholder="Tu nombre"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label 
                                        htmlFor="email" 
                                        className={`block text-sm font-medium mb-2 transition-colors ${focus === 'email' ? '!text-[#C4BAA6]' : '!text-gray-300'}`}
                                    >
                                        Correo electrónico
                                    </label>
                                    <div className={`relative transition-all duration-300 rounded-lg ${focus === 'email' ? 'ring-2 ring-[#C4BAA6]/50' : ''}`}>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={() => setFocus('email')}
                                            onBlur={() => setFocus(null)}
                                            className="w-full bg-[#1B201E] !text-gray-200 border-0 rounded-lg py-3 px-4 focus:outline-none transition-colors"
                                            placeholder="tucorreo@ejemplo.com"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <label 
                                    htmlFor="phone" 
                                    className={`block text-sm font-medium mb-2 transition-colors ${focus === 'phone' ? '!text-[#C4BAA6]' : '!text-gray-300'}`}
                                >
                                    Número de teléfono (opcional)
                                </label>
                                <div className={`relative transition-all duration-300 rounded-lg ${focus === 'phone' ? 'ring-2 ring-[#C4BAA6]/50' : ''}`}>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        onFocus={() => setFocus('phone')}
                                        onBlur={() => setFocus(null)}
                                        className="w-full bg-[#1B201E] !text-gray-200 border-0 rounded-lg py-3 px-4 focus:outline-none transition-colors"
                                        placeholder="+57 300 123 4567"
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <label 
                                    htmlFor="message" 
                                    className={`block text-sm font-medium mb-2 transition-colors ${focus === 'message' ? '!text-[#C4BAA6]' : '!text-gray-300'}`}
                                >
                                    Mensaje
                                </label>
                                <div className={`relative transition-all duration-300 rounded-lg ${focus === 'message' ? 'ring-2 ring-[#C4BAA6]/50' : ''}`}>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => setFocus('message')}
                                        onBlur={() => setFocus(null)}
                                        rows="5"
                                        className="w-full bg-[#1B201E] !text-gray-200 border-0 rounded-lg py-3 px-4 focus:outline-none transition-colors resize-none"
                                        placeholder="Cuéntanos más sobre tu negocio o tus dudas..."
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            
                            <motion.button
                                type="submit"
                                className="w-full flex items-center justify-center bg-gradient-to-r from-[#C4BAA6] to-[#d4c9b1] !text-[#1B201E] py-3.5 px-6 rounded-lg font-bold text-base shadow-lg shadow-[#C4BAA6]/20 hover:shadow-xl hover:shadow-[#C4BAA6]/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed rounded"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting}
                            >
                                <IoSendSharp className="mr-2 text-lg" />
                                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}