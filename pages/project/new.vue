<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900">프로젝트 생성</h1>
      <NuxtLink to="/project" class="text-sm text-gray-600 hover:underline">목록으로</NuxtLink>
    </div>

    <ProjectForm :initial="{}" mode="create" @submit="submit" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useApiClient } from '@/composables/useApiClient.js';
import { useAuthStore } from '@/composables/useAuth.js';
import ProjectForm from '@/components/ProjectForm.vue';

const router = useRouter();
const { projectApi } = useApiClient();
const auth = useAuthStore();

const weights = { Root: 0, Super: 1, Administrator: 2, Manager: 3, Member: 4 };
const canCreate = computed(() => {
  const grant = auth.userGrant;
  return grant && (weights[grant] ?? 999) <= 3;
});

const submit = async (payload) => {
  try {
    const created = await projectApi.createProject(payload);
    router.push(`/project/${created.id}`);
  } catch (e) {
    alert('생성 실패: ' + (e?.data?.message || e.message));
  }
};

onMounted(() => {
  if (!canCreate.value) {
    alert('프로젝트 생성 권한이 없습니다.');
    router.replace('/project');
  }
});

definePageMeta({ middleware: 'auth' });
</script>

<style scoped>
</style>


