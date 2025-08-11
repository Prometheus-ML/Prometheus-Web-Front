<template>
  <div>
    <!-- 페이지 헤더 -->
    <div class="md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          관리자 대시보드
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          시스템 현황과 주요 통계를 확인하세요
        </p>
      </div>
    </div>

    <!-- 통계 카드 -->
    <div class="mt-8">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <!-- 전체 사용자 -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">전체 사용자</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.total_users || 0 }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- 승인 대기 -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">승인 대기</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.pending_approvals || 0 }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- 관리자 수 -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">관리자</dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ (stats.users_by_grant?.Super || 0) + (stats.users_by_grant?.Administrator || 0) + (stats.users_by_grant?.Manager || 0) }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- 활성 권한 -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">활성 권한</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.total_permissions || 0 }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 역할별 사용자 분포 -->
    <div class="mt-8">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">역할별 사용자 분포</h3>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div v-for="(count, grant) in stats.users_by_grant" :key="grant" class="text-center">
              <div class="text-2xl font-bold text-gray-900">{{ count }}</div>
              <div class="text-sm text-gray-500">{{ grant }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 기수별 사용자 분포 -->
    <div class="mt-8">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">기수별 사용자 분포</h3>
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <div v-for="(count, gen) in stats.users_by_gen" :key="gen" class="text-center">
              <div class="text-xl font-bold text-gray-900">{{ count }}</div>
              <div class="text-sm text-gray-500">{{ gen }}기</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 최근 가입자 -->
    <div class="mt-8">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">최근 가입자</h3>
          <div class="flow-root">
            <ul class="-mb-8">
              <li v-for="(user, index) in stats.recent_registrations" :key="user.id" class="relative pb-8">
                <div v-if="index !== stats.recent_registrations.length - 1" class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
                <div class="relative flex items-start space-x-3">
                  <div class="relative">
                    <img
                      v-if="user.image"
                      :src="user.image"
                      :alt="user.name"
                      class="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                    >
                    <div v-else class="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                      <span class="text-sm font-medium text-white">{{ user.name.charAt(0) }}</span>
                    </div>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div>
                      <div class="text-sm">
                        <span class="font-medium text-gray-900">{{ user.name }}</span>
                      </div>
                      <p class="mt-0.5 text-sm text-gray-500">{{ user.email }}</p>
                    </div>
                    <div class="mt-2 text-sm text-gray-700">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            :class="getGrantClass(user.grant)">
                        {{ user.grant }}
                      </span>
                      <span class="ml-2 text-gray-500">{{ user.gen }}기</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 관리 기능 카드 -->
    <div class="mt-8">
      <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">관리 기능</h3>
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <!-- 사용자 관리 -->
            <nuxt-link
              to="/admin/users"
              class="relative group bg-gray-50 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              <div>
                <span class="rounded-lg inline-flex p-3 bg-blue-50 text-blue-600 group-hover:bg-blue-100">
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                  </svg>
                </span>
              </div>
              <div class="mt-8">
                <h3 class="text-lg font-medium">
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  사용자 관리
                </h3>
            <p class="mt-2 text-sm text-gray-500">사용자 목록 및 정보 관리</p>
              </div>
            </nuxt-link>

        <!-- 멤버 관리 -->
            <nuxt-link
              to="/admin/member"
              class="relative group bg-gray-50 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-500 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              <div>
                <span class="rounded-lg inline-flex p-3 bg-green-50 text-green-600 group-hover:bg-green-100">
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </span>
              </div>
              <div class="mt-8">
                <h3 class="text-lg font-medium">
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  멤버 관리
                </h3>
            <p class="mt-2 text-sm text-gray-500">동아리 멤버 정보 관리</p>
              </div>
            </nuxt-link>

        <!-- 승인 관리 -->
            <nuxt-link
          to="/admin/approvals"
          class="relative group bg-gray-50 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-500 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              <div>
            <span class="rounded-lg inline-flex p-3 bg-yellow-50 text-yellow-600 group-hover:bg-yellow-100">
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </span>
              </div>
              <div class="mt-8">
                <h3 class="text-lg font-medium">
                  <span class="absolute inset-0" aria-hidden="true"></span>
              승인 관리
                </h3>
            <p class="mt-2 text-sm text-gray-500">가입 승인 대기 사용자 관리</p>
              </div>
            </nuxt-link>

        <!-- 블랙리스트 관리 -->
            <nuxt-link
          to="/admin/blacklist"
              class="relative group bg-gray-50 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-500 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              <div>
                <span class="rounded-lg inline-flex p-3 bg-red-50 text-red-600 group-hover:bg-red-100">
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                </span>
              </div>
              <div class="mt-8">
                <h3 class="text-lg font-medium">
                  <span class="absolute inset-0" aria-hidden="true"></span>
              블랙리스트 관리
                </h3>
            <p class="mt-2 text-sm text-gray-500">차단된 사용자 관리</p>
              </div>
            </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/composables/useAuth.js';
import { useApiClient } from '@/composables/useApiClient.js';

const authStore = useAuthStore();
const { adminApi } = useApiClient();

const stats = ref({
  total_users: 0,
  users_by_grant: {},
  users_by_gen: {},
  recent_registrations: [],
  pending_approvals: 0
});

const isLoading = ref(true);
const error = ref('');

// 역할별 스타일 클래스
const getGrantClass = (grant) => {
  const classes = {
    'Super': 'bg-red-100 text-red-800',
    'Administrator': 'bg-purple-100 text-purple-800',
    'Manager': 'bg-blue-100 text-blue-800',
    'Member': 'bg-green-100 text-green-800'
  };
  return classes[grant] || 'bg-gray-100 text-gray-800';
};

// 통계 로드는 제거되었습니다

onMounted(async () => {
});

// 페이지 메타 설정
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
});
</script>

