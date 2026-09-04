import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminNavBar } from "./components/admin.NavBar.jsx";
import { FaUsers, FaBox, FaTshirt, FaBoxes, FaWarehouse } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { StatsCard } from "./components/StatsCard.jsx";
import { authService, productService } from "../../services/auth.service.js";
import { useState } from "react";

export default function AdminPage() {
  const { user, isAuthenticated, loading } = useAuthContext();
  const [usersCount, setUsersCount] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users info
        const usersResponse = await authService.getUsersInfo();
        setUsersCount(usersResponse.users.length);

        // Fetch products count
        const productsCountResponse = await productService.getProductCount();
        setTotalProducts(productsCountResponse.totalProducts);

        // Fetch total stock
        const stockResponse = await productService.getTotalStock();
        setTotalStock(stockResponse.totalStock);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const stats = [
    { 
      title: "Total Administradores", 
      value: usersCount, 
      icon: FaUsers, 
      bgColor: "bg-blue-600" 
    },
    { 
      title: "Total Productos", 
      value: totalProducts, 
      icon: FaBox, 
      bgColor: "bg-green-600" 
    },
    { 
      title: "Stock Total", 
      value: totalStock, 
      icon: FaWarehouse, 
      bgColor: "bg-purple-600" 
    },
    { 
      title: "Productos Activos", 
      value: totalProducts, 
      icon: FaBoxes, 
      bgColor: "bg-orange-600" 
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNavBar />
      
      <main className="flex-1 md:ml-[70px] p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Panel de Administración</h1>
          <p className="text-gray-600 mt-1">
            Bienvenido de nuevo, {user?.name}. Aquí tienes un resumen general.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              bgColor={stat.bgColor}
            />
          ))}
        </div>

        {/* Quick Access */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            to="/admin/users" 
            className="p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaUsers size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Gestión de Usuarios</h3>
                <p className="text-sm text-gray-600 mt-1">Administra todos los usuarios administradores</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/admin/products" 
            className="p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FaBox size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Gestión de Productos</h3>
                <p className="text-sm text-gray-600 mt-1">Administra el catálogo de productos</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}