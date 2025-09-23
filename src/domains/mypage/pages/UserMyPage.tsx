// 일반 사용자 마이페이지 (임시)
import { useState } from "react";
import { User, Settings, Car, Heart, FileText, MessageSquare, HelpCircle } from "lucide-react";
import PageContainer from "@/shared/components/layout/PageContainer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/shared/contexts/AuthContext";

export default function UserMyPage() {
  const { user } = useAuth();

  const menuItems = [
    { icon: User, label: "내 정보 관리", href: "/mypage/profile" },
    { icon: Car, label: "내 차량 관리", href: "/mypage/vehicles" },
    { icon: FileText, label: "견적 요청 내역", href: "/mypage/estimates" },
    { icon: Heart, label: "관심 상품", href: "/mypage/favorites" },
    { icon: MessageSquare, label: "리뷰 관리", href: "/mypage/reviews" },
    { icon: HelpCircle, label: "고객센터", href: "/support" },
    { icon: Settings, label: "설정", href: "/mypage/settings" },
  ];

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6">
        {/* 사용자 정보 카드 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
                <Badge variant="outline" className="mt-2">일반 사용자</Badge>
              </div>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                설정
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 메뉴 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <Card key={item.label} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">관리하기</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 최근 활동 */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">최근 활동</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span>현대 아반떼 헤드라이트 견적 요청</span>
                <span className="text-sm text-muted-foreground">2024.01.15</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span>우리카센터 리뷰 작성</span>
                <span className="text-sm text-muted-foreground">2024.01.14</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>기아 쏘렌토 범퍼 관심상품 등록</span>
                <span className="text-sm text-muted-foreground">2024.01.13</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}