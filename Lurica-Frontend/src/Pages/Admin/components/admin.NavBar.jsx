import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUsers, FaBox, FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaHome, FaGlobeAmericas } from "react-icons/fa";
import { useState, useMemo } from "react";
import { useAuthContext } from "../../../contexts/AuthContext.jsx";

export const AdminNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();

  const navItems = useMemo(() => [
    { path: "/", icon: FaGlobeAmericas, label: "Ir al Sitio" },
    { path: "/admin", icon: FaHome, label: "Inicio" },
    { path: "/admin/users", icon: FaUsers, label: "Usuarios" },
    { path: "/admin/products", icon: FaBox, label: "Productos" },
  ], []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex">
      {/* Botón móvil */}
      <button
        className="md:hidden fixed top-4 left-[35px] z-50 bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-800"
        onClick={() => setIsOpen(true)}
      >
        <FaBars size={24} />
      </button>
      
      {/* Navbar principal */}
      <div className={`fixed top-0 left-0 h-screen bg-gray-900 text-white shadow-lg transition-all duration-300 ease-in-out z-50 
          ${isOpen ? "w-64" : "w-[70px]"}
          md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Header */}
        <div className="p-[18px] flex items-center gap-4 border-b border-gray-700">
          <button
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <div className={`flex items-center gap-2 ${!isOpen && "hidden"}`}>
            <img src="/img/lurica-logo.webp" alt="Lurica" className="h-8 w-auto" />
            <span className="text-xl font-bold">Lurica</span>
          </div>
        </div>

        {/* Perfil */}
        <div className={`p-4 flex items-center gap-4 border-b border-gray-700 ${!isOpen && "justify-center"}`}>
          <FaUserCircle size={isOpen ? 32 : 24} />
          <div className={`flex flex-col ${!isOpen && "hidden"}`}>
            <strong>{user?.name} {user?.lastname} - {user?.username}</strong>
            <small>Administrador</small>
          </div>
        </div>

        {/* Nav */}
        <nav className="py-4">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center px-4 py-3 text-white hover:bg-gray-800 transition-colors no-underline
                ${!isOpen ? "justify-center" : "gap-4"}
                ${location.pathname === path ? "bg-gray-700" : ""}`}
            >
              <Icon size={20} className="text-white" />
              <span className={!isOpen ? "hidden" : ""}>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 flex flex-col items-center ${isOpen && "gap-1 text-xs text-gray-500 bg-gray-800/20"}`}>
          <button 
            onClick={handleLogout}
            className={`flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors 
              ${isOpen ? "mb-2 w-full justify-center" : "p-2"}`}
            title="Cerrar Sesión"
          >
            <FaSignOutAlt size={isOpen ? 16 : 20} />
            <span className={!isOpen ? "hidden" : ""}>Cerrar Sesión</span>
          </button>
          <div className={!isOpen ? "hidden" : ""}>
            <small>© {new Date().getFullYear()} Lurica </small>
            <small>v1.0.0</small>
          </div>
        </div>
      </div>
    </div>
  );
};