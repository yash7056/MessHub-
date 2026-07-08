import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: 'customer' | 'seller';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'customer' | 'seller') => Promise<boolean>;
  signup: (userData: Omit<User, 'id'> & { password: string } & { messName?: string; messAddress?: string }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('messhub_token');
      if (token) {
        try {
          const response = await authAPI.getProfile();
          // Profile returns { user: { _id, name, email, mobile, role } }
          if (response.user) {
            setUser({
              id: response.user._id,
              name: response.user.name,
              email: response.user.email,
              mobile: response.user.mobile,
              role: response.user.role,
            });
          } else {
            // Clean up if malformed response
            localStorage.removeItem('messhub_token');
            localStorage.removeItem('messhub_user');
          }
        } catch (error) {
          console.error('Session validation failed:', error);
          localStorage.removeItem('messhub_token');
          localStorage.removeItem('messhub_user');
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, role: 'customer' | 'seller'): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authAPI.login(email, password, role);
      if (response.token && response.user) {
        const loggedUser: User = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          mobile: response.user.mobile,
          role: response.user.role,
        };
        localStorage.setItem('messhub_token', response.token);
        localStorage.setItem('messhub_user', JSON.stringify(loggedUser));
        setUser(loggedUser);
        setIsLoading(false);
        return true;
      }
      setIsLoading(false);
      return false;
    } catch (error: any) {
      alert(error.message || 'Login failed. Please check your credentials.');
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (userData: Omit<User, 'id'> & { password: string } & { messName?: string; messAddress?: string }): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authAPI.signup(userData);
      if (response.token && response.user) {
        const newUser: User = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          mobile: response.user.mobile,
          role: response.user.role,
        };
        localStorage.setItem('messhub_token', response.token);
        localStorage.setItem('messhub_user', JSON.stringify(newUser));
        setUser(newUser);
        setIsLoading(false);
        return true;
      }
      setIsLoading(false);
      return false;
    } catch (error: any) {
      alert(error.message || 'Signup failed. Please try again.');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('messhub_token');
    localStorage.removeItem('messhub_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};