import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';
import { IoAddCircleOutline } from 'react-icons/io5';
import '../styles/Faq.css';

export default function Faq() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [visibleItems, setVisibleItems] = useState(6); // Inicialmente mostrar 6 elementos
    
    const toggleQuestion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const loadMoreItems = () => {
        // Incrementar en 6 más cada vez que se hace clic en "Ver más"
        setVisibleItems(prevVisible => Math.min(prevVisible + 6, faqItems.length));
    };

    const faqItems = [
        {
            question: "¿Cómo realizar un pedido mayorista?",
            answer: "Para realizar un pedido mayorista, por favor escribe al número de WhatsApp: +57 322 714 9786."
        },
        {
            question: "¿Cuál es el pedido mínimo para compras al por mayor?",
            answer: "El pedido mínimo para compras al por mayor es de $150.000 COP en adelante."
        },
        {
            question: "¿Ofrecen envíos a todo Colombia?",
            answer: "Sí, realizamos envíos a todo el territorio colombiano. El tiempo de entrega varía según la ubicación, generalmente entre 2-5 días hábiles dependiendo de la ciudad de destino."
        },
        {
            question: "¿Qué métodos de pago aceptan?",
            answer: "Aceptamos todos los métodos de pago disponibles. También ofrecemos la opción de envío contra entrega."
        },
        {
            question: "¿Tienen garantía en sus productos?",
            answer: "Sí, nuestros productos cuentan con garantía."
        },
        {
            question: "¿Puedo personalizar los pedidos para mi tienda?",
            answer: "Sí, ofrecemos la posibilidad de personalizar los pedidos para tu tienda."
        },
        {
            question: "¿Cuánto tiempo tarda el envío de un pedido mayorista?",
            answer: "El tiempo de envío para un pedido mayorista puede variar entre 2 y 5 días hábiles, dependiendo de la ubicación de destino."
        },
        {
            question: "¿Ofrecen descuentos por volumen o por fidelidad?",
            answer: "Sí, contamos con descuentos especiales por volumen de compra y para clientes frecuentes."
        },
        {
            question: "¿Cuáles son los costos de envío para pedidos al por mayor?",
            answer: "Los costos de envío para pedidos al por mayor varían según el peso total de los accesorios y el tamaño del paquete. Un precio estimado oscila entre $16.000 COP y $40.000 COP."
        },
        {
            question: "¿Puedo modificar o cancelar un pedido mayorista después de realizarlo?",
            answer: "Sí, puedes modificar o cancelar tu pedido mayorista siempre y cuando no haya sido enviado aún."
        },
        {
            question: "¿Puedo solicitar facturación a nombre de mi empresa o tienda?",
            answer: "Sí, podemos emitir facturas a nombre de tu empresa o tienda."
        },
        {
            question: "¿Tienen líneas exclusivas para mayoristas o distribuidores oficiales?",
            answer: "Sí, contamos con líneas de atención exclusivas para mayoristas y distribuidores oficiales."
        },
        {
            question: "¿Puedo elegir los productos por referencia o por colecciones?",
            answer: "Sí, puedes seleccionar los productos tanto por referencia individual como por colecciones completas."
        },
        {
            question: "¿Qué sucede si un producto llega dañado o con defectos?",
            answer: "En caso de que un producto llegue dañado o con defectos, realizaremos el reemplazo del producto o el reembolso del dinero."
        },
        {
            question: "¿Hay una cantidad mínima por referencia o puedo hacer un mix variado?",
            answer: "Sí, puedes realizar un mix variado de productos sin una cantidad mínima obligatoria por referencia."
        },
        {
            question: "¿Puedo revender sus productos bajo mi propia marca?",
            answer: "Sí, te permitimos revender nuestros productos bajo tu propia marca."
        },
        {
            question: "¿Cómo puedo registrarme como cliente mayorista en Lurica Accesorios?",
            answer: "Puedes registrarte como cliente mayorista a través de nuestras líneas de atención exclusivas para mayoristas."
        },
        {
            question: "¿Cuál es la vida útil promedio de sus accesorios?",
            answer: "La vida útil promedio de nuestros accesorios es de 6 meses a 1 año, manteniendo los cuidados correctos que explicamos en nuestras redes sociales."
        },
        {
            question: "¿Los productos tienen baño en oro, plata u otros materiales premium?",
            answer: "Sí, nuestros productos cuentan con baño en oro, plata y otros materiales premium."
        },
        {
            question: "¿Cuántas veces al año lanzan nuevas colecciones?",
            answer: "Recibimos nuevas referencias cada mes, manteniendo nuestra oferta actualizada."
        },
        {
            question: "¿Cuál es el margen de ganancia sugerido para revendedores?",
            answer: "El margen de ganancia sugerido para revendedores es del 50%."
        },
        {
            question: "¿Tienen canales exclusivos de atención o comunidad para distribuidores?",
            answer: "Sí, contamos con canales de atención exclusivos y una comunidad para nuestros distribuidores."
        }
    ];

    // Determinar si se debe mostrar el botón "Ver más"
    const showLoadMoreButton = visibleItems < faqItems.length;

    return (
        <section id="faq" className="bg-[#232928] py-16 overflow-hidden relative">
            {/* Decoración de fondo sutil */}
            <div className="absolute top-10 right-0 w-64 h-64 bg-[#C4BAA6]/3 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-10 left-0 w-64 h-64 bg-[#C4BAA6]/3 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] !text-[#C4BAA6] mb-3 relative inline-block pb-3 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-[2px] after:bg-[#C4BAA6]">
                        Preguntas Frecuentes
                    </h2>
                    <p className="text-gray-400 text-base max-w-2xl mx-auto mt-4">
                        Resolvemos tus dudas sobre nuestros productos y servicios mayoristas
                    </p>
                </motion.div>
    
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-6xl mx-auto">
                    {faqItems.slice(0, visibleItems).map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.03 }}
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <motion.div
                                className={`bg-gradient-to-br from-[#1B201E] to-[#232928] rounded-xl overflow-hidden cursor-pointer backdrop-blur-sm
                                        ${activeIndex === index ? 'ring-1 ring-[#C4BAA6]/40 shadow-xl shadow-[#C4BAA6]/10' : ''} 
                                        transition-all duration-300 h-full hover:shadow-xl hover:shadow-black/30`}
                                whileHover={{ 
                                    scale: 1.01,
                                    y: -2
                                }}
                            >
                                <motion.div
                                    className="flex items-center justify-between py-4 px-5"
                                    onClick={() => toggleQuestion(index)}
                                >
                                    <h3 className="text-sm md:text-base font-semibold !text-[#C4BAA6] pr-3 leading-snug">
                                        {item.question}
                                    </h3>
                                    <motion.div
                                        animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-shrink-0"
                                    >
                                        <IoIosArrowDown className="text-[#C4BAA6] text-xl" />
                                    </motion.div>
                                </motion.div>
    
                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <motion.div 
                                                className="px-5 pb-4 pt-2 text-gray-300 text-sm leading-relaxed border-t border-[#C4BAA6]/20 bg-black/20"
                                                initial={{ y: -5, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ duration: 0.3, delay: 0.1 }}
                                            >
                                                {item.answer}
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
                
                {/* Botón "Ver más" */}
                {showLoadMoreButton && (
                    <motion.div
                        className="text-center mt-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.button
                            onClick={loadMoreItems}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#C4BAA6] to-[#d4c9b1] !text-[#1B201E] rounded-lg text-sm font-bold shadow-lg shadow-[#C4BAA6]/20 hover:shadow-xl hover:shadow-[#C4BAA6]/30 hover:scale-105 transition-all duration-300 rounded"
                            whileTap={{ scale: 0.95 }}
                        >
                            <IoAddCircleOutline className="text-xl" />
                            Ver más preguntas ({visibleItems}/{faqItems.length})
                        </motion.button>
                    </motion.div>
                )}
                
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <p className="!text-gray-300 text-base mb-4 font-medium">
                        ¿No encuentras respuesta a tu pregunta?
                    </p>
                    <motion.a
                        href="https://wa.me/573227149786" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2.5 bg-[#C4BAA6] !text-[#1B201E] rounded-lg text-sm font-semibold hover:bg-[#d4c9b1] transition-all duration-300 no-underline"
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Contáctanos por WhatsApp
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}