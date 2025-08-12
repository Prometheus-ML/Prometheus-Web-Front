<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900">프로젝트</h1>
      <div v-if="canCreate" class="flex items-center space-x-2">
        <NuxtLink to="/project/new" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">프로젝트 생성</NuxtLink>
      </div>
    </div>

    <div class="mb-4 flex items-center space-x-2">
      <select v-model="status" class="border rounded-md px-3 py-2 text-sm">
        <option value="">전체</option>
        <option value="active">진행중</option>
        <option value="completed">완료</option>
        <option value="paused">중지</option>
      </select>
      <button @click="loadProjects" class="px-3 py-2 text-sm rounded-md border hover:bg-gray-50">필터 적용</button>
    </div>

    <div v-if="isLoading" class="py-20 text-center text-gray-500">불러오는 중...</div>
    <div v-else-if="error" class="py-8 text-center text-red-600">{{ error }}</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="project in projects" :key="project.id" class="border rounded-lg p-4 bg-white">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">{{ project.title }}</h3>
            <p class="mt-1 text-sm text-gray-600 line-clamp-2">{{ project.description }}</p>
            <div class="mt-2 text-xs text-gray-500 space-x-2">
              <span>{{ project.gen }}기</span>
              <span class="px-2 py-0.5 rounded-full border">{{ project.status }}</span>
            </div>
          </div>
          <NuxtLink :to="`/project/${project.id}`" class="text-blue-600 hover:underline text-sm">상세</NuxtLink>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useApiClient } from '@/composables/useApiClient.js';
import { useAuthStore } from '@/composables/useAuth.js';

const { projectApi } = useApiClient();
const auth = useAuthStore();

const projects = ref([]);
const isLoading = ref(false);
const error = ref('');
const status = ref('');

const canCreate = computed(() => {
  // Manager 이상만 생성 가능 (Root/Super/Administrator/Manager)
  const grant = auth.userGrant;
  const weights = { Root: 0, Super: 1, Administrator: 2, Manager: 3, Member: 4 };
  return grant && (weights[grant] ?? 999) <= 3;
});

const loadProjects = async () => {
  try {
    isLoading.value = true;
    error.value = '';
    const res = await projectApi.getProjects({ status: status.value });
    projects.value = res?.projects || res?.items || [];
  } catch (e) {
    console.error(e);
    error.value = '프로젝트 목록을 불러오지 못했습니다.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadProjects);

definePageMeta({ middleware: 'auth' });
</script>

<script>
export default {}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>


