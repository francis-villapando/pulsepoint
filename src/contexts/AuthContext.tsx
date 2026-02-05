import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminUser, AuthState } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const userData = localStorage.getItem('admin_user');
    
    if (token && userData) {
      try {
        const user: AdminUser = JSON.parse(userData);
        setState(prev => ({
          ...prev,
          user,
          isAuthenticated: true,
          isLoading: false,
        }));
      } catch (error) {
        // Invalid data in localStorage, clear it
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        setState(prev => ({
          ...prev,
          isLoading: false,
        }));
      }
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call - in a real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authentication logic
      if (credentials.email === 'admin@pulsepoint.gov' && credentials.password === 'admin123') {
        const user: AdminUser = {
          id: '1',
          email: 'admin@pulsepoint.gov',
          role: 'super_admin',
          lastLogin: new Date().toISOString(),
        };

        // Store in localStorage (in real app, store JWT token)
        localStorage.setItem('admin_token', 'mock_token');
        localStorage.setItem('admin_user', JSON.stringify(user));

        setState(prev => ({
          ...prev,
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        }));
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred during login',
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};