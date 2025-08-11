<template>
  <div>
    <div class="md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          역할 관리
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          사용자 역할 및 권한을 관리하세요
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
          역할 추가
        </button>
      </div>
    </div>

    <div class="mt-8">
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">역할 목록</h3>
          
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
            <div v-for="grant in grants" :key="grant.id" class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h4 class="text-lg font-medium text-gray-900">{{ grant.name }}</h4>
                    <p class="text-sm text-gray-500">{{ grant.description }}</p>
                    <div class="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span>가중치: {{ grant.weight }}</span>
                      <span>{{ grant.permissions?.length || 0 }}개 권한</span>
                      <span>{{ grant.members_count || 0 }}명의 멤버</span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <button
                    @click="viewGrant(grant)"
                    class="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    상세보기
                  </button>
                  <button
                    @click="editGrant(grant)"
                    class="text-green-600 hover:text-green-900 text-sm font-medium"
                  >
                    수정
                  </button>
                  <button
                    @click="deleteGrant(grant)"
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

const grants = ref([]);
const isLoading = ref(false);
const error = ref('');
const showAddModal = ref(false);

const loadGrants = async () => {
  try {
    isLoading.value = true;
    error.value = '';
    const response = await adminApi.getGrants();
    grants.value = response.grants || [];
  } catch (err) {
    console.error('Failed to load grants:', err);
    error.value = '역할 목록을 불러오는 중 오류가 발생했습니다.';
  } finally {
    isLoading.value = false;
  }
};

const viewGrant = (grant) => {
  console.log('View grant:', grant);
};

const editGrant = (grant) => {
  console.log('Edit grant:', grant);
};

const deleteGrant = async (grant) => {
  if (!confirm(`정말로 "${grant.name}" 역할을 삭제하시겠습니까?`)) {
    return;
  }
  
  try {
    await adminApi.deleteGrant(grant.id);
    await loadGrants();
  } catch (err) {
    console.error('Failed to delete grant:', err);
    error.value = '역할 삭제 중 오류가 발생했습니다.';
  }
};

onMounted(async () => {
  await loadGrants();
});

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
});
</script> 