import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  // 상태 변수
  const user = ref(null);
  const accessToken = ref(null);
  const refreshToken = ref(null);
  const isLoading = ref(false);

  // Computed
  const isAuthenticated = computed(() => !!accessToken.value);
  const userGrant = computed(() => user.value?.grant || null);
  const userGrantWeight = computed(() => user.value?.grant_weight || 999);

  // API 기본 설정
  const config = useRuntimeConfig();
  const API_BASE_URL = config.public.apiBaseUrl;

  // 토큰을 localStorage에 저장/로드
  const saveTokens = (access, refresh) => {
    if (process.client) {
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
    }
    accessToken.value = access;
    refreshToken.value = refresh;
  };

  const loadTokens = () => {
    if (process.client) {
      accessToken.value = localStorage.getItem('access_token');
      refreshToken.value = localStorage.getItem('refresh_token');
    }
  };

  const clearTokens = () => {
    if (process.client) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
    accessToken.value = null;
    refreshToken.value = null;
    user.value = null;
  };

  // Google 로그인
  const googleLogin = async (idToken) => {
    try {
      isLoading.value = true;
      const response = await $fetch(`${API_BASE_URL}/auth/google/login`, {
        method: 'POST',
        body: {
          id_token: idToken
        }
      });

      saveTokens(response.access_token, response.refresh_token);
      await fetchUserInfo();
      return response;
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  // 토큰 갱신
  const refreshAccessToken = async () => {
    try {
      if (!refreshToken.value) {
        console.error('❌ Refresh token이 없습니다');
        clearTokens();
        throw new Error('No refresh token available');
      }

      console.log('🔄 토큰 갱신 시도...');
      const response = await $fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        body: {
          refresh_token: refreshToken.value
        }
      });

      console.log('✅ 토큰 갱신 성공');
      saveTokens(response.access_token, response.refresh_token);
      return response;
    } catch (error) {
      console.error('❌ 토큰 갱신 실패:', error);
      clearTokens();
      
      // 로그인 페이지로 리다이렉트 (무한 루프 방지)
      if (process.client && window.location.pathname !== '/auth/login') {
        console.log('🚪 로그인 페이지로 리다이렉트');
        
        // 사용자에게 세션 만료 알림
        if (typeof window !== 'undefined' && window.alert) {
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        }
        
        navigateTo('/auth/login');
      }
      throw error;
    }
  };

  // 현재 사용자 정보 조회
  const fetchUserInfo = async () => {
    try {
      if (!accessToken.value) {
        throw new Error('No access token available');
      }

      const response = await $fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`
        }
      });

      user.value = response;
      console.log('👤 사용자 정보 로드됨:', response);
      return response;
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      
      // 토큰이 만료된 경우 갱신 시도 (무한 재시도 방지)
      if (error.status === 401 || error.statusCode === 401) {
        try {
          await refreshAccessToken();
          // 갱신 성공 시 한 번만 재시도
          const retryResponse = await $fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${accessToken.value}`
            }
          });
          user.value = retryResponse;
          console.log('👤 사용자 정보 재로드됨:', retryResponse);
          return retryResponse;
        } catch (refreshError) {
          console.error('❌ 사용자 정보 조회 실패:', refreshError);
          clearTokens();
          throw refreshError;
        }
      }
      throw error;
    }
  };

  // 토큰 검증
  const verifyToken = async () => {
    try {
      if (!accessToken.value) {
        return false;
      }

      try {
        await $fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${accessToken.value}`
          }
        });
        return true;
      } catch (e) {
        return false;
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      
      if (error.status === 401 || error.statusCode === 401) {
        try {
          await refreshAccessToken();
          return await verifyToken();
        } catch (refreshError) {
          clearTokens();
          return false;
        }
      }
      return false;
    }
  };

  // 역할 가중치 기반 권한 확인
  const canManageGrant = (targetGrantWeight) => {
    return userGrantWeight.value < targetGrantWeight;
  };

  // 로그아웃
  const logout = () => {
    clearTokens();
    navigateTo('/auth/login');
  };

  // 초기화 (앱 시작시 호출)
  const initialize = async () => {
    loadTokens();
    
    if (accessToken.value) {
      try {
        await fetchUserInfo();
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        clearTokens();
      }
    }
  };

  // 디버깅용: 현재 store 상태 출력
  const debugStore = () => {
    console.log('🔍 Auth Store 디버그 정보:', {
      isAuthenticated: isAuthenticated.value,
      user: user.value,
      accessToken: accessToken.value ? '있음' : '없음',
      refreshToken: refreshToken.value ? '있음' : '없음',
      isLoading: isLoading.value
    });
  };

      return {
      // State
      user,
      accessToken,
      refreshToken,
      isLoading,

      // Computed
      isAuthenticated,
      userGrant,
      userGrantWeight,

      // Actions
      googleLogin,
      refreshAccessToken,
      fetchUserInfo,
      verifyToken,
      canManageGrant,
      logout,
      initialize,
      saveTokens,
      loadTokens,
      clearTokens,
      debugStore
    };
});