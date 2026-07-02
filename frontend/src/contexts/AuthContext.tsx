import { createContext, useContext, useEffect, useState } from "react";
import { changePasswordService, getMeService, loginService, logoutService, updateEmailService } from "../services/auth.service";
import { toast } from "sonner";

interface AuthContextType {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: any;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  updateEmail: (newEmail: string) => Promise<boolean>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
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

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await loginService(email, password);
      if (!result) {
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }

      setIsAuthenticated(true);
      setUser(result);
      return true;
    } catch (error: unknown) {
      console.error("Error logging in:", error);
      toast.error("Email ou mot de passe incorrect")
      setIsAuthenticated(false);
      setUser(null);
      return false
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
        await logoutService();
        setIsAuthenticated(false);
        setUser(null);
        return true
    } catch (error: unknown) {
        console.error("Error logging out:", error);
        toast.error("Erreur lors de la déconnexion")
        return false
    }
  }

  const updateEmail = async (newEmail: string): Promise<boolean> => {
    try {
        const result = await updateEmailService(newEmail);
        setUser(result);
        return true
    } catch (error: unknown) {
        console.error("Error updating email:", error);
        toast.error("Erreur lors de la mise à jour de l'email")
        return false
    }
  }

  const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
        await changePasswordService(oldPassword, newPassword);
        return true
    } catch (error: unknown) {
        console.error("Error changing password:", error);
        toast.error("Erreur lors du changement de mot de passe")
        return false
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
