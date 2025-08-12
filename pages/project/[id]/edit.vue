<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900">프로젝트 수정</h1>
      <NuxtLink :to="`/project/${projectId}`" class="text-sm text-gray-600 hover:underline">상세로</NuxtLink>
    </div>

    <ProjectForm :initial="project" mode="edit" :show-status="true" @submit="save" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApiClient } from '@/composables/useApiClient.js';
import { useAuthStore } from '@/composables/useAuth.js';
import ProjectForm from '@/components/ProjectForm.vue';

const route = useRoute();
const router = useRouter();
const { projectApi } = useApiClient();
const auth = useAuthStore();

const projectId = route.params.id;
const project = ref(null);
const isLoading = ref(false);
const error = ref('');

const weights = { Root: 0, Super: 1, Administrator: 2, Manager: 3, Member: 4 };
const canManage = computed(() => {
  const grant = auth.userGrant;
  return grant && (weights[grant] ?? 999) <= 3; // Manager 이상
});

const loadProject = async () => {
  try {
    isLoading.value = true;
    error.value = '';
    project.value = await projectApi.getProject(projectId);
  } catch (e) {
    console.error(e);
    error.value = '프로젝트를 불러오지 못했습니다.';
  } finally {
    isLoading.value = false;
  }
};

const save = async (form) => {
  try {
    await projectApi.updateProject(projectId, form);
    router.push(`/project/${projectId}`);
  } catch (e) {
    alert('저장 실패: ' + (e?.data?.message || e.message));
  }
};

onMounted(async () => {
  if (!canManage.value) {
    alert('수정 권한이 없습니다.');
    router.replace(`/project/${projectId}`);
    return;
  }
  await loadProject();
});

definePageMeta({ middleware: 'auth' });
</script>

<style scoped>
</style>


