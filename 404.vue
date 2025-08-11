<template>
  <div class="text-white bg-black relative min-h-screen overflow-hidden">
    <!-- 배경 이미지 -->
    <img src="@/assets/design/login.png" alt="background" class="object-cover w-full h-full absolute inset-0 opacity-20">
    
    <!-- 메인 컨텐츠 -->
    <div class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
      <div class="text-center max-w-md mx-auto">
        <!-- 404 아이콘 -->
        <div class="mb-8">
          <div class="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"></path>
            </svg>
          </div>
        </div>

        <!-- 404 제목 -->
        <h1 class="text-6xl md:text-8xl font-bold detail mb-4 text-blue-400">
          404
        </h1>

        <!-- 에러 메시지 -->
        <h2 class="text-xl md:text-2xl font-semibold detail mb-6">
          페이지를 찾을 수 없습니다
        </h2>

        <p class="text-gray-300 text-sm md:text-base mb-8 detail">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.<br>
          URL을 다시 확인해주세요.
        </p>

        <!-- 액션 버튼들 -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="goBack"
            class="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors detail"
          >
            이전 페이지
          </button>
          
          <nuxt-link
            to="/"
            class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors detail"
          >
            홈으로 이동
          </nuxt-link>
        </div>

        <!-- 빠른 링크 -->
        <div class="mt-12">
          <h3 class="text-lg font-semibold detail mb-4">빠른 링크</h3>
          <div class="flex flex-wrap justify-center gap-3">
            <nuxt-link
              to="/schedule"
              class="text-blue-400 hover:text-blue-300 transition-colors detail text-sm"
            >
              일정
            </nuxt-link>
            <span class="text-gray-500">•</span>
            <nuxt-link
              to="/members"
              class="text-blue-400 hover:text-blue-300 transition-colors detail text-sm"
            >
              멤버
            </nuxt-link>
            <span class="text-gray-500">•</span>
            <nuxt-link
              to="/sponsorship"
              class="text-blue-400 hover:text-blue-300 transition-colors detail text-sm"
            >
              후원
            </nuxt-link>
          </div>
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
      <button
        @click="goBack"
        class="text-white hover:text-gray-300 transition-colors detail font-medium"
      >
        ← 뒤로가기
      </button>
    </div>
  </div>
</template>

<script setup>
// 뒤로가기 함수
const goBack = () => {
  if (process.client) {
    window.history.back();
  }
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