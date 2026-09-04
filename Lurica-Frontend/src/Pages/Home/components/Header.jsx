import '../styles/Header.css';
import { motion } from 'framer-motion';

export default function Header() {
    return (
        <header className="relative h-screen w-full overflow-hidden header-section" id='inicio'>
            {/* Imagen de fondo con overlay mejorado */}
            <motion.div 
                className="absolute inset-0"
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <div className="header-bg-image">
                    <img 
                        src="/img/lurica-bg-header.webp" 
                        alt="Lurica Accesorios Background" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="header-overlay"></div>
                
                {/* Elementos decorativos */}
                <div className="header-decoration header-decoration-1"></div>
                <div className="header-decoration header-decoration-2"></div>
            </motion.div>

            {/* Contenido del header */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 header-content">
                {/* Línea decorativa superior */}
                <motion.div
                    className="header-line-decoration"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "120px", opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                />
                
                {/* Subtítulo */}
                <motion.p 
                    className="font-['Montserrat'] text-[#C4BAA6] text-base md:text-lg lg:text-xl mb-6 font-light tracking-[0.3em] uppercase header-subtitle"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    Lurica Accesorios
                </motion.p>
                
                {/* Título principal */}
                <motion.h1 
                    className="giant-text font-['Playfair_Display'] text-[#C4BAA6] mb-8 font-normal tracking-wide leading-[1.1] header-h1"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    ¡Brillamos <br className="hidden md:block"/> contigo en <br className="hidden md:block"/>cada detalle!
                </motion.h1>
                
                {/* Línea decorativa inferior */}
                <motion.div
                    className="header-line-decoration mb-12"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "120px", opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                />
                
                {/* Botón CTA mejorado */}
                <a href="#contacto">
                    <motion.button 
                        className="header-cta-button"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        whileHover={{ y: -5, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <span className="header-cta-text">Quiero saber más</span>
                        <span className="header-cta-icon">→</span>
                    </motion.button>
                </a>
                
                {/* Indicador de scroll */}
                <motion.div
                    className="header-scroll-indicator"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        duration: 0.8, 
                        delay: 1.2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 0.5
                    }}
                >
                    <div className="scroll-mouse">
                        <div className="scroll-wheel"></div>
                    </div>
                </motion.div>
            </div>
        </header>
    )
}