<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 상단 네비게이션 바 -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <!-- 로고 -->
            <div class="flex-shrink-0 flex items-center">
              <nuxt-link to="/" class="text-xl font-bold text-gray-900">
                프로메테우스 관리
              </nuxt-link>
            </div>
          </div>

          <!-- 우측 사용자 메뉴 -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-3">
              <img
                v-if="user?.image"
                :src="user.image"
                :alt="user.name"
                class="h-8 w-8 rounded-full"
              >
              <div v-else class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span class="text-sm font-medium text-gray-700">
                  {{ user?.name?.charAt(0) || 'U' }}
                </span>
              </div>
              <div class="hidden md:block">
                <div class="text-sm font-medium text-gray-900">{{ user?.name }}</div>
                <div class="text-xs text-gray-500">{{ user?.grant }}</div>
              </div>
            </div>
            
            <!-- 로그아웃 버튼 -->
            <button
              @click="logout"
              class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex">
      <!-- 사이드바 -->
      <div class="w-64 bg-white shadow-sm min-h-screen">
        <nav class="mt-5 px-2">
          <div class="space-y-1">
            <!-- 대시보드 -->
            <nuxt-link
              to="/admin"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              :class="isCurrentRoute('/admin') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
              </svg>
              대시보드
            </nuxt-link>

            <!-- 멤버 관리 -->
            <nuxt-link
              to="/admin/member"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              :class="isCurrentRoute('/admin/member') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
              멤버 관리
            </nuxt-link>

            <!-- 블랙리스트 관리 -->
            <nuxt-link
              to="/admin/blacklist"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              :class="isCurrentRoute('/admin/blacklist') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
              블랙리스트 관리
            </nuxt-link>
          </div>
        </nav>
      </div>

      <!-- 메인 컨텐츠 영역 -->
      <div class="flex-1 overflow-hidden">
        <main class="flex-1 relative overflow-y-auto focus:outline-none">
          <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <slot />
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/composables/useAuth.js';
import { useApiClient } from '@/composables/useApiClient.js';

const authStore = useAuthStore();
const { adminApi } = useApiClient();
const route = useRoute();

const user = computed(() => authStore.user);

// 현재 라우트 확인
const isCurrentRoute = (path) => {
  if (path === '/admin' && route.path === '/admin') return true;
  if (path !== '/admin' && route.path.startsWith(path)) return true;
  return false;
};

// 로그아웃
const logout = () => {
  authStore.logout();
};

onMounted(() => {
  // 필요한 초기화 작업이 있다면 여기에 추가
});

// 페이지 메타 설정
definePageMeta({
  middleware: 'admin'
});
</script>

<style scoped>
/* 커스텀 스타일 */
.router-link-active {
  @apply bg-gray-100 text-gray-900;
}
</style>