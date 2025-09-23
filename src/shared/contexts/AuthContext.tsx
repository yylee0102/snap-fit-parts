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

  // 컴포넌트 마운트 시 localStorage에서 사용자 정보 복원
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
      // 실제 서비스에서는 여기서 localStorage나 토큰을 확인하여 로그인 상태를 결정
      // 개발 단계에서는 임시로 로그인하지 않은 상태로 시작
      // TODO: 실제 인증 시스템 연동 시 이 부분을 수정해야 함
      
      // 임시 개발용 - 자동 로그인 (실제 서비스에서는 제거 필요)
      // const tempUser = {
      //   id: "user123",
      //   name: "일반사용자",
      //   email: "user@example.com", 
      //   phone: "010-1234-5678",
      //   userType: "개인" as const,
      //   isLoggedIn: true,
      //   profileImage: "",
      //   rating: 4.5,
      //   responseRate: 85,
      //   location: "서울시 강남구"
      // };
      // setUser(tempUser);
      // localStorage.setItem('user', JSON.stringify(tempUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken"); // JWT 토큰도 삭제
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