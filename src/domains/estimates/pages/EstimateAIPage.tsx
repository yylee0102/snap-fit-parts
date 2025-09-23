import { useState } from "react";
import { Brain, Camera, FileText, Zap } from "lucide-react";
import PageContainer from "@/shared/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EstimateAIPage() {
  const [formData, setFormData] = useState({
    carBrand: "", carModel: "", carYear: "", partName: "", damageDescription: "", images: []
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const carBrands = ["현대", "기아", "제네시스", "BMW", "벤츠", "아우디", "토요타"];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setResult({
      estimatedPrice: 450000,
      confidence: 88,
      partDetails: { name: formData.partName, condition: "수리 필요", laborCost: 200000, partCost: 250000 },
      recommendations: ["전문 정비소에서 정확한 진단을 받으시길 권장합니다.", "부품 교체보다는 수리가 가능한 상태입니다."]
    });
    setIsAnalyzing(false);
  };

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-on-surface mb-2">AI 자동 견적</h1>
          <p className="text-on-surface-variant">사진과 정보를 입력하면 AI가 즉시 수리 견적을 분석해드립니다</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                차량 및 손상 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>제조사</Label>
                  <Select value={formData.carBrand} onValueChange={(value) => setFormData(prev => ({...prev, carBrand: value}))}>
                    <SelectTrigger><SelectValue placeholder="제조사 선택" /></SelectTrigger>
                    <SelectContent>
                      {carBrands.map(brand => <SelectItem key={brand} value={brand}>{brand}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>연식</Label>
                  <Select value={formData.carYear} onValueChange={(value) => setFormData(prev => ({...prev, carYear: value}))}>
                    <SelectTrigger><SelectValue placeholder="연식 선택" /></SelectTrigger>
                    <SelectContent>
                      {years.map(year => <SelectItem key={year} value={year.toString()}>{year}년</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>모델명</Label>
                <Input placeholder="예: 아반떼, 쏘나타, K5 등" value={formData.carModel} 
                  onChange={(e) => setFormData(prev => ({...prev, carModel: e.target.value}))} />
              </div>

              <div className="space-y-2">
                <Label>손상 부위</Label>
                <Input placeholder="예: 앞범퍼, 헤드라이트, 사이드미러 등" value={formData.partName}
                  onChange={(e) => setFormData(prev => ({...prev, partName: e.target.value}))} />
              </div>

              <div className="space-y-2">
                <Label>손상 상세 설명</Label>
                <Textarea placeholder="손상 정도와 상황을 자세히 설명해주세요" value={formData.damageDescription}
                  onChange={(e) => setFormData(prev => ({...prev, damageDescription: e.target.value}))} rows={4} />
              </div>

              <Button onClick={handleAIAnalysis} disabled={!formData.carBrand || !formData.carModel || !formData.partName || isAnalyzing}
                className="w-full" size="lg">
                {isAnalyzing ? <><Zap className="h-4 w-4 mr-2 animate-spin" />AI 분석 중...</> : 
                <><Brain className="h-4 w-4 mr-2" />AI 견적 분석 시작</>}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {result && (
              <Card>
                <CardHeader><CardTitle>AI 분석 결과</CardTitle></CardHeader>
                <CardContent>
                  <div className="text-center p-4 bg-primary/10 rounded-lg mb-4">
                    <p className="text-sm text-on-surface-variant mb-1">예상 수리비용</p>
                    <p className="text-3xl font-bold text-primary">{new Intl.NumberFormat('ko-KR').format(result.estimatedPrice)}원</p>
                    <p className="text-sm text-on-surface-variant mt-1">신뢰도: {result.confidence}%</p>
                  </div>
                  <div className="space-y-3">
                    {result.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-primary">{idx + 1}</span>
                        </div>
                        <p className="text-sm text-on-surface-variant">{rec}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}