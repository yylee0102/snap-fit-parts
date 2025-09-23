/**
 * 고객센터 문의 상세 모달
 * - 문의 내용 확인 및 답변 작성
 * - 문의 상태 변경 (처리중, 완료)
 * AdminController의 CS 문의 관리 API 기반
 */
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, User, Calendar, Mail } from 'lucide-react';

interface CsInquiry {
  inquiryId: number;
  userId: string;
  userName: string;
  email: string;
  category: string;
  title: string;
  content: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  answer?: string;
  createdAt: string;
  answeredAt?: string;
}

interface CsInquiryDetailModalProps {
  open: boolean;
  onClose: () => void;
  inquiryId?: number;
  onUpdate: () => void;
}

export const CsInquiryDetailModal = ({ open, onClose, inquiryId, onUpdate }: CsInquiryDetailModalProps) => {
  const { toast } = useToast();
  const [inquiry, setInquiry] = useState<CsInquiry | null>(null);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (inquiryId && open) {
      loadInquiryDetail();
    }
  }, [inquiryId, open]);

  const loadInquiryDetail = () => {
    // Mock data - 실제로는 API 호출: GET /api/admin/cs/{inquiryId}
    const mockInquiry: CsInquiry = {
      inquiryId: inquiryId!,
      userId: 'user001',
      userName: '김고객',
      email: 'customer@example.com',
      category: '서비스 문의',
      title: '견적 요청 관련 문의',
      content: '견적 요청을 했는데 답변이 오지 않아서 문의드립니다. 언제쯤 답변을 받을 수 있을까요?',
      status: 'PENDING',
      createdAt: '2024-01-15T10:30:00Z'
    };
    setInquiry(mockInquiry);
    setAnswer(mockInquiry.answer || '');
  };

  const handleSubmitAnswer = () => {
    if (!inquiry || !answer.trim()) return;

    // API 호출: PUT /api/admin/cs/{inquiryId}/answer
    const updatedInquiry = {
      ...inquiry,
      answer,
      status: 'COMPLETED' as const,
      answeredAt: new Date().toISOString()
    };

    setInquiry(updatedInquiry);
    toast({ title: '답변이 등록되었습니다.' });
    onUpdate();
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return '답변 대기';
      case 'IN_PROGRESS': return '처리중';
      case 'COMPLETED': return '답변 완료';
      default: return status;
    }
  };

  if (!inquiry) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>고객센터 문의 상세</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* 문의 기본 정보 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium">문의 #{inquiry.inquiryId}</span>
              <Badge className={getStatusColor(inquiry.status)}>
                {getStatusText(inquiry.status)}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{inquiry.userName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{inquiry.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>{inquiry.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(inquiry.createdAt).toLocaleString('ko-KR')}</span>
              </div>
            </div>
          </div>

          {/* 문의 내용 */}
          <div>
            <Label className="text-base font-medium">문의 제목</Label>
            <p className="mt-1 p-3 bg-gray-50 rounded border">{inquiry.title}</p>
          </div>

          <div>
            <Label className="text-base font-medium">문의 내용</Label>
            <p className="mt-1 p-3 bg-gray-50 rounded border whitespace-pre-wrap">{inquiry.content}</p>
          </div>

          {/* 답변 섹션 */}
          <div>
            <Label htmlFor="answer" className="text-base font-medium">
              답변 {inquiry.status === 'COMPLETED' ? '(완료)' : '작성'}
            </Label>
            <Textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="고객에게 전달할 답변을 작성하세요"
              rows={6}
              disabled={inquiry.status === 'COMPLETED'}
            />
            {inquiry.answeredAt && (
              <p className="text-sm text-muted-foreground mt-1">
                답변 등록일: {new Date(inquiry.answeredAt).toLocaleString('ko-KR')}
              </p>
            )}
          </div>

          {/* 액션 버튼 */}
          <div className="flex gap-2">
            {inquiry.status !== 'COMPLETED' && (
              <Button onClick={handleSubmitAnswer} className="flex-1">
                답변 등록
              </Button>
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