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
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: "개인" | "사장님" | "관리자";
  profileImage?: string;
  rating?: number;
  responseRate?: number;
  location?: string;
  joinDate: string;
}

interface MyActivity {
  estimates: number;
  purchases: number;
  reviews: number;
  favorites: number;
}

export default function MyPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activity, setActivity] = useState<MyActivity | null>(null);
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
        id: "user1",
        name: "김현대",
        email: "kim@example.com",
        phone: "010-1234-5678",
        userType: "개인",
        profileImage: "/placeholder.svg",
        rating: 4.8,
        location: "서울시 강남구",
        joinDate: "2023-06-15T00:00:00Z"
      };

      const mockActivity: MyActivity = {
        estimates: 12,
        purchases: 8,
        reviews: 15,
        favorites: 23
      };

      setUser(mockUser);
      setActivity(mockActivity);
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
                <AvatarImage src={user.profileImage} />
                <AvatarFallback className="text-xl">
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold text-on-surface">{user.name}</h1>
                  <Badge variant="secondary">{user.userType}</Badge>
                </div>
                <p className="text-on-surface-variant">{user.email}</p>
                <p className="text-on-surface-variant">{user.phone}</p>
                {user.location && (
                  <p className="text-sm text-on-surface-variant">{user.location}</p>
                )}
                <p className="text-sm text-on-surface-variant">
                  가입일: {formatTimeAgo(user.joinDate)}
                </p>
              </div>

              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                프로필 수정
              </Button>
            </div>

            {user.rating && (
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">{user.rating}</span>
                  <span className="text-sm text-on-surface-variant">평점</span>
                </div>
                {user.responseRate && (
                  <div className="text-sm text-on-surface-variant">
                    응답률 {user.responseRate}%
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 활동 통계 */}
        {activity && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-on-surface">{activity.estimates}</div>
                <div className="text-sm text-on-surface-variant">견적 요청</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-on-surface">{activity.reviews}</div>
                <div className="text-sm text-on-surface-variant">작성한 리뷰</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-on-surface">{activity.favorites}</div>
                <div className="text-sm text-on-surface-variant">찜한 항목</div>
              </CardContent>
            </Card>
          </div>
        )}

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