import axios from 'axios';
import { User } from '../types/user'; // Asumimos una definición de tipo para User

const apiClient = axios.create({
  baseURL: '/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface LoginResponse {
  user: User;
  token: string;
}

export const login = async (credentials: any): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error.response?.data?.error || 'Error en el servidor';
  }
};

export const register = async (userData: any): Promise<User> => {
  try {
    const response = await apiClient.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error.response?.data?.error || 'Error en el servidor';
  }
};
