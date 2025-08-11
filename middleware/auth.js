import { useAuthStore } from '~/composables/useAuth.js';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // 클라이언트 사이드에서만 실행
  if (process.client) {
    // 토큰이 없으면 로그인 페이지로 리다이렉트
    if (!authStore.isAuthenticated) {
      return navigateTo('/auth/login');
    }
  }
});