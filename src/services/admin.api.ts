// 관리자 API 서비스 - 백엔드 API 명세에 맞춰 수정
const API_BASE_URL = '/api';

export interface AdminStats {
  userCount: number;
  centerCount: number;
  pendingApprovalCount: number;
  reviewReportCount: number;
}

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  userId: string;
  name: string;
  role: string;
  userType: string;
}

export interface CarCenterApproval {
  approvalId: number;
  requestedAt: string;
  centerId: number;
  centerName: string;
  businessNumber?: string;
  address?: string;
  phone?: string;
  email?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface CsInquiry {
  inquiryId: number;
  userId: string;
  userName: string;
  title: string;
  questionContent: string;
  answerContent?: string;
  status: 'PENDING' | 'ANSWERED';
  createdAt: string;
  answeredAt?: string;
}

export interface Announcement {
  announcementId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ReviewReport {
  reportId: number;
  reviewId: number;
  reporterName: string;
  reason: string;
  reportDate: string;
  status: 'PENDING' | 'PROCESSED';
}

class AdminApiService {
  /**
   * 관리자 로그인
   * POST /api/login
   */
  async login(request: AdminLoginRequest): Promise<AdminLoginResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error('로그인에 실패했습니다.');
    }
    
    // Authorization 헤더에서 토큰 추출
    const token = response.headers.get('Authorization');
    const userData = await response.json();
    
    return {
      ...userData,
      token: token || ''
    };
  }

  /**
   * 대시보드 통계 조회 - 백엔드 API와 동기화
   * GET /api/admin/stats/users/count, centers/count, approvals/pending/count, reports/reviews/count
   */
  async getStats(): Promise<AdminStats> {
    const [userResponse, centerResponse, pendingResponse, reportResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/admin/stats/users/count`, { headers: this.getAuthHeaders() }),
      fetch(`${API_BASE_URL}/admin/stats/centers/count`, { headers: this.getAuthHeaders() }),
      fetch(`${API_BASE_URL}/admin/stats/approvals/pending/count`, { headers: this.getAuthHeaders() }),
      fetch(`${API_BASE_URL}/admin/stats/reports/reviews/count`, { headers: this.getAuthHeaders() })
    ]);

    return {
      userCount: await userResponse.json(),
      centerCount: await centerResponse.json(),
      pendingApprovalCount: await pendingResponse.json(),
      reviewReportCount: await reportResponse.json(),
    };
  }

  // 성별 분포 통계
  async getGenderStats(): Promise<Record<string, number>> {
    const response = await fetch(`${API_BASE_URL}/admin/stats/gender`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // 연령대 분포 통계
  async getAgeStats(): Promise<Record<string, number>> {
    const response = await fetch(`${API_BASE_URL}/admin/stats/age`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  /**
   * 대기 중인 카센터 승인 목록 조회
   * GET /api/admin/approvals/pending
   */
  async getPendingApprovals(): Promise<CarCenterApproval[]> {
    const response = await fetch(`${API_BASE_URL}/admin/approvals/pending`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  /**
   * 카센터 승인 단건 조회
   * GET /api/admin/approvals/{approvalId}
   */
  async getCenterApproval(approvalId: number): Promise<CarCenterApproval> {
    const response = await fetch(`${API_BASE_URL}/admin/approvals/${approvalId}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  /**
   * 카센터 승인 처리
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
   * 카센터 승인 반려 (사유 포함)
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

  /**
   * 1:1 문의 전체 목록 조회
   * GET /api/admin/cs
   */
  async getAllCsInquiries(): Promise<CsInquiry[]> {
    const response = await fetch(`${API_BASE_URL}/admin/cs`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  /**
   * 1:1 문의 단건 조회
   * GET /api/admin/cs/{inquiryId}
   */
  async getCsInquiry(inquiryId: number): Promise<CsInquiry> {
    const response = await fetch(`${API_BASE_URL}/admin/cs/${inquiryId}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  /**
   * 1:1 문의 답변 등록/수정
   * PUT /api/admin/cs/{inquiryId}/answer
   */
  async answerInquiry(inquiryId: number, inquiry: CsInquiry): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/cs/${inquiryId}/answer`, {
      method: 'PUT',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inquiry),
    });

    if (!response.ok) {
      throw new Error('답변 등록에 실패했습니다.');
    }
  }

  /**
   * 공지사항 전체 조회
   * GET /api/admin/announcements
   */
  async getAllAnnouncements(): Promise<Announcement[]> {
    const response = await fetch(`${API_BASE_URL}/admin/announcements`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  /**
   * 공지사항 단건 조회
   * GET /api/admin/announcements/{announcementId}
   */
  async getAnnouncement(announcementId: number): Promise<Announcement> {
    const response = await fetch(`${API_BASE_URL}/admin/announcements/${announcementId}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  /**
   * 공지사항 등록
   * POST /api/admin/announcements
   */
  async createAnnouncement(announcement: Omit<Announcement, 'announcementId' | 'createdAt'>): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/announcements`, {
      method: 'POST',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(announcement),
    });

    if (!response.ok) {
      throw new Error('공지사항 등록에 실패했습니다.');
    }
  }

  /**
   * 공지사항 수정
   * PUT /api/admin/announcements/{announcementId}
   */
  async updateAnnouncement(announcementId: number, announcement: Partial<Announcement>): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/announcements/${announcementId}`, {
      method: 'PUT',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(announcement),
    });

    if (!response.ok) {
      throw new Error('공지사항 수정에 실패했습니다.');
    }
  }

  /**
   * 공지사항 삭제
   * DELETE /api/admin/announcements/{announcementId}
   */
  async deleteAnnouncement(announcementId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/announcements/${announcementId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('공지사항 삭제에 실패했습니다.');
    }
  }

  /**
   * 리뷰 신고 전체 조회
   * GET /api/admin/reports/reviews
   */
  async getAllReviewReports(): Promise<ReviewReport[]> {
    const response = await fetch(`${API_BASE_URL}/admin/reports/reviews`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  /**
   * 리뷰 신고 단건 조회
   * GET /api/admin/reports/reviews/{reportId}
   */
  async getReviewReport(reportId: number): Promise<ReviewReport> {
    const response = await fetch(`${API_BASE_URL}/admin/reports/reviews/${reportId}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  /**
   * 리뷰 신고 삭제
   * DELETE /api/admin/reports/reviews/{reportId}
   */
  async deleteReviewReport(reportId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/reports/reviews/${reportId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('신고 삭제에 실패했습니다.');
    }
  }

  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('authToken');
    return {
      'Authorization': `${token}`,
      'Content-Type': 'application/json',
    };
  }
}

export default new AdminApiService();