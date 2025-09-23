// 카센터 마이페이지 (간소화 버전)
import { useState } from "react";
import { X, Calendar, Phone, User, Star, Settings } from "lucide-react";
import PageContainer from "@/shared/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export default function CenterMyPage() {
  const [selectedReservations, setSelectedReservations] = useState<string[]>([]);

  // 임시 예약 데이터
  const reservations = [
    {
      id: "1",
      customerName: "이영진",
      phone: "010-1234-1111",
      vehicle: "GV80",
      datetime: "08/10 14:00",
      service: "엔진오일 교체"
    },
    {
      id: "2", 
      customerName: "김철수",
      phone: "010-5678-2222",
      vehicle: "K5",
      datetime: "08/10 16:00",
      service: "타이어 4개 교체"
    },
    {
      id: "3",
      customerName: "김태진",
      phone: "010-3333-4444", 
      vehicle: "Tesla Model 3",
      datetime: "08/11 10:00",
      service: "전기 점검"
    },
    {
      id: "4",
      customerName: "박영민",
      phone: "010-5555-6666",
      vehicle: "Porsche 911",
      datetime: "08/11 11:30",
      service: "종합점검"
    },
    {
      id: "5",
      customerName: "한소희",
      phone: "010-7777-8888",
      vehicle: "Audi A6",
      datetime: "08/12 09:00",
      service: "브레이크 패드 교체"
    }
  ];

  // 임시 후기 데이터
  const reviews = [
    {
      id: "1",
      content: "친절하고 꼼꼼하게 카센터 정비를 수행해 주셨습니다",
      author: "김민수",
      rating: 5,
      date: "2022-09-06",
      status: "completed"
    },
    {
      id: "2",
      content: "정말이지 친절하게 응대하고.",
      author: "최영민",
      rating: 5,
      date: "2022-09-07", 
      status: "pending"
    }
  ];

  const handleReservationSelect = (id: string) => {
    setSelectedReservations(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedReservations.length === reservations.length) {
      setSelectedReservations([]);
    } else {
      setSelectedReservations(reservations.map(r => r.id));
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">사장님 마이페이지</h1>
              <p className="text-sm text-muted-foreground">카센터를 쉽게 관리하세요</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">내역 삭제</Button>
            <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">예약 추가</Button>
          </div>
        </div>

        {/* 신규 예약 관리 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">신규 예약 관리</CardTitle>
          </CardHeader>
          <CardContent>
            {/* 테이블 헤더 */}
            <div className="grid grid-cols-7 gap-4 p-3 bg-muted font-medium text-sm">
              <div className="flex items-center">
                <Checkbox 
                  checked={selectedReservations.length === reservations.length}
                  onCheckedChange={handleSelectAll}
                />
              </div>
              <div>예약자</div>
              <div>연락처</div>
              <div>차량정보</div>
              <div>예약일시</div>
              <div>요청사항</div>
              <div></div>
            </div>

            {/* 예약 목록 */}
            {reservations.map((reservation) => (
              <div key={reservation.id} className="grid grid-cols-7 gap-4 p-3 border-b items-center">
                <div className="flex items-center">
                  <Checkbox 
                    checked={selectedReservations.includes(reservation.id)}
                    onCheckedChange={() => handleReservationSelect(reservation.id)}
                  />
                </div>
                <div>{reservation.customerName}</div>
                <div>{reservation.phone}</div>
                <div>{reservation.vehicle}</div>
                <div>{reservation.datetime}</div>
                <div>{reservation.service}</div>
                <div>
                  <Button variant="outline" size="sm">관리</Button>
                </div>
              </div>
            ))}

            {/* 페이지네이션 */}
            <div className="flex justify-center mt-4 gap-2">
              <Button variant="outline" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
            </div>
          </CardContent>
        </Card>

        {/* 내 카센터 관리 */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">내 카센터 관리</CardTitle>
              <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">정보 수정</Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              고객에게 보여지는 카센터 정보를 수정할 수 있습니다.
            </p>
          </CardContent>
        </Card>

        {/* 후기 관리 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">후기 관리</CardTitle>
          </CardHeader>
          <CardContent>
            {/* 테이블 헤더 */}
            <div className="grid grid-cols-5 gap-4 p-3 bg-muted font-medium text-sm">
              <div>내용</div>
              <div>작성자</div>
              <div>평점</div>
              <div>작성일</div>
              <div>관리</div>
            </div>

            {/* 후기 목록 */}
            {reviews.map((review) => (
              <div key={review.id} className="grid grid-cols-5 gap-4 p-3 border-b items-center">
                <div className="text-sm">{review.content}</div>
                <div>{review.author}</div>
                <div className="flex">
                  {renderStars(review.rating)}
                </div>
                <div>{review.date}</div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">답글</Button>
                  <Button variant="outline" size="sm" className="bg-red-500 hover:bg-red-600 text-white">신고</Button>
                </div>
              </div>
            ))}

            {/* 페이지네이션 */}
            <div className="flex justify-center mt-4 gap-2">
              <Button variant="outline" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}