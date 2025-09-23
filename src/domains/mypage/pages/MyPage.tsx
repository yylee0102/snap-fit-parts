import { useState, useEffect } from "react";
import PageContainer from "@/shared/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Heart, ShoppingBag, Car, FileText, Star, Settings, LogOut, MessageSquare, Calendar } from "lucide-react";
import { formatKRW, formatTimeAgo } from "@/shared/utils/format";

interface UserProfile {
  userId: string;
  name: string;
  phoneNumber: string;
  marketingAgreed: boolean;
}

export default function MyPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API 연결: 사용자 프로필 조회
    // GET /api/users/profile
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);

      // 임시 데이터 (실제로는 API 호출)
      const mockUser: UserProfile = {
        userId: "user1",
        name: "김현대",
        phoneNumber: "010-1234-5678",
        marketingAgreed: true
      };

      setUser(mockUser);
    } catch (error) {
      console.error("프로필 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageContainer showFooter={false}>
        <div className="container mx-auto px-4 py-6">
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-surface rounded-lg" />
            <div className="h-64 bg-surface rounded-lg" />
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!user) {
    return (
      <PageContainer showFooter={false}>
        <div className="container mx-auto px-4 py-6 text-center">
          <h1 className="text-2xl font-bold text-on-surface">로그인이 필요합니다</h1>
          <Button className="mt-4">로그인하기</Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer showFooter={false}>
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* 프로필 헤더 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-xl">
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold text-on-surface">{user.name}</h1>
                  <Badge variant="secondary">개인 사용자</Badge>
                </div>
                <p className="text-on-surface-variant">{user.phoneNumber}</p>
                <p className="text-sm text-on-surface-variant">
                  마케팅 수신 동의: {user.marketingAgreed ? '동의' : '거부'}
                </p>
              </div>

              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                프로필 수정
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 활동 통계 - 기본 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-on-surface">0</div>
              <div className="text-sm text-on-surface-variant">견적 요청</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-on-surface">0</div>
              <div className="text-sm text-on-surface-variant">작성한 리뷰</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-on-surface">0</div>
              <div className="text-sm text-on-surface-variant">문의 내역</div>
            </CardContent>
          </Card>
        </div>

        {/* 메뉴 탭 */}
        <Tabs defaultValue="estimates" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="estimates">견적 내역</TabsTrigger>
            <TabsTrigger value="reviews">내 리뷰</TabsTrigger>
            <TabsTrigger value="favorites">찜한 목록</TabsTrigger>
          </TabsList>

          <TabsContent value="estimates" className="space-y-4">
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-on-surface-variant mx-auto mb-4" />
                <p className="text-on-surface-variant">견적 요청 내역이 없습니다</p>
                <Button className="mt-4">첫 견적 요청하기</Button>
              </CardContent>
            </Card>
          </TabsContent>


          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-on-surface-variant mx-auto mb-4" />
                <p className="text-on-surface-variant">작성한 리뷰가 없습니다</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            <Card>
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 text-on-surface-variant mx-auto mb-4" />
                <p className="text-on-surface-variant">찜한 항목이 없습니다</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 계정 관리 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-on-surface">계정 관리</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              설정
            </Button>
            <Button variant="ghost" className="w-full justify-start text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              로그아웃
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}