
import React, { createContext, useState, useContext, useEffect } from "react";
import { User, UserRole } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isManager: boolean;
  isResident: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const MOCK_USERS = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@example.com",
    password: "123456",
    role: "manager" as UserRole,
  },
  {
    id: "2",
    name: "Maria Souza",
    email: "maria@example.com",
    password: "123456",
    role: "resident" as UserRole,
    unitNumber: "101",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in via localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user data");
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      toast({
        title: "Login bem sucedido",
        description: `Bem-vindo, ${foundUser.name}!`,
      });
      setIsLoading(false);
      return true;
    } else {
      toast({
        title: "Login falhou",
        description: "Email ou senha inválidos",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    isManager: user?.role === "manager",
    isResident: user?.role === "resident",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
