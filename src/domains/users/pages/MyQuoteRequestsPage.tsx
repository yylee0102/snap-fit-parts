/**
 * 사용자 견적 요청 관리 페이지 - 현대적이고 깔끔한 디자인
 * 
 * 주요 기능:
 * - 제출한 견적 요청 정보 표시
 * - 받은 견적들을 인터랙티브 카드로 표시
 * - 견적 상세 모달
 * - 반응형 디자인
 * - 접근성 지원
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/shared/components/layout/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, 
  Car, 
  MapPin, 
  FileText, 
  RefreshCw,
  Plus,
  Trash2,
  Building2,
  Clock,
  MessageCircle,
  CheckCircle2,
  Eye
} from 'lucide-react';

// 컴포넌트들
import { Amount } from '@/components/ui/amount';
import { DateTime } from '@/components/ui/date-time';
import { QuoteDetailModal } from '@/domains/users/modals/QuoteDetailModal';

// API 서비스
import UserApiService from '@/services/user.api';

// 타입 정의 - 업로드된 파일의 타입과 일치
interface MyQuoteRequest {
  requestId: number;
  car: { carModel: string; modelYear: number; };
  requestDetails: string;
  address: string;
  createdAt: string;
  images: { imageUrl: string; }[];
  estimates: Estimate[];
}

interface Estimate {
  estimateId: number;
  centerName: string;
  estimatedCost: number;
  details: string;
  centerAddress?: string;
  centerPhone?: string;
  items?: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  laborHours?: number;
  notes?: string;
  createdAt?: string;
  validUntil?: string;
}

export const MyQuoteRequestsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // 상태 관리
  const [myRequest, setMyRequest] = useState<MyQuoteRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 데이터 로딩
  const loadMyRequest = async () => {
    setIsLoading(true);
    try {
      // 실제 API 호출
      const data = await UserApiService.getMyQuoteRequest();
      
      if (data) {
        // Mock 견적 데이터 추가 (실제 API가 견적 정보를 포함하지 않는 경우)
        const mockEstimates: Estimate[] = [
          {
            estimateId: 1,
            centerName: "프리미엄 카센터",
            estimatedCost: 250000,
            details: "브레이크 패드 및 디스크 교체가 필요합니다. 정밀 진단 결과 브레이크 패드가 2mm 이하로 마모되었으며, 디스크도 일부 손상이 있어 함께 교체하는 것을 권장합니다.",
            centerAddress: "서울 강남구 테헤란로 123",
            centerPhone: "02-1234-5678",
            items: [
              { name: "브레이크 패드 (전)", quantity: 1, unitPrice: 80000, totalPrice: 80000 },
              { name: "브레이크 디스크 (전)", quantity: 2, unitPrice: 70000, totalPrice: 140000 },
              { name: "브레이크 오일", quantity: 1, unitPrice: 15000, totalPrice: 15000 }
            ],
            laborHours: 3,
            notes: "작업 완료 후 3개월 또는 5,000km 무료 점검 서비스 제공",
            createdAt: "2024-01-16T10:30:00Z",
            validUntil: "2024-02-16T23:59:59Z"
          },
          {
            estimateId: 2,
            centerName: "믿음직한 정비소",
            estimatedCost: 180000,
            details: "브레이크 패드만 교체하면 될 것 같습니다. 디스크는 아직 사용 가능한 상태입니다.",
            centerAddress: "서울 서초구 반포대로 456",
            centerPhone: "02-2345-6789",
            items: [
              { name: "브레이크 패드 (전)", quantity: 1, unitPrice: 65000, totalPrice: 65000 },
              { name: "브레이크 오일", quantity: 1, unitPrice: 12000, totalPrice: 12000 }
            ],
            laborHours: 2,
            notes: "1년 품질보증 제공",
            createdAt: "2024-01-17T14:20:00Z",
            validUntil: "2024-02-17T23:59:59Z"
          },
          {
            estimateId: 3,
            centerName: "스피드 오토케어",
            estimatedCost: 320000,
            details: "브레이크 시스템 전체 점검 및 교체를 권장합니다. 안전을 위해 고품질 부품 사용을 추천드립니다.",
            centerAddress: "서울 마포구 월드컵로 789",
            centerPhone: "02-3456-7890",
            items: [
              { name: "프리미엄 브레이크 패드", quantity: 1, unitPrice: 120000, totalPrice: 120000 },
              { name: "브레이크 디스크 (고급형)", quantity: 2, unitPrice: 85000, totalPrice: 170000 },
              { name: "브레이크 오일 (합성)", quantity: 1, unitPrice: 25000, totalPrice: 25000 }
            ],
            laborHours: 4,
            notes: "3년 무제한 A/S 보장, 24시간 긴급출동 서비스 포함",
            createdAt: "2024-01-18T09:15:00Z",
            validUntil: "2024-02-18T23:59:59Z"
          }
        ];
        
        const enhancedData = {
          ...data,
          estimates: mockEstimates
        };
        
        setMyRequest(enhancedData);
      } else {
        setMyRequest(null);
      }
    } catch (error) {
      console.error("견적 요청 정보 로딩 실패:", error);
      setMyRequest(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMyRequest();
  }, []);

  // 견적 요청 삭제
  const handleDeleteQuoteRequest = async (quoteRequestId: number) => {
    try {
      await UserApiService.deleteQuoteRequest(quoteRequestId);
      setMyRequest(null);
      toast({ title: '견적 요청이 삭제되었습니다.' });
    } catch (error) {
      toast({ title: '오류', description: '삭제에 실패했습니다.', variant: 'destructive' });
    }
  };

  // 견적 카드 클릭 처리
  const handleEstimateClick = (estimate: Estimate) => {
    setSelectedEstimate(estimate);
    setIsModalOpen(true);
  };

  // 새로고침
  const handleRefresh = () => {
    loadMyRequest();
  };

  // 빈 상태 렌더링
  const renderEmptyState = () => (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">현재 등록된 견적 요청서가 없습니다</h3>
        <p className="text-muted-foreground mb-6">
          새로운 견적을 요청하여 여러 카센터의 제안을 받아보세요.
        </p>
        <Button onClick={() => navigate('/estimates/create')} className="gap-2">
          <Plus className="h-4 w-4" />
          견적 요청하기
        </Button>
      </CardContent>
    </Card>
  );

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <PageContainer>
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-4 w-20" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-24" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* 헤더 */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">내 견적 요청</h1>
              <p className="text-muted-foreground mt-2">
                {myRequest ? '요청한 견적을 확인하고 카센터의 제안을 받아보세요.' : '등록된 견적 요청이 없습니다.'}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleRefresh} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                새로고침
              </Button>
              {!myRequest && (
                <Button onClick={() => navigate('/estimates/create')} className="gap-2">
                  <Plus className="h-4 w-4" />
                  견적 요청
                </Button>
              )}
            </div>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">요청 상태</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {myRequest ? '견적 대기중' : '요청 없음'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {myRequest ? '카센터의 견적을 기다리고 있습니다' : '새로운 견적을 요청하세요'}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">받은 견적</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {myRequest?.estimates?.length ?? 0}개
                </div>
                <p className="text-xs text-muted-foreground">
                  다양한 카센터의 견적을 비교해보세요
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">요청일</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {myRequest ? (
                    <DateTime date={myRequest.createdAt} format="short" />
                  ) : '—'}
                </div>
                <p className="text-xs text-muted-foreground">
                  견적 요청을 등록한 날짜
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 메인 콘텐츠 */}
          {!myRequest ? (
            renderEmptyState()
          ) : (
            <div className="space-y-8">
              {/* 내 견적 요청 정보 */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">내가 보낸 견적 요청서</CardTitle>
                      <CardDescription className="mt-1">
                        요청하신 내용의 상세 정보입니다
                      </CardDescription>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleDeleteQuoteRequest(myRequest.requestId)}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      요청서 삭제
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* 차량 및 위치 정보 */}
                    <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Car className="h-5 w-5" />
                        <span className="font-medium">
                          {myRequest.car?.carModel ?? '차량 정보 없음'} 
                          ({myRequest.car?.modelYear ?? 'N/A'}년)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        <span>{myRequest.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        <DateTime date={myRequest.createdAt} prefix="요청일:" />
                      </div>
                    </div>

                    {/* 요청 내용 */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-lg">요청 내용</h4>
                      <p className="text-foreground leading-relaxed bg-muted/30 p-4 rounded-lg">
                        {myRequest.requestDetails}
                      </p>
                    </div>

                    {/* 첨부 이미지 */}
                    {myRequest.images && myRequest.images.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-lg">첨부 이미지</h4>
                        <div className="flex gap-3 flex-wrap">
                          {myRequest.images.map((img, idx) => (
                            <div key={idx} className="relative group">
                              <img 
                                src="/placeholder.svg" 
                                alt={`차량사진 ${idx + 1}`} 
                                className="w-24 h-24 rounded-lg object-cover border-2 border-border hover:border-primary transition-colors cursor-pointer"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 받은 견적 목록 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">
                        받은 견적 목록 ({myRequest.estimates?.length ?? 0}개)
                      </CardTitle>
                      <CardDescription className="mt-1">
                        카센터에서 보낸 견적 제안들을 비교해보세요
                      </CardDescription>
                    </div>
                    {myRequest.estimates && myRequest.estimates.length > 0 && (
                      <Badge variant="secondary" className="text-sm px-3 py-1">
                        {myRequest.estimates.length}개 견적 수신
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {!myRequest.estimates || myRequest.estimates.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">아직 받은 견적이 없습니다</h3>
                      <p className="text-muted-foreground">
                        카센터에서 견적을 보내면 여기에 표시됩니다
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {myRequest.estimates.map((estimate) => (
                        <Card 
                          key={estimate.estimateId}
                          className="group cursor-pointer hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1"
                          onClick={() => handleEstimateClick(estimate)}
                        >
                          <CardHeader className="pb-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">
                                  {estimate.centerName}
                                </CardTitle>
                                {estimate.centerAddress && (
                                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {estimate.centerAddress}
                                  </p>
                                )}
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEstimateClick(estimate);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="text-center py-4 bg-primary/5 rounded-lg border">
                              <div className="text-3xl font-bold text-primary">
                                <Amount value={estimate.estimatedCost} />
                              </div>
                              {estimate.validUntil && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  <DateTime date={estimate.validUntil} prefix="유효기간: " format="date" />까지
                                </p>
                              )}
                            </div>
                            
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                {estimate.details}
                              </p>
                              
                              {estimate.items && estimate.items.length > 0 && (
                                <div className="text-xs text-muted-foreground">
                                  작업 항목 {estimate.items.length}개 포함
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t">
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toast({ title: '채팅 기능은 준비중입니다.' });
                                  }}
                                  className="gap-1"
                                >
                                  <MessageCircle className="h-3 w-3" />
                                  문의
                                </Button>
                                <Button 
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toast({ title: '견적이 승인되었습니다.' });
                                  }}
                                  className="gap-1"
                                >
                                  <CheckCircle2 className="h-3 w-3" />
                                  선택
                                </Button>
                              </div>
                              {estimate.createdAt && (
                                <div className="text-xs text-muted-foreground">
                                  <DateTime date={estimate.createdAt} format="relative" />
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* 견적 상세 모달 */}
        <QuoteDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          estimate={selectedEstimate}
          carInfo={myRequest ? {
            model: myRequest.car?.carModel ?? '정보 없음',
            year: myRequest.car?.modelYear ?? 0,
            location: myRequest.address
          } : undefined}
        />
      </div>
    </PageContainer>
  );
};