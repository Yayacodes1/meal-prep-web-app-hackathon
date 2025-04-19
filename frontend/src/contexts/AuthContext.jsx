import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);

  // Setup axios interceptors
  useEffect(() => {
    const interceptor = api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/verify');
        setCurrentUser(response.data.user);
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('token');
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = async (email, password) => {
    setAuthLoading(true);
    setError(null);

    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setCurrentUser(user);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to login';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async (email, password) => {
    setAuthLoading(true);
    setError(null);

    try {
      const response = await api.post('/auth/signup', {
        email,
        password
      });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setCurrentUser(user);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to sign up';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading,
    authLoading,
    error,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 