// 견적서 API 서비스 - 최신 백엔드 API 명세 반영
const API_BASE_URL = '/api';

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

// ==================== 견적서 API 서비스 ====================
class EstimateApiService {
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('authToken');
    return {
      'Authorization': token || '',
      'Content-Type': 'application/json',
    };
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
}

export default new EstimateApiService();