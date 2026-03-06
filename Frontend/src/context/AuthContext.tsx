import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, UserRole } from '../types';
import { storage } from '../utils/storage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = storage.getUser();
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        storage.clear();
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role
      };
      const mockToken = 'mock-jwt-token-' + Date.now();

      storage.setToken(mockToken);
      storage.setUser(JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role
      };
      const mockToken = 'mock-jwt-token-' + Date.now();

      storage.setToken(mockToken);
      storage.setUser(JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    storage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
