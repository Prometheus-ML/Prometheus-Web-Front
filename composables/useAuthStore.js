import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import { useCookie } from 'nuxt/app'; // Nuxt의 쿠키 관리 기능

export const useAuthStore = defineStore('auth', () => {
  // 상태 변수
  const user = ref(null);
  
  const access_token = useCookie('access_token'); // access_token 쿠키
  const refresh_token = useCookie('refresh_token'); // refresh_token 쿠키

  // 사용자 검증
  const verifyUser = async () => {
    try {
      // 액세스 토큰 검증
      const response = await $fetch(`${import.meta.env.VITE_API_URL}/auth/verify-access-token`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${access_token.value}`
        }
      });

      console.log('Access token verified:', response);
      user.value = response;

    } catch (error) {
      console.error('Access token verification failed:', error);

      // 리프레시 토큰으로 재발급 시도
      try {
        const refreshResponse = await $fetch(`${import.meta.env.VITE_API_URL}/auth/refresh-access-token`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${refresh_token.value}`
          }
        });

        // 새 토큰 저장
        access_token.value = refreshResponse.access_token; // 상태 업데이트
        refresh_token.value = refreshResponse.refresh_token;
        user.value = refreshResponse;
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        logout(); // 실패 시 로그아웃
      }
    }
  };

  // 로그아웃 로직 추후 추가하기.
  const logout = () => {
    console.log(access_token.value, refresh_token.value);
    access_token.value = null;
    refresh_token.value = null;

    user.value = null;

  };

  return {
    access_token,
    refresh_token,
    user,
    verifyUser,
    logout
  };
});
