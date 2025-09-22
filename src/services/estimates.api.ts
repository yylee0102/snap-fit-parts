// 견적서 API 서비스
const API_BASE_URL = '/api';

export interface EstimateRequest {
  userId: string;
  carModel: string;
  carYear: number;
  partName: string;
  description: string;
  images?: string[];
  preferredDate?: string;
}

export interface EstimateResponse {
  estimateId: number;
  centerId: string;
  centerName: string;
  partName: string;
  estimatedPrice: number;
  description: string;
  estimatedDate: string;
  status: 'PENDING' | 'SENT' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
  validUntil: string;
}

export interface EstimateSubmission {
  requestId: number;
  partName: string;
  estimatedPrice: number;
  description: string;
  estimatedDate: string;
  validUntil: string;
}

class EstimatesApiService {
  // 견적서 제출 (카센터)
  async submitEstimate(estimateData: EstimateSubmission): Promise<EstimateResponse> {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
      body: JSON.stringify(estimateData),
    });

    if (!response.ok) {
      throw new Error('견적서 제출에 실패했습니다.');
    }

    return response.json();
  }

  // 내가 제출한 견적서 목록 (카센터)
  async getMyEstimates(): Promise<EstimateResponse[]> {
    const response = await fetch(`${API_BASE_URL}/My-estimates`, {
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('견적서 목록 조회에 실패했습니다.');
    }

    return response.json();
  }

  // 견적서 수정 (카센터)
  async updateEstimate(estimateId: number, estimateData: Partial<EstimateSubmission>): Promise<EstimateResponse> {
    const response = await fetch(`${API_BASE_URL}/${estimateId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
      body: JSON.stringify(estimateData),
    });

    if (!response.ok) {
      throw new Error('견적서 수정에 실패했습니다.');
    }

    return response.json();
  }

  // 견적서 삭제 (카센터)
  async deleteEstimate(estimateId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${estimateId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('견적서 삭제에 실패했습니다.');
    }
  }

  private getAuthToken(): string {
    return localStorage.getItem('authToken') || '';
  }
}

export default new EstimatesApiService();