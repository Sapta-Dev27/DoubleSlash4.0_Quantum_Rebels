import api from './api';
import { User, UserRole } from '../types';

export const authService = {
  login: async (email: string, password: string, role: UserRole) => {
    const response = await api.post('/auth/login', { email, password, role });
    return response.data;
  },

  register: async (name: string, email: string, password: string, role: UserRole) => {
    const response = await api.post('/auth/register', { name, email, password, role });
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};
