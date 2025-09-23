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
  centerId: string;
  centerName: string;
  address: string;
  latitude?: number;
  longitude?: number;
  phoneNumber: string;
  description?: string;
  businessRegistrationNumber: string;
  openingHours: string;
  status: 'PENDING' | 'ACTIVE';
}

export interface Estimate {
  estimateId: number;
  estimatedCost: number;
  details: string;
  createdAt: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export interface Announcement {
  announcementId: number;
  title: string;
  content: string;
  createdAt: string;
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

export interface CsInquiry {
  inquiryId: number;
  userName: string;
  title: string;
  questionContent: string;
  answerContent?: string;
  answeredAt?: string;
  createdAt: string;
}

export interface ChatRoom {
  roomId: number;
  updatedAt: string;
  user: {
    userId: string;
    name: string;
  };
  carCenter: {
    centerId: string;
    centerName: string;
  };
}

export interface CompletedRepair {
  repairId: number;
  repairDetail: string;
  completionDate: string;
  userId: string;
  userName: string;
  centerId: string;
  centerName: string;
}

export interface Admin {
  adminId: string;
  name: string;
}

export interface CarCenterApproval {
  approvalId: number;
  requestedAt: string;
  centerId: string;
  centerName: string;
  reason?: string;
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