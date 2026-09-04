import { createContext, useState, useContext, useEffect } from "react";
import { useToken } from "../hooks/useToken.js";
import { useLogin } from "../hooks/useLogin.js"; // Importar useLogin
import { authService } from "../services/auth.service.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { getToken, removeToken } = useToken();
  const { login: loginHook } = useLogin(); // Usar el hook
    
  const verifyAuth = async () => {
    try {
      const token = getToken();
      if (!token) {
        setLoading(false);
        setIsAuthenticated(false);
        return false;
      }

      const response = await authService.verifyToken();

      if (response.status === 200) {
        setUser(response.user);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      removeToken();
      setUser(null);
      setIsAuthenticated(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    const success = await loginHook(username, password);
    if (success) {
      await verifyAuth();
    }
    return success;
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  const value = {
    user,
    setUser,
    isAuthenticated,
    loading,
    verifyAuth,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;