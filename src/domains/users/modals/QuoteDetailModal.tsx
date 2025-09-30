import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Amount } from '@/components/ui/amount';
import { DateTime } from '@/components/ui/date-time';
import { 
  Building2, 
  Car, 
  MapPin, 
  Clock, 
  FileText, 
  MessageCircle, 
  CheckCircle2,
  Phone,
  Mail
} from 'lucide-react';

interface EstimateDetail {
  estimateId: number;
  centerName: string;
  centerAddress?: string;
  centerPhone?: string;
  centerEmail?: string;
  estimatedCost: number;
  details: string;
  items?: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  laborHours?: number;
  notes?: string;
  createdAt: string;
  validUntil?: string;
}

interface QuoteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  estimate: EstimateDetail | null;
  carInfo?: {
    model: string;
    year: number;
    location: string;
  };
}

export const QuoteDetailModal: React.FC<QuoteDetailModalProps> = ({
  isOpen,
  onClose,
  estimate,
  carInfo
}) => {
  if (!estimate) return null;

  const totalItems = estimate.items?.reduce((sum, item) => sum + item.totalPrice, 0) || 0;
  const laborCost = estimate.laborHours ? estimate.laborHours * 50000 : 0; // 시간당 5만원 가정

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Building2 className="h-6 w-6 text-primary" />
                {estimate.centerName}
              </DialogTitle>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                {estimate.centerAddress && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{estimate.centerAddress}</span>
                  </div>
                )}
                {estimate.centerPhone && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <span>{estimate.centerPhone}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                <Amount value={estimate.estimatedCost} size="lg" />
              </div>
              <DateTime date={estimate.createdAt} prefix="견적일:" format="short" />
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* 차량 정보 */}
          {carInfo && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  차량 정보
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">차량 모델</p>
                    <p className="text-base font-semibold">{carInfo.model}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">연식</p>
                    <p className="text-base font-semibold">{carInfo.year}년</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">지역</p>
                    <p className="text-base font-semibold">{carInfo.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 견적 내용 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                견적 상세 내용
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed">{estimate.details}</p>
            </CardContent>
          </Card>

          {/* 작업 항목 상세 */}
          {estimate.items && estimate.items.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">작업 항목 및 비용</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium">항목</th>
                          <th className="text-center py-2 font-medium">수량</th>
                          <th className="text-right py-2 font-medium">단가</th>
                          <th className="text-right py-2 font-medium">금액</th>
                        </tr>
                      </thead>
                      <tbody>
                        {estimate.items.map((item, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 font-medium">{item.name}</td>
                            <td className="py-3 text-center">{item.quantity}</td>
                            <td className="py-3 text-right">
                              <Amount value={item.unitPrice} />
                            </td>
                            <td className="py-3 text-right font-semibold">
                              <Amount value={item.totalPrice} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>부품/재료비</span>
                      <Amount value={totalItems} />
                    </div>
                    {estimate.laborHours && (
                      <div className="flex justify-between">
                        <span>공임비 ({estimate.laborHours}시간)</span>
                        <Amount value={laborCost} />
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>총 견적 금액</span>
                      <Amount value={estimate.estimatedCost} size="lg" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 추가 정보 */}
          {estimate.notes && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">추가 안내사항</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed">{estimate.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* 견적 유효기간 */}
          {estimate.validUntil && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-orange-700">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">
                    견적 유효기간: <DateTime date={estimate.validUntil} format="date" />까지
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter className="pt-6 gap-3">
          <Button variant="outline" onClick={onClose}>
            닫기
          </Button>
          <Button variant="outline" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            채팅하기
          </Button>
          <Button className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            견적 승인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};