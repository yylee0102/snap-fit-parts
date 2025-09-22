// 관리자 API 서비스
const API_BASE_URL = '/api/admin';

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
  token: string;
  adminId: string;
  role: string;
}

export interface CarCenterApproval {
  approvalId: number;
  centerName: string;
  businessNumber: string;
  address: string;
  phone: string;
  email: string;
  requestDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface CsInquiry {
  inquiryId: number;
  userId: string;
  title: string;
  content: string;
  answer?: string;
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
  // 관리자 로그인
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
    
    return response.json();
  }

  // 대시보드 통계 조회
  async getStats(): Promise<AdminStats> {
    const [userCount, centerCount, pendingApprovalCount, reviewReportCount] = await Promise.all([
      fetch(`${API_BASE_URL}/stats/users/count`, { headers: this.getAuthHeaders() }),
      fetch(`${API_BASE_URL}/stats/centers/count`, { headers: this.getAuthHeaders() }),
      fetch(`${API_BASE_URL}/stats/approvals/pending/count`, { headers: this.getAuthHeaders() }),
      fetch(`${API_BASE_URL}/stats/reports/reviews/count`, { headers: this.getAuthHeaders() })
    ]);

    return {
      userCount: await userCount.json(),
      centerCount: await centerCount.json(),
      pendingApprovalCount: await pendingApprovalCount.json(),
      reviewReportCount: await reviewReportCount.json(),
    };
  }

  // 성별 분포 통계
  async getGenderStats(): Promise<Record<string, number>> {
    const response = await fetch(`${API_BASE_URL}/stats/gender`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // 연령대 분포 통계
  async getAgeStats(): Promise<Record<string, number>> {
    const response = await fetch(`${API_BASE_URL}/stats/age`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // 대기 중인 카센터 승인 목록
  async getPendingApprovals(): Promise<CarCenterApproval[]> {
    const response = await fetch(`${API_BASE_URL}/approvals/pending`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // 카센터 승인 처리
  async approveCenter(approvalId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/approvals/${approvalId}/approve`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('카센터 승인에 실패했습니다.');
    }
  }

  // 카센터 승인 반려
  async rejectCenter(approvalId: number, reason: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/approvals/${approvalId}?reason=${encodeURIComponent(reason)}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('카센터 반려에 실패했습니다.');
    }
  }

  // 1:1 문의 목록 조회
  async getAllCsInquiries(): Promise<CsInquiry[]> {
    const response = await fetch(`${API_BASE_URL}/cs`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // 1:1 문의 답변 등록/수정
  async answerInquiry(inquiryId: number, inquiry: CsInquiry): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/cs/${inquiryId}/answer`, {
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

  // 공지사항 전체 조회
  async getAllAnnouncements(): Promise<Announcement[]> {
    const response = await fetch(`${API_BASE_URL}/announcements`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // 공지사항 등록
  async createAnnouncement(announcement: Omit<Announcement, 'announcementId' | 'createdAt'>): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/announcements`, {
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

  // 공지사항 수정
  async updateAnnouncement(announcementId: number, announcement: Partial<Announcement>): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/announcements/${announcementId}`, {
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

  // 공지사항 삭제
  async deleteAnnouncement(announcementId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/announcements/${announcementId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('공지사항 삭제에 실패했습니다.');
    }
  }

  // 리뷰 신고 목록 조회
  async getAllReviewReports(): Promise<ReviewReport[]> {
    const response = await fetch(`${API_BASE_URL}/reports/reviews`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // 리뷰 신고 삭제
  async deleteReviewReport(reportId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/reports/reviews/${reportId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('신고 삭제에 실패했습니다.');
    }
  }

  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('adminToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }
}

export default new AdminApiService();