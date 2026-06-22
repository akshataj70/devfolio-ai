import { create } from 'zustand';
import { api } from '../services/api';

export const useAuthStore = create((set) => ({
  isLoggedIn: !!localStorage.getItem('token'),
  user: null,
  loading: false,
  error: null,
  isCheckingAuth: !!localStorage.getItem('token'),

  register: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await api.post('/auth/register', { email, password });
      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        set({ isLoggedIn: true, user: data.user, loading: false, isCheckingAuth: false });
        return data;
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (err) {
      set({ error: err.message, loading: false, isCheckingAuth: false });
      throw err;
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await api.post('/auth/login', { email, password });
      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        set({ isLoggedIn: true, user: data.user, loading: false, isCheckingAuth: false });
        return data;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (err) {
      set({ error: err.message, loading: false, isCheckingAuth: false });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ isLoggedIn: false, user: null, error: null, isCheckingAuth: false });
  },

  fetchMe: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isLoggedIn: false, user: null, isCheckingAuth: false });
      return null;
    }
    
    try {
      const data = await api.get('/auth/me');
      if (data.success) {
        set({ isLoggedIn: true, user: data.user, isCheckingAuth: false });
        return data.user;
      } else {
        throw new Error('Failed to fetch profile');
      }
    } catch (err) {
      localStorage.removeItem('token');
      set({ isLoggedIn: false, user: null, isCheckingAuth: false });
      return null;
    }
  },
  
  clearError: () => set({ error: null })
}));

