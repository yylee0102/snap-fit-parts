import { HelpCircle, Phone, Mail } from "lucide-react";
import ComingSoonPage from "@/shared/components/ComingSoonPage";

export default function SupportPage() {
  return (
    <ComingSoonPage
      title="고객센터"
      description="자주묻는질문, 공지사항, 1:1 문의 서비스입니다"
      icon={<HelpCircle className="h-16 w-16 text-primary" />}
    />
  );
}