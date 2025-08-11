<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-6">
      <div class="text-center">
        <div v-if="isLoading" class="space-y-4">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <h2 class="text-xl font-semibold text-gray-900">로그인 처리 중...</h2>
          <p class="text-gray-600">잠시만 기다려주세요.</p>
        </div>

        <div v-else-if="error" class="space-y-4">
          <div class="text-red-500">
            <svg class="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900">로그인 실패</h2>
          <p class="text-gray-600">{{ error }}</p>
          <button 
            @click="goToLogin"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
          >
            다시 시도
          </button>
        </div>

        <div v-else class="space-y-4">
          <div class="text-green-500">
            <svg class="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900">로그인 성공!</h2>
          <p class="text-gray-600">메인 페이지로 이동합니다...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/composables/useAuth.js';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const error = ref('');

const goToLogin = () => {
  navigateTo('/auth/login');
};

onMounted(async () => {
  try {
    console.log('Google callback 시작');
    
    // URL에서 authorization code 또는 ID token 가져오기
    const code = route.query.code;
    const idToken = route.query.id_token;
    const errorParam = route.query.error;

    console.log('URL 파라미터:', { code, idToken, errorParam });

    if (errorParam) {
      throw new Error('Google 로그인이 취소되었거나 실패했습니다.');
    }

    if (!code && !idToken) {
      throw new Error('인증 정보가 없습니다.');
    }

    // authorization code를 사용하여 백엔드에서 토큰 교환
    if (code && !idToken) {
      console.log('Authorization code로 토큰 교환 시도');
      // authorization code를 사용하여 백엔드에서 토큰 교환
      const config = useRuntimeConfig();
      const response = await $fetch(`${config.public.apiBaseUrl}/auth/google/callback`, {
        method: 'POST',
        body: {
          code: code,
          redirect_uri: window.location.origin + '/auth/google'
        }
      });
      console.log('백엔드 응답:', response);
      
      // 백엔드에서 access_token과 refresh_token을 반환하므로
      // 직접 authStore에 저장하고 사용자 정보를 로드
      if (response.access_token && response.refresh_token) {
        console.log('토큰 교환 성공, 직접 저장');
        authStore.saveTokens(response.access_token, response.refresh_token);
        await authStore.fetchUserInfo();
        
        console.log('로그인 성공, 메인 페이지로 이동');
        console.log('🔍 현재 authStore 상태:', {
          isAuthenticated: authStore.isAuthenticated,
          user: authStore.user,
          accessToken: authStore.accessToken ? '있음' : '없음'
        });
        
        isLoading.value = false;
        console.log('navigateTo 호출 전');
        const result = await navigateTo('/');
        console.log('navigateTo 호출 후:', result);
        return; // 여기서 함수 종료
      } else {
        throw new Error('토큰 정보가 올바르지 않습니다.');
      }
    }

    // ID token이 직접 전달된 경우 (현재는 사용하지 않음)
    if (idToken) {
      console.log('Google 로그인 시도 (ID Token)');
      await authStore.googleLogin(idToken);
      
      console.log('사용자 정보 로드 시도');
      await authStore.fetchUserInfo();
    }

    console.log('로그인 성공, 메인 페이지로 이동');
    console.log('🔍 현재 authStore 상태:', {
      isAuthenticated: authStore.isAuthenticated,
      user: authStore.user,
      accessToken: authStore.accessToken ? '있음' : '없음'
    });
    
    isLoading.value = false;

    // 즉시 메인 페이지로 이동
    console.log('navigateTo 호출 전');
    const result = await navigateTo('/');
    console.log('navigateTo 호출 후:', result);

  } catch (error) {
    console.error('Google callback error:', error);
    isLoading.value = false;
    error.value = error.message || '로그인 처리 중 오류가 발생했습니다.';
  }
});
</script> 