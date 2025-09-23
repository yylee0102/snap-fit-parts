// 카센터 통합 API 서비스 - car-center.api.ts와 estimate.api.ts 통합
const API_BASE_URL = '/api';

// ==================== 카센터 관련 타입 정의 ====================
export interface ReservationReqDTO {
  customerName: string;
  customerPhone: string;
  carInfo: string;
  reservationDate: string; // ISO 8601 format
  requestDetails: string;
}

export interface ReservationResDTO {
  reservationId: number;
  centerId: string;
  customerName: string;
  customerPhone: string;
  carInfo: string;
  reservationDate: string;
  requestDetails: string;
}

export interface UsedPartReqDTO {
  partName: string;
  description: string;
  price: number;
  category: string;
  compatibleCarModel: string;
}

export interface UsedPartResDTO {
  partId: number;
  centerId: string;
  partName: string;
  description: string;
  price: number;
  category: string;
  compatibleCarModel: string;
  createdAt: string;
  imageUrls: string[];
}

export interface ReviewReplyReqDTO {
  reviewId: number;
  centerId: string;
  content: string;
}

export interface ReviewReplyResDTO {
  replyId: number;
  reviewId: number;
  centerName: string;
  content: string;
  createdAt: string;
}

export interface ReviewReportReqDTO {
  reviewId: number;
  centerId: string;
  reason: string;
  content: string;
}

export interface ReviewReportResDTO {
  reportId: number;
  reportedReviewId: number;
  reportingCenterName: string;
  reason: string;
  content: string;
  status: string;
  createdAt: string;
}

// ==================== 견적 관련 타입 정의 ====================
export interface EstimateItemReqDTO {
  itemName: string;
  price: number;
  requiredHours: number;
  partType: string;
}

export interface EstimateItemResDTO {
  itemId: number;
  itemName: string;
  price: number;
  requiredHours: number;
  partType: string;
}

export interface EstimateReqDTO {
  requestId: number;
  estimatedCost: number;
  details: string;
  estimateItems: EstimateItemReqDTO[];
}

export interface EstimateResDTO {
  estimateId: number;
  requestId: number;
  estimatedCost: number;
  details: string;
  createdAt: string;
  estimateItems: EstimateItemResDTO[];
}

export interface QuoteRequestResDTO {
  requestId: number;
  requestDetails: string;
  address: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  writer: {
    userId: string;
    name: string;
  };
  car: {
    userCarId: number;
  };
  images: {
    imageId: number;
    imageUrl: string;
  }[];
  estimateCount: number;
}

// ==================== 카센터 통합 API 서비스 ====================
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
  async getMyReservations(): Promise<ReservationResDTO[]> {
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
  async createReservation(reservation: ReservationReqDTO): Promise<void> {
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
  async getEstimateRequests(): Promise<QuoteRequestResDTO[]> {
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
  async submitEstimate(estimate: EstimateReqDTO): Promise<EstimateResDTO> {
    const response = await fetch(`${API_BASE_URL}/estimates`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(estimate),
    });

    if (!response.ok) {
      throw new Error('견적서 제출에 실패했습니다.');
    }

    return response.json();
  }

  /**
   * 내가 제출한 견적서 목록 조회
   * GET /api/estimates/My-estimates
   */
  async getMyEstimates(): Promise<EstimateResDTO[]> {
    const response = await fetch(`${API_BASE_URL}/estimates/My-estimates`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('견적서 목록 조회에 실패했습니다.');
    }

    return response.json();
  }

  /**
   * 견적서 수정
   * PUT /api/estimates/{estimateId}
   */
  async updateEstimate(estimateId: number, estimate: EstimateReqDTO): Promise<EstimateResDTO> {
    const response = await fetch(`${API_BASE_URL}/estimates/${estimateId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(estimate),
    });

    if (!response.ok) {
      throw new Error('견적서 수정에 실패했습니다.');
    }

    return response.json();
  }

  /**
   * 견적서 상세 조회
   * GET /api/estimates/{estimateId}
   */
  async getEstimateDetails(estimateId: number): Promise<EstimateResDTO> {
    const response = await fetch(`${API_BASE_URL}/estimates/${estimateId}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('견적서 조회에 실패했습니다.');
    }

    return response.json();
  }

  /**
   * 견적서 삭제
   * DELETE /api/estimates/{estimateId}
   */
  async deleteEstimate(estimateId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/estimates/${estimateId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('견적서 삭제에 실패했습니다.');
    }
  }

  // ==================== 중고부품 관리 ====================
  /**
   * 내가 등록한 중고부품 목록 조회
   * GET /api/car-centers/me/used-parts
   */
  async getMyUsedParts(): Promise<UsedPartResDTO[]> {
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
  async createUsedPart(partData: UsedPartReqDTO, images: File[]): Promise<void> {
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
  async updateUsedPart(partId: number, partData: Partial<UsedPartReqDTO>): Promise<void> {
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

  // ==================== 리뷰 답변 관리 ====================
  /**
   * 리뷰에 답변 등록
   * POST /api/car-centers/reviews/reply
   */
  async createReviewReply(reply: ReviewReplyReqDTO): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/car-centers/reviews/reply`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(reply),
    });

    if (!response.ok) {
      throw new Error('리뷰 답변 등록에 실패했습니다.');
    }
  }

  /**
   * 내가 작성한 리뷰 답변 목록 조회
   * GET /api/car-centers/reviews/my-replies
   */
  async getMyReviewReplies(): Promise<ReviewReplyResDTO[]> {
    const response = await fetch(`${API_BASE_URL}/car-centers/reviews/my-replies`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('리뷰 답변 목록 조회에 실패했습니다.');
    }

    return response.json();
  }

  // ==================== 리뷰 신고 관리 ====================
  /**
   * 리뷰 신고하기
   * POST /api/car-centers/reviews/report
   */
  async reportReview(report: ReviewReportReqDTO): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/car-centers/reviews/report`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(report),
    });

    if (!response.ok) {
      throw new Error('리뷰 신고에 실패했습니다.');
    }
  }
}

export default new CarCenterApiService();