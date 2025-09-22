// 공통 타입 정의

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: "개인" | "사장님" | "관리자";
  profileImage?: string;
  rating?: number;
  responseRate?: number;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CarCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  services: string[];
  operatingHours: {
    weekday: string;
    weekend: string;
    holiday: string;
  };
  images: string[];
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  ownerId: string;
}

export interface Estimate {
  id: string;
  title: string;
  description: string;
  carInfo: {
    brand: string;
    model: string;
    year: string;
    mileage: number;
  };
  requesterId: string;
  centerId?: string;
  status: "요청" | "견적발송" | "확정" | "완료" | "취소";
  estimatedCost?: number;
  workDays?: number;
  images: string[];
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: "공지" | "이벤트" | "업데이트" | "점검";
  isPinned: boolean;
  isImportant: boolean;
  authorId: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "이용방법" | "결제" | "부품" | "센터" | "기타";
  isPopular: boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  title: string;
  content: string;
  category: "일반문의" | "신고" | "제안" | "버그신고" | "기타";
  status: "접수" | "처리중" | "완료";
  userId: string;
  adminResponse?: string;
  createdAt: string;
  updatedAt: string;
  respondedAt?: string;
}

export interface ChatRoom {
  id: string;
  type: "part" | "center" | "general";
  participantIds: string[];
  relatedId?: string; // 부품 ID 또는 센터 ID
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  messageType: "text" | "image" | "file";
  readBy: string[];
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// 검색 관련 타입
export interface SearchFilters {
  keyword?: string;
  category?: string;
  location?: string;
  priceRange?: [number, number];
  conditions?: string[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// 이미지 업로드 관련
export interface ImageUploadResult {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}