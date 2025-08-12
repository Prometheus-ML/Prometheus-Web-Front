<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="isLoading" class="py-20 text-center text-gray-500">불러오는 중...</div>
    <div v-else-if="error" class="py-8 text-center text-red-600">{{ error }}</div>
    <div v-else-if="!project" class="py-8 text-center text-gray-500">프로젝트가 없습니다.</div>
    <div v-else>
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">{{ project.title }}</h1>
          <div class="mt-2 text-sm text-gray-500 space-x-2">
            <span>{{ project.gen }}기</span>
            <span class="px-2 py-0.5 rounded-full border">{{ project.status }}</span>
            <span>시작: {{ formatDate(project.start_date) }}</span>
            <span v-if="project.end_date">종료: {{ formatDate(project.end_date) }}</span>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <NuxtLink v-if="canEdit" :to="`/project/${projectId}/edit`" class="px-3 py-1.5 rounded border">수정</NuxtLink>
          <button class="px-3 py-1.5 rounded bg-red-600 text-white" v-if="canManage" @click="confirmDelete = true">삭제</button>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2">
          <div class="prose max-w-none">
            <p class="text-gray-700 whitespace-pre-line">{{ project.description }}</p>
            <div class="mt-4 space-y-2">
              <div v-if="project.github_url">
                <a :href="project.github_url" class="text-blue-600 hover:underline" target="_blank">GitHub</a>
              </div>
              <div v-if="project.demo_url">
                <a :href="project.demo_url" class="text-blue-600 hover:underline" target="_blank">Demo</a>
              </div>
              <div v-if="project.panel_url">
                <img :src="project.panel_url" alt="panel" class="rounded border" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-3">팀원</h2>
          <div v-if="membersLoading" class="text-sm text-gray-500">멤버 불러오는 중...</div>
          <div v-else class="space-y-2">
            <div v-for="m in members" :key="m.id" class="border rounded p-3 flex items-center justify-between">
              <div>
                <div class="font-medium">{{ m.member_id }} <span class="text-xs text-gray-500">/ {{ m.role || '팀원' }}</span></div>
                <div class="text-xs text-gray-500" v-if="m.contribution">{{ m.contribution }}</div>
              </div>
              <div v-if="canEditMembers" class="flex items-center space-x-2">
                <button class="px-2 py-1 text-xs border rounded" @click="openEditMember(m)">수정</button>
                <button class="px-2 py-1 text-xs bg-red-600 text-white rounded" @click="removeMember(m)">삭제</button>
              </div>
            </div>

            <div v-if="canEditMembers" class="pt-2">
              <button class="px-3 py-1.5 rounded bg-blue-600 text-white" @click="openAddMember">멤버 추가</button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        :show="confirmDelete"
        title="프로젝트 삭제"
        message="정말 삭제하시겠습니까?"
        confirm-text="삭제"
        @confirm="deleteProject"
        @cancel="confirmDelete = false"
      />

      <MemberModal
        v-if="showMemberModal"
        :mode="memberModalMode"
        :member="selectedMember"
        @close="closeMemberModal"
        @submit="submitMember"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApiClient } from '@/composables/useApiClient.js';
import { useAuthStore } from '@/composables/useAuth.js';
import ConfirmModal from '@/components/ConfirmModal.vue';

const route = useRoute();
const router = useRouter();
const { projectApi } = useApiClient();
const auth = useAuthStore();

const projectId = route.params.id;

const project = ref(null);
const isLoading = ref(false);
const error = ref('');
const confirmDelete = ref(false);

const members = ref([]);
const membersLoading = ref(false);

const showMemberModal = ref(false);
const memberModalMode = ref('add'); // 'add' | 'edit'
const selectedMember = ref(null);

const weights = { Root: 0, Super: 1, Administrator: 2, Manager: 3, Member: 4 };

const canManage = computed(() => {
  const grant = auth.userGrant;
  return grant && (weights[grant] ?? 999) <= 3; // Manager 이상
});

const isLeader = computed(() => {
  return members.value.some(m => m.role === 'leader' && String(m.member_id) === String(auth.user?.id));
});

const canEdit = computed(() => canManage.value || isLeader.value);
const canEditMembers = canEdit;

const formatDate = (d) => (d ? new Date(d).toLocaleDateString('ko-KR') : '');

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

const loadMembers = async () => {
  try {
    membersLoading.value = true;
    const res = await projectApi.getProjectMembers(projectId, { page: 1, size: 100 });
    members.value = res?.members || res?.items || [];
  } catch (e) {
    console.error(e);
  } finally {
    membersLoading.value = false;
  }
};

const deleteProject = async () => {
  try {
    await projectApi.deleteProject(projectId);
    router.push('/project');
  } catch (e) {
    alert('삭제 실패: ' + (e?.data?.message || e.message));
  } finally {
    confirmDelete.value = false;
  }
};

const openAddMember = () => {
  memberModalMode.value = 'add';
  selectedMember.value = null;
  showMemberModal.value = true;
};

const openEditMember = (m) => {
  memberModalMode.value = 'edit';
  selectedMember.value = { ...m };
  showMemberModal.value = true;
};

const closeMemberModal = () => {
  showMemberModal.value = false;
};

const submitMember = async (payload) => {
  try {
    if (memberModalMode.value === 'add') {
      await projectApi.addProjectMember(projectId, payload);
    } else {
      await projectApi.updateProjectMember(projectId, payload.id, payload);
    }
    await loadMembers();
    showMemberModal.value = false;
  } catch (e) {
    alert('멤버 저장 실패: ' + (e?.data?.message || e.message));
  }
};

onMounted(async () => {
  await Promise.all([loadProject(), loadMembers()]);
});

definePageMeta({ middleware: 'auth' });
</script>

<script>
export default {
  components: {
    MemberModal: {
      props: { mode: String, member: Object },
      emits: ['close', 'submit'],
      data() {
        const m = this.member || {};
        return {
          id: m.id || '',
          member_id: m.member_id || '',
          role: m.role || '',
          contribution: m.contribution || ''
        };
      },
      methods: {
        submit() {
          const payload = {
            id: this.id || undefined,
            member_id: this.member_id,
            role: this.role || undefined,
            contribution: this.contribution || undefined
          };
          this.$emit('submit', payload);
        }
      },
      template: `
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div class="w-full max-w-md bg-white rounded-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold">{{ mode === 'add' ? '멤버 추가' : '멤버 수정' }}</h2>
              <button class="text-gray-500" @click="$emit('close')">닫기</button>
            </div>
            <div class="space-y-3">
              <input v-model="member_id" class="border rounded px-3 py-2 w-full" placeholder="멤버 ID (예: 0001)" :disabled="mode==='edit'" />
              <input v-model="role" class="border rounded px-3 py-2 w-full" placeholder="역할 (예: 리더/팀원)" />
              <input v-model="contribution" class="border rounded px-3 py-2 w-full" placeholder="기여 (100자 이내)" />
            </div>
            <div class="mt-6 flex justify-end space-x-2">
              <button class="px-4 py-2 rounded-md border" @click="$emit('close')">취소</button>
              <button class="px-4 py-2 rounded-md bg-blue-600 text-white" @click="submit">저장</button>
            </div>
          </div>
        </div>
      `
    }
  }
}
</script>

<style scoped>
.prose p { margin: 0; }
</style>


