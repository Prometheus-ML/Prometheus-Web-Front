<template>
  <div>
    <!-- 페이지 헤더 -->
    <div class="md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          후원 관리
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          후원사 및 후원금을 관리하세요
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
          후원사 추가
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
                <svg class="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">전체 후원사</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.total_sponsors || 0 }}</dd>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">총 후원금</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.total_amount || 0 }}만원</dd>
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
                  <dt class="text-sm font-medium text-gray-500 truncate">활성 후원사</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.active_sponsors || 0 }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">이번 달 후원</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.monthly_amount || 0 }}만원</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 후원사 목록 -->
    <div class="mt-8">
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">후원사 목록</h3>
          
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
            <div v-for="sponsor in sponsors" :key="sponsor.id" class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <img
                      v-if="sponsor.logo"
                      :src="sponsor.logo"
                      :alt="sponsor.name"
                      class="h-12 w-12 rounded-lg object-cover"
                    >
                    <div v-else class="h-12 w-12 bg-gray-300 rounded-lg flex items-center justify-center">
                      <span class="text-sm font-medium text-gray-700">{{ sponsor.name.charAt(0) }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h4 class="text-lg font-medium text-gray-900">{{ sponsor.name }}</h4>
                    <p class="text-sm text-gray-500">{{ sponsor.description }}</p>
                    <div class="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span>{{ sponsor.amount }}만원</span>
                      <span>{{ sponsor.category }}</span>
                      <span>{{ sponsor.contact_person }}</span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getStatusClass(sponsor.status)"
                  >
                    {{ sponsor.status }}
                  </span>
                  <button
                    @click="viewSponsor(sponsor)"
                    class="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    상세보기
                  </button>
                  <button
                    @click="editSponsor(sponsor)"
                    class="text-green-600 hover:text-green-900 text-sm font-medium"
                  >
                    수정
                  </button>
                  <button
                    @click="deleteSponsor(sponsor)"
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
const sponsors = ref([]);
const stats = ref({});
const isLoading = ref(false);
const error = ref('');
const showAddModal = ref(false);

// 상태별 스타일 클래스
const getStatusClass = (status) => {
  const classes = {
    'active': 'bg-green-100 text-green-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'inactive': 'bg-gray-100 text-gray-800',
    'expired': 'bg-red-100 text-red-800'
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
};

// 후원사 목록 로드
const loadSponsors = async () => {
  try {
    isLoading.value = true;
    error.value = '';
    
    const response = await adminApi.getSponsors();
    sponsors.value = response.sponsors || [];
  } catch (err) {
    console.error('Failed to load sponsors:', err);
    error.value = '후원사 목록을 불러오는 중 오류가 발생했습니다.';
  } finally {
    isLoading.value = false;
  }
};

// 통계 로드는 제거되었습니다

// 후원사 관리 함수들
const viewSponsor = (sponsor) => {
  console.log('View sponsor:', sponsor);
};

const editSponsor = (sponsor) => {
  console.log('Edit sponsor:', sponsor);
};

const deleteSponsor = async (sponsor) => {
  if (!confirm(`정말로 "${sponsor.name}" 후원사를 삭제하시겠습니까?`)) {
    return;
  }
  
  try {
    await adminApi.deleteSponsor(sponsor.id);
    await loadSponsors();
    await loadStats();
  } catch (err) {
    console.error('Failed to delete sponsor:', err);
    error.value = '후원사 삭제 중 오류가 발생했습니다.';
  }
};

// 초기화
onMounted(async () => {
  await loadSponsors();
});

// 페이지 메타 설정
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
});
</script> 