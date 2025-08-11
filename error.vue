<template>
  <div class="text-white bg-black relative min-h-screen overflow-hidden">
    <!-- 배경 이미지 -->
    <img src="@/assets/design/login.png" alt="background" class="object-cover w-full h-full absolute inset-0 opacity-20">
    
    <!-- 메인 컨텐츠 -->
    <div class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
      <div class="text-center max-w-md mx-auto">
        <!-- 에러 아이콘 -->
        <div class="mb-8">
          <div class="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>

        <!-- 에러 제목 -->
        <h1 class="text-4xl md:text-6xl font-bold detail mb-4">
          {{ error.statusCode === 404 ? '404' : '오류' }}
        </h1>

        <!-- 에러 메시지 -->
        <h2 class="text-xl md:text-2xl font-semibold detail mb-6">
          {{ error.statusCode === 404 ? '페이지를 찾을 수 없습니다' : '문제가 발생했습니다' }}
        </h2>

        <p class="text-gray-300 text-sm md:text-base mb-8 detail">
          {{ error.statusCode === 404 
            ? '요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.' 
            : '일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.' }}
        </p>

        <!-- 액션 버튼들 -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="handleError"
            class="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors detail"
          >
            다시 시도
          </button>
          
          <nuxt-link
            to="/"
            class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors detail"
          >
            홈으로 이동
          </nuxt-link>
        </div>

        <!-- 추가 정보 -->
        <div class="mt-12 text-center">
          <p class="text-gray-400 text-xs detail">
            오류 코드: {{ error.statusCode }}
          </p>
          <p v-if="error.message" class="text-gray-400 text-xs detail mt-1">
            {{ error.message }}
          </p>
        </div>

        <!-- 프메 로고/브랜딩 -->
        <div class="mt-16">
          <div class="flex items-center justify-center space-x-2">
            <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span class="text-black font-bold text-sm">P</span>
            </div>
            <span class="text-white font-semibold detail">프로메테우스</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 네비게이션 -->
    <div class="absolute top-8 left-8">
      <nuxt-link
        to="/"
        class="text-white hover:text-gray-300 transition-colors detail font-medium"
      >
        ← 홈으로
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true
  }
});

// 에러 처리 함수
const handleError = () => {
  clearError({ redirect: '/' });
};

// 페이지 메타 설정
definePageMeta({
  layout: false
});
</script>

<style scoped>
.detail {
  font-family: 'Detail', sans-serif;
}
</style> 