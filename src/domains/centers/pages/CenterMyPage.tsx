import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/shared/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Star, 
  FileText, 
  MessageCircle, 
  Settings, 
  LogOut,
  TrendingUp,
  Users,
  Clock
} from "lucide-react";

// 카센터 프로필 데이터 타입
interface CenterProfile {
  centerName: string;
  businessNumber: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  profileImage?: string;
  rating: number;
  reviewCount: number;
  joinDate: string;
  status: "active" | "pending" | "suspended";
}

// 카센터 활동 통계 타입
interface CenterActivity {
  estimates: number;
  completedRepairs: number;
  reviews: number;
  monthlyRevenue: number;
}

export default function CenterMyPage() {
  const navigate = useNavigate();
  const [centerProfile, setCenterProfile] = useState<CenterProfile | null>(null);
  const [activity, setActivity] = useState<CenterActivity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCenterProfile();
  }, []);

  const fetchCenterProfile = async () => {
    try {
      setLoading(true);
      
      // TODO: API 연결 - 카센터 프로필 조회
      // GET /api/centers/profile
      // const response = await carCenterApiService.getMyProfile();
      
      // 시뮬레이션 데이터
      const mockProfile: CenterProfile = {
        centerName: "서울 오토케어",
        businessNumber: "123-45-67890",
        ownerName: "김사장",
        email: "seoul.autocare@email.com",
        phone: "02-1234-5678",
        address: "서울시 강남구 테헤란로 123",
        profileImage: undefined,
        rating: 4.8,
        reviewCount: 156,
        joinDate: "2023-01-15",
        status: "active"
      };

      const mockActivity: CenterActivity = {
        estimates: 45,
        completedRepairs: 32,
        reviews: 28,
        monthlyRevenue: 2500000
      };

      setCenterProfile(mockProfile);
      setActivity(mockActivity);
    } catch (error) {
      console.error("카센터 프로필 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // TODO: 로그아웃 처리
    navigate("/");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW"
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-100 text-green-800">운영중</Badge>;
      case "pending":
        return <Badge variant="secondary">승인 대기</Badge>;
      case "suspended":
        return <Badge variant="destructive">운영 중단</Badge>;
      default:
        return <Badge variant="outline">알 수 없음</Badge>;
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">로딩 중...</div>
        </div>
      </PageContainer>
    );
  }

  if (!centerProfile) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-600 mb-4">
            카센터 정보를 불러올 수 없습니다
          </h2>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* 카센터 프로필 섹션 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={centerProfile.profileImage} />
            <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-700">
              {centerProfile.centerName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {centerProfile.centerName}
                </h1>
                <div className="flex items-center gap-2 mb-2">
                  {getStatusBadge(centerProfile.status)}
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-gray-700 font-medium">
                      {centerProfile.rating} ({centerProfile.reviewCount}개 리뷰)
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">사업자등록번호: {centerProfile.businessNumber}</p>
                <p className="text-gray-600 text-sm mb-1">대표자: {centerProfile.ownerName}</p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate("/center/settings")}>
                  <Settings className="h-4 w-4 mr-1" />
                  설정
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  로그아웃
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">{centerProfile.address}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">{centerProfile.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">{centerProfile.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 활동 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">이번 달 견적서</p>
                <p className="text-2xl font-bold text-blue-600">{activity?.estimates}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">완료된 수리</p>
                <p className="text-2xl font-bold text-green-600">{activity?.completedRepairs}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">받은 리뷰</p>
                <p className="text-2xl font-bold text-yellow-600">{activity?.reviews}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">이번 달 매출</p>
                <p className="text-lg font-bold text-purple-600">
                  {formatCurrency(activity?.monthlyRevenue || 0)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 탭 메뉴 */}
      <Tabs defaultValue="estimates" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="estimates">견적 관리</TabsTrigger>
          <TabsTrigger value="repairs">수리 내역</TabsTrigger>
          <TabsTrigger value="reviews">리뷰 관리</TabsTrigger>
          <TabsTrigger value="reservations">예약 관리</TabsTrigger>
        </TabsList>

        {/* 견적 관리 탭 */}
        <TabsContent value="estimates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                최근 견적서
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>아직 견적서가 없습니다.</p>
                <Button className="mt-4" onClick={() => navigate("/estimates/center")}>
                  견적서 관리하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 수리 내역 탭 */}
        <TabsContent value="repairs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                완료된 수리
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>아직 완료된 수리가 없습니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 리뷰 관리 탭 */}
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                고객 리뷰
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>아직 받은 리뷰가 없습니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 예약 관리 탭 */}
        <TabsContent value="reservations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                예약 관리
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>아직 예약이 없습니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 계정 관리 섹션 */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>계정 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" onClick={() => navigate("/center/profile/edit")}>
              프로필 수정
            </Button>
            <Button variant="outline" onClick={() => navigate("/center/password/change")}>
              비밀번호 변경
            </Button>
            <Button variant="destructive" onClick={() => navigate("/center/account/delete")}>
              계정 삭제
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}