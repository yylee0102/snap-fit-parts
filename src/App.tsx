import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import WBListPage from "./domains/wb/pages/WBListPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          {/* 홈페이지 */}
          <Route path="/" element={<HomePage />} />
          
          {/* WB (중고부품) 관련 라우트 */}
          <Route path="/wb" element={<WBListPage />} />
          <Route path="/wb/:partId" element={<WBListPage />} />
          
          {/* TODO: 추가 라우트들 - API 연결 시 실제 페이지로 교체 */}
          {/* 카센터 관련 */}
          <Route path="/centers" element={<div className="p-8 text-center">카센터 목록 페이지 (구현 예정)</div>} />
          <Route path="/centers/:centerId" element={<div className="p-8 text-center">카센터 상세 페이지 (구현 예정)</div>} />
          
          {/* 견적서 관련 */}
          <Route path="/estimates" element={<div className="p-8 text-center">견적서 목록 페이지 (구현 예정)</div>} />
          <Route path="/estimates/create" element={<div className="p-8 text-center">견적서 작성 페이지 (구현 예정)</div>} />
          <Route path="/estimates/:estimateId" element={<div className="p-8 text-center">견적서 상세 페이지 (구현 예정)</div>} />
          
          {/* 고객센터 관련 */}
          <Route path="/support" element={<div className="p-8 text-center">고객센터 페이지 (구현 예정)</div>} />
          <Route path="/support/faq" element={<div className="p-8 text-center">FAQ 페이지 (구현 예정)</div>} />
          <Route path="/support/contact" element={<div className="p-8 text-center">1:1 문의 페이지 (구현 예정)</div>} />
          <Route path="/support/notices" element={<div className="p-8 text-center">공지사항 페이지 (구현 예정)</div>} />
          <Route path="/support/notices/:noticeId" element={<div className="p-8 text-center">공지사항 상세 페이지 (구현 예정)</div>} />
          
          {/* 채팅 관련 */}
          <Route path="/chat" element={<div className="p-8 text-center">채팅 페이지 (구현 예정)</div>} />
          <Route path="/chat/:roomId" element={<div className="p-8 text-center">채팅방 페이지 (구현 예정)</div>} />
          
          {/* 마이페이지 관련 */}
          <Route path="/mypage" element={<div className="p-8 text-center">개인 마이페이지 (구현 예정)</div>} />
          <Route path="/owner" element={<div className="p-8 text-center">사장님 마이페이지 (구현 예정)</div>} />
          
          {/* 관리자 관련 */}
          <Route path="/admin" element={<div className="p-8 text-center">관리자 페이지 (구현 예정)</div>} />
          <Route path="/admin/notices" element={<div className="p-8 text-center">관리자 공지사항 관리 (구현 예정)</div>} />
          <Route path="/admin/reports" element={<div className="p-8 text-center">관리자 신고 관리 (구현 예정)</div>} />
          
          {/* 기타 페이지들 */}
          <Route path="/about" element={<div className="p-8 text-center">회사소개 페이지 (구현 예정)</div>} />
          <Route path="/terms" element={<div className="p-8 text-center">이용약관 페이지 (구현 예정)</div>} />
          <Route path="/privacy" element={<div className="p-8 text-center">개인정보처리방침 페이지 (구현 예정)</div>} />
          
          {/* 404 페이지 - 가장 마지막에 위치 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
