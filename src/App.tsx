import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/shared/contexts/AuthContext";

// Pages
import HomePage from "./pages/HomePage";
import WBListPage from "./domains/wb/pages/WBListPage";
import CentersListPage from "./domains/centers/pages/CentersListPage";
import CenterDetailPage from "./domains/centers/pages/CenterDetailPage";
import EstimateListPage from "./domains/estimates/pages/EstimateListPage";
import EstimateCreatePage from "./domains/estimates/pages/EstimateCreatePage";
import EstimateDetailPage from "./domains/estimates/pages/EstimateDetailPage";
import EstimateAIPage from "./domains/estimates/pages/EstimateAIPage";
import EstimateRequestPage from "./domains/estimates/pages/EstimateRequestPage";
import CenterEstimatesPage from "./domains/centers/pages/CenterEstimatesPage";
import ChatPage from "./domains/chat/pages/ChatPage";
import SupportPage from "./domains/support/pages/SupportPage";
import MyPage from "./domains/mypage/pages/MyPage";
import AdminDashboard from "./domains/admin/pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <Router>
        <Routes>
          {/* 홈페이지 */}
          <Route path="/" element={<HomePage />} />
          
          {/* WB (중고부품) 관련 라우트 */}
          <Route path="/wb" element={<WBListPage />} />
          <Route path="/wb/:partId" element={<WBListPage />} />
          
          {/* 카센터 관련 */}
          <Route path="/centers" element={<CentersListPage />} />
          <Route path="/centers/:centerId" element={<CenterDetailPage />} />
          
          {/* 견적서 관련 */}
          <Route path="/estimates" element={<EstimateListPage />} />
          <Route path="/estimates/create" element={<EstimateCreatePage />} />
          <Route path="/estimates/ai" element={<EstimateAIPage />} />
          <Route path="/estimates/requests" element={<EstimateRequestPage />} />
          <Route path="/estimates/center" element={<CenterEstimatesPage />} />
          <Route path="/estimates/:estimateId" element={<EstimateDetailPage />} />
          
          {/* 고객센터 관련 */}
          <Route path="/support" element={<SupportPage />} />
          <Route path="/support/faq" element={<SupportPage />} />
          <Route path="/support/contact" element={<SupportPage />} />
          <Route path="/support/notices" element={<SupportPage />} />
          <Route path="/support/notices/:noticeId" element={<SupportPage />} />
          
          {/* 채팅 관련 */}
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:roomId" element={<ChatPage />} />
          
          {/* 마이페이지 관련 */}
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/owner" element={<MyPage />} />
          
          {/* 관리자 관련 */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/notices" element={<AdminDashboard />} />
          <Route path="/admin/reports" element={<AdminDashboard />} />
          
          {/* 기타 페이지들 */}
          <Route path="/about" element={<MyPage />} />
          <Route path="/terms" element={<MyPage />} />
          <Route path="/privacy" element={<MyPage />} />
          
          {/* 404 페이지 - 가장 마지막에 위치 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Router>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
