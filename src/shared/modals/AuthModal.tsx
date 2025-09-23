/**
 * 통합 로그인 모달
 * 
 * 이 모달의 역할:
 * - 모든 사용자 타입(관리자, 카센터, 일반사용자)의 통합 로그인
 * - 단일 로그인 엔드포인트 사용
 * - 로그인 후 역할별 리디렉션
 * 
 * 왜 필요한가:
 * - 통합된 사용자 경험 제공
 * - 백엔드 API 명세에 정확히 부합
 * - 역할 기반 접근 제어 구현
 */

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/shared/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogIn, UserPlus, Building } from "lucide-react";
import authApiService from "@/services/auth.api";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // 로그인 폼 상태
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });

  // 일반 사용자 회원가입 폼 상태
  const [userJoinForm, setUserJoinForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: ""
  });

  // 카센터 등록 폼 상태
  const [centerRegisterForm, setCenterRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    centerName: "",
    businessNumber: "",
    address: "",
    phone: "",
    description: ""
  });

  const handleInputChange = (form: string, field: string, value: string) => {
    if (form === "login") {
      setLoginForm(prev => ({ ...prev, [field]: value }));
    } else if (form === "userJoin") {
      setUserJoinForm(prev => ({ ...prev, [field]: value }));
    } else if (form === "centerRegister") {
      setCenterRegisterForm(prev => ({ ...prev, [field]: value }));
    }
  };

  /**
   * 통합 로그인 처리
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginForm.username || !loginForm.password) {
      toast({
        title: "입력 오류",
        description: "아이디와 비밀번호를 모두 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await authApiService.login({
        username: loginForm.username,
        password: loginForm.password
      });

      // 사용자 타입 결정 (role 기반)
      let userType: "개인" | "카센터" | "관리자" = "개인";
      if (response.role === "ROLE_ADMIN") {
        userType = "관리자";
      } else if (response.role === "ROLE_CARCENTER") {
        userType = "카센터";
      } else if (response.role === "ROLE_USER") {
        userType = "개인";
      }

      const userData = {
        id: response.userId,
        name: response.name,
        userType,
        role: response.role,
        isLoggedIn: true
      };

      login(userData);

      toast({
        title: "로그인 성공",
        description: `${userType} 계정으로 로그인되었습니다.`
      });

      onClose();
      resetForms();

      // 역할별 리디렉션
      if (userType === "관리자") {
        navigate("/admin");
      } else if (userType === "카센터") {
        navigate("/car-center");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("로그인 실패:", error);
      
      // 개발용 임시 로그인
      if (loginForm.username === "admin" && loginForm.password === "admin") {
        const tempUser = {
          id: "admin1",
          name: "관리자",
          userType: "관리자" as const,
          role: "ROLE_ADMIN",
          isLoggedIn: true
        };
        
        login(tempUser);
        localStorage.setItem('authToken', 'Bearer temp-admin-token');
        
        toast({
          title: "임시 관리자 로그인",
          description: "개발용 관리자 계정으로 로그인되었습니다."
        });
        
        onClose();
        resetForms();
        navigate("/admin");
      } else {
        toast({
          title: "로그인 실패",
          description: "아이디 또는 비밀번호가 올바르지 않습니다.",
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 일반 사용자 회원가입
   */
  const handleUserJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userJoinForm.password !== userJoinForm.confirmPassword) {
      toast({
        title: "비밀번호 불일치",
        description: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await authApiService.userJoin({
        userId: userJoinForm.username,
        password: userJoinForm.password,
        name: userJoinForm.name,
        phoneNumber: userJoinForm.phone,
        ssn: '', // SSN은 별도 처리 필요
        marketingAgreed: false, // 기본값
      });

      toast({
        title: "회원가입 완료",
        description: "회원가입이 완료되었습니다. 로그인해주세요."
      });

      setActiveTab("login");
      resetForms();

    } catch (error) {
      console.error("회원가입 실패:", error);
      toast({
        title: "회원가입 실패",
        description: "회원가입 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 카센터 등록
   */
  const handleCenterRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (centerRegisterForm.password !== centerRegisterForm.confirmPassword) {
      toast({
        title: "비밀번호 불일치",
        description: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await authApiService.carCenterRegister({
        centerId: centerRegisterForm.username,
        password: centerRegisterForm.password,
        centerName: centerRegisterForm.centerName,
        businessRegistrationNumber: centerRegisterForm.businessNumber,
        address: centerRegisterForm.address,
        phoneNumber: centerRegisterForm.phone,
        openingHours: '09:00-18:00', // 기본값
        description: centerRegisterForm.description || undefined
      });

      toast({
        title: "카센터 등록 완료",
        description: "카센터 등록이 완료되었습니다. 승인 후 이용 가능합니다."
      });

      setActiveTab("login");
      resetForms();

    } catch (error) {
      console.error("카센터 등록 실패:", error);
      toast({
        title: "등록 실패",
        description: "카센터 등록 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForms = () => {
    setLoginForm({ username: "", password: "" });
    setUserJoinForm({
      username: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: ""
    });
    setCenterRegisterForm({
      username: "",
      password: "",
      confirmPassword: "",
      centerName: "",
      businessNumber: "",
      address: "",
      phone: "",
      description: ""
    });
  };

  const handleClose = () => {
    resetForms();
    setActiveTab("login");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto" aria-describedby="auth-modal-description">
        <div id="auth-modal-description" className="sr-only">로그인 및 회원가입 모달</div>
        <DialogHeader>
          <DialogTitle className="text-center">CarParter</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="login" className="gap-2">
              <LogIn className="h-4 w-4" />
              로그인
            </TabsTrigger>
            <TabsTrigger value="userJoin" className="gap-2">
              <UserPlus className="h-4 w-4" />
              일반 회원가입
            </TabsTrigger>
            <TabsTrigger value="centerRegister" className="gap-2">
              <Building className="h-4 w-4" />
              카센터 등록
            </TabsTrigger>
          </TabsList>

          {/* 로그인 탭 */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">아이디</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => handleInputChange("login", "username", e.target.value)}
                  placeholder="아이디를 입력하세요"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => handleInputChange("login", "password", e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  disabled={isLoading}
                />
              </div>

              <div className="text-xs text-muted-foreground bg-muted p-3 rounded-md">
                <strong>개발용 계정:</strong> admin / admin (관리자)
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    로그인 중...
                  </>
                ) : (
                  "로그인"
                )}
              </Button>
            </form>
          </TabsContent>

          {/* 일반 사용자 회원가입 탭 */}
          <TabsContent value="userJoin">
            <form onSubmit={handleUserJoin} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="userJoin-username">아이디</Label>
                  <Input
                    id="userJoin-username"
                    value={userJoinForm.username}
                    onChange={(e) => handleInputChange("userJoin", "username", e.target.value)}
                    placeholder="아이디"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userJoin-name">이름</Label>
                  <Input
                    id="userJoin-name"
                    value={userJoinForm.name}
                    onChange={(e) => handleInputChange("userJoin", "name", e.target.value)}
                    placeholder="이름"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="userJoin-password">비밀번호</Label>
                  <Input
                    id="userJoin-password"
                    type="password"
                    value={userJoinForm.password}
                    onChange={(e) => handleInputChange("userJoin", "password", e.target.value)}
                    placeholder="비밀번호"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userJoin-confirmPassword">비밀번호 확인</Label>
                  <Input
                    id="userJoin-confirmPassword"
                    type="password"
                    value={userJoinForm.confirmPassword}
                    onChange={(e) => handleInputChange("userJoin", "confirmPassword", e.target.value)}
                    placeholder="비밀번호 확인"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <div className="space-y-2">
                  <Label htmlFor="userJoin-phone">전화번호</Label>
                  <Input
                    id="userJoin-phone"
                    value={userJoinForm.phone}
                    onChange={(e) => handleInputChange("userJoin", "phone", e.target.value)}
                    placeholder="전화번호"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    가입 중...
                  </>
                ) : (
                  "회원가입"
                )}
              </Button>
            </form>
          </TabsContent>

          {/* 카센터 등록 탭 */}
          <TabsContent value="centerRegister">
            <form onSubmit={handleCenterRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="center-username">아이디</Label>
                  <Input
                    id="center-username"
                    value={centerRegisterForm.username}
                    onChange={(e) => handleInputChange("centerRegister", "username", e.target.value)}
                    placeholder="아이디"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="center-centerName">카센터명</Label>
                  <Input
                    id="center-centerName"
                    value={centerRegisterForm.centerName}
                    onChange={(e) => handleInputChange("centerRegister", "centerName", e.target.value)}
                    placeholder="카센터명"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="center-password">비밀번호</Label>
                  <Input
                    id="center-password"
                    type="password"
                    value={centerRegisterForm.password}
                    onChange={(e) => handleInputChange("centerRegister", "password", e.target.value)}
                    placeholder="비밀번호"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="center-confirmPassword">비밀번호 확인</Label>
                  <Input
                    id="center-confirmPassword"
                    type="password"
                    value={centerRegisterForm.confirmPassword}
                    onChange={(e) => handleInputChange("centerRegister", "confirmPassword", e.target.value)}
                    placeholder="비밀번호 확인"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="center-businessNumber">사업자등록번호</Label>
                <Input
                  id="center-businessNumber"
                  value={centerRegisterForm.businessNumber}
                  onChange={(e) => handleInputChange("centerRegister", "businessNumber", e.target.value)}
                  placeholder="사업자등록번호"
                  disabled={isLoading}
                />
              </div>

              <div>
                <div className="space-y-2">
                  <Label htmlFor="center-phone">전화번호</Label>
                  <Input
                    id="center-phone"
                    value={centerRegisterForm.phone}
                    onChange={(e) => handleInputChange("centerRegister", "phone", e.target.value)}
                    placeholder="전화번호"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="center-address">주소</Label>
                <Input
                  id="center-address"
                  value={centerRegisterForm.address}
                  onChange={(e) => handleInputChange("centerRegister", "address", e.target.value)}
                  placeholder="주소"
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    등록 중...
                  </>
                ) : (
                  "카센터 등록"
                )}
              </Button>

              <div className="text-xs text-muted-foreground text-center">
                등록 후 관리자 승인이 필요합니다
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}