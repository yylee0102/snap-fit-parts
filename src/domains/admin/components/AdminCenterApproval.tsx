/**
 * 카센터 승인 관리 컴포넌트
 * 
 * 이 컴포넌트의 역할:
 * - 카센터 가입 신청 목록 조회 및 관리
 * - 승인/반려 처리 기능
 * - 상세 정보 확인 모달 연동
 * 
 * 왜 필요한가:
 * - 카센터 품질 관리를 통한 서비스 신뢰도 향상
 * - 체계적인 카센터 등록 프로세스 제공
 * - 관리자의 효율적인 승인 업무 지원
 */

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye } from "lucide-react";
import CenterApprovalDetailModal from "@/shared/modals/CenterApprovalDetailModal";
import { useToast } from "@/hooks/use-toast";
import adminApiService, { CarCenterApproval } from "@/services/admin.api";

export default function AdminCenterApproval() {
  /**
   * 상태 관리
   * - pendingCenters: 승인 대기 중인 카센터 목록
   * - selectedApprovalId: 상세 조회할 승인 ID
   * - showDetailModal: 상세 모달 표시 여부
   * - isLoading: 데이터 로딩 상태
   */
  const [pendingCenters, setPendingCenters] = useState<CarCenterApproval[]>([]);
  const [selectedApprovalId, setSelectedApprovalId] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // 컴포넌트 마운트 시 승인 대기 목록 조회
  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  /**
   * 승인 대기 중인 카센터 목록 조회
   * API: GET /api/admin/approvals/pending
   */
  const fetchPendingApprovals = async () => {
    setIsLoading(true);
    try {
      // TODO: 실제 API 연결 시 사용
      // const data = await adminApiService.getPendingApprovals();
      // setPendingCenters(data);

      // 개발용 임시 데이터
      const tempData: CarCenterApproval[] = [
        {
          approvalId: 1,
          centerName: "토탈 카센터",
          businessNumber: "267-37-01331",
          address: "경기도 안양시 동안구 홍리대로56번길45동",
          phone: "031-445-6585",
          email: "total@center.com",
          requestDate: "2025-09-08",
          status: 'PENDING'
        },
        {
          approvalId: 2,
          centerName: "패스 카센터",
          businessNumber: "123-45-67890",
          address: "서울특별시 강남구 테헤란로 123",
          phone: "02-123-4567",
          email: "pass@center.com",
          requestDate: "2025-09-07",
          status: 'PENDING'
        }
      ];
      setPendingCenters(tempData);
    } catch (error) {
      console.error("승인 대기 목록 조회 실패:", error);
      toast({
        title: "조회 실패",
        description: "승인 대기 목록을 불러오는데 실패했습니다.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 상세 정보 조회 모달 열기
   * @param approvalId 승인 ID
   */
  const handleViewDetail = (approvalId: number) => {
    setSelectedApprovalId(approvalId);
    setShowDetailModal(true);
  };

  /**
   * 승인/반려 처리 후 목록 새로고침
   */
  const handleApprovalUpdate = () => {
    fetchPendingApprovals();
  };

  /**
   * 상태에 따른 뱃지 스타일 반환
   * @param status 승인 상태
   */
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge className="bg-yellow-100 text-yellow-800">승인 대기</Badge>;
      case "APPROVED":
        return <Badge className="bg-green-100 text-green-800">승인 완료</Badge>;
      case "REJECTED":
        return <Badge className="bg-red-100 text-red-800">반려</Badge>;
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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    데이터를 불러오는 중...
                  </TableCell>
                </TableRow>
              ) : pendingCenters.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    승인 대기 중인 카센터가 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                pendingCenters.map((center) => (
                  <TableRow key={center.approvalId}>
                    <TableCell className="font-medium">{center.centerName}</TableCell>
                    <TableCell className="font-mono">{center.businessNumber}</TableCell>
                    <TableCell>{center.phone}</TableCell>
                    <TableCell>{center.email}</TableCell>
                    <TableCell className="max-w-xs truncate">{center.address}</TableCell>
                    <TableCell>{center.requestDate}</TableCell>
                    <TableCell>{getStatusBadge(center.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewDetail(center.approvalId)}
                          title="상세보기"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          
          {/* 페이지네이션 - TODO: 실제 페이지네이션 구현 */}
          <div className="flex justify-center mt-4">
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>이전</Button>
              <Button size="sm">1</Button>
              <Button variant="outline" size="sm" disabled>다음</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 카센터 승인 상세 모달 */}
      <CenterApprovalDetailModal 
        open={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        approvalId={selectedApprovalId}
        onApprovalUpdate={handleApprovalUpdate}
      />
    </div>
  );
}