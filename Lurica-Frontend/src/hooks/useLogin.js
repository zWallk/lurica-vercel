import { useToken } from './useToken.js';
import { authService } from '../services/auth.service.js';

export const useLogin = () => {
  const { setToken } = useToken();

  const login = async (username, password) => {
    try {
      const response = await authService.login(username, password);
      
      if (response.status === 200 && response.token) {
        setToken(response.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };

  return { login };
};