// 견적 요청 관리 페이지 (임시)
import { useState } from "react";
import { FileText, Clock, User, Phone, Calendar, Filter, Eye, Edit } from "lucide-react";
import PageContainer from "@/shared/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EstimateRequestsPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // 임시 견적 요청 데이터
  const estimateRequests = [
    {
      id: "REQ001",
      customerName: "김철수",
      customerPhone: "010-1234-5678",
      vehicleInfo: "현대 아반떼 2020년",
      requestDate: "2024.01.15 14:30",
      status: "pending",
      category: "외장수리",
      description: "앞범퍼 교체 필요, 사고로 인한 파손",
      images: ["/api/placeholder/150/150"],
      urgency: "normal"
    },
    {
      id: "REQ002", 
      customerName: "이영희",
      customerPhone: "010-2345-6789",
      vehicleInfo: "기아 쏘렌토 2019년",
      requestDate: "2024.01.15 13:20",
      status: "quoted",
      category: "엔진수리",
      description: "엔진오일 누유, 점검 및 수리 요청",
      images: ["/api/placeholder/150/150", "/api/placeholder/150/150"],
      urgency: "high"
    },
    {
      id: "REQ003",
      customerName: "박민수",
      customerPhone: "010-3456-7890", 
      vehicleInfo: "BMW 320i 2021년",
      requestDate: "2024.01.14 16:45",
      status: "completed",
      category: "타이어교체",
      description: "타이어 4개 교체, 계절용 타이어로 변경",
      images: ["/api/placeholder/150/150"],
      urgency: "normal"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "quoted": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "대기중";
      case "quoted": return "견적완료";
      case "completed": return "수리완료";
      case "cancelled": return "취소됨";
      default: return "알수없음";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "text-red-600";
      case "normal": return "text-gray-600";
      case "low": return "text-gray-400";
      default: return "text-gray-600";
    }
  };

  const filteredRequests = estimateRequests.filter(request => {
    if (filterStatus === "all") return true;
    return request.status === filterStatus;
  });

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6">
        {/* 페이지 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">견적 요청 관리</h1>
            <p className="text-muted-foreground">고객의 견적 요청을 확인하고 관리하세요</p>
          </div>
          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="pending">대기중</SelectItem>
                <SelectItem value="quoted">견적완료</SelectItem>
                <SelectItem value="completed">수리완료</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">총 요청</p>
                  <p className="text-2xl font-bold text-blue-600">{estimateRequests.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">대기중</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {estimateRequests.filter(r => r.status === 'pending').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">견적완료</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {estimateRequests.filter(r => r.status === 'quoted').length}
                  </p>
                </div>
                <Edit className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">수리완료</p>
                  <p className="text-2xl font-bold text-green-600">
                    {estimateRequests.filter(r => r.status === 'completed').length}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 견적 요청 목록 */}
        <div className="space-y-4">
          {filteredRequests.map(request => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{request.customerName}</h3>
                      <p className="text-sm text-muted-foreground">요청번호: {request.id}</p>
                    </div>
                    <Badge className={getStatusColor(request.status)}>
                      {getStatusText(request.status)}
                    </Badge>
                    {request.urgency === "high" && (
                      <Badge variant="destructive">긴급</Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      상세보기
                    </Button>
                    {request.status === "pending" && (
                      <Button size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        견적작성
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{request.vehicleInfo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{request.customerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{request.requestDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{request.category}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">요청 내용:</p>
                  <p className="text-sm">{request.description}</p>
                </div>

                {request.images && request.images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">첨부 이미지:</p>
                    <div className="flex gap-2">
                      {request.images.map((image, index) => (
                        <div key={index} className="w-16 h-16 bg-muted rounded overflow-hidden">
                          <img 
                            src={image} 
                            alt={`첨부이미지 ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">이전</Button>
            <Button size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">다음</Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}