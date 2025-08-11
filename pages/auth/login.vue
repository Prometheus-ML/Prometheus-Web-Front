<template>
  <div class="text-white bg-black relative h-screen overflow-hidden">
    <img src="@/assets/design/login.png" alt="login" class="object-cover w-full h-full">
    <div class="absolute transform -translate-x-1/2 -translate-y-1/2 top-[40%] md:top-[55%] left-[50%] drop-shadow-2xl w-[70%] md:w-[50%] lg:w-[25%] rounded-xl bg-opacity-5 bg-white">
      <div class="px-7 py-7">
        <div class="text-center mb-6">
          <h1 class="text-xl md:text-2xl font-bold detail">로그인</h1>
          <p class="text-sm md:text-base text-gray-300 mt-2">Google 계정으로 로그인하세요</p>
        </div>

        <!-- Google 로그인 버튼 -->
        <button
          @click="handleGoogleLogin"
          :disabled="isLoading"
          type="button"
          class="transition duration-200 bg-white hover:bg-gray-100 text-black w-full py-3 rounded text-sm shadow-sm hover:shadow-md detail font-normal text-center inline-flex items-center justify-center mb-4"
        >
          <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span v-if="!isLoading">Google로 로그인</span>
          <span v-else>로그인 중...</span>
        </button>

        <div v-if="errorMessage" class="text-red-400 text-sm text-center mb-4">
          {{ errorMessage }}
        </div>

        <div class="text-center">
          <p class="detail font-normal text-xs md:text-sm text-gray-400">
            Google OAuth를 통해 안전하게 로그인합니다
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { useAuthStore } from '@/composables/useAuth.js';

const authStore = useAuthStore();
const isLoading = ref(false);
const errorMessage = ref('');

// Google OAuth 로그인 처리
const handleGoogleLogin = () => {
  try {
    isLoading.value = true;
    errorMessage.value = '';

    const config = useRuntimeConfig();
    const googleClientId = config.public.googleClientId;
    const redirectUri = `${window.location.origin}/auth/google`;

    if (!googleClientId) {
      throw new Error('Google Client ID가 설정되지 않았습니다.');
    }

    // Google OAuth URL로 리다이렉트 (수정된 형식)
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=email%20profile`;
    
    console.log('Generated Google Auth URL:', googleAuthUrl);
    window.location.href = googleAuthUrl;
  } catch (error) {
    console.error('Google login error:', error);
    errorMessage.value = error.message || '로그인 중 오류가 발생했습니다.';
    isLoading.value = false;
  }
};

onMounted(async () => {
  // 이미 로그인된 사용자는 메인 페이지로 리다이렉트
  if (authStore.isAuthenticated) {
    navigateTo("/");
  }
});
</script>

<style scoped>
.detail {
  font-family: 'Detail', sans-serif;
}
</style> 