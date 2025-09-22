// 카센터 API 서비스
const API_BASE_URL = '/api/car-centers';

export interface CarCenterRegisterRequest {
  id: string;
  password: string;
  centerName: string;
  businessNumber: string;
  address: string;
  phone: string;
  email: string;
}

export interface CarCenterResponse {
  centerId: string;
  centerName: string;
  businessNumber: string;
  address: string;
  phone: string;
  email: string;
  isApproved: boolean;
  rating: number;
  createdAt: string;
}

export interface ReservationRequest {
  userId: string;
  serviceType: string;
  preferredDate: string;
  description: string;
  carModel: string;
  carYear: number;
}

export interface ReservationResponse {
  reservationId: number;
  centerId: string;
  userId: string;
  serviceType: string;
  scheduledDate: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  description: string;
  carModel: string;
  carYear: number;
  createdAt: string;
}

class CarCenterApiService {
  // 카센터 회원가입 
  async register(registerData: CarCenterRegisterRequest): Promise<CarCenterResponse> {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });

    if (!response.ok) {
      throw new Error('카센터 등록에 실패했습니다.');
    }

    return response.json();
  }

  // 아이디/사업자번호 중복 확인
  async checkDuplicate(type: 'id' | 'businessNumber', value: string): Promise<{ isDuplicate: boolean; message: string }> {
    const response = await fetch(`${API_BASE_URL}/check-duplicate?type=${type}&value=${encodeURIComponent(value)}`);
    
    if (!response.ok) {
      throw new Error('중복 확인에 실패했습니다.');
    }

    return response.json();
  }

  // 특정 카센터 정보 조회
  async getCarCenter(centerId: string): Promise<CarCenterResponse> {
    const response = await fetch(`${API_BASE_URL}/${centerId}`);
    
    if (!response.ok) {
      throw new Error('카센터 정보 조회에 실패했습니다.');
    }

    return response.json();
  }

  // 내 정보 수정 (로그인 필요)
  async updateMyInfo(updateData: Partial<CarCenterRegisterRequest>): Promise<CarCenterResponse> {
    const response = await fetch(`${API_BASE_URL}/my-info`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error('정보 수정에 실패했습니다.');
    }

    return response.json();
  }

  // 예약 등록
  async createReservation(reservationData: ReservationRequest): Promise<ReservationResponse> {
    const response = await fetch(`${API_BASE_URL}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
      body: JSON.stringify(reservationData),
    });

    if (!response.ok) {
      throw new Error('예약 등록에 실패했습니다.');
    }

    return response.json();
  }

  // 내 예약 목록 조회
  async getMyReservations(): Promise<ReservationResponse[]> {
    const response = await fetch(`${API_BASE_URL}/reservations/my`, {
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('예약 목록 조회에 실패했습니다.');
    }

    return response.json();
  }

  // 예약 수정
  async updateReservation(reservationId: number, updateData: Partial<ReservationRequest>): Promise<ReservationResponse> {
    const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error('예약 수정에 실패했습니다.');
    }

    return response.json();
  }

  // 예약 삭제
  async deleteReservation(reservationId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('예약 삭제에 실패했습니다.');
    }
  }

  // 오늘 예약 건수
  async getTodayReservationCount(): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/today-count`, {
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('오늘 예약 건수 조회에 실패했습니다.');
    }

    return response.json();
  }

  private getAuthToken(): string {
    return localStorage.getItem('authToken') || '';
  }
}

export default new CarCenterApiService();