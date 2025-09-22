import { useState } from "react";
import PageContainer from "@/shared/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Phone, Mail, HelpCircle, Bell, FileText, ChevronRight, Search, Calendar, User, AlertCircle, Clock } from "lucide-react";
import { formatKoreanDateTime, formatTimeAgo } from "@/shared/utils/format";
import { useModal } from "@/shared/hooks/useModal";
import ContactModal from "../modals/ContactModal";

interface Notice {
  id: string;
  title: string;
  content: string;
  category: "공지" | "이벤트" | "업데이트" | "점검";
  isPinned: boolean;
  isImportant: boolean;
  viewCount: number;
  createdAt: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "이용방법" | "결제" | "부품" | "센터" | "기타";
  isPopular: boolean;
  orderIndex: number;
}

const faqCategories = [
  "전체", "이용방법", "결제", "부품", "센터", "기타"
];

const contactCategories = [
  { value: "일반문의", label: "일반문의", icon: HelpCircle },
  { value: "신고", label: "신고하기", icon: AlertCircle },
  { value: "제안", label: "서비스 개선 제안", icon: MessageCircle },
  { value: "버그신고", label: "버그 신고", icon: FileText },
];

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("notice");
  const [notices, setNotices] = useState<Notice[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedFaqCategory, setSelectedFaqCategory] = useState("전체");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  
  const contactModal = useModal();

  // 임시 데이터
  const mockNotices: Notice[] = [
    {
      id: "1",
      title: "서비스 점검 안내",
      content: "2024년 1월 20일 새벽 2시~4시까지 서비스 점검이 있을 예정입니다.",
      category: "점검",
      isPinned: true,
      isImportant: true,
      viewCount: 1234,
      createdAt: "2024-01-15T09:00:00Z"
    },
    {
      id: "2",
      title: "새로운 카센터 등록 기능 출시",
      content: "이제 더 많은 카센터들이 서비스에 등록할 수 있습니다.",
      category: "업데이트",
      isPinned: false,
      isImportant: false,
      viewCount: 892,
      createdAt: "2024-01-14T14:30:00Z"
    },
    {
      id: "3",
      title: "신년 이벤트 - 견적 요청 시 할인 쿠폰 지급",
      content: "1월 한 달간 견적 요청 시 5,000원 할인 쿠폰을 드립니다.",
      category: "이벤트",
      isPinned: false,
      isImportant: true,
      viewCount: 2156,
      createdAt: "2024-01-10T10:00:00Z"
    }
  ];

  const mockFaqs: FAQ[] = [
    {
      id: "1",
      question: "견적 요청은 어떻게 하나요?",
      answer: "홈 화면에서 '견적 요청하기' 버튼을 누르거나, 원하는 카센터 페이지에서 직접 견적을 요청할 수 있습니다. 차량 정보와 수리 내용을 입력하면 카센터에서 견적을 보내드립니다.",
      category: "이용방법",
      isPopular: true,
      orderIndex: 1
    },
    {
      id: "2",
      question: "견적 비용은 얼마인가요?",
      answer: "견적 요청 자체는 무료입니다. 실제 수리 비용은 카센터에서 제공하는 견적서를 확인하신 후 결정하시면 됩니다.",
      category: "결제",
      isPopular: true,
      orderIndex: 2
    },
    {
      id: "3",
      question: "중고부품 구매 시 보증은 어떻게 되나요?",
      answer: "중고부품은 판매자별로 보증 정책이 다릅니다. 각 상품 상세 페이지에서 보증 기간과 조건을 확인하실 수 있습니다.",
      category: "부품",
      isPopular: false,
      orderIndex: 3
    },
    {
      id: "4",
      question: "카센터 리뷰는 어떻게 작성하나요?",
      answer: "서비스 이용 후 해당 카센터 페이지에서 리뷰를 작성할 수 있습니다. 별점과 함께 상세한 후기를 남겨주시면 다른 사용자들에게 도움이 됩니다.",
      category: "센터",
      isPopular: true,
      orderIndex: 4
    }
  ];

  const handleNoticeClick = (noticeId: string) => {
    // API 연결: 공지사항 상세 조회 및 조회수 증가
    // GET /api/notices/:noticeId
    console.log("공지사항 상세:", noticeId);
  };

  const handleFaqToggle = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // FAQ 검색 로직
    console.log("FAQ 검색:", searchKeyword);
  };

  const filteredFaqs = mockFaqs.filter(faq => {
    const matchesCategory = selectedFaqCategory === "전체" || faq.category === selectedFaqCategory;
    const matchesKeyword = !searchKeyword || 
      faq.question.includes(searchKeyword) || 
      faq.answer.includes(searchKeyword);
    return matchesCategory && matchesKeyword;
  });

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case "점검": return "destructive";
      case "이벤트": return "default";
      case "업데이트": return "secondary";
      case "공지": return "outline";
      default: return "outline";
    }
  };

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* 헤더 */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-on-surface">고객센터</h1>
            <p className="text-on-surface-variant mt-2">
              궁금한 점이 있으시면 언제든 문의해주세요
            </p>
          </div>

          {/* 빠른 문의 방법 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-on-surface">빠른 문의</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => window.location.href = "tel:1588-1234"}
                >
                  <Phone className="h-6 w-6" />
                  <div>
                    <div className="font-medium">전화 상담</div>
                    <div className="text-sm text-on-surface-variant">1588-1234</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={contactModal.open}
                >
                  <MessageCircle className="h-6 w-6" />
                  <div>
                    <div className="font-medium">1:1 문의</div>
                    <div className="text-sm text-on-surface-variant">온라인 상담</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => window.location.href = "mailto:support@carpartner.com"}
                >
                  <Mail className="h-6 w-6" />
                  <div>
                    <div className="font-medium">이메일</div>
                    <div className="text-sm text-on-surface-variant">support@carpartner.com</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 탭 메뉴 */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="notice" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                공지사항
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                자주묻는질문
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                1:1 문의
              </TabsTrigger>
            </TabsList>

            {/* 공지사항 탭 */}
            <TabsContent value="notice" className="space-y-4">
              <div className="space-y-3">
                {mockNotices.map((notice) => (
                  <Card 
                    key={notice.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleNoticeClick(notice.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {notice.isPinned && (
                              <Badge variant="destructive" className="text-xs">📌 고정</Badge>
                            )}
                            {notice.isImportant && (
                              <Badge variant="default" className="text-xs">중요</Badge>
                            )}
                            <Badge variant={getCategoryBadgeVariant(notice.category)} className="text-xs">
                              {notice.category}
                            </Badge>
                          </div>
                          <h3 className="font-medium text-on-surface mb-1">
                            {notice.title}
                          </h3>
                          <p className="text-sm text-on-surface-variant line-clamp-2">
                            {notice.content}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-on-surface-variant">
                            <span>{formatTimeAgo(notice.createdAt)}</span>
                            <span>조회 {notice.viewCount.toLocaleString()}</span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-on-surface-variant" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* FAQ 탭 */}
            <TabsContent value="faq" className="space-y-4">
              {/* FAQ 검색 */}
              <Card>
                <CardContent className="p-4">
                  <form onSubmit={handleSearch} className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
                      <Input
                        placeholder="FAQ 검색..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {faqCategories.map((category) => (
                        <Button
                          key={category}
                          type="button"
                          variant={selectedFaqCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedFaqCategory(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* FAQ 목록 */}
              <div className="space-y-3">
                {filteredFaqs.map((faq) => (
                  <Card key={faq.id}>
                    <CardContent className="p-0">
                      <button
                        onClick={() => handleFaqToggle(faq.id)}
                        className="w-full p-4 text-left hover:bg-surface transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-primary">Q.</span>
                              {faq.isPopular && (
                                <Badge variant="secondary" className="text-xs">인기</Badge>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {faq.category}
                              </Badge>
                            </div>
                            <h3 className="font-medium text-on-surface">
                              {faq.question}
                            </h3>
                          </div>
                          <ChevronRight 
                            className={`h-5 w-5 text-on-surface-variant transition-transform ${
                              expandedFaq === faq.id ? 'rotate-90' : ''
                            }`} 
                          />
                        </div>
                      </button>
                      
                      {expandedFaq === faq.id && (
                        <>
                          <Separator />
                          <div className="p-4 bg-surface">
                            <div className="flex items-start gap-2">
                              <span className="text-sm font-medium text-secondary">A.</span>
                              <p className="text-sm text-on-surface leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* 1:1 문의 탭 */}
            <TabsContent value="contact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-on-surface">문의 유형을 선택해주세요</CardTitle>
                  <p className="text-sm text-on-surface-variant">
                    빠른 답변을 위해 문의 유형을 정확히 선택해주세요
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contactCategories.map((category) => (
                      <Button
                        key={category.value}
                        variant="outline"
                        className="h-20 flex-col gap-2"
                        onClick={() => contactModal.open()}
                      >
                        <category.icon className="h-6 w-6" />
                        <span>{category.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 운영시간 안내 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-on-surface flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    고객센터 운영시간
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">평일</span>
                      <span className="text-on-surface">09:00 ~ 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">토요일</span>
                      <span className="text-on-surface">09:00 ~ 13:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">일요일/공휴일</span>
                      <span className="text-on-surface">휴무</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* 1:1 문의 모달 */}
      <ContactModal
        isOpen={contactModal.isOpen}
        onClose={contactModal.close}
      />
    </PageContainer>
  );
}