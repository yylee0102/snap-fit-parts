/**
 * 홈페이지 (메인 랜딩 페이지)
 * 
 * 이 페이지의 역할:
 * - 서비스 소개 및 주요 기능 안내
 * - 빠른 액션 버튼으로 핵심 서비스 접근
 * - 최신 등록 부품 미리보기
 * - 신규 방문자를 위한 서비스 가이드
 * 
 * 왜 필요한가:
 * - 첫 방문자에게 서비스 가치를 명확히 전달
 * - 주요 기능에 빠르게 접근할 수 있는 허브 역할
 * - 사용자 유입과 전환율 향상을 위한 랜딩 포인트
 * - 브랜드 인지도 구축 및 신뢰성 제공
 */

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
      icon: FileText,
      title: "공지사항",
      description: "새소식 확인",
      color: "bg-surface-container-high text-on-surface",
      onClick: () => navigate("/support/notices")
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
        {/* 통합된 메인 섹션 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-surface via-surface-container to-surface-container-high rounded-3xl p-12 mb-12">
          {/* 배경 장식 */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary/10 via-secondary/5 to-transparent rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            {/* 상단 제목 */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
                안전하고 편리한 중고부품 거래
              </h2>
              <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
                검증된 판매자와 투명한 거래로 믿을 수 있는 중고부품을 만나보세요
              </p>
            </div>
            
            {/* 서비스 특징 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="group text-center p-8 rounded-2xl bg-surface/50 backdrop-blur-sm border border-outline-variant/20 hover:bg-surface/80 hover:shadow-elevation-2 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Search className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-on-surface mb-3">정확한 검색</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  OEM번호, 차종별로 정확한 부품을 찾을 수 있습니다
                </p>
              </div>
              
              <div className="group text-center p-8 rounded-2xl bg-surface/50 backdrop-blur-sm border border-outline-variant/20 hover:bg-surface/80 hover:shadow-elevation-2 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Star className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-on-surface mb-3">검증된 판매자</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  평점과 후기로 신뢰할 수 있는 판매자를 확인하세요
                </p>
              </div>
              
              <div className="group text-center p-8 rounded-2xl bg-surface/50 backdrop-blur-sm border border-outline-variant/20 hover:bg-surface/80 hover:shadow-elevation-2 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-tertiary to-tertiary/70 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <MessageCircle className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-on-surface mb-3">실시간 상담</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  채팅으로 즉시 문의하고 빠른 답변을 받아보세요
                </p>
              </div>
            </div>

            {/* AI 견적 받기 버튼 */}
            <div className="text-center">
              <Button 
                size="lg"
                onClick={() => navigate("/estimates/ai")}
                className="bg-gradient-to-r from-primary to-brand-primary hover:opacity-90 text-white font-semibold px-8 py-4 text-lg"
              >
                AI 견적 받기
              </Button>
            </div>
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
              onClick={() => navigate("/search")}
            >
              더보기
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentParts.map(part => (
              <Card 
                key={part.id}
                className="cursor-pointer hover:shadow-elevation-2 transition-all"
                onClick={() => navigate(`/search`)}
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
      </div>
    </PageContainer>
  );
}