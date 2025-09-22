import { Search, MapPin, FileText, MessageCircle, Wrench, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/shared/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: Wrench,
      title: "AI 견적",
      description: "AI 자동견적",
      color: "bg-primary text-primary-foreground",
      onClick: () => navigate("/estimates/ai")
    },
    {
      icon: MapPin,
      title: "주변 센터",
      description: "카센터 찾기",
      color: "bg-secondary text-secondary-foreground",
      onClick: () => navigate("/centers")
    },
    {
      icon: FileText,
      title: "견적 요청",
      description: "수리 견적서",
      color: "bg-tertiary text-tertiary-foreground", 
      onClick: () => navigate("/estimates/create")
    },
    {
      icon: MessageCircle,
      title: "채팅",
      description: "실시간 채팅",
      color: "bg-brand-accent text-on-surface",
      onClick: () => navigate("/chat")
    },
    {
      icon: Star,
      title: "내 정보",
      description: "마이페이지",
      color: "bg-surface-container-high text-on-surface",
      onClick: () => navigate("/mypage")
    }
  ];

  const recentParts = [
    {
      id: "1",
      title: "현대 아반떼 헤드라이트",
      price: 150000,
      location: "서울 강남구",
      condition: "중고A급",
      image: "/api/placeholder/120/120"
    },
    {
      id: "2", 
      title: "기아 쏘렌토 범퍼",
      price: 80000,
      location: "경기 성남시",
      condition: "중고B급",
      image: "/api/placeholder/120/120"
    },
    {
      id: "3",
      title: "BMW 3시리즈 미러",
      price: 120000,
      location: "인천 연수구",
      condition: "신품",
      image: "/api/placeholder/120/120"
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price) + '원';
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "신품": return "bg-primary text-primary-foreground";
      case "중고A급": return "bg-secondary text-secondary-foreground";
      case "중고B급": return "bg-tertiary text-tertiary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6">
        {/* 히어로 섹션 */}
        <div className="text-center py-16 bg-gradient-to-r from-primary/10 to-brand-primary/10 rounded-2xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-4">
            <span className="bg-gradient-to-r from-primary to-brand-primary bg-clip-text text-transparent">
              CAR PARTER
            </span>
          </h1>
          <p className="text-xl text-on-surface-variant mb-8">
            중고차 부품의 새로운 거래 플랫폼
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button 
              size="lg"
              onClick={() => navigate("/wb")}
              className="bg-primary hover:bg-primary/90"
            >
              부품 찾기
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/centers")}
            >
              카센터 찾기
            </Button>
          </div>
        </div>

        {/* 퀵 액션 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-on-surface mb-6">빠른 이용</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card 
                  key={index}
                  className="cursor-pointer hover:shadow-elevation-2 transition-all group"
                  onClick={action.onClick}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-on-surface mb-1">{action.title}</h3>
                    <p className="text-sm text-on-surface-variant">{action.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 최신 등록 부품 */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-on-surface">최신 등록 부품</h2>
            <Button 
              variant="outline"
              onClick={() => navigate("/wb")}
            >
              더보기
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentParts.map(part => (
              <Card 
                key={part.id}
                className="cursor-pointer hover:shadow-elevation-2 transition-all"
                onClick={() => navigate(`/wb/${part.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-surface-container rounded-lg flex-shrink-0 overflow-hidden">
                      <img 
                        src={part.image} 
                        alt={part.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-on-surface line-clamp-2 mb-2">
                        {part.title}
                      </h3>
                      <Badge className={`${getConditionColor(part.condition)} mb-2`}>
                        {part.condition}
                      </Badge>
                      <p className="text-lg font-bold text-primary mb-1">
                        {formatPrice(part.price)}
                      </p>
                      <p className="text-sm text-on-surface-variant">
                        {part.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 서비스 소개 */}
        <div className="bg-surface-container rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-on-surface mb-4">
            안전하고 편리한 중고부품 거래
          </h2>
          <p className="text-on-surface-variant mb-6">
            검증된 판매자와 투명한 거래로 믿을 수 있는 중고부품을 만나보세요
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-on-surface mb-2">정확한 검색</h3>
              <p className="text-sm text-on-surface-variant">
                OEM번호, 차종별로 정확한 부품을 찾을 수 있습니다
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-on-surface mb-2">검증된 판매자</h3>
              <p className="text-sm text-on-surface-variant">
                평점과 후기로 신뢰할 수 있는 판매자를 확인하세요
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-tertiary" />
              </div>
              <h3 className="font-semibold text-on-surface mb-2">실시간 상담</h3>
              <p className="text-sm text-on-surface-variant">
                채팅으로 즉시 문의하고 빠른 답변을 받아보세요
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}