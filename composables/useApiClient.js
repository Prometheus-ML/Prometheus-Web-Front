import { useAuthStore } from './useAuth.js';

export const useApiClient = () => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();
  const API_BASE_URL = config.public.apiBaseUrl;
  
  // 토큰 갱신 재시도 횟수 제한
  let refreshRetryCount = 0;
  const MAX_REFRESH_RETRIES = 1; // 최대 1번만 재시도

  // API 요청 헬퍼
  const apiRequest = async (endpoint, options = {}) => {
    const config = {
      baseURL: API_BASE_URL,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    // FormData 전송 시 Content-Type 자동 설정되도록 제거
    if (typeof FormData !== 'undefined' && options?.body instanceof FormData) {
      if (config.headers && config.headers['Content-Type']) {
        delete config.headers['Content-Type'];
      }
    }

    // 인증이 필요한 요청인 경우 토큰 추가
    if (authStore.accessToken && !options.skipAuth) {
      config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }

    try {
      const response = await $fetch(endpoint, config);
      return response;
    } catch (error) {
      // 401 에러인 경우 토큰 갱신 시도 (재시도 횟수 제한)
      if ((error.status === 401 || error.statusCode === 401) && !options.skipTokenRefresh && refreshRetryCount < MAX_REFRESH_RETRIES) {
        try {
          refreshRetryCount++;
          console.log(`🔄 토큰 갱신 시도 ${refreshRetryCount}/${MAX_REFRESH_RETRIES}`);
          
          await authStore.refreshAccessToken();
          
          // 갱신된 토큰으로 재시도
          config.headers.Authorization = `Bearer ${authStore.accessToken}`;
          return await $fetch(endpoint, { ...config, skipTokenRefresh: true });
        } catch (refreshError) {
          console.error('❌ 토큰 갱신 실패:', refreshError);
          refreshRetryCount = 0; // 재시도 횟수 초기화
          authStore.clearTokens();
          
          // 로그인 페이지로 리다이렉트 (무한 루프 방지)
          if (process.client && window.location.pathname !== '/auth/login') {
            console.log('🚪 로그인 페이지로 리다이렉트');
            
            // 사용자에게 세션 만료 알림
            if (typeof window !== 'undefined' && window.alert) {
              alert('세션이 만료되었습니다. 다시 로그인해주세요.');
            }
            
            navigateTo('/auth/login');
          }
          throw refreshError;
        }
      } else if ((error.status === 401 || error.statusCode === 401) && refreshRetryCount >= MAX_REFRESH_RETRIES) {
        // 최대 재시도 횟수 초과 시 토큰 클리어
        console.error('❌ 최대 토큰 갱신 재시도 횟수 초과');
        refreshRetryCount = 0;
        authStore.clearTokens();
        
        if (process.client && window.location.pathname !== '/auth/login') {
          console.log('🚪 로그인 페이지로 리다이렉트');
          
          // 사용자에게 세션 만료 알림
          if (typeof window !== 'undefined' && window.alert) {
            alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          }
          
          navigateTo('/auth/login');
        }
      }
      throw error;
    }
  };

  // 사용자 관리 API
  const userApi = {
    // 사용자 목록 조회
    getUsers: (params = {}) => {
      const query = new URLSearchParams();
      if (params.page) query.append('page', params.page);
      if (params.size) query.append('size', params.size);
      if (params.search) query.append('search', params.search);
      if (params.grant) query.append('grant', params.grant);
      if (params.gen) query.append('gen', params.gen);
      
      return apiRequest(`/users/?${query.toString()}`);
    },

    // 사용자 상세 조회
    getUser: (userId) => apiRequest(`/users/${userId}`),

    // 사용자 생성
    createUser: (userData) => apiRequest('/users/', {
      method: 'POST',
      body: userData
    }),

    // 사용자 업데이트
    updateUser: (userId, userData) => apiRequest(`/users/${userId}`, {
      method: 'PUT',
      body: userData
    }),

    // 사용자 삭제
    deleteUser: (userId) => apiRequest(`/users/${userId}`, {
      method: 'DELETE'
    }),

    // 내 정보 업데이트
    updateMyInfo: (userData) => apiRequest('/users/me', {
      method: 'PUT',
      body: userData
    }),

    // 내 프로필 조회
    getMyProfile: () => apiRequest('/users/me'),

    // 내 프로필 수정
    updateMyProfile: (profileData) => apiRequest('/users/me', {
      method: 'PUT',
      body: profileData
    })
  };

  // 관리자 API
  const adminApi = {
    // 멤버 관리 API
    getMembers: (params = {}) => {
      const query = new URLSearchParams();
      if (params.page) query.append('page', params.page);
      if (params.size) query.append('size', params.size);
      if (params.search) query.append('search', params.search);
      if (params.grant_filter) query.append('grant_filter', params.grant_filter);
      if (params.gen_filter) query.append('gen_filter', params.gen_filter);
      if (params.status_filter) query.append('status_filter', params.status_filter);
      if (params.is_active_filter) query.append('is_active_filter', params.is_active_filter);
      if (params.executive_filter) query.append('executive_filter', params.executive_filter);
      
      return apiRequest(`/admin/members?${query.toString()}`);
    },

    // 멤버 생성
    createMember: (memberData) => apiRequest('/admin/members', {
      method: 'POST',
      body: memberData
    }),

    // 대량 멤버 생성
    bulkCreateMembers: (membersData) => apiRequest('/admin/members/bulk-create', {
      method: 'POST',
      body: { members: membersData }
    }),

    // 멤버 업데이트
    updateMember: (memberId, memberData) => apiRequest(`/admin/members/${memberId}`, {
      method: 'PUT',
      body: memberData
    }),

    // 멤버 삭제
    deleteMember: (memberId) => apiRequest(`/admin/members/${memberId}`, {
      method: 'DELETE'
    }),

    // 멤버 통계 조회
    getMemberStats: () => apiRequest('/admin/members/stats'),

    // 블랙리스트 통계 조회
    getBlacklistStats: () => apiRequest('/admin/members/blacklist-stats'),

    // Excel 파일로 멤버 업로드
    uploadMembersExcel: (formData) => {
      const config = {
        baseURL: API_BASE_URL,
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${authStore.accessToken}`
        }
      };
      
      return $fetch('/admin/members/upload-excel', config);
    }
  };

  return {
    apiRequest,
    userApi,
    adminApi
  };
};