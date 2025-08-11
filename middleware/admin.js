import { useAuthStore } from '~/composables/useAuth.js';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // 클라이언트 사이드에서만 실행
  if (process.client) {
    // 인증되지 않은 경우 로그인 페이지로
    if (!authStore.isAuthenticated) {
      return navigateTo('/auth/login');
    }

    // 관리자 권한 확인 (Manager 이상)
    const userGrant = authStore.userGrant;
    const userGrantWeight = authStore.userGrantWeight;
    
    // 역할별 가중치 (낮을수록 높은 권한)
    const grantWeights = {
      'Super': 0,
      'Administrator': 1,
      'Manager': 2,
      'Member': 3
    };
    
    console.log('🔐 Admin 권한 체크:', {
      userGrant,
      userGrantWeight,
      grantWeight: grantWeights[userGrant],
      isAllowed: userGrant && grantWeights[userGrant] <= 2
    });
    
    // Manager 이상의 권한이 없으면 메인 페이지로
    // (가중치가 2 이하인 경우만 접근 가능)
    if (!userGrant || grantWeights[userGrant] > 2) {
      console.log('❌ Admin 접근 거부:', userGrant);
      throw createError({
        statusCode: 403,
        message: '관리자 권한이 필요합니다. Manager 이상의 권한이 필요합니다.'
      });
    }
    
    console.log('✅ Admin 접근 허용:', userGrant);
  }
});