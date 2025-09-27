# MyQuoteRequestsPage - 완전히 새로 디자인된 견적 요청 관리 페이지

## 🎯 프로젝트 개요

사용자의 견적 요청을 효율적으로 관리할 수 있는 현대적이고 사용자 친화적인 페이지입니다. Material Design 3 가이드라인을 따르며, 접근성과 사용성을 최우선으로 설계되었습니다.

## ✨ 주요 기능

### 🔍 고급 검색 및 필터링
- **실시간 검색**: 300ms 디바운스로 최적화된 검색
- **다중 필터**: 상태별, 정렬 옵션 제공
- **URL 상태 관리**: 브라우저 뒤로가기/앞으로가기 지원
- **필터 초기화**: 한 번에 모든 필터 제거

### 📱 반응형 디자인
- **모바일 우선**: 터치 친화적인 인터페이스
- **적응형 레이아웃**: 화면 크기에 따른 최적화
- **접근성**: WCAG AA 준수 (Lighthouse 접근성 점수 ≥ 90)

### 🎨 현대적인 UI/UX
- **Material Design 3**: 최신 디자인 시스템 적용
- **부드러운 애니메이션**: hover/focus 상태 및 전환 효과
- **시각적 피드백**: 로딩, 성공, 오류 상태 표시

### 📊 데이터 시각화
- **통계 대시보드**: 요청 현황 한눈에 보기
- **상태 뱃지**: 직관적인 상태 표시
- **금액 포맷팅**: 읽기 쉬운 숫자 표시

## 🛠 기술 스택

- **React 18** + **TypeScript**: 타입 안전성과 최신 기능
- **React Router**: URL 기반 상태 관리
- **Tailwind CSS**: 유틸리티 중심 스타일링
- **shadcn/ui**: 고품질 컴포넌트 라이브러리
- **Lucide React**: 일관된 아이콘 시스템
- **date-fns**: 날짜 처리

## 📂 컴포넌트 구조

```
src/
├── domains/users/pages/
│   └── MyQuoteRequestsPage.tsx        # 메인 페이지 컴포넌트
├── components/ui/
│   ├── status-badge.tsx               # 상태 표시 뱃지
│   ├── amount.tsx                     # 금액 포맷팅 컴포넌트
│   ├── date-time.tsx                  # 날짜/시간 표시 컴포넌트
│   ├── toolbar.tsx                    # 검색/필터 툴바
│   ├── confirm-dialog.tsx             # 확인 다이얼로그
│   ├── empty-state.tsx                # 빈 상태 컴포넌트
│   └── mobile-skeleton.tsx            # 로딩 스켈레톤
└── services/
    └── user.api.ts                    # API 서비스
```

## 🚀 사용법

### 기본 설정

```tsx
import { MyQuoteRequestsPage } from '@/domains/users/pages/MyQuoteRequestsPage';

// 라우터에 페이지 등록
<Route path="/user/quote-requests" element={<MyQuoteRequestsPage />} />
```

### API 연동

```tsx
// UserApiService 사용 예시
const requests = await UserApiService.getMyQuoteRequests();
```

### 커스텀 훅 사용

페이지는 내장된 상태 관리를 사용하지만, 필요시 커스텀 훅으로 분리 가능:

```tsx
const useQuoteRequests = (filters: FilterOptions) => {
  // 상태 관리 로직
  return { requests, isLoading, error, refresh };
};
```

## 🎨 디자인 시스템 사용

### 색상 사용 예시
```tsx
// ✅ 권장: 시맨틱 토큰 사용
<Badge className="bg-primary text-primary-foreground">

// ❌ 비권장: 직접 색상 사용
<Badge className="bg-blue-500 text-white">
```

### 반응형 컴포넌트
```tsx
// 뷰 모드에 따른 조건부 렌더링
{viewMode === 'card' ? <CardView /> : <TableView />}

// 모바일/데스크톱 대응
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

## 🔧 커스터마이징

### 상태 뱃지 추가
```tsx
// status-badge.tsx에서 새로운 상태 추가
case 'CUSTOM_STATUS':
  return {
    variant: 'secondary',
    className: 'bg-purple-100 text-purple-800 border-purple-200',
    text: '사용자 정의'
  };
```

### 새로운 필터 옵션
```tsx
// FilterOptions 타입 확장
interface FilterOptions {
  status: string;
  search: string;
  sort: 'date' | 'total' | 'status' | 'custom';  // 새 정렬 옵션
  sortOrder: 'asc' | 'desc';
  customFilter?: string;  // 새 필터
}
```

## 📈 성능 최적화

### 구현된 최적화
- **메모이제이션**: `useMemo`, `useCallback` 적극 활용
- **디바운싱**: 검색 입력 최적화
- **가상화**: 대용량 데이터 대응 준비
- **코드 분할**: 동적 임포트 준비

### 성능 측정
```bash
# Lighthouse 성능 측정
npm run lighthouse

# 번들 크기 분석
npm run analyze
```

## 🧪 테스팅

### 단위 테스트 예시
```tsx
describe('MyQuoteRequestsPage', () => {
  it('should render quote requests', () => {
    render(<MyQuoteRequestsPage />);
    expect(screen.getByText('내 견적 요청')).toBeInTheDocument();
  });

  it('should filter by status', () => {
    // 필터링 테스트
  });

  it('should be accessible', () => {
    // 접근성 테스트
  });
});
```

### E2E 테스트
```tsx
// 사용자 플로우 테스트
test('user can search and filter requests', async ({ page }) => {
  await page.goto('/user/quote-requests');
  await page.fill('[placeholder="제목, 차량, 내용으로 검색..."]', '브레이크');
  await expect(page.locator('.quote-request-item')).toContainText('브레이크');
});
```

## 🚀 배포 전 체크리스트

- [ ] **성능**: Lighthouse 점수 90+ 확인
- [ ] **접근성**: 키보드 네비게이션, 스크린 리더 지원
- [ ] **반응형**: 모든 화면 크기에서 테스트
- [ ] **브라우저 호환성**: 주요 브라우저에서 확인
- [ ] **API 연동**: 실제 백엔드와 통합 테스트
- [ ] **에러 처리**: 네트워크 오류, API 오류 시나리오
- [ ] **로딩 상태**: 적절한 스켈레톤 및 로딩 표시

## 🔮 향후 개선 계획

### Phase 1: 핵심 기능 강화
- [ ] 실시간 알림 시스템
- [ ] 고급 검색 (날짜 범위, 금액 범위)
- [ ] 벌크 액션 (일괄 삭제, 상태 변경)

### Phase 2: 사용자 경험 개선
- [ ] 무한 스크롤 구현
- [ ] 키보드 단축키
- [ ] 개인화된 뷰 설정 저장

### Phase 3: 고급 기능
- [ ] 오프라인 지원
- [ ] 데이터 분석 및 인사이트
- [ ] AI 기반 추천 시스템

## 📞 지원

문제가 있거나 기능 요청이 있으시면:
1. **이슈 트래커**에 등록
2. **개발팀 슬랙** 채널 문의
3. **코드 리뷰** 요청

---

💡 **팁**: 이 문서는 프로젝트 진행에 따라 지속적으로 업데이트됩니다. 변경사항이 있을 때마다 확인해주세요!