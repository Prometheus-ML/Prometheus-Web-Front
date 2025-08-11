import { useAuthStore } from '@/composables/useAuth.js';

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  
  // 클라이언트 사이드에서만 실행
  if (process.client) {
    try {
      // 인증 상태 초기화
      await authStore.initialize();
    } catch (error) {
      console.error('Auth initialization failed:', error);
    }
  }
});