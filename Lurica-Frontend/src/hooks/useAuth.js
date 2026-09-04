import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from './useToken.js';
import { authService } from '../services/auth.service.js';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getToken, removeToken } = useToken();
  const navigate = useNavigate();

  const verifyAuth = async () => {
    try {
      const token = getToken();
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return false;
      }

      const response = await authService.verifyToken();
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.user);
        setLoading(false);
        return true;
      }
    } catch (error) {
      removeToken();
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
    return false;
  };

  return { 
    isAuthenticated, 
    setIsAuthenticated, // Exportando la función
    user, 
    loading, 
    verifyAuth 
  };
};