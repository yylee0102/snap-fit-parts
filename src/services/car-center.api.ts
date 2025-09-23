// 카센터 API 서비스
const API_BASE_URL = '/api';

// ==================== 카센터 관련 타입 정의 ====================
export interface Reservation {
  reservationId?: number;
  customerName: string;
  customerPhone: string;
  carInfo: string;
  reservationDate: string; // ISO 8601 format
  requestDetails: string;
  status?: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  createdAt?: string;
}

export interface EstimateRequest {
  requestId: number;
  customerId: string;
  customerName?: string;
  carModel: string;
  carYear: number;
  mileage: number;
  description: string;
  requestedAt: string;
  status: 'PENDING' | 'ESTIMATED' | 'COMPLETED';
}

export interface EstimateItem {
  itemName: string;
  price: number;
  requiredHours: number;
  partType: 'NEW' | 'USED' | 'RECYCLED';
}

export interface EstimateReqDTO {
  requestId: number;
  estimatedCost: number;
  details: string;
  estimateItems: EstimateItem[];
}

export interface UsedPart {
  partId?: number;
  partName: string;
  description: string;
  price: number;
  category: string;
  compatibleCarModel: string;
  condition?: 'EXCELLENT' | 'GOOD' | 'FAIR';
  createdAt?: string;
  images?: string[];
}

export interface UsedPartCreateRequest {
  partName: string;
  description: string;
  price: number;
  category: string;
  compatibleCarModel: string;
  condition?: 'EXCELLENT' | 'GOOD' | 'FAIR';
}

// ==================== 카센터 API 서비스 ====================
class CarCenterApiService {
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('authToken');
    return {
      'Authorization': token || '',
      'Content-Type': 'application/json',
    };
  }

  private getMultipartHeaders(): Record<string, string> {
    const token = localStorage.getItem('authToken');
    return {
      'Authorization': token || '',
      // multipart/form-data의 경우 Content-Type은 자동 설정되도록 생략
    };
  }

  // ==================== 예약 관리 ====================
  /**
   * 내 예약 목록 조회
   * GET /api/car-centers/reservations/my
   */
  async getMyReservations(): Promise<Reservation[]> {
    const response = await fetch(`${API_BASE_URL}/car-centers/reservations/my`, {
      headers: this.getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('예약 목록 조회에 실패했습니다.');
    }
    
    return response.json();
  }

  /**
   * 새 예약 등록
   * POST /api/car-centers/reservations
   */
  async createReservation(reservation: Reservation): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/car-centers/reservations`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(reservation),
    });

    if (!response.ok) {
      throw new Error('예약 등록에 실패했습니다.');
    }
  }

  // ==================== 견적서 관리 ====================
  /**
   * 견적 요청 목록 조회
   * GET /api/estimates/requests
   */
  async getEstimateRequests(): Promise<EstimateRequest[]> {
    const response = await fetch(`${API_BASE_URL}/estimates/requests`, {
      headers: this.getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('견적 요청 목록 조회에 실패했습니다.');
    }
    
    return response.json();
  }

  /**
   * 견적서 제출
   * POST /api/estimates
   */
  async submitEstimate(estimate: EstimateReqDTO): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/estimates`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(estimate),
    });

    if (!response.ok) {
      throw new Error('견적서 제출에 실패했습니다.');
    }
  }

  // ==================== 중고부품 관리 ====================
  /**
   * 내가 등록한 중고부품 목록 조회
   * GET /api/car-centers/me/used-parts
   */
  async getMyUsedParts(): Promise<UsedPart[]> {
    const response = await fetch(`${API_BASE_URL}/car-centers/me/used-parts`, {
      headers: this.getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('중고부품 목록 조회에 실패했습니다.');
    }
    
    return response.json();
  }

  /**
   * 중고부품 등록 (이미지 포함)
   * POST /api/car-centers/used-parts
   */
  async createUsedPart(partData: UsedPartCreateRequest, images: File[]): Promise<void> {
    const formData = new FormData();
    
    // JSON 데이터를 request 파트로 추가
    formData.append('request', JSON.stringify(partData));
    
    // 이미지 파일들을 images 파트로 추가
    images.forEach((image, index) => {
      formData.append('images', image);
    });

    const response = await fetch(`${API_BASE_URL}/car-centers/used-parts`, {
      method: 'POST',
      headers: this.getMultipartHeaders(),
      body: formData,
    });

    if (!response.ok) {
      throw new Error('중고부품 등록에 실패했습니다.');
    }
  }

  /**
   * 중고부품 수정
   * PUT /api/car-centers/used-parts/{partId}
   */
  async updateUsedPart(partId: number, partData: Partial<UsedPartCreateRequest>): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/car-centers/used-parts/${partId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(partData),
    });

    if (!response.ok) {
      throw new Error('중고부품 수정에 실패했습니다.');
    }
  }

  /**
   * 중고부품 삭제
   * DELETE /api/car-centers/used-parts/{partId}
   */
  async deleteUsedPart(partId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/car-centers/used-parts/${partId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('중고부품 삭제에 실패했습니다.');
    }
  }
}

export default new CarCenterApiService();