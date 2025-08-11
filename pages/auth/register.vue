<template>
  <div class="text-white bg-black relative h-screen overflow-hidden">
    <img src="@/assets/design/login.png" alt="register" class="object-cover w-full h-full">
    <div class="absolute transform -translate-x-1/2 -translate-y-1/2 top-[40%] md:top-[55%] left-[50%] drop-shadow-2xl w-[70%] md:w-[50%] lg:w-[25%] rounded-xl bg-opacity-5 bg-white">
      <div class="px-7 py-7">
        <div class="text-center mb-6">
          <h1 class="text-xl md:text-2xl font-bold detail">회원가입</h1>
          <p class="text-sm md:text-base text-gray-300 mt-2">프로메테우스에 가입하세요</p>
        </div>

        <!-- 회원가입 폼 -->
        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <input
              v-model="form.name"
              type="text"
              placeholder="이름"
              class="w-full px-3 py-2 bg-white bg-opacity-10 border border-gray-300 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <input
              v-model="form.email"
              type="email"
              placeholder="이메일"
              class="w-full px-3 py-2 bg-white bg-opacity-10 border border-gray-300 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <input
              v-model="form.major"
              type="text"
              placeholder="전공"
              class="w-full px-3 py-2 bg-white bg-opacity-10 border border-gray-300 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <input
              v-model="form.studentId"
              type="text"
              placeholder="학번"
              class="w-full px-3 py-2 bg-white bg-opacity-10 border border-gray-300 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
          >
            <span v-if="!isLoading">회원가입</span>
            <span v-else>처리 중...</span>
          </button>
        </form>

        <div v-if="errorMessage" class="text-red-400 text-sm text-center mt-4">
          {{ errorMessage }}
        </div>

        <div class="text-center mt-4">
          <p class="text-sm text-gray-400">
            이미 계정이 있으신가요? 
            <nuxt-link to="/auth/login" class="text-blue-400 hover:text-blue-300">
              로그인하기
            </nuxt-link>
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

const form = ref({
  name: '',
  email: '',
  major: '',
  studentId: ''
});

// 회원가입 처리
const handleRegister = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = '';

    const config = useRuntimeConfig();
    
    // 회원가입 API 호출
    const response = await $fetch(`${config.public.apiBaseUrl}/auth/register`, {
      method: 'POST',
      body: form.value
    });

    // 성공 시 로그인 페이지로 이동
    navigateTo('/auth/login');
  } catch (error) {
    console.error('Register error:', error);
    errorMessage.value = error.message || '회원가입 중 오류가 발생했습니다.';
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