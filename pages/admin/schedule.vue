<template>
  <div>
    <!-- 페이지 헤더 -->
    <div class="md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          일정 관리
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          행사 일정 및 출석을 관리하세요
        </p>
      </div>
      <div class="mt-4 flex md:mt-0 md:ml-4">
        <button
          @click="showAddModal = true"
          class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          일정 추가
        </button>
      </div>
    </div>

    <!-- 통계 카드 -->
    <div class="mt-8">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">전체 일정</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.total_events || 0 }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">다가오는 일정</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.upcoming_events || 0 }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

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
                  <dt class="text-sm font-medium text-gray-500 truncate">평균 출석률</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.avg_attendance || 0 }}%</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">취소된 일정</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.cancelled_events || 0 }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 일정 목록 -->
    <div class="mt-8">
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">일정 목록</h3>
          
          <div v-if="isLoading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>

          <div v-else-if="error" class="text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">오류 발생</h3>
            <p class="mt-1 text-sm text-gray-500">{{ error }}</p>
          </div>

          <div v-else class="space-y-4">
            <div v-for="event in events" :key="event.id" class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h4 class="text-lg font-medium text-gray-900">{{ event.title }}</h4>
                    <p class="text-sm text-gray-500">{{ event.description }}</p>
                    <div class="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span>{{ event.date }}</span>
                      <span>{{ event.time }}</span>
                      <span>{{ event.location }}</span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getStatusClass(event.status)"
                  >
                    {{ event.status }}
                  </span>
                  <button
                    @click="viewEvent(event)"
                    class="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    상세보기
                  </button>
                  <button
                    @click="editEvent(event)"
                    class="text-green-600 hover:text-green-900 text-sm font-medium"
                  >
                    수정
                  </button>
                  <button
                    @click="deleteEvent(event)"
                    class="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/composables/useAuth.js';
import { useApiClient } from '@/composables/useApiClient.js';

const authStore = useAuthStore();
const { adminApi } = useApiClient();

// 상태 변수
const events = ref([]);
const stats = ref({});
const isLoading = ref(false);
const error = ref('');
const showAddModal = ref(false);

// 상태별 스타일 클래스
const getStatusClass = (status) => {
  const classes = {
    'upcoming': 'bg-blue-100 text-blue-800',
    'ongoing': 'bg-green-100 text-green-800',
    'completed': 'bg-gray-100 text-gray-800',
    'cancelled': 'bg-red-100 text-red-800'
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
};

// 일정 목록 로드
const loadEvents = async () => {
  try {
    isLoading.value = true;
    error.value = '';
    
    const response = await adminApi.getEvents();
    events.value = response.events || [];
  } catch (err) {
    console.error('Failed to load events:', err);
    error.value = '일정 목록을 불러오는 중 오류가 발생했습니다.';
  } finally {
    isLoading.value = false;
  }
};

// 통계 로드는 제거되었습니다

// 일정 관리 함수들
const viewEvent = (event) => {
  console.log('View event:', event);
};

const editEvent = (event) => {
  console.log('Edit event:', event);
};

const deleteEvent = async (event) => {
  if (!confirm(`정말로 "${event.title}" 일정을 삭제하시겠습니까?`)) {
    return;
  }
  
  try {
    await adminApi.deleteEvent(event.id);
    await loadEvents();
  } catch (err) {
    console.error('Failed to delete event:', err);
    error.value = '일정 삭제 중 오류가 발생했습니다.';
  }
};

// 초기화
onMounted(async () => {
  await loadEvents();
});

// 페이지 메타 설정
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
});
</script> 