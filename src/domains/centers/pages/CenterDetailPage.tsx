import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageContainer from "@/shared/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Clock, Star, Heart, Flag, MessageCircle } from "lucide-react";
import { useModal } from "@/shared/hooks/useModal";
import ReviewReportModal from "../modals/ReviewReportModal";
import { formatKRW } from "@/shared/utils/format";

interface CarCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  services: string[];
  operatingHours: {
    weekday: string;
    weekend: string;
    holiday: string;
  };
  images: string[];
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  ownerId: string;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  images?: string[];
}

export default function CenterDetailPage() {
  const { centerId } = useParams();
  const navigate = useNavigate();
  const [center, setCenter] = useState<CarCenter | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  
  const reportModal = useModal();

  useEffect(() => {
    // API 연결: 카센터 상세 정보 조회
    // GET /api/centers/:centerId
    fetchCenterDetail();
  }, [centerId]);

  const fetchCenterDetail = async () => {
    try {
      setLoading(true);
      
      // 임시 데이터 (실제로는 API 호출)
      const mockCenter: CarCenter = {
        id: centerId || "1",
        name: "믿음 자동차 정비소",
        address: "서울시 강남구 테헤란로 123",
        phone: "02-1234-5678",
        rating: 4.8,
        reviewCount: 127,
        services: ["엔진 수리", "브레이크 정비", "타이어 교체", "에어컨 수리"],
        operatingHours: {
          weekday: "09:00 - 18:00",
          weekend: "09:00 - 17:00",
          holiday: "휴무"
        },
        images: [
          "/placeholder.svg",
          "/placeholder.svg",
          "/placeholder.svg"
        ],
        description: "20년 경력의 숙련된 정비사가 직접 진단하여 정확하고 신뢰할 수 있는 서비스를 제공합니다.",
        coordinates: { lat: 37.5665, lng: 126.9780 },
        ownerId: "owner1"
      };

      const mockReviews: Review[] = [
        {
          id: "1",
          author: "김**",
          rating: 5,
          content: "친절하고 꼼꼼하게 잘 봐주세요. 가격도 합리적이고 만족합니다.",
          date: "2024-01-15",
          images: ["/placeholder.svg"]
        },
        {
          id: "2", 
          author: "이**",
          rating: 4,
          content: "정비 실력이 좋고 설명도 자세히 해주셔서 좋았습니다.",
          date: "2024-01-10"
        }
      ];

      setCenter(mockCenter);
      setReviews(mockReviews);
    } catch (error) {
      console.error("카센터 정보 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = () => {
    // API 연결: 예약 요청 생성
    // POST /api/centers/:centerId/bookings
    navigate("/estimates/create", { 
      state: { centerId: center?.id, centerName: center?.name }
    });
  };

  const handleChat = () => {
    // API 연결: 채팅방 생성 또는 기존 채팅방 조회
    // POST /api/chat/rooms
    navigate("/chat", { 
      state: { type: "center", centerId: center?.id }
    });
  };

  const handleReportReview = (reviewId: string) => {
    setSelectedReview(reviewId);
    reportModal.open();
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-4">
            <div className="h-8 bg-surface animate-pulse rounded" />
            <div className="h-64 bg-surface animate-pulse rounded" />
            <div className="h-32 bg-surface animate-pulse rounded" />
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!center) {
    return (
      <PageContainer>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-on-surface">카센터를 찾을 수 없습니다</h1>
          <Button onClick={() => navigate("/centers")} className="mt-4">
            카센터 목록으로
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* 카센터 기본 정보 */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl text-on-surface">{center.name}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium text-on-surface">{center.rating}</span>
                  </div>
                  <span className="text-on-surface-variant">({center.reviewCount}개 리뷰)</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                찜하기
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <MapPin className="h-4 w-4" />
              <span>{center.address}</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <Phone className="h-4 w-4" />
              <span>{center.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <Clock className="h-4 w-4" />
              <div className="text-sm">
                <div>평일: {center.operatingHours.weekday}</div>
                <div>주말: {center.operatingHours.weekend}</div>
                <div>공휴일: {center.operatingHours.holiday}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 서비스 정보 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-on-surface">제공 서비스</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {center.services.map((service) => (
                <Badge key={service} variant="secondary">
                  {service}
                </Badge>
              ))}
            </div>
            <p className="text-on-surface-variant mt-4">{center.description}</p>
          </CardContent>
        </Card>

        {/* 이미지 갤러리 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-on-surface">사진</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {center.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${center.name} 사진 ${index + 1}`}
                  className="aspect-square object-cover rounded-lg"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 지도 (추후 구현) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-on-surface">위치</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-surface rounded-lg flex items-center justify-center">
              <span className="text-on-surface-variant">지도 API 연결 필요</span>
            </div>
          </CardContent>
        </Card>

        {/* 리뷰 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-on-surface">리뷰 ({reviews.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-outline-variant pb-4 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-on-surface">{review.author}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm text-on-surface">{review.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-on-surface-variant">{review.date}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReportReview(review.id)}
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-on-surface mb-2">{review.content}</p>
                {review.images && (
                  <div className="flex gap-2">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`리뷰 사진 ${index + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 액션 버튼들 */}
        <div className="flex gap-3">
          <Button onClick={handleBooking} className="flex-1">
            견적 요청하기
          </Button>
          <Button onClick={handleChat} variant="outline" className="flex-1">
            <MessageCircle className="h-4 w-4 mr-2" />
            채팅 문의
          </Button>
        </div>
      </div>

      {/* 리뷰 신고 모달 */}
      <ReviewReportModal
        isOpen={reportModal.isOpen}
        onClose={reportModal.close}
        reviewId={selectedReview}
      />
    </PageContainer>
  );
}