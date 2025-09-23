/**
 * 카센터 승인 상세 모달
 * - 카센터 등록 신청 내용 확인
 * - 승인 또는 반려 처리
 * - 반려 사유 입력
 * AdminController의 카센터 승인 관리 API 기반
 */
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Building, Phone, MapPin, FileText, Calendar, Check, X } from 'lucide-react';

interface CarCenterApproval {
  approvalId: number;
  centerId: string;
  centerName: string;
  businessRegistrationNumber: string;
  address: string;
  phoneNumber: string;
  ownerName: string;
  email: string;
  description?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
  processedAt?: string;
  rejectionReason?: string;
}

interface CenterApprovalDetailModalProps {
  open: boolean;
  onClose: () => void;
  approvalId?: number;
  onUpdate: () => void;
}

export const CenterApprovalDetailModal = ({ open, onClose, approvalId, onUpdate }: CenterApprovalDetailModalProps) => {
  const { toast } = useToast();
  const [approval, setApproval] = useState<CarCenterApproval | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  useEffect(() => {
    if (approvalId && open) {
      loadApprovalDetail();
    }
  }, [approvalId, open]);

  const loadApprovalDetail = () => {
    // Mock data - 실제로는 API 호출: GET /api/admin/approvals/{approvalId}
    const mockApproval: CarCenterApproval = {
      approvalId: approvalId!,
      centerId: 'newcenter001',
      centerName: '신규 카센터',
      businessRegistrationNumber: '123-45-67890',
      address: '서울시 강남구 테헤란로 123',
      phoneNumber: '02-1234-5678',
      ownerName: '김사장',
      email: 'newcenter@example.com',
      description: '고품질 서비스를 제공하는 카센터입니다. 20년 경력의 숙련된 정비사가 정성껏 관리해드립니다.',
      status: 'PENDING',
      submittedAt: '2024-01-15T09:00:00Z'
    };
    setApproval(mockApproval);
  };

  const handleApprove = () => {
    if (!approval) return;

    // API 호출: POST /api/admin/approvals/{approvalId}/approve
    toast({ title: '카센터가 승인되었습니다.' });
    onUpdate();
    onClose();
  };

  const handleReject = () => {
    if (!approval || !rejectionReason.trim()) {
      toast({
        title: '반려 사유 필요',
        description: '반려 사유를 입력해주세요.',
        variant: 'destructive'
      });
      return;
    }

    // API 호출: DELETE /api/admin/approvals/{approvalId}?reason={rejectionReason}
    toast({ title: '카센터 신청이 반려되었습니다.' });
    onUpdate();
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return '승인 대기';
      case 'APPROVED': return '승인 완료';
      case 'REJECTED': return '반려';
      default: return status;
    }
  };

  if (!approval) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>카센터 승인 관리</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* 신청 기본 정보 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium">신청 #{approval.approvalId}</span>
              <Badge className={getStatusColor(approval.status)}>
                {getStatusText(approval.status)}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span>{approval.centerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{approval.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{approval.businessRegistrationNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(approval.submittedAt).toLocaleString('ko-KR')}</span>
              </div>
            </div>
          </div>

          {/* 카센터 상세 정보 */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label className="text-base font-medium">카센터 아이디</Label>
              <p className="mt-1 p-3 bg-gray-50 rounded border">{approval.centerId}</p>
            </div>

            <div>
              <Label className="text-base font-medium">사업자명</Label>
              <p className="mt-1 p-3 bg-gray-50 rounded border">{approval.ownerName}</p>
            </div>

            <div>
              <Label className="text-base font-medium">이메일</Label>
              <p className="mt-1 p-3 bg-gray-50 rounded border">{approval.email}</p>
            </div>

            <div>
              <Label className="text-base font-medium">주소</Label>
              <p className="mt-1 p-3 bg-gray-50 rounded border flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {approval.address}
              </p>
            </div>

            {approval.description && (
              <div>
                <Label className="text-base font-medium">카센터 소개</Label>
                <p className="mt-1 p-3 bg-gray-50 rounded border whitespace-pre-wrap">{approval.description}</p>
              </div>
            )}
          </div>

          {/* 반려 사유 입력 폼 */}
          {showRejectForm && (
            <div>
              <Label htmlFor="rejectionReason" className="text-base font-medium text-red-600">
                반려 사유 *
              </Label>
              <Textarea
                id="rejectionReason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="반려 사유를 구체적으로 작성해주세요"
                rows={4}
              />
            </div>
          )}

          {/* 액션 버튼 */}
          <div className="flex gap-2">
            {approval.status === 'PENDING' && !showRejectForm && (
              <>
                <Button onClick={handleApprove} className="flex-1 bg-green-600 hover:bg-green-700">
                  <Check className="h-4 w-4 mr-2" />
                  승인
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => setShowRejectForm(true)}
                  className="flex-1"
                >
                  <X className="h-4 w-4 mr-2" />
                  반려
                </Button>
              </>
            )}
            
            {showRejectForm && (
              <>
                <Button onClick={handleReject} variant="destructive" className="flex-1">
                  <X className="h-4 w-4 mr-2" />
                  반려 처리
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowRejectForm(false);
                    setRejectionReason('');
                  }}
                >
                  취소
                </Button>
              </>
            )}
            
            <Button variant="outline" onClick={onClose}>
              닫기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};