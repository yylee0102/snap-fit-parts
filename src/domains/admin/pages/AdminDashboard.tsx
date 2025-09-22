import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/shared/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  Users, 
  ShoppingCart, 
  MessageCircle, 
  AlertTriangle,
  TrendingUp,
  Activity,
  CheckCircle,
  XCircle
} from "lucide-react";

// 통계 데이터 타입
interface DashboardStats {
  users: {
    total: number;
    new: number;
    centers: number;
  };
  orders: {
    total: number;
    completed: number;
    pending: number;
    cancelled: number;
  };
  inquiries: {
    total: number;
    pending: number;
    resolved: number;
  };
  reports: {
    total: number;
    critical: number;
    pending: number;
  };
}

interface UserActivity {
  id: string;
  type: "registration" | "order" | "inquiry" | "report";
  userName: string;
  description: string;
  createdAt: string;
  status: "pending" | "completed" | "critical";
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);

  // 차트 데이터
  const salesData = [
    { month: "2024", value: 30, color: "#8884d8" },
    { month: "2024", value: 15, color: "#82ca9d" },
    { month: "4분기", value: 5, color: "#ffc658" },
    { month: "5분기", value: 5, color: "#ff7300" }
  ];

  const monthlyData = [
    { name: "20년", value: 120 },
    { name: "30년", value: 15 },
    { name: "40년", value: 5 }
  ];

  useEffect(() => {
    // API 연결: 관리자 대시보드 데이터 조회
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // API 연결: 각종 통계 데이터 조회
      // GET /api/admin/stats/users/count - 전체 유저 수
      // GET /api/admin/stats/centers/count - 전체 카센터 수  
      // GET /api/admin/stats/approvals/pending/count - 대기 승인 건수
      // GET /api/admin/stats/reports/reviews/count - 신고된 리뷰 건수
      // GET /api/admin/stats/gender - 성별 분포
      // GET /api/admin/stats/age - 연령대 분포
      
      // 임시 통계 데이터 (실제 API 연결 시 위 API 응답으로 교체)
      const mockStats: DashboardStats = {
        users: { total: 30, new: 120, centers: 15 },
        orders: { total: 5, completed: 0, pending: 0, cancelled: 0 },
        inquiries: { total: 0, pending: 0, resolved: 0 },
        reports: { total: 0, critical: 0, pending: 0 }
      };

      // 임시 활동 데이터
      const mockActivities: UserActivity[] = [
        {
          id: "1",
          type: "registration",
          userName: "드로우 자동차",
          description: "247-27-01231 경기도 동탄시 영덕4로 중앙하이츠상가A동 19호층1호",
          createdAt: "2025-09-08",
          status: "pending"
        },
        {
          id: "2", 
          type: "order",
          userName: "베스 카센터",
          description: "123-45-67890 서울특시 강남구 테헤란로 123",
          createdAt: "2025-09-07",
          status: "completed"
        }
      ];

      setStats(mockStats);
      setUserActivities(mockActivities);
    } catch (error) {
      console.error("대시보드 데이터 로딩 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">승인대기</Badge>;
      case "completed":
        return <Badge variant="default" className="bg-green-100 text-green-800">승인완료</Badge>;
      case "critical":
        return <Badge variant="destructive">긴급</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-on-surface-variant">대시보드를 불러오는 중...</p>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-on-surface">관리자 대시보드</h1>
          <Button onClick={() => navigate("/admin/settings")}>
            시스템 설정
          </Button>
        </div>

        {/* 통계 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* 신청 차트 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-on-surface-variant">신청 차트</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={120}>
                <PieChart>
                  <Pie
                    data={salesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={40}
                    dataKey="value"
                  >
                    {salesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 연령 차트 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-on-surface-variant">연령 차트</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={monthlyData}>
                  <Bar dataKey="value" fill="#ff7f7f" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 1주일간 통계 요약 */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-on-surface-variant">1주일간 통계 요약</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-on-surface-variant">신규 카센터 신청 수</p>
                  <p className="text-2xl font-bold text-primary">{stats?.users.new || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-on-surface-variant">총 가입된 카센터 수</p>
                  <p className="text-2xl font-bold text-secondary">{stats?.users.total || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-on-surface-variant">승인한 건수</p>
                  <p className="text-2xl font-bold text-green-600">{stats?.users.centers || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-on-surface-variant">미처리 승인 건수</p>
                  <p className="text-2xl font-bold text-orange-600">{stats?.orders.pending || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 메인 콘텐츠 탭 */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">승인신청 카센터 신청</TabsTrigger>
            <TabsTrigger value="reports">신고 사용 관리</TabsTrigger>
            <TabsTrigger value="notices">공지 사항 관리</TabsTrigger>
            <TabsTrigger value="support">전고객 사용 관리</TabsTrigger>
          </TabsList>

          {/* 승인신청 카센터 신청 */}
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>카센터 승인 대기 목록</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">전체</Button>
                    <Button variant="outline" size="sm">승인</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>업체명</TableHead>
                      <TableHead>사업자등록번호</TableHead>
                      <TableHead>주소</TableHead>
                      <TableHead>신청일</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">{activity.userName}</TableCell>
                        <TableCell>{activity.description.split(' ')[0]}</TableCell>
                        <TableCell>{activity.description.substring(activity.description.indexOf(' ') + 1)}</TableCell>
                        <TableCell>{activity.createdAt}</TableCell>
                        <TableCell>{getStatusBadge(activity.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 신고 사용 관리 */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>신고 및 문의 관리</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-on-surface-variant mx-auto mb-4" />
                  <p className="text-on-surface-variant">처리할 신고가 없습니다.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 공지사항 관리 */}
          <TabsContent value="notices">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>공지사항 관리</CardTitle>
                  <Button onClick={() => navigate("/admin/notices/create")}>
                    공지사항 작성
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-on-surface-variant mx-auto mb-4" />
                  <p className="text-on-surface-variant">등록된 공지사항이 없습니다.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 전고객 사용 관리 */}
          <TabsContent value="support">
            <Card>
              <CardHeader>
                <CardTitle>고객 지원 관리</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-on-surface-variant mx-auto mb-4" />
                  <p className="text-on-surface-variant">처리할 고객 문의가 없습니다.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}