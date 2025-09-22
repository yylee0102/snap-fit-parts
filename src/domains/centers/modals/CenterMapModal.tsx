import { useState } from "react";
import BaseModal from "@/shared/components/modal/BaseModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Phone, Navigation } from "lucide-react";
import { formatKRW } from "@/shared/utils/format";

interface CarCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  services: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  distance?: number;
  isOpen: boolean;
  averagePrice: number;
}

interface CenterMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  centers: CarCenter[];
}

export default function CenterMapModal({ 
  isOpen, 
  onClose, 
  centers 
}: CenterMapModalProps) {
  const [selectedCenter, setSelectedCenter] = useState<CarCenter | null>(null);

  const handleCenterSelect = (center: CarCenter) => {
    setSelectedCenter(center);
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleDirections = (center: CarCenter) => {
    // 구글 맵이나 네이버 맵으로 길찾기
    const url = `https://map.naver.com/v5/directions/${center.coordinates.lng},${center.coordinates.lat}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <BaseModal 
      open={isOpen}
      onClose={onClose}
      title="지도에서 카센터 찾기"
      size="xl"
    >
      <div className="space-y-4">
        {/* 지도 영역 */}
        <div className="h-96 bg-surface rounded-lg flex items-center justify-center relative">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-on-surface-variant mx-auto mb-4" />
            <p className="text-on-surface-variant">지도 API 연동 필요</p>
            <p className="text-sm text-on-surface-variant mt-1">
              Naver Maps API 또는 Kakao Maps API 연동
            </p>
          </div>
          
          {/* 임시 마커 표시 */}
          <div className="absolute top-4 left-4 space-y-2">
            {centers.slice(0, 3).map((center, index) => (
              <button
                key={center.id}
                onClick={() => handleCenterSelect(center)}
                className={`
                  flex items-center gap-2 p-2 rounded-lg text-sm
                  ${selectedCenter?.id === center.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-surface border border-outline-variant text-on-surface'
                  }
                `}
              >
                <MapPin className="h-4 w-4" />
                <span>{center.name}</span>
                {center.distance && (
                  <span className="text-xs">({center.distance}km)</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 선택된 카센터 정보 */}
        {selectedCenter && (
          <div className="p-4 bg-surface rounded-lg border border-outline-variant">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold text-on-surface">
                  {selectedCenter.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium text-on-surface">{selectedCenter.rating}</span>
                    <span className="text-sm text-on-surface-variant">
                      ({selectedCenter.reviewCount})
                    </span>
                  </div>
                  {selectedCenter.isOpen ? (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      영업중
                    </Badge>
                  ) : (
                    <Badge variant="secondary">영업종료</Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-primary">
                  평균 {formatKRW(selectedCenter.averagePrice)}
                </div>
                {selectedCenter.distance && (
                  <div className="text-sm text-on-surface-variant">
                    {selectedCenter.distance}km 거리
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-3">
              <MapPin className="h-4 w-4" />
              <span>{selectedCenter.address}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCenter.services.map((service) => (
                <Badge key={service} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Button 
                size="sm"
                onClick={() => handleCall(selectedCenter.phone)}
                className="flex-1"
              >
                <Phone className="h-4 w-4 mr-2" />
                전화하기
              </Button>
              <Button 
                size="sm"
                variant="outline"
                onClick={() => handleDirections(selectedCenter)}
                className="flex-1"
              >
                <Navigation className="h-4 w-4 mr-2" />
                길찾기
              </Button>
            </div>
          </div>
        )}

        {/* 카센터 목록 */}
        <div className="max-h-48 overflow-y-auto space-y-2">
          <h4 className="font-medium text-on-surface mb-2">근처 카센터 ({centers.length})</h4>
          {centers.map((center) => (
            <button
              key={center.id}
              onClick={() => handleCenterSelect(center)}
              className={`
                w-full p-3 rounded-lg border text-left transition-colors
                ${selectedCenter?.id === center.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-outline-variant hover:bg-surface'
                }
              `}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-on-surface">{center.name}</div>
                  <div className="text-sm text-on-surface-variant flex items-center gap-2">
                    <span>{center.rating}★ ({center.reviewCount})</span>
                    {center.distance && <span>{center.distance}km</span>}
                  </div>
                </div>
                <div className="text-sm text-on-surface-variant">
                  {formatKRW(center.averagePrice)}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </BaseModal>
  );
}