import { createContext, useContext, useState, useEffect } from "react";
import { storage } from "../utils/storage";
import { authService } from "../services/authService";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = storage.getUser();

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        storage.clear();
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (email, password, role) => {
    setIsLoading(true);

    try {

      const data = await authService.login(email, password);

      const userData = {
        id: data.data._id,
        name: data.data.userName,
        email: data.data.userEmail,
        role: data.data.userRole
      };

      storage.setToken(data.accessToken);
      storage.setUser(JSON.stringify(userData));

      setUser(userData);

    } catch (error) {
      throw new Error(error?.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password, role) => {

    setIsLoading(true);

    try {

      const data = await authService.register(name, email, password, role);

      const userData = {
        id: data.data._id,
        name: data.data.userName,
        email: data.data.userEmail,
        role: data.data.userRole
      };

      storage.setToken(data.accessToken);
      storage.setUser(JSON.stringify(userData));

      setUser(userData);

    } catch (error) {
      throw new Error(error?.response?.data?.message || "Registration failed");
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