import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import '../styles/AboutUs.css';

export default function AboutUs() {
    return (
        <section id="nosotros" className="relative overflow-hidden bg-[#1B201E] aboutus-section">
            {/* Decoraciones de fondo */}
            <div className="aboutus-bg-decoration aboutus-bg-decoration-1"></div>
            <div className="aboutus-bg-decoration aboutus-bg-decoration-2"></div>
            
            <div className="container mx-auto">
                {/* Primer bloque: imagen a la derecha (en desktop) */}
                <div className="flex flex-col lg:flex-row items-center aboutus-block">
                    {/* Contenido de texto */}
                    <motion.div 
                        className="w-full lg:w-1/2 px-5 lg:px-12 py-10 lg:py-16"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <h2 className="text-3xl lg:text-5xl font-['Playfair_Display'] !text-[#C4BAA6] aboutus-title">
                            Nuestra Historia en Lurica Accesorios
                        </h2>
                        <div className="aboutus-text-content text-gray-300 text-base lg:text-lg font-light">
                            <p>
                                Desde abril de 2024, Lurica Accesorios ha venido creciendo como una marca confiable y dinámica en la venta de bisutería y accesorios al por mayor y al por menor en Colombia y el extranjero.
                            </p>
                            <p>
                                Ubicados en Cali, nos destacamos como importadores directos, lo que nos permite ofrecer productos modernos, variados y de excelente calidad a precios bajos que marcan la diferencia.
                            </p>
                            <p>
                                Trabajamos de la mano con emprendedores, locales comerciales, empresas y clientes individuales, brindando un catálogo constantemente actualizado que responde a las últimas tendencias del mercado.
                            </p>
                            <p>
                                En Lurica Accesorios creemos que cada cliente es único, por eso ofrecemos un servicio personalizado, envíos nacionales e internacionales y una atención cercana que nos ha convertido en el aliado ideal para hacer crecer negocios y complementar estilos.
                            </p>
                        </div>
                    </motion.div>

                    {/* Imagen */}
                    <motion.div 
                        className="w-4/5 mx-auto lg:w-1/3 h-[400px] lg:h-[600px] lg:ml-16 lg:mb-0 mt-8 lg:mt-0"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <div className="aboutus-image-container h-full">
                            <img 
                                src="/img/lurica-img-aboutus.webp" 
                                alt="Sobre Lurica Accesorios" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
                
                {/* Segundo bloque: imagen a la izquierda (en desktop) */}
                <div className="flex flex-col lg:flex-row-reverse items-center aboutus-block">
                    {/* Contenido de texto */}
                    <motion.div 
                        className="w-full lg:w-1/2 px-5 lg:px-12 py-10 lg:py-16"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <h2 className="text-3xl lg:text-5xl font-['Playfair_Display'] !text-[#C4BAA6] aboutus-title">
                            Compras al por Mayor
                        </h2>
                        <div className="aboutus-text-content text-gray-300 text-base lg:text-lg font-light">
                            <p>
                                Si estás buscando adquirir productos en grandes cantidades, tenemos descuentos especiales diseñados específicamente para distribuidores y comerciantes.
                            </p>
                            <p>
                                Ofrecemos condiciones flexibles que se adaptan a las necesidades de tu negocio, con precios competitivos que varían según el volumen de compra y frecuencia de pedidos.
                            </p>
                            <p>
                                Contáctanos para discutir la mejor oferta para tu negocio. Nuestro equipo está listo para asesorarte y convertirse en el aliado ideal para el crecimiento de tu emprendimiento.
                            </p>
                            
                            <motion.div 
                                className="pt-8"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <motion.a
                                    href="https://wa.me/573227149786"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 aboutus-whatsapp-button px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 group !text-[#1B201E]"
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FaWhatsapp className="text-2xl" />
                                    <span className="tracking-wide">Consultar precios mayoristas</span>
                                </motion.a>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Imagen */}
                    <motion.div 
                        className="w-4/5 mx-auto lg:w-1/3 h-[400px] lg:h-[600px] lg:mr-16 lg:mb-0 mt-8 lg:mt-0"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <div className="aboutus-image-container h-full">
                            <img 
                                src="/img/lurica-img-aboutus-2.webp" 
                                alt="Compras al por mayor" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}