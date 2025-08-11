<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 개인화된 헤더 -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">안녕하세요, {{ user?.name }}님!</h1>
            <p class="text-gray-600 mt-1">{{ user?.name }}님, 2025년 2학기 프메 활동 중입니다</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <div class="text-2xl font-bold text-green-600">{{ userStats.attendanceRate }}%</div>
              <div class="text-sm text-gray-500">출석률</div>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-blue-600">{{ userStats.projectCount }}</div>
              <div class="text-sm text-gray-500">참여 프로젝트</div>
            </div>
          </div>
    </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 빠른 액션 카드 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">일정 관리</h3>
              <p class="text-sm text-gray-500">다가오는 일정 확인</p>
            </div>
          </div>
          <div class="mt-4">
            <nuxt-link to="/schedule" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
              바로가기 →
            </nuxt-link>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
        </div>
      </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">멤버</h3>
              <p class="text-sm text-gray-500">멤버들과 소통</p>
      </div>
    </div>
          <div class="mt-4">
            <nuxt-link to="/members" class="text-green-600 hover:text-green-700 text-sm font-medium">
              바로가기 →
            </nuxt-link>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">후원</h3>
              <p class="text-sm text-gray-500">후원사 소개</p>
            </div>
          </div>
          <div class="mt-4">
            <nuxt-link to="/sponsorship" class="text-purple-600 hover:text-purple-700 text-sm font-medium">
              바로가기 →
            </nuxt-link>
                </div>
                </div>
                
        <div v-if="user?.grant_weight <= 3" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">관리자</h3>
              <p class="text-sm text-gray-500">시스템 관리</p>
            </div>
          </div>
          <div class="mt-4">
            <nuxt-link to="/admin" class="text-red-600 hover:text-red-700 text-sm font-medium">
              바로가기 →
            </nuxt-link>
          </div>
        </div>
      </div>

      <!-- 추천 커뮤니티 콘텐츠 -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">추천 콘텐츠</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="content in recommendedContent"
            :key="content.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span class="text-blue-600 text-lg">{{ content.icon }}</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ content.title }}</h3>
                <p class="text-sm text-gray-500">{{ content.author }}</p>
              </div>
            </div>
            <p class="text-gray-600 text-sm mb-4">{{ content.description }}</p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500">{{ content.date }}</span>
              <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                자세히 보기
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 최근 활동 -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">최근 활동</h2>
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="space-y-4">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
            >
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                <p class="text-xs text-gray-500">{{ activity.time }}</p>
    </div>
              <span
                :class="[
                  'px-2 py-1 text-xs rounded-full',
                  activity.type === 'attendance' ? 'bg-green-100 text-green-800' :
                  activity.type === 'project' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                ]"
              >
                {{ activity.type === 'attendance' ? '출석' : 
                   activity.type === 'project' ? '프로젝트' : '기타' }}
              </span>
        </div>
          </div>
        </div>
      </div>

      <!-- 소속감 강조 섹션 -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-center text-white">
        <h2 class="text-3xl font-bold mb-4">프로메테우스와 함께</h2>
        <p class="text-lg mb-6 opacity-90">
          인공지능의 미래를 함께 만들어가는 동료들과 소통하세요
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <nuxt-link
            to="/members"
            class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            멤버 보기
          </nuxt-link>
          <nuxt-link
            to="/schedule"
            class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            일정 확인
      </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/composables/useAuth';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

// 사용자 통계
const userStats = ref({
  attendanceRate: 85,
  projectCount: 3
});

// 추천 콘텐츠
const recommendedContent = ref([
  {
    id: 1,
    title: 'AI 프로젝트 발표회',
    author: '김지후',
    description: '이번 주 정기 세미나에서 진행될 AI 프로젝트 발표회 안내입니다.',
    date: '2025-01-20',
    icon: '🎤'
  },
  {
    id: 2,
    title: '머신러닝 스터디',
    author: '이민수',
    description: '머신러닝 기초부터 심화까지 함께 공부해보세요.',
    date: '2025-01-22',
    icon: '📚'
  },
  {
    id: 3,
    title: '해커톤 준비 미팅',
    author: '박서연',
    description: '내부 해커톤 준비를 위한 미팅이 예정되어 있습니다.',
    date: '2025-01-25',
    icon: '💻'
  }
]);

// 최근 활동
const recentActivities = ref([
  {
    id: 1,
    title: '정기 세미나에 출석했습니다',
    time: '2시간 전',
    type: 'attendance'
  },
  {
    id: 2,
    title: 'AI 챗봇 프로젝트에 참여했습니다',
    time: '1일 전',
    type: 'project'
  },
  {
    id: 3,
    title: '커피챗을 신청했습니다',
    time: '2일 전',
    type: 'other'
  }
]);

// 페이지 메타 설정
definePageMeta({
  middleware: 'auth'
});
</script>

<style>



html, body {
  overflow-x: hidden;
}

.custom {
	width: 70vw;
}

.detail {
  font-family: 'Detail', sans-serif;
}

</style>

