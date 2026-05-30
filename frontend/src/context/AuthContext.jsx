
import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService, signup as signupService, getCurrentUser } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from backend using token
  const fetchUserData = async () => {
    try {
      const response = await getCurrentUser();
      if (response.success) {
        setUser(response.data);
        return true;
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      // If token is invalid, clear everything
      localStorage.removeItem('token');
      setUser(null);
      return false;
    }
    return false;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginService(email, password);
      if (response.success) {
        // Store only token in localStorage
        localStorage.setItem('token', response.data.token);
        
        // Set user data from response
        setUser(response.data);
        
        toast.success('Login successful!');
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      const response = await signupService(name, email, password, role);
      if (response.success) {
        // Store only token in localStorage
        localStorage.setItem('token', response.data.token);
        
        // Set user data from response
        setUser(response.data);
        
        toast.success('Signup successful!');
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    isManager: user?.role === 'manager',
    isEmployee: user?.role === 'employee',
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};