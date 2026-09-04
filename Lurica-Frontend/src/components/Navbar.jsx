import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Navbar.css";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrollingUp = prevScrollPos > currentScrollPos;
      const isScrolling = currentScrollPos > 50;
      
      setIsScrolled(isScrolling);
      
      // Si estamos en el tope de la página, siempre mostramos el navbar
      if (currentScrollPos <= 50) {
        setIsVisible(true);
      } 
      // Si estamos scrolleando hacia arriba o hacia abajo
      else {
        setIsVisible(scrollingUp);
      }
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const navItems = [
    { name: "Inicio", href: "#inicio" },
    { name: "Sobre Nosotros", href: "#nosotros" },
    { name: "Productos", href: "#productos" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <motion.nav
        className={`navbar navbar-expand-lg fixed-top ${
          isScrolled ? "navbar-scrolled" : ""
        }`}
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      >
            <div className="container">
              {/* Logo */}
              <motion.a 
                className="navbar-brand" 
                href="#inicio"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <img src="/img/lurica-logo.webp" alt="Logo" height="40" />
              </motion.a>

              {/* Botón de menú móvil */}
              <motion.button
                className="navbar-toggler-custom d-lg-none"
                onClick={() => setIsSidebarOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiMenu className="text-2xl" />
              </motion.button>

              {/* Menú desktop */}
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mx-auto">
                  {navItems.map((item, index) => (
                    <motion.li 
                      key={item.name} 
                      className="nav-item"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                      <a className="nav-link text-dark" href={item.href}>
                        {item.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
                
                {/* Botón de Contacto - Estilo Header */}
                <motion.a
                  href="#contacto"
                  className="contact-cta-button"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="contact-cta-text">Contacto</span>
                  <span className="contact-cta-icon">→</span>
                </motion.a>
              </div>
            </div>
          </motion.nav>

      {/* Menú lateral móvil */}
      <div className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`} 
           onClick={() => setIsSidebarOpen(false)}>
      </div>

      <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <img src="/img/lurica-logo.webp" alt="Logo" />
          <motion.button
            className="close-button"
            onClick={() => setIsSidebarOpen(false)}
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <HiX />
          </motion.button>
        </div>

        <ul className="sidebar-nav">
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isSidebarOpen ? 1 : 0, x: isSidebarOpen ? 0 : -20 }}
              transition={index * 0.1}
            >
              <a href={item.href} onClick={() => setIsSidebarOpen(false)}>
                {item.name}
              </a>
            </motion.li>
          ))}
          
          {/* Botón de Contacto en móvil */}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isSidebarOpen ? 1 : 0, x: isSidebarOpen ? 0 : -20 }}
            transition={navItems.length * 0.1}
            className="mt-4"
          >
            <a 
              href="#contacto" 
              onClick={() => setIsSidebarOpen(false)}
              className="sidebar-contact-button"
            >
              Contacto →
            </a>
          </motion.li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;