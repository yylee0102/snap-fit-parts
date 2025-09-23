import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Eye } from "lucide-react";

export default function AdminCenterApproval() {
  const [pendingCenters] = useState([
    {
      id: 1,
      centerName: "토탈 카센터",
      ownerName: "김기현",
      businessNumber: "267-37-01331",
      phone: "031-445-6585",
      email: "total@center.com",
      address: "경기도 안양시 동안구 홍리대로56번길45동",
      appliedDate: "2025-09-08",
      status: "대기중"
    },
    {
      id: 2,
      centerName: "패스 카센터",
      ownerName: "이사장",
      businessNumber: "123-45-67890",
      phone: "02-123-4567",
      email: "pass@center.com",
      address: "서울특별시 강남구 테헤란로 123",
      appliedDate: "2025-09-07",
      status: "대기중"
    }
  ]);

  const handleApprove = (centerId: number) => {
    // TODO: API 연결 - 카센터 승인
    // POST /api/admin/centers/{centerId}/approve
    console.log(`카센터 ${centerId} 승인`);
  };

  const handleReject = (centerId: number) => {
    // TODO: API 연결 - 카센터 거절
    // POST /api/admin/centers/{centerId}/reject
    console.log(`카센터 ${centerId} 거절`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "승인됨":
        return <Badge className="bg-green-100 text-green-800">승인됨</Badge>;
      case "대기중":
        return <Badge className="bg-yellow-100 text-yellow-800">대기중</Badge>;
      case "거절됨":
        return <Badge className="bg-red-100 text-red-800">거절됨</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>카센터 가입 승인 관리</CardTitle>
          <p className="text-sm text-muted-foreground">
            새로 가입한 카센터의 승인 요청을 관리할 수 있습니다.
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>카센터명</TableHead>
                <TableHead>대표자</TableHead>
                <TableHead>사업자번호</TableHead>
                <TableHead>연락처</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>주소</TableHead>
                <TableHead>신청일</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingCenters.map((center) => (
                <TableRow key={center.id}>
                  <TableCell className="font-medium">{center.centerName}</TableCell>
                  <TableCell>{center.ownerName}</TableCell>
                  <TableCell>{center.businessNumber}</TableCell>
                  <TableCell>{center.phone}</TableCell>
                  <TableCell>{center.email}</TableCell>
                  <TableCell className="max-w-xs truncate">{center.address}</TableCell>
                  <TableCell>{center.appliedDate}</TableCell>
                  <TableCell>{getStatusBadge(center.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" title="상세보기">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => handleApprove(center.id)}
                        title="승인"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleReject(center.id)}
                        title="거절"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* 페이지네이션 */}
          <div className="flex justify-center mt-4">
            <div className="flex gap-1">
              <Button variant="outline" size="sm">이전</Button>
              <Button size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">다음</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}