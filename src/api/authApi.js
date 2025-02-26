import axios from './axiosInstance';

export const register = async (name, email, password) => {
  const response = await axios.post('api/v1/auth/register', { name, email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post('api/v1/auth/login', { email, password });
  return response.data;
};

export const refreshToken = async (refreshToken) => {
  const response = await axios.post('api/v1/auth/refresh', { refreshToken });
  return response.data;
};