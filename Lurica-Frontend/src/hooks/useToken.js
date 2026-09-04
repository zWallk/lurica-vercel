import Cookies from 'js-cookie';

export const useToken = () => {
  const setToken = (token) => {
    Cookies.set('auth_token', token);
  };

  const getToken = () => {
    return Cookies.get('auth_token');
  };

  const removeToken = () => {
    Cookies.remove('auth_token');
  };

  return { setToken, getToken, removeToken };
};