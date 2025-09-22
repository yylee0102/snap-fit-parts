import { MessageCircle, Bot, Users } from "lucide-react";
import ComingSoonPage from "@/shared/components/ComingSoonPage";

export default function ChatPage() {
  return (
    <ComingSoonPage
      title="실시간 채팅"
      description="판매자와 실시간으로 소통할 수 있는 채팅 서비스입니다"
      icon={<MessageCircle className="h-16 w-16 text-brand-primary" />}
    />
  );
}