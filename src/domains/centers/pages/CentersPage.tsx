import { MapPin, Phone, Star, Clock } from "lucide-react";
import ComingSoonPage from "@/shared/components/ComingSoonPage";

export default function CentersPage() {
  return (
    <ComingSoonPage
      title="카센터 찾기"
      description="주변 카센터를 검색하고 예약할 수 있는 서비스입니다"
      icon={<MapPin className="h-16 w-16 text-secondary" />}
    />
  );
}