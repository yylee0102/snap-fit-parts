// 관리자 API 서비스 - 백엔드 엔티티에 맞춰 수정
const API_BASE_URL = '/api';

// ==================== 카센터 승인 관련 타입 정의 ====================
export interface CarCenterApprovalReqDTO {
  centerId: string;
  reason?: string;
}

export interface CarCenterApprovalResDTO {
  approvalId: number;
  requestedAt: string;
  centerId: string;
  centerName: string;
  businessNumber?: string;
  address?: string;
  phone?: string;
  email?: string;
  status?: string;
}

// ==================== CS 문의 관리 관련 타입 정의 ====================
export interface CsInquiryReqDTO {
  title: string;
  questionContent: string;
}

export interface CsInquiryResDTO {
  inquiryId: number;
  userName: string;
  title: string;
  questionContent: string;
  answerContent?: string;
  answeredAt?: string;
  createdAt: string;
  status?: string; // 백엔드에서 사용할 수 있는 필드 추가
  userId?: string; // 필요시 사용할 수 있는 필드 추가
}

// ==================== 공지사항 관리 관련 타입 정의 ====================
export interface AnnouncementReqDTO {
  title: string;
  content: string;
}

export interface AnnouncementResDTO {
  announcementId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

// ==================== 리뷰 신고 관리 관련 타입 정의 ====================
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
  // 기존 컴포넌트 호환성을 위한 필드들
  reviewId?: number;
  reportDate?: string;
  reporterName?: string;
  reviewContent?: string;
}

// ==================== 관리자 API 서비스 ====================
class AdminApiService {
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('authToken');
    return {
      'Authorization': token || '',
      'Content-Type': 'application/json',
    };
  }

  /**
   * 관리자 로그인 (별도 엔드포인트가 있다면)
   * POST /api/admin/login
   */
  async login(adminId: string, password: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ adminId, password }),
    });

    if (!response.ok) {
      throw new Error('관리자 로그인에 실패했습니다.');
    }

    return response.json();
  }

  // ==================== 통계 조회 ====================
  /**
   * 총 일반 사용자 수 조회
   * GET /api/admin/stats/users/count
   */
  async getUserCount(): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/admin/stats/users/count`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('사용자 수 조회에 실패했습니다.');
    }

    return response.json();
  }

  /**
   * 총 카센터 수 조회
   * GET /api/admin/stats/centers/count
   */
  async getCenterCount(): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/admin/stats/centers/count`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('카센터 수 조회에 실패했습니다.');
    }

    return response.json();
  }

  /**
   * 가입 승인 대기 수 조회
   * GET /api/admin/stats/approvals/pending/count
   */
  async getPendingApprovalsCount(): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/admin/stats/approvals/pending/count`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('승인 대기 수 조회에 실패했습니다.');
    }

    return response.json();
  }

  /**
   * 신고된 리뷰 수 조회
   * GET /api/admin/stats/reports/reviews/count
   */
  async getReviewReportsCount(): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/admin/stats/reports/reviews/count`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('신고된 리뷰 수 조회에 실패했습니다.');
    }

    return response.json();
  }

  /**
   * 성별 분포 통계 조회
   * GET /api/admin/stats/gender
   */
  async getGenderStats(): Promise<{ male: number; female: number }> {
    const response = await fetch(`${API_BASE_URL}/admin/stats/gender`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('성별 통계 조회에 실패했습니다.');
    }

    return response.json();
  }

  /**
   * 연령대별 분포 통계 조회
   * GET /api/admin/stats/age
   */
  async getAgeStats(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/admin/stats/age`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('연령대 통계 조회에 실패했습니다.');
    }

    return response.json();
  }

  // ==================== 카센터 승인 관리 ====================
  /**
   * 승인 대기 중인 카센터 목록 조회
   * GET /api/admin/approvals/pending
   */
  async getPendingApprovals(): Promise<CarCenterApprovalResDTO[]> {
    const response = await fetch(`${API_BASE_URL}/admin/approvals/pending`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('승인 대기 목록 조회에 실패했습니다.');
    }

    return response.json();
  }

  /**
   * 카센터 승인
   * POST /api/admin/approvals/{approvalId}/approve
   */
  async approveCenter(approvalId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/approvals/${approvalId}/approve`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('카센터 승인에 실패했습니다.');
    }
  }

  /**
   * 카센터 반려
   * DELETE /api/admin/approvals/{approvalId}?reason={reason}
   */
  async rejectCenter(approvalId: number, reason: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/approvals/${approvalId}?reason=${encodeURIComponent(reason)}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('카센터 반려에 실패했습니다.');
    }
  }

  // ==================== CS 문의 관리 ====================
  /**
   * CS 문의 목록 조회
   * GET /api/admin/cs
   */
  async getCsInquiries(): Promise<CsInquiryResDTO[]> {
    const response = await fetch(`${API_BASE_URL}/admin/cs`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('CS 문의 목록 조회에 실패했습니다.');
    }

    return response.json();
  }

  /**
   * CS 문의 답변 등록/수정
   * PUT /api/admin/cs/{inquiryId}/answer
   */
  async answerInquiry(inquiryId: number, answerContent: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/cs/${inquiryId}/answer`, {
      method: 'PUT',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answerContent: answerContent }),
    });

    if (!response.ok) {
      throw new Error('답변 등록에 실패했습니다.');
    }
  }

  // ==================== 공지사항 관리 ====================
  /**
   * 공지사항 목록 조회
   * GET /api/admin/announcements
   */
  async getAnnouncements(): Promise<AnnouncementResDTO[]> {
    const response = await fetch(`${API_BASE_URL}/admin/announcements`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('공지사항 목록 조회에 실패했습니다.');
    }

    return response.json();
  }

  /**
   * 공지사항 작성
   * POST /api/admin/announcements
   */
  async createAnnouncement(announcement: AnnouncementReqDTO): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/announcements`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(announcement),
    });

    if (!response.ok) {
      throw new Error('공지사항 작성에 실패했습니다.');
    }
  }

  /**
   * 공지사항 수정
   * PUT /api/admin/announcements/{id}
   */
  async updateAnnouncement(id: number, announcement: AnnouncementReqDTO): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/announcements/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(announcement),
    });

    if (!response.ok) {
      throw new Error('공지사항 수정에 실패했습니다.');
    }
  }

  /**
   * 공지사항 삭제
   * DELETE /api/admin/announcements/{id}
   */
  async deleteAnnouncement(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/announcements/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('공지사항 삭제에 실패했습니다.');
    }
  }

  // ==================== 리뷰 신고 관리 ====================
  /**
   * 신고된 리뷰 목록 조회
   * GET /api/admin/reports/reviews
   */
  async getReviewReports(): Promise<ReviewReportResDTO[]> {
    const response = await fetch(`${API_BASE_URL}/admin/reports/reviews`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('신고된 리뷰 목록 조회에 실패했습니다.');
    }

    return response.json();
  }

  /**
   * 신고된 리뷰 상세 조회
   * GET /api/admin/reports/reviews/{reportId}
   */
  async getReviewReportDetail(reportId: number): Promise<ReviewReportResDTO> {
    const response = await fetch(`${API_BASE_URL}/admin/reports/reviews/${reportId}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('신고된 리뷰 상세 조회에 실패했습니다.');
    }

    return response.json();
  }

  /**
   * 신고 처리 완료 (삭제)
   * DELETE /api/admin/reports/reviews/{reportId}
   */
  async deleteReviewReport(reportId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/reports/reviews/${reportId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('신고 처리에 실패했습니다.');
    }
  }
}

export default new AdminApiService();