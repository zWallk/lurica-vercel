import Cookies from "js-cookie";
import axiosInstance from "../utils/axios.config.js";

export const authService = {
  // Las rutas públicas se mantienen igual
  login: async (username, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Error en auth.service:", error);
      throw error.response?.data || error;
    }
  },

  verifyToken: async () => {
    try {
      const token = Cookies.get("auth_token");
      if (!token) throw new Error("No token found");

      const response = await axiosInstance.post(
        "/auth/token",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error verificando token:", error);
      throw error;
    }
  },

  // Las rutas protegidas necesitan el token
  getUsersInfo: async () => {
    try {
      const token = Cookies.get("auth_token");
      const response = await axiosInstance.get("/userinfo/getall", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error en auth.service:", error);
      throw error.response?.data || error;
    }
  },

  updateUser: async (id, data) => {
    try {
      const token = Cookies.get("auth_token");
      const response = await axiosInstance.patch(
        `/auth/update-user/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      throw error.response?.data || error;
    }
  },

  createUser: async (userData) => {
      try {
        const token = Cookies.get("auth_token");
        if (!token) throw new Error("No token found");
  
        console.log('Datos enviados:', userData); // Debug
  
        const response = await axiosInstance.post("/auth/register", userData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        console.log('Respuesta del servidor:', response); // Debug
        
        if (!response.data) {
          throw new Error('No se recibió respuesta del servidor');
        }
  
        return response.data;
      } catch (error) {
        console.error("Error completo:", error.response?.data || error);
        throw error.response?.data || error;
      }
  },

  deleteUser: async (id) => {
    try {
      const token = Cookies.get("auth_token");
      const response = await axiosInstance.delete(`/auth/delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      throw error.response?.data || error;
    }
  },
};

export const productService = {
  getProducts: async () => {
    try {
      const response = await axiosInstance.get("/products/getall");
      return response.data;
    } catch (error) {
      console.error("Error obteniendo productos:", error);
      throw error.response?.data || error;
    }
  },

  createProduct: async (productData) => {
    try {
      const token = Cookies.get("auth_token");
      const response = await axiosInstance.post(
        "/products/create",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creando producto:", error);
      throw error.response?.data || error;
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const token = Cookies.get("auth_token");
      const response = await axiosInstance.patch(
        `/products/update/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error actualizando producto:", error);
      throw error.response?.data || error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const token = Cookies.get("auth_token");
      const response = await axiosInstance.delete(`/products/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error eliminando producto:", error);
      throw error.response?.data || error;
    }
  },

  getProductCount: async () => {
    try {
      const response = await axiosInstance.get("/products/getall");
      return {
        status: 200,
        totalProducts: response.data.products.length,
        message: "Total de productos obtenido correctamente",
      };
    } catch (error) {
      console.error("Error obteniendo cantidad de productos:", error);
      throw error.response?.data || error;
    }
  },

  getTotalStock: async () => {
    try {
      const response = await axiosInstance.get("/products/getall");
      const totalStock = response.data.products.reduce(
        (sum, product) => sum + product.stock,
        0
      );
      return {
        status: 200,
        totalStock,
        message: "Stock total obtenido correctamente",
      };
    } catch (error) {
      console.error("Error obteniendo stock total:", error);
      throw error.response?.data || error;
    }
  },
};
