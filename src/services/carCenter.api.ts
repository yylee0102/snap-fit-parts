// 카센터 API 서비스 - CarCenterController-2.java 연동
const API_BASE_URL = '/api/car-centers';

export interface CarCenterRegisterRequest {
  id: string;
  password: string;
  name: string;
  phone: string;
  businessNumber: string;
  centerName: string;
  address: string;
  centerPhone: string;
  centerEmail: string;
}

export interface CarCenterResponse {
  centerId: string;
  centerName: string;
  businessNumber: string;
  address: string;
  phone: string;
  email: string;
  rating?: number;
  responseRate?: number;
  totalReviews?: number;
  isApproved: boolean;
  createdAt: string;
}

class CarCenterApiService {
  // 1-1. 카센터 신규 회원가입
  async register(registerData: CarCenterRegisterRequest): Promise<CarCenterResponse> {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    });
    if (!response.ok) throw new Error('카센터 회원가입에 실패했습니다.');
    return response.json();
  }

  // 1-2. 아이디 또는 사업자 등록번호 중복 검사
  async checkDuplicate(type: 'id' | 'businessNumber', value: string): Promise<{ isDuplicate: boolean; message: string }> {
    const response = await fetch(`${API_BASE_URL}/check-duplicate?type=${type}&value=${encodeURIComponent(value)}`);
    if (!response.ok) throw new Error('중복 검사에 실패했습니다.');
    return response.json();
  }

  private getAuthToken(): string {
    return localStorage.getItem('authToken') || '';
  }
}

export default new CarCenterApiService();