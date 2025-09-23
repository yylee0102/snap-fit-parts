import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function AdminReportManagement() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const reports = [
    {
      id: 1,
      title: "이용약관 위반 부품 판매에 대한 신고",
      reporter: "홍길동",
      reportedUser: "복원되는 부품 아저씨",
      category: "불법 거래",
      reason: "신고사유",
      date: "2025-09-08",
      status: "처리 대기",
      priority: "high"
    }
  ];

  const inquiries = [
    {
      id: 1,
      title: "이용약관 위반 부품 아저씨에게 문의드립니다.",
      author: "홍길동",
      category: "복원/취돼",
      inquiryDate: "2025-09-08",
      status: "처리 대기",
      priority: "처리대기"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "처리 대기":
        return <Badge className="bg-yellow-100 text-yellow-800">처리 대기</Badge>;
      case "처리 완료":
        return <Badge className="bg-green-100 text-green-800">처리 완료</Badge>;
      case "반려":
        return <Badge className="bg-red-100 text-red-800">반려</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">긴급</Badge>;
      case "처리대기":
        return <Badge className="bg-red-100 text-red-800">처리대기</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800">일반</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* 신고 사항 관리 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>신고 사항 관리</CardTitle>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="illegal">불법 거래</SelectItem>
                <SelectItem value="spam">스팸</SelectItem>
                <SelectItem value="abuse">욕설/비하</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline">엑셀</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>신고자</TableHead>
                <TableHead>제목</TableHead>
                <TableHead>신고대상</TableHead>
                <TableHead>신고일</TableHead>
                <TableHead>처리 상태</TableHead>
                <TableHead>관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.reporter}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="max-w-xs truncate">{report.title}</span>
                      {getPriorityBadge(report.priority)}
                    </div>
                  </TableCell>
                  <TableCell>{report.reportedUser}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">보기</Button>
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
              <Button variant="outline" size="sm">이전</Button>
              <Button size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">다음</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 신고된 게시글 관리 */}
      <Card>
        <CardHeader>
          <CardTitle>신고된 게시글 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>작성자</TableHead>
                <TableHead>제목</TableHead>
                <TableHead>신고사유</TableHead>
                <TableHead>신고일</TableHead>
                <TableHead>처리 상태</TableHead>
                <TableHead>관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>홍길동</TableCell>
                <TableCell>이용약관 위반 부품 아저씨에게 문의드립니다.</TableCell>
                <TableCell>복원/취돼</TableCell>
                <TableCell>2025-09-08</TableCell>
                <TableCell>
                  <Badge className="bg-red-100 text-red-800">처리대기</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">처리</Button>
                    <Button size="sm" variant="destructive">삭제</Button>
                  </div>
                </TableCell>
              </TableRow>
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

      {/* 신고된 후기사용 관리 */}
      <Card>
        <CardHeader>
          <CardTitle>신고된 후기사용 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>작성자</TableHead>
                <TableHead>제목</TableHead>
                <TableHead>신고사유</TableHead>
                <TableHead>신고일</TableHead>
                <TableHead>처리 상태</TableHead>
                <TableHead>관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell>{inquiry.author}</TableCell>
                  <TableCell className="max-w-xs truncate">{inquiry.title}</TableCell>
                  <TableCell>{inquiry.category}</TableCell>
                  <TableCell>{inquiry.inquiryDate}</TableCell>
                  <TableCell>{getPriorityBadge(inquiry.priority)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">처리</Button>
                      <Button size="sm" variant="destructive">삭제</Button>
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