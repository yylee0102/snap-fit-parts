import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  userType: "개인" | "카센터" | "관리자";
  isLoggedIn: boolean;
  profileImage?: string;
  rating?: number;
  responseRate?: number;
  location?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isAdmin: boolean;
  isCenter: boolean;
  isUser: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  // 로컬 스토리지에서 사용자 정보 불러오기
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error("사용자 정보 파싱 실패:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user?.isLoggedIn,
    login,
    logout,
    updateUser,
    isAdmin: user?.userType === "관리자",
    isCenter: user?.userType === "카센터",
    isUser: user?.userType === "개인"
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}