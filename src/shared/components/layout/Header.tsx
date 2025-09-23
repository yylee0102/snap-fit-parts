import { Search, Bell, MessageCircle, Menu, ArrowLeft, User, LogIn } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/shared/contexts/AuthContext";
import AuthModal from "@/shared/modals/AuthModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();
  const [searchType, setSearchType] = useState("parts");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // 루트(/)에서는 뒤로가기 숨김
  const showBackButton = location.pathname !== "/";

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 연결 시 검색 로직 구현
    console.log("검색:", { type: searchType, query: searchQuery });
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-outline-variant bg-surface shadow-elevation-1 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* 좌측: 로고 + 뒤로가기 */}
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-on-surface hover:bg-surface-container"
                aria-label="뒤로가기"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <span className="bg-gradient-to-r from-primary to-brand-primary bg-clip-text text-transparent">
                CAR PARTER
              </span>
            </Link>
          </div>

          {/* 중앙: 검색바 */}
          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <form onSubmit={handleSearch} className="flex">
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="w-32 rounded-r-none border-r-0 bg-surface-container">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="parts">부품 검색</SelectItem>
                  <SelectItem value="centers">센터 검색</SelectItem>
                  <SelectItem value="posts">게시글</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder={
                    searchType === "parts" 
                      ? "찾으시는 부품을 검색하세요" 
                      : searchType === "centers"
                      ? "카센터를 검색하세요"
                      : "게시글을 검색하세요"
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-l-none border-l-0 bg-surface-container"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0 bg-primary hover:bg-primary/90"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* 우측: 알림/채팅/프로필/햄버거 */}
          <div className="flex items-center space-x-2">
            {/* 모바일 검색 아이콘 */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* 알림 */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full"></span>
            </Button>

            {/* 채팅 */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/chat")}
            >
              <MessageCircle className="h-5 w-5" />
            </Button>

            {/* 프로필/로그인 드롭다운 */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span className="hidden md:inline text-sm">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-surface border-outline-variant">
                  <DropdownMenuItem onClick={() => navigate("/mypage")}>
                    마이페이지
                  </DropdownMenuItem>
                  {user?.userType === "카센터" && (
                    <DropdownMenuItem onClick={() => navigate("/center/mypage")}>
                      카센터 관리
                    </DropdownMenuItem>
                  )}
                  {user?.userType === "관리자" && (
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      관리자 페이지
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout}>
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-2"
              >
                <LogIn className="h-5 w-5" />
                <span className="hidden md:inline">로그인</span>
              </Button>
            )}

            {/* 햄버거 메뉴 */}
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* 로그인/회원가입 모달 */}
      <AuthModal 
        open={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
      />
    </header>
  );
}