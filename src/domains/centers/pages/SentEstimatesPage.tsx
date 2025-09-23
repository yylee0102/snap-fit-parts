// 보낸 견적 관리 페이지 (임시)
import { useState } from "react";
import { FileText, Eye, Edit, Trash2, Download, Phone, Calendar, Filter } from "lucide-react";
import PageContainer from "@/shared/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SentEstimatesPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // 임시 보낸 견적 데이터
  const sentEstimates = [
    {
      id: "EST001",
      requestId: "REQ001",
      customerName: "김철수", 
      customerPhone: "010-1234-5678",
      vehicleInfo: "현대 아반떼 2020년",
      sentDate: "2024.01.15 16:30",
      amount: 350000,
      status: "pending", // pending, accepted, rejected, expired
      validUntil: "2024.01.22",
      items: ["앞범퍼 교체", "헤드라이트 수리"],
      responseDate: null
    },
    {
      id: "EST002",
      requestId: "REQ002", 
      customerName: "이영희",
      customerPhone: "010-2345-6789",
      vehicleInfo: "기아 쏘렌토 2019년",
      sentDate: "2024.01.15 15:45",
      amount: 280000,
      status: "accepted",
      validUntil: "2024.01.22",
      items: ["엔진오일 교체", "브레이크 패드 교체"],
      responseDate: "2024.01.16 10:20"
    },
    {
      id: "EST003",
      requestId: "REQ003",
      customerName: "박민수",
      customerPhone: "010-3456-7890",
      vehicleInfo: "BMW 320i 2021년", 
      sentDate: "2024.01.14 14:20",
      amount: 450000,
      status: "rejected",
      validUntil: "2024.01.21",
      items: ["타이어 4개 교체", "휠 얼라인먼트"],
      responseDate: "2024.01.15 09:30"
    },
    {
      id: "EST004",
      requestId: "REQ004",
      customerName: "정수민",
      customerPhone: "010-4567-8901", 
      vehicleInfo: "토요타 캠리 2018년",
      sentDate: "2024.01.10 11:30",
      amount: 180000,
      status: "expired",
      validUntil: "2024.01.17",
      items: ["배터리 교체"],
      responseDate: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "accepted": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "expired": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "대기중";
      case "accepted": return "수락됨";
      case "rejected": return "거절됨";
      case "expired": return "만료됨";
      default: return "알수없음";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price) + '원';
  };

  const filteredEstimates = sentEstimates.filter(estimate => {
    if (filterStatus === "all") return true;
    return estimate.status === filterStatus;
  });

  const statusCounts = {
    total: sentEstimates.length,
    pending: sentEstimates.filter(e => e.status === 'pending').length,
    accepted: sentEstimates.filter(e => e.status === 'accepted').length,
    rejected: sentEstimates.filter(e => e.status === 'rejected').length,
    expired: sentEstimates.filter(e => e.status === 'expired').length
  };

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6">
        {/* 페이지 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">보낸 견적 관리</h1>
            <p className="text-muted-foreground">발송한 견적서의 상태를 확인하고 관리하세요</p>
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
                <SelectItem value="accepted">수락됨</SelectItem>
                <SelectItem value="rejected">거절됨</SelectItem>
                <SelectItem value="expired">만료됨</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">총 견적</p>
                <p className="text-2xl font-bold text-blue-600">{statusCounts.total}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">대기중</p>
                <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">수락됨</p>
                <p className="text-2xl font-bold text-green-600">{statusCounts.accepted}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">거절됨</p>
                <p className="text-2xl font-bold text-red-600">{statusCounts.rejected}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">만료됨</p>
                <p className="text-2xl font-bold text-gray-600">{statusCounts.expired}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 견적 목록 */}
        <div className="space-y-4">
          {filteredEstimates.map(estimate => (
            <Card key={estimate.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{estimate.customerName}</h3>
                      <p className="text-sm text-muted-foreground">
                        견적번호: {estimate.id} | 요청번호: {estimate.requestId}
                      </p>
                    </div>
                    <Badge className={getStatusColor(estimate.status)}>
                      {getStatusText(estimate.status)}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      상세보기
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      다운로드
                    </Button>
                    {estimate.status === "pending" && (
                      <>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          수정
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          취소
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{estimate.vehicleInfo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{estimate.customerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">발송: {estimate.sentDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">만료: {estimate.validUntil}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">견적 항목:</p>
                    <div className="flex gap-2 flex-wrap">
                      {estimate.items.map((item, index) => (
                        <Badge key={index} variant="outline">{item}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">견적 금액</p>
                    <p className="text-xl font-bold text-primary">{formatPrice(estimate.amount)}</p>
                    {estimate.responseDate && (
                      <p className="text-xs text-muted-foreground">
                        응답: {estimate.responseDate}
                      </p>
                    )}
                  </div>
                </div>
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