/**
 * 카센터 승인 상세 모달
 * 
 * 이 모달의 역할:
 * - 카센터 가입 신청서 상세 정보 확인
 * - 승인/반려 결정을 위한 상세 검토 인터페이스
 * - 반려 시 사유 입력 기능
 * 
 * 왜 필요한가:
 * - 카센터 품질 관리를 위한 철저한 사전 검토
 * - 서비스 신뢰도 향상을 위한 엄격한 승인 프로세스
 * - 투명한 승인/반려 과정 제공
 */

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Calendar, Phone, Mail, MapPin, FileText } from "lucide-react";
import adminApiService, { CarCenterApproval } from "@/services/admin.api";

interface CenterApprovalDetailModalProps {
  open: boolean;
  onClose: () => void;
  approvalId: number | null;
  onApprovalUpdate: () => void;
}

export default function CenterApprovalDetailModal({ 
  open, 
  onClose, 
  approvalId,
  onApprovalUpdate 
}: CenterApprovalDetailModalProps) {
  const [approvalData, setApprovalData] = useState<CarCenterApproval | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (open && approvalId) {
      fetchApprovalDetail();
    }
  }, [open, approvalId]);

  const fetchApprovalDetail = async () => {
    if (!approvalId) return;
    
    setIsLoading(true);
    try {
      // TODO: 실제 API 연결 시 사용
      // const data = await adminApiService.getCenterApproval(approvalId);
      // setApprovalData(data);
      
      // 개발용 임시 데이터
      const tempData: CarCenterApproval = {
        approvalId: approvalId,
        requestedAt: "2025-09-08",
        centerId: "center1",
        centerName: "스피드카센터",
        businessNumber: "123-45-67890",
        address: "서울시 강남구 테헤란로 123",
        phone: "02-1234-5678",
        email: "speed@center.com",
        status: 'PENDING'
      };
      setApprovalData(tempData);
    } catch (error) {
      console.error("승인 상세 조회 실패:", error);
      toast({
        title: "조회 실패",
        description: "승인 정보를 불러오는데 실패했습니다.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!approvalId) return;

    setIsLoading(true);
    try {
      await adminApiService.approveCenter(approvalId);
      
      toast({
        title: "승인 완료",
        description: "카센터가 성공적으로 승인되었습니다."
      });
      
      onApprovalUpdate();
      onClose();
    } catch (error) {
      console.error("승인 실패:", error);
      toast({
        title: "승인 실패",
        description: "카센터 승인 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    if (!approvalId || !rejectReason.trim()) {
      toast({
        title: "반려 사유 필요",
        description: "반려 사유를 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await adminApiService.rejectCenter(approvalId, rejectReason);
      
      toast({
        title: "반려 완료",
        description: "카센터 신청이 반려되었습니다."
      });
      
      onApprovalUpdate();
      onClose();
    } catch (error) {
      console.error("반려 실패:", error);
      toast({
        title: "반려 실패",
        description: "카센터 반려 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge className="bg-yellow-100 text-yellow-800">승인 대기</Badge>;
      case 'APPROVED':
        return <Badge className="bg-green-100 text-green-800">승인 완료</Badge>;
      case 'REJECTED':
        return <Badge className="bg-red-100 text-red-800">반려</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleClose = () => {
    setShowRejectInput(false);
    setRejectReason("");
    onClose();
  };

  if (!approvalData) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            카센터 승인 상세
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 기본 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">카센터명</Label>
              <p className="text-lg font-semibold">{approvalData.centerName}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">상태</Label>
              <div>{getStatusBadge(approvalData.status)}</div>
            </div>
          </div>

          {/* 사업자 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">사업자번호</Label>
              <p className="font-mono">{approvalData.businessNumber}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                신청일
              </Label>
              <p>{approvalData.requestedAt}</p>
            </div>
          </div>

          {/* 연락처 정보 */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <Phone className="h-4 w-4" />
                전화번호
              </Label>
              <p>{approvalData.phone}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <Mail className="h-4 w-4" />
                이메일
              </Label>
              <p>{approvalData.email}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                주소
              </Label>
              <p>{approvalData.address}</p>
            </div>
          </div>

          {/* 반려 사유 입력 */}
          {showRejectInput && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-red-600">반려 사유</Label>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="반려 사유를 입력하세요..."
                rows={4}
              />
            </div>
          )}

          {/* 액션 버튼 */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleClose} disabled={isLoading}>
              닫기
            </Button>
            
            {approvalData.status === 'PENDING' && (
              <>
                {showRejectInput ? (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowRejectInput(false)}
                      disabled={isLoading}
                    >
                      취소
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleReject}
                      disabled={isLoading || !rejectReason.trim()}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      반려 확정
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="destructive" 
                      onClick={() => setShowRejectInput(true)}
                      disabled={isLoading}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      반려
                    </Button>
                    <Button 
                      onClick={handleApprove}
                      disabled={isLoading}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      승인
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}