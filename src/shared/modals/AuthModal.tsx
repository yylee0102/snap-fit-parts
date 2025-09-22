import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Eye, EyeOff } from "lucide-react";

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
    businessNumber: "", // 카센터용
    centerName: "",     // 카센터용
    address: "",        // 카센터용
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: API 연결 - 로그인
    // POST /api/auth/login
    try {
      console.log("로그인 요청:", loginData);
      
      // 임시 로그인 처리
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

    // TODO: API 연결 - 회원가입
    // POST /api/auth/signup
    try {
      console.log("회원가입 요청:", signupData);
      alert("회원가입이 완료되었습니다!");
      setActiveTab("login");
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
              사용자는 서비스 이용 시 해당 약관을 준수해야 합니다.
            </p>
          </div>
          
          <div className="bg-surface-container p-4 rounded-lg">
            <h4 className="font-medium mb-2">개인정보 수집 및 이용</h4>
            <p className="text-sm text-on-surface-variant">
              개인정보는 서비스 제공을 위해서만 수집되며, 
              제3자에게 제공되지 않습니다.
            </p>
          </div>

          <div className="bg-surface-container p-4 rounded-lg">
            <h4 className="font-medium mb-2">개인정보 보유 및 이용 동의</h4>
            <p className="text-sm text-on-surface-variant">
              수집된 개인정보는 서비스 제공 목적으로만 사용되며,
              관련 법령에 따라 안전하게 보관됩니다.
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
              {/* 사용자 유형 선택 */}
              <div className="mb-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger 
                    value="일반 사용자용"
                    className={userType === "일반 사용자용" ? "bg-primary text-primary-foreground" : ""}
                    onClick={() => {
                      setUserType("일반 사용자용");
                      setSignupData(prev => ({ ...prev, userType: "일반" }));
                    }}
                  >
                    일반 사용자용
                  </TabsTrigger>
                  <TabsTrigger 
                    value="카센터용"
                    className={userType === "카센터용" ? "bg-primary text-primary-foreground" : ""}
                    onClick={() => {
                      setUserType("카센터용");
                      setSignupData(prev => ({ ...prev, userType: "카센터" }));
                    }}
                  >
                    카센터용
                  </TabsTrigger>
                </TabsList>
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
                    />
                    <Button type="button" variant="outline" size="sm">
                      중복 확인
                    </Button>
                  </div>
                </div>

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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">{userType === "카센터용" ? "사업자등록번호" : "이름"}</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={userType === "카센터용" ? "사업자등록번호를 입력하세요" : "이름을 입력하세요"}
                    value={userType === "카센터용" ? signupData.businessNumber : signupData.name}
                    onChange={(e) => setSignupData(prev => ({ 
                      ...prev, 
                      [userType === "카센터용" ? "businessNumber" : "name"]: e.target.value 
                    }))}
                    required
                  />
                </div>

                {userType === "카센터용" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="centerName">대표자명</Label>
                      <Input
                        id="centerName"
                        type="text"
                        placeholder="대표자명을 입력하세요"
                        value={signupData.centerName}
                        onChange={(e) => setSignupData(prev => ({ ...prev, centerName: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">비밀번호 확인</Label>
                      <div className="relative">
                        <Input
                          id="address"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="비밀번호를 다시 입력하세요"
                          value={signupData.confirmPassword}
                          onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          required
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
                    </div>
                  </>
                )}

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
                      마케팅 정보 수신에 동의합니다(선택)
                    </Label>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowTermsModal(true)}
                    className="text-xs"
                  >
                    약관 동의
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    등록하기
                  </Button>
                  <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                    취소
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <TermsModal />
    </>
  );
}