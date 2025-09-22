import { User, Heart, ShoppingBag } from "lucide-react";
import ComingSoonPage from "@/shared/components/ComingSoonPage";

export default function MyPage() {
  return (
    <ComingSoonPage
      title="마이페이지"
      description="내 정보, 찜한 상품, 거래 내역을 관리할 수 있습니다"
      icon={<User className="h-16 w-16 text-primary" />}
    />
  );
}