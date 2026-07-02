import { createContext, useContext, useEffect, useState } from "react";
import { changePasswordService, getMeService, loginService, logoutService, updateEmailService } from "../services/auth.service";

interface AuthContextType {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateEmail: (newEmail: string) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const result = await getMeService();

        if (!result) {
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        setIsAuthenticated(true);
        setUser(result);
      } catch (error: unknown) {
        console.error("Error fetching user data:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsInitialized(true);
      }
    };

    fetchMe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await loginService(email, password);
      if (!result) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      setIsAuthenticated(true);
      setUser(result);
    } catch (error: unknown) {
      console.error("Error logging in:", error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
        await logoutService();
        setIsAuthenticated(false);
        setUser(null);
    } catch (error: unknown) {
        console.error("Error logging out:", error);
    }
  }

  const updateEmail = async (newEmail: string) => {
    try {
        const result = await updateEmailService(newEmail);
        setUser(result);
    } catch (error: unknown) {
        console.error("Error updating email:", error);
    }
  }

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
        await changePasswordService(oldPassword, newPassword);
    } catch (error: unknown) {
        console.error("Error changing password:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isInitialized, isAuthenticated, user, login, logout, updateEmail, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
