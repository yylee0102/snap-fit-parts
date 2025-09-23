import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import VehicleRegisterModal from "./VehicleRegisterModal";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onLogin?: (userData: any) => void;
}

export default function AuthModal({ open, onClose, onLogin }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState("login");
  const [userType, setUserType] = useState("일반 사용자용");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  
  // 로그인 폼 데이터
  const [loginData, setLoginData] = useState({
    id: "",
    password: "",
    rememberMe: false
  });

  // 회원가입 폼 데이터
  const [signupData, setSignupData] = useState({
    userType: "일반",
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    businessNumber: "",
    centerName: "",
    address: "",
    centerPhone: "",
    centerEmail: "",
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log("로그인 요청:", loginData);
      
      const userData = {
        id: loginData.id,
        userType: loginData.id.includes("admin") ? "관리자" : "개인",
        name: "사용자",
        isLoggedIn: true
      };
      
      onLogin?.(userData);
      onClose();
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!signupData.agreeTerms || !signupData.agreePrivacy) {
      alert("필수 약관에 동의해주세요.");
      return;
    }

    try {
      if (signupData.userType === "일반") {
        console.log("일반 사용자 회원가입 요청:", signupData);
        alert("회원가입이 완료되었습니다!");
        onClose();
        setTimeout(() => setShowVehicleModal(true), 300);
      } else {
        console.log("카센터 회원가입 요청:", signupData);
        alert("카센터 회원가입 신청이 완료되었습니다. 승인 후 이용 가능합니다.");
        setActiveTab("login");
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const TermsModal = () => (
    <Dialog open={showTermsModal} onOpenChange={setShowTermsModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>약관 동의</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-surface-container p-4 rounded-lg">
            <h4 className="font-medium mb-2">이용약관</h4>
            <p className="text-sm text-on-surface-variant">
              카파트너 서비스 이용을 위한 약관입니다.
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowTermsModal(false)} className="flex-1">
              모두 동의
            </Button>
            <Button variant="outline" onClick={() => setShowTermsModal(false)} className="flex-1">
              취소
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>회원가입</DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">로그인</TabsTrigger>
              <TabsTrigger value="signup">회원가입</TabsTrigger>
            </TabsList>

            {/* 로그인 탭 */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loginId">아이디</Label>
                  <Input
                    id="loginId"
                    type="text"
                    placeholder="아이디를 입력하세요"
                    value={loginData.id}
                    onChange={(e) => setLoginData(prev => ({ ...prev, id: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loginPassword">비밀번호</Label>
                  <div className="relative">
                    <Input
                      id="loginPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="비밀번호를 입력하세요"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={loginData.rememberMe}
                    onCheckedChange={(checked) => 
                      setLoginData(prev => ({ ...prev, rememberMe: checked as boolean }))
                    }
                  />
                  <Label htmlFor="rememberMe" className="text-sm">자동로그인</Label>
                </div>

                <Button type="submit" className="w-full">
                  로그인
                </Button>
              </form>
            </TabsContent>

            {/* 회원가입 탭 */}
            <TabsContent value="signup">
              {/* 사용자 유형 선택 - 업로드된 이미지 참고 */}
              <div className="mb-6">
                <div className="grid grid-cols-2 rounded-lg overflow-hidden border border-border">
                  <button
                    type="button"
                    className={`py-3 px-4 text-sm font-medium transition-colors ${
                      userType === "일반 사용자용" 
                        ? "bg-muted text-muted-foreground" 
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                    onClick={() => {
                      setUserType("일반 사용자용");
                      setSignupData(prev => ({ ...prev, userType: "일반" }));
                    }}
                  >
                    일반 사용자용
                  </button>
                  <button
                    type="button"
                    className={`py-3 px-4 text-sm font-medium transition-colors ${
                      userType === "카센터용" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                    onClick={() => {
                      setUserType("카센터용");
                      setSignupData(prev => ({ ...prev, userType: "카센터" }));
                    }}
                  >
                    카센터용
                  </button>
                </div>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signupId">아이디</Label>
                  <div className="flex gap-2">
                    <Input
                      id="signupId"
                      type="text"
                      placeholder="아이디를 입력하세요"
                      value={signupData.id}
                      onChange={(e) => setSignupData(prev => ({ ...prev, id: e.target.value }))}
                      required
                      className={signupData.id && signupData.id.length < 4 ? "border-red-300" : ""}
                    />
                    <Button type="button" variant="outline" size="sm" className="bg-teal-600 text-white hover:bg-teal-700 shrink-0">
                      중복 확인
                    </Button>
                  </div>
                  {signupData.id && signupData.id.length < 4 && (
                    <p className="text-xs text-red-500">중복된 아이디입니다.</p>
                  )}
                </div>

                {userType === "카센터용" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="businessNumber">사업자등록번호</Label>
                      <Input
                        id="businessNumber"
                        type="text"
                        placeholder="사업자등록번호"
                        value={signupData.businessNumber}
                        onChange={(e) => setSignupData(prev => ({ ...prev, businessNumber: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="centerName">이름</Label>
                      <Input
                        id="centerName"
                        type="text"
                        placeholder="대표자명"
                        value={signupData.centerName}
                        onChange={(e) => setSignupData(prev => ({ ...prev, centerName: e.target.value }))}
                        required
                      />
                    </div>
                  </>
                )}

                {userType === "일반 사용자용" && (
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="이름을 입력하세요"
                      value={signupData.name}
                      onChange={(e) => setSignupData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="signupPassword">비밀번호</Label>
                  <div className="relative">
                    <Input
                      id="signupPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="비밀번호를 입력하세요"
                      value={signupData.password}
                      onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                      required
                      className={signupData.password && signupData.password.length < 6 ? "border-red-300" : ""}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {signupData.password && signupData.password.length < 6 && (
                    <p className="text-xs text-red-500">비밀번자가 같지 않습니다.</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="비밀번호를 다시 입력하세요"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                      className={signupData.confirmPassword && signupData.password !== signupData.confirmPassword ? "border-red-300" : ""}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {signupData.confirmPassword && signupData.password !== signupData.confirmPassword && (
                    <p className="text-xs text-red-500">비밀번호가 일치하지 않습니다.</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">휴대폰번호</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="휴대폰번호를 입력하세요"
                    value={signupData.phone}
                    onChange={(e) => setSignupData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>

                {/* 약관 동의 */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      checked={signupData.agreeTerms}
                      onCheckedChange={(checked) => 
                        setSignupData(prev => ({ ...prev, agreeTerms: checked as boolean }))
                      }
                    />
                    <Label htmlFor="agreeTerms" className="text-sm">
                      이용약관에 동의합니다(필수)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreePrivacy"
                      checked={signupData.agreePrivacy}
                      onCheckedChange={(checked) => 
                        setSignupData(prev => ({ ...prev, agreePrivacy: checked as boolean }))
                      }
                    />
                    <Label htmlFor="agreePrivacy" className="text-sm">
                      개인정보 수집 및 이용에 동의합니다(필수)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreeMarketing"
                      checked={signupData.agreeMarketing}
                      onCheckedChange={(checked) => 
                        setSignupData(prev => ({ ...prev, agreeMarketing: checked as boolean }))
                      }
                    />
                    <Label htmlFor="agreeMarketing" className="text-sm">
                      이용약관에 동의하시겠습니까?
                    </Label>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowTermsModal(true)}
                    className="text-sm"
                  >
                    약관 동의
                  </Button>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-teal-600 hover:bg-teal-700"
                    disabled={!signupData.agreeTerms || !signupData.agreePrivacy}
                  >
                    등록
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={onClose}
                  >
                    취소
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* 약관 모달 */}
      <TermsModal />
      
      {/* 차량 등록 모달 */}
      <VehicleRegisterModal 
        open={showVehicleModal} 
        onClose={() => setShowVehicleModal(false)}
        onComplete={() => setShowVehicleModal(false)}
      />
    </>
  );
}