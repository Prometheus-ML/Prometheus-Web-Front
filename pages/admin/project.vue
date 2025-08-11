<template>
  <div>
    <div class="md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          프로젝트 관리
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          프로젝트 및 활동을 관리하세요
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
          프로젝트 추가
        </button>
      </div>
    </div>

    <div class="mt-8">
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">프로젝트 목록</h3>
          
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
            <div v-for="project in projects" :key="project.id" class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h4 class="text-lg font-medium text-gray-900">{{ project.title }}</h4>
                    <p class="text-sm text-gray-500">{{ project.description }}</p>
                    <div class="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span>{{ project.category }}</span>
                      <span>{{ project.status }}</span>
                      <span>{{ project.team_size }}명</span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <button
                    @click="viewProject(project)"
                    class="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    상세보기
                  </button>
                  <button
                    @click="editProject(project)"
                    class="text-green-600 hover:text-green-900 text-sm font-medium"
                  >
                    수정
                  </button>
                  <button
                    @click="deleteProject(project)"
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

const projects = ref([]);
const isLoading = ref(false);
const error = ref('');
const showAddModal = ref(false);

const loadProjects = async () => {
  try {
    isLoading.value = true;
    error.value = '';
    const response = await adminApi.getProjects();
    projects.value = response.projects || [];
  } catch (err) {
    console.error('Failed to load projects:', err);
    error.value = '프로젝트 목록을 불러오는 중 오류가 발생했습니다.';
  } finally {
    isLoading.value = false;
  }
};

const viewProject = (project) => {
  console.log('View project:', project);
};

const editProject = (project) => {
  console.log('Edit project:', project);
};

const deleteProject = async (project) => {
  if (!confirm(`정말로 "${project.title}" 프로젝트를 삭제하시겠습니까?`)) {
    return;
  }
  
  try {
    await adminApi.deleteProject(project.id);
    await loadProjects();
  } catch (err) {
    console.error('Failed to delete project:', err);
    error.value = '프로젝트 삭제 중 오류가 발생했습니다.';
  }
};

onMounted(async () => {
  await loadProjects();
});

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
});
</script> 