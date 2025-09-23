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

  // 임시 카센터 사용자로 초기화
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
    } else {
      // 임시로 카센터 사용자 설정
      const tempUser = {
        id: "center123",
        name: "우리카센터",
        email: "center@example.com",
        phone: "02-1234-5678",
        userType: "카센터" as const,
        isLoggedIn: true,
        profileImage: "",
        rating: 4.7,
        responseRate: 95,
        location: "서울시 강남구"
      };
      setUser(tempUser);
      localStorage.setItem("user", JSON.stringify(tempUser));
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