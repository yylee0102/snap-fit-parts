import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import adminApiService, { ReviewReport, CsInquiry } from "@/services/admin.api";

export default function AdminReportManagement() {
  /**
   * 신고 및 문의 관리 컴포넌트
   * 
   * 주요 기능:
   * - 리뷰 신고 목록 조회 및 처리
   * - 1:1 문의 목록 조회 및 답변
   * - 신고/문의 상태 관리
   * 
   * 백엔드 API 연결:
   * - GET /api/admin/reports/reviews - 리뷰 신고 전체 조회
   * - DELETE /api/admin/reports/reviews/{id} - 리뷰 신고 삭제
   * - GET /api/admin/cs - 1:1 문의 전체 조회
   * - PUT /api/admin/cs/{id}/answer - 1:1 문의 답변
   */
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [reports, setReports] = useState<ReviewReport[]>([]);
  const [inquiries, setInquiries] = useState<CsInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
    fetchInquiries();
  }, []);

  const fetchReports = async () => {
    try {
      // TODO: 실제 API 연결 시 사용
      // const data = await adminApiService.getAllReviewReports();
      // setReports(data);
      
      // 개발용 임시 데이터
      const tempReports: ReviewReport[] = [
        {
          reportId: 1,
          reviewId: 101,
          reporterName: "홍길동",
          reason: "부적절한 리뷰 내용",
          reportDate: "2025-09-08",
          status: 'PENDING'
        }
      ];
      setReports(tempReports);
    } catch (error) {
      console.error("신고 목록 조회 실패:", error);
    }
  };

  const fetchInquiries = async () => {
    try {
      // TODO: 실제 API 연결 시 사용
      // const data = await adminApiService.getAllCsInquiries();
      // setInquiries(data);
      
      // 개발용 임시 데이터
      const tempInquiries: CsInquiry[] = [
        {
          inquiryId: 1,
          userId: "user123",
          title: "견적 요청 관련 문의",
          content: "견적 요청 후 연락이 오지 않습니다.",
          status: 'PENDING',
          createdAt: "2025-09-08"
        }
      ];
      setInquiries(tempInquiries);
    } catch (error) {
      console.error("문의 목록 조회 실패:", error);
    }
  };

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