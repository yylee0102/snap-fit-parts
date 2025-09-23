// 카센터 마이페이지 (임시)
import { useState } from "react";
import { Store, Users, Calendar, FileText, Star, Settings, BarChart3 } from "lucide-react";
import PageContainer from "@/shared/components/layout/PageContainer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/shared/contexts/AuthContext";

export default function CenterMyPage() {
  const { user } = useAuth();

  const menuItems = [
    { icon: Store, label: "카센터 정보 관리", href: "/center/profile" },
    { icon: Calendar, label: "예약 관리", href: "/center/reservations" },
    { icon: FileText, label: "견적 관리", href: "/center/estimates" },
    { icon: Users, label: "고객 관리", href: "/center/customers" },
    { icon: Star, label: "리뷰 관리", href: "/center/reviews" },
    { icon: BarChart3, label: "매출 통계", href: "/center/statistics" },
    { icon: Settings, label: "설정", href: "/center/settings" },
  ];

  const stats = [
    { label: "오늘 예약", value: "5건", color: "text-blue-600" },
    { label: "대기중 견적", value: "12건", color: "text-orange-600" },
    { label: "완료된 수리", value: "8건", color: "text-green-600" },
    { label: "평균 평점", value: "4.8", color: "text-purple-600" },
  ];

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6">
        {/* 카센터 정보 카드 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Store className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{user?.name} 카센터</h2>
                <p className="text-muted-foreground">{user?.location}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">카센터</Badge>
                  <Badge className="bg-green-100 text-green-800">승인완료</Badge>
                </div>
              </div>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                설정
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 통계 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 메뉴 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">최근 활동</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span>김○○님 범퍼 수리 견적 완료</span>
                <span className="text-sm text-muted-foreground">오늘 14:30</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span>이○○님 엔진오일 교체 예약</span>
                <span className="text-sm text-muted-foreground">오늘 11:20</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>박○○님 헤드라이트 수리 완료</span>
                <span className="text-sm text-muted-foreground">어제 16:45</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}