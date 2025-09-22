import { useState } from "react";
import { Bot, Send, User, Wrench, Car } from "lucide-react";
import PageContainer from "@/shared/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  estimateData?: any;
}

export default function EstimateAIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "안녕하세요! 저는 카파트너 AI 견적 봇입니다. 차량 정보와 필요한 부품을 알려주시면 실시간으로 견적을 제공해드릴게요. 먼저 차량 정보를 입력해주세요.",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // TODO: API 연결 - AI 견적 요청
    // POST /api/ai/estimate
    try {
      // 시뮬레이션된 AI 응답
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: generateAIResponse(inputMessage),
          sender: "ai",
          timestamp: new Date(),
          estimateData: inputMessage.includes("견적") ? {
            partName: "헤드라이트",
            partPrice: 150000,
            laborCost: 50000,
            totalCost: 200000
          } : undefined
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("AI 견적 요청 실패:", error);
      setIsLoading(false);
    }
  };

  const generateAIResponse = (userInput: string) => {
    if (userInput.includes("현대") || userInput.includes("기아") || userInput.includes("차량")) {
      return "차량 정보를 확인했습니다. 이제 교체가 필요한 부품명을 알려주세요. (예: 헤드라이트, 범퍼, 미러 등)";
    }
    if (userInput.includes("헤드라이트") || userInput.includes("범퍼") || userInput.includes("미러")) {
      return "부품 정보를 확인했습니다. 해당 부품의 예상 견적을 계산해드릴게요.";
    }
    if (userInput.includes("견적")) {
      return "견적서를 생성했습니다. 아래 견적 정보를 확인해주세요. 더 정확한 견적을 원하시면 주변 카센터에 직접 문의하시기 바랍니다.";
    }
    return "좀 더 구체적인 정보를 알려주시면 더 정확한 견적을 제공해드릴 수 있습니다.";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount) + '원';
  };

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-on-surface">AI 견적 상담</h1>
            <p className="text-on-surface-variant">실시간 AI 견적 서비스</p>
          </div>
        </div>

        {/* 사용 안내 */}
        <Card className="mb-6 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Bot className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-medium text-on-surface mb-2">AI 견적 사용법</h3>
                <ul className="text-sm text-on-surface-variant space-y-1">
                  <li>1. 차량 정보 입력 (제조사, 모델, 연식)</li>
                  <li>2. 필요한 부품명 입력</li>
                  <li>3. AI가 실시간으로 예상 견적 제공</li>
                  <li>4. 정확한 견적은 카센터 방문 필요</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 채팅 영역 */}
        <Card className="h-[500px] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI 견적 상담
              <Badge variant="secondary">실시간</Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
              >
                <Avatar>
                  <AvatarFallback>
                    {message.sender === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </AvatarFallback>
                </Avatar>

                <div className={`flex-1 max-w-[80%] ${message.sender === "user" ? "text-right" : ""}`}>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-surface-container text-on-surface"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>

                  {/* 견적 정보 카드 */}
                  {message.estimateData && (
                    <Card className="mt-3 max-w-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Wrench className="h-4 w-4" />
                          AI 견적서
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-on-surface-variant">부품명:</span>
                            <span className="font-medium">{message.estimateData.partName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-on-surface-variant">부품비:</span>
                            <span>{formatCurrency(message.estimateData.partPrice)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-on-surface-variant">공임비:</span>
                            <span>{formatCurrency(message.estimateData.laborCost)}</span>
                          </div>
                          <hr className="my-2" />
                          <div className="flex justify-between font-bold text-primary">
                            <span>총 예상 비용:</span>
                            <span>{formatCurrency(message.estimateData.totalCost)}</span>
                          </div>
                        </div>
                        <div className="mt-3 space-y-2">
                          <Button size="sm" className="w-full">
                            카센터 문의하기
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            견적서 저장
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <p className="text-xs text-on-surface-variant mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <Avatar>
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-surface-container rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          {/* 입력 영역 */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="차량 정보나 필요한 부품을 입력하세요... (예: 현대 아반떼 2020년 헤드라이트)"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* 추천 문의 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-elevation-2 transition-all">
            <CardContent className="p-4 text-center">
              <Car className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-medium text-on-surface mb-2">차량 정보 입력</h3>
              <p className="text-sm text-on-surface-variant">
                "현대 아반떼 2020년"
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-elevation-2 transition-all">
            <CardContent className="p-4 text-center">
              <Wrench className="h-8 w-8 text-secondary mx-auto mb-3" />
              <h3 className="font-medium text-on-surface mb-2">부품 문의</h3>
              <p className="text-sm text-on-surface-variant">
                "헤드라이트 교체 견적"
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-elevation-2 transition-all">
            <CardContent className="p-4 text-center">
              <Bot className="h-8 w-8 text-tertiary mx-auto mb-3" />
              <h3 className="font-medium text-on-surface mb-2">종합 견적</h3>
              <p className="text-sm text-on-surface-variant">
                "전체 수리 비용 문의"
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}