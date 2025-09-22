// 사용자 관련 종합 API 서비스
export interface UserReqDTO {
  id?: string;
  password?: string;
  name?: string;
  phone?: string;
  email?: string;
}

export interface UserResDTO {
  id: string;
  name: string;
  phone: string;
  email: string;
  userType: string;
  joinDate: string;
  status: string;
}

// 고객센터 문의 관련 DTO
export interface CsInquiryReqDTO {
  title: string;
  content: string;
  category: string;
  isPrivate: boolean;
}

export interface CsInquiryResDTO {
  inquiryId: number;
  title: string;
  content: string;
  category: string;
  isPrivate: boolean;
  status: "pending" | "answered" | "closed";
  answer?: string;
  createdAt: string;
  answeredAt?: string;
  userId: string;
}

// 견적 요청서 관련 DTO
export interface QuoteRequestReqDTO {
  vehicleModel: string;
  vehicleYear: number;
  issue: string;
  preferredDate: string;
  urgency: "low" | "medium" | "high";
  additionalNotes?: string;
}

export interface QuoteRequestResDTO {
  id: number;
  vehicleModel: string;
  vehicleYear: number;
  issue: string;
  preferredDate: string;
  urgency: string;
  additionalNotes?: string;
  status: "pending" | "received" | "expired";
  createdAt: string;
  userId: string;
}

// 리뷰 관련 DTO
export interface ReviewReqDTO {
  centerId: string;
  rating: number;
  content: string;
  serviceType: string;
}

export interface ReviewResDTO {
  id: number;
  centerId: string;
  centerName: string;
  rating: number;
  content: string;
  serviceType: string;
  createdAt: string;
  updatedAt?: string;
  userId: string;
  userName: string;
}

// 수리 완료 내역 관련 DTO
export interface CompletedRepairResDTO {
  id: number;
  centerId: string;
  centerName: string;
  vehicleModel: string;
  repairType: string;
  cost: number;
  completedDate: string;
  description: string;
  userId: string;
}

export class UserApiService {
  private baseUrl = "/api/users";

  // =================== 1. 사용자 프로필 관리 ===================

  /**
   * 사용자 회원가입
   */
  async signUp(userData: UserReqDTO): Promise<UserResDTO> {
    try {
      // TODO: API 연결 - 사용자 회원가입
      // POST /api/users/join
      const response = await fetch(`${this.baseUrl}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error("회원가입 실패");
      }

      return await response.json();
    } catch (error) {
      console.error("회원가입 오류:", error);
      throw error;
    }
  }

  /**
   * 사용자 프로필 업데이트
   */
  async updateProfile(userData: UserReqDTO): Promise<UserResDTO> {
    try {
      // TODO: API 연결 - 프로필 업데이트
      // PUT /api/users/profile
      const response = await fetch(`${this.baseUrl}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error("프로필 업데이트 실패");
      }

      return await response.json();
    } catch (error) {
      console.error("프로필 업데이트 오류:", error);
      throw error;
    }
  }

  /**
   * 비밀번호 재설정 (핸드폰 인증 후)
   */
  async resetPassword(userData: UserReqDTO): Promise<void> {
    try {
      // TODO: API 연결 - 비밀번호 재설정
      // PUT /api/users/password
      const response = await fetch(`${this.baseUrl}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error("비밀번호 재설정 실패");
      }
    } catch (error) {
      console.error("비밀번호 재설정 오류:", error);
      throw error;
    }
  }

  /**
   * 사용자 계정 삭제
   */
  async deleteUser(): Promise<void> {
    try {
      // TODO: API 연결 - 계정 삭제
      // DELETE /api/users/profile
      const response = await fetch(`${this.baseUrl}/profile`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error("계정 삭제 실패");
      }
    } catch (error) {
      console.error("계정 삭제 오류:", error);
      throw error;
    }
  }

  // =================== 2. 고객센터 문의 관리 ===================

  /**
   * 고객센터 문의 삭제
   */
  async deleteInquiry(inquiryId: number): Promise<void> {
    try {
      // TODO: API 연결 - 문의 삭제
      // DELETE /api/users/inquiries/{inquiryId}
      const response = await fetch(`${this.baseUrl}/inquiries/${inquiryId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error("문의 삭제 실패");
      }
    } catch (error) {
      console.error("문의 삭제 오류:", error);
      throw error;
    }
  }

  /**
   * 고객센터 문의 수정
   */
  async updateInquiry(inquiryId: number, inquiryData: CsInquiryReqDTO): Promise<CsInquiryResDTO> {
    try {
      // TODO: API 연결 - 문의 수정
      // PUT /api/users/inquiries/{inquiryId}
      const response = await fetch(`${this.baseUrl}/inquiries/${inquiryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(inquiryData)
      });

      if (!response.ok) {
        throw new Error("문의 수정 실패");
      }

      return await response.json();
    } catch (error) {
      console.error("문의 수정 오류:", error);
      throw error;
    }
  }

  // =================== 3. 견적 요청서 관리 ===================

  /**
   * 견적 요청서 삭제
   */
  async deleteQuoteRequest(id: number): Promise<void> {
    try {
      // TODO: API 연결 - 견적 요청서 삭제
      // DELETE /api/users/quote-requests/{id}
      const response = await fetch(`${this.baseUrl}/quote-requests/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error("견적 요청서 삭제 실패");
      }
    } catch (error) {
      console.error("견적 요청서 삭제 오류:", error);
      throw error;
    }
  }

  /**
   * 내 견적 요청서 조회
   */
  async getMyQuoteRequest(): Promise<QuoteRequestResDTO> {
    try {
      // TODO: API 연결 - 내 견적 요청서 조회
      // GET /api/users/my-quote-request
      const response = await fetch(`${this.baseUrl}/my-quote-request`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error("견적 요청서 조회 실패");
      }

      return await response.json();
    } catch (error) {
      console.error("견적 요청서 조회 오류:", error);
      // 시뮬레이션 데이터 반환
      return {
        id: 1,
        vehicleModel: "현대 아반떼",
        vehicleYear: 2020,
        issue: "엔진 오일 교체",
        preferredDate: "2024-01-20",
        urgency: "medium",
        status: "pending",
        createdAt: "2024-01-15T10:00:00Z",
        userId: "user123"
      };
    }
  }

  // =================== 4. 내가 받은 견적서 관리 ===================

  /**
   * 견적서 거부
   */
  async rejectEstimate(estimateId: number): Promise<void> {
    try {
      // TODO: API 연결 - 견적서 거부
      // PUT /api/users/estimates/{estimateId}/reject
      const response = await fetch(`${this.baseUrl}/estimates/${estimateId}/reject`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error("견적서 거부 실패");
      }
    } catch (error) {
      console.error("견적서 거부 오류:", error);
      throw error;
    }
  }

  // =================== 5. 리뷰 관리 ===================

  /**
   * 리뷰 작성
   */
  async createReview(reviewData: ReviewReqDTO): Promise<ReviewResDTO> {
    try {
      // TODO: API 연결 - 리뷰 작성
      // POST /api/users/reviews
      const response = await fetch(`${this.baseUrl}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(reviewData)
      });

      if (!response.ok) {
        throw new Error("리뷰 작성 실패");
      }

      return await response.json();
    } catch (error) {
      console.error("리뷰 작성 오류:", error);
      throw error;
    }
  }

  /**
   * 리뷰 수정
   */
  async updateReview(id: number, reviewData: ReviewReqDTO): Promise<ReviewResDTO> {
    try {
      // TODO: API 연결 - 리뷰 수정
      // PUT /api/users/reviews/{id}
      const response = await fetch(`${this.baseUrl}/reviews/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(reviewData)
      });

      if (!response.ok) {
        throw new Error("리뷰 수정 실패");
      }

      return await response.json();
    } catch (error) {
      console.error("리뷰 수정 오류:", error);
      throw error;
    }
  }

  /**
   * 리뷰 삭제
   */
  async deleteReview(id: number): Promise<void> {
    try {
      // TODO: API 연결 - 리뷰 삭제
      // DELETE /api/users/reviews/{id}
      const response = await fetch(`${this.baseUrl}/reviews/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error("리뷰 삭제 실패");
      }
    } catch (error) {
      console.error("리뷰 삭제 오류:", error);
      throw error;
    }
  }

  /**
   * 내 리뷰 목록 조회
   */
  async getMyReviews(): Promise<ReviewResDTO[]> {
    try {
      // TODO: API 연결 - 내 리뷰 목록 조회
      // GET /api/users/my-reviews
      const response = await fetch(`${this.baseUrl}/my-reviews`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error("리뷰 목록 조회 실패");
      }

      return await response.json();
    } catch (error) {
      console.error("리뷰 목록 조회 오류:", error);
      // 시뮬레이션 데이터 반환
      return [
        {
          id: 1,
          centerId: "center1",
          centerName: "서울 오토케어",
          rating: 5,
          content: "친절하고 정확한 서비스였습니다.",
          serviceType: "엔진 수리",
          createdAt: "2024-01-15T10:00:00Z",
          userId: "user123",
          userName: "김고객"
        }
      ];
    }
  }

  // =================== 6. 수리 완료 내역 관리 ===================

  /**
   * 수리 완료 내역 삭제
   */
  async deleteCompletedRepair(id: number): Promise<void> {
    try {
      // TODO: API 연결 - 수리 완료 내역 삭제
      // DELETE /api/users/completed-repairs/{id}
      const response = await fetch(`${this.baseUrl}/completed-repairs/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error("수리 완료 내역 삭제 실패");
      }
    } catch (error) {
      console.error("수리 완료 내역 삭제 오류:", error);
      throw error;
    }
  }

  /**
   * 내 수리 완료 내역 목록 조회
   */
  async getMyCompletedRepairs(): Promise<CompletedRepairResDTO[]> {
    try {
      // TODO: API 연결 - 내 수리 완료 내역 목록 조회
      // GET /api/users/my-completed-repairs
      const response = await fetch(`${this.baseUrl}/my-completed-repairs`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error("수리 완료 내역 조회 실패");
      }

      return await response.json();
    } catch (error) {
      console.error("수리 완료 내역 조회 오류:", error);
      // 시뮬레이션 데이터 반환
      return [
        {
          id: 1,
          centerId: "center1",
          centerName: "서울 오토케어",
          vehicleModel: "현대 아반떼",
          repairType: "엔진 오일 교체",
          cost: 80000,
          completedDate: "2024-01-15",
          description: "엔진 오일 및 필터 교체 완료",
          userId: "user123"
        }
      ];
    }
  }

  private getAuthToken(): string {
    return localStorage.getItem("authToken") || "";
  }
}

// 싱글톤 인스턴스 내보내기
export default new UserApiService();