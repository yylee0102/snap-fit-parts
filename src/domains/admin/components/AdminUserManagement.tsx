import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export default function AdminUserManagement() {
  const [selectedTab, setSelectedTab] = useState("pending");

  const pendingApprovals = [
    {
      id: 1,
      applicant: "이현수",
      phone: "010-1234-1111",
      carModel: "GV80",
      requestDate: "09/10 14:00",
      status: "대기중"
    },
    {
      id: 2,
      applicant: "박채은",
      phone: "010-5678-2222",
      carModel: "K5",
      requestDate: "09/10 16:00",
      status: "타이어 휠 교체"
    },
    {
      id: 3,
      applicant: "김현지",
      phone: "010-3333-4444",
      carModel: "Tesla Model 3",
      requestDate: "09/11 10:00",
      status: "정기 점검"
    },
    {
      id: 4,
      applicant: "정헌민",
      phone: "010-5555-6666",
      carModel: "Porsche 911",
      requestDate: "09/11 11:30",
      status: "몰 업러드마트"
    },
    {
      id: 5,
      applicant: "한소희",
      phone: "010-7777-8888",
      carModel: "Audi A6",
      requestDate: "09/12 09:00",
      status: "브레이크 패드 교체"
    }
  ];

  const centerManagement = [
    {
      id: 1,
      centerName: "토탈 카센터",
      registrationNumber: "267-37-01331",
      ownerName: "김기현",
      phone: "031-445-6585",
      address: "경기도 안양시 동안구 홍리대로56번길45동(금성앤빌딩) 1B층402호",
      registrationDate: "2025-09-08",
      status: "승인됨"
    },
    {
      id: 2,
      centerName: "패스 카센터",
      registrationNumber: "123-45-67890",
      ownerName: "이사장",
      phone: "02-123-4567",
      address: "서울특별시 강남구 테헤란로 123",
      registrationDate: "2025-09-07",
      status: "승인됨"
    }
  ];

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
      {/* 탭 버튼 */}
      <div className="flex gap-2">
        <Button
          variant={selectedTab === "pending" ? "default" : "outline"}
          onClick={() => setSelectedTab("pending")}
        >
          신규 예약 관리
        </Button>
        <Button
          variant={selectedTab === "centers" ? "default" : "outline"}
          onClick={() => setSelectedTab("centers")}
        >
          내 카센터 관리
        </Button>
      </div>

      {selectedTab === "pending" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>신규 예약 관리</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" className="bg-red-500 hover:bg-red-600">직접 예약</Button>
              <Button size="sm" variant="outline">예약 추가</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>신청자</TableHead>
                  <TableHead>연락처</TableHead>
                  <TableHead>차량정보</TableHead>
                  <TableHead>예약일시</TableHead>
                  <TableHead>요청사항</TableHead>
                  <TableHead>관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingApprovals.map((approval) => (
                  <TableRow key={approval.id}>
                    <TableCell className="font-medium">{approval.applicant}</TableCell>
                    <TableCell>{approval.phone}</TableCell>
                    <TableCell>{approval.carModel}</TableCell>
                    <TableCell>{approval.requestDate}</TableCell>
                    <TableCell>
                      {approval.status === "대기중" ? (
                        <Badge className="bg-yellow-100 text-yellow-800">{approval.status}</Badge>
                      ) : (
                        <span className="text-sm">{approval.status}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive">
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
                <Button variant="outline" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === "centers" && (
        <Card>
          <CardHeader>
            <CardTitle>내 카센터 관리</CardTitle>
            <p className="text-sm text-muted-foreground">
              고객에게 보여지는 카센터 정보를 수정할 수 있습니다.
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>업체명</TableHead>
                  <TableHead>사업자등록번호</TableHead>
                  <TableHead>대표자명</TableHead>
                  <TableHead>연락처</TableHead>
                  <TableHead>주소</TableHead>
                  <TableHead>등록일</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {centerManagement.map((center) => (
                  <TableRow key={center.id}>
                    <TableCell className="font-medium">{center.centerName}</TableCell>
                    <TableCell>{center.registrationNumber}</TableCell>
                    <TableCell>{center.ownerName}</TableCell>
                    <TableCell>{center.phone}</TableCell>
                    <TableCell className="max-w-xs truncate">{center.address}</TableCell>
                    <TableCell>{center.registrationDate}</TableCell>
                    <TableCell>{getStatusBadge(center.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">수정</Button>
                        <Button size="sm" variant="destructive">삭제</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* 후기 관리 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle>후기 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>내용</TableHead>
                <TableHead>작성자</TableHead>
                <TableHead>평점</TableHead>
                <TableHead>작성일</TableHead>
                <TableHead>관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>친절하고 빠른 서비스였습니다!</TableCell>
                <TableCell>김민수</TableCell>
                <TableCell>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>2025-09-08</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">답글</Button>
                    <Button size="sm" variant="destructive">신고</Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>설명이 친절하셔서 좋았어요.</TableCell>
                <TableCell>최유진</TableCell>
                <TableCell>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>2025-09-07</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600">답글완료</Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          {/* 페이지네이션 */}
          <div className="flex justify-center mt-4">
            <div className="flex gap-1">
              <Button variant="outline" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}