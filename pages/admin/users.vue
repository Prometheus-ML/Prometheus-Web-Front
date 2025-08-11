<template>
  <div>
    <!-- 페이지 헤더 -->
    <div class="md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          사용자 관리
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          시스템 사용자를 관리합니다
        </p>
      </div>
      <div class="mt-4 flex md:mt-0 md:ml-4">
        <button
          @click="showCreateModal = true"
          type="button"
          class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          사용자 추가
        </button>
      </div>
    </div>

    <!-- 필터 및 검색 -->
    <div class="mt-6 bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">검색</label>
            <input
              v-model="filters.search"
              type="text"
              placeholder="이름, 이메일로 검색..."
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              @input="debouncedSearch"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">역할</label>
            <select
              v-model="filters.grant"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              @change="loadUsers"
            >
              <option value="">전체</option>
              <option v-for="grant in manageable_grants" :key="grant" :value="grant">{{ grant }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">기수</label>
            <select
              v-model="filters.gen"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              @change="loadUsers"
            >
              <option value="">전체</option>
              <option v-for="gen in availableGens" :key="gen" :value="gen">{{ gen }}기</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">승인 상태</label>
            <select
              v-model="filters.status"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              @change="loadUsers"
            >
              <option value="">전체</option>
              <option value="verified">승인됨</option>
              <option value="not verified">승인 대기</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- 사용자 목록 -->
    <div class="mt-6">
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div v-if="isLoading" class="p-6 text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p class="mt-2 text-sm text-gray-500">로딩 중...</p>
        </div>

        <div v-else-if="error" class="p-6 text-center">
          <p class="text-red-600">{{ error }}</p>
          <button @click="loadUsers" class="mt-2 text-blue-600 hover:text-blue-500">다시 시도</button>
        </div>

        <ul v-else class="divide-y divide-gray-200">
          <li v-for="user in users" :key="user.id" class="px-6 py-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <img
                  v-if="user.image"
                  :src="user.image"
                  :alt="user.name"
                  class="h-10 w-10 rounded-full"
                />
                <div v-else class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <span class="text-sm font-medium text-gray-700">{{ user.name.charAt(0) }}</span>
                </div>
                <div class="ml-4">
                  <div class="flex items-center">
                    <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
                    <span v-if="user.executive" class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      임원
                    </span>
                  </div>
                  <p class="text-sm text-gray-500">{{ user.email }}</p>
                  <div class="flex items-center mt-1 space-x-2">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          :class="getGrantClass(user.grant)">
                      {{ user.grant }}
                    </span>
                    <span class="text-xs text-gray-500">{{ user.gen }}기</span>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          :class="getStatusClass(user.status)">
                      {{ user.status === 'verified' ? '승인됨' : '승인 대기' }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  @click="editUser(user)"
                  class="text-blue-600 hover:text-blue-900 text-sm font-medium"
                >
                  수정
                </button>
                <button
                  v-if="user.status === 'not verified'"
                  @click="approveUser(user)"
                  class="text-green-600 hover:text-green-900 text-sm font-medium"
                >
                  승인
                </button>
                <button
                  @click="deleteUser(user)"
                  class="text-red-600 hover:text-red-900 text-sm font-medium"
                >
                  삭제
                </button>
              </div>
            </div>
          </li>
        </ul>

        <!-- 페이지네이션 -->
        <div v-if="!isLoading && users.length > 0" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="prevPage"
              :disabled="pagination.page <= 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              이전
            </button>
            <button
              @click="nextPage"
              :disabled="pagination.page >= totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              다음
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                총 <span class="font-medium">{{ pagination.total }}</span>명 중
                <span class="font-medium">{{ (pagination.page - 1) * pagination.size + 1 }}</span>-<span class="font-medium">{{ Math.min(pagination.page * pagination.size, pagination.total) }}</span>명 표시
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="prevPage"
                  :disabled="pagination.page <= 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  이전
                </button>
                <button
                  @click="nextPage"
                  :disabled="pagination.page >= totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  다음
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 사용자 생성/수정 모달 -->
    <UserModal
      :show="showCreateModal || showEditModal"
      :user="selectedUser"
      :manageable-grants="manageable_grants"
      @close="closeModal"
      @save="handleSaveUser"
    />

    <!-- 삭제 확인 모달 -->
    <ConfirmModal
      :show="showDeleteModal"
      title="사용자 삭제"
      :message="`'${selectedUser?.name}' 사용자를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`"
      confirm-text="삭제"
      confirm-class="bg-red-600 hover:bg-red-700"
      @confirm="confirmDelete"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup>
import { useAuthStore } from '@/composables/useAuth.js';
import { useApiClient } from '@/composables/useApiClient.js';
import { debounce } from 'lodash';

const authStore = useAuthStore();
const { adminApi, userApi } = useApiClient();

// 상태 관리
const users = ref([]);
const manageable_grants = ref([]);
const isLoading = ref(false);
const error = ref('');

const filters = ref({
  search: '',
  grant: '',
  gen: '',
  status: ''
});

const pagination = ref({
  page: 1,
  size: 20,
  total: 0
});

// 모달 상태
const showCreateModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const selectedUser = ref(null);

// 계산된 속성
const totalPages = computed(() => Math.ceil(pagination.value.total / pagination.value.size));
const availableGens = computed(() => {
  const gens = new Set();
  for (let i = 1; i <= 15; i++) {
    gens.add(i);
  }
  return Array.from(gens).sort((a, b) => b - a);
});

// 디바운스된 검색
const debouncedSearch = debounce(() => {
  pagination.value.page = 1;
  loadUsers();
}, 300);

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

// 승인 상태별 스타일 클래스
const getStatusClass = (status) => {
  return status === 'verified' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-yellow-100 text-yellow-800';
};

// 사용자 목록 로드
const loadUsers = async () => {
  try {
    isLoading.value = true;
    error.value = '';

    const params = {
      page: pagination.value.page,
      size: pagination.value.size
    };

    if (filters.value.search) params.search = filters.value.search;
    if (filters.value.grant) params.grant = filters.value.grant;
    if (filters.value.gen) params.gen = filters.value.gen;

    const response = await userApi.getUsers(params);
    
    users.value = response.users || response;
    pagination.value.total = response.total || response.length;
    manageable_grants.value = response.manageable_grants || ['Super', 'Administrator', 'Manager', 'Member'];
  } catch (err) {
    console.error('Failed to load users:', err);
    error.value = '사용자 목록을 불러오는 중 오류가 발생했습니다.';
  } finally {
    isLoading.value = false;
  }
};

// 페이지네이션
const nextPage = () => {
  if (pagination.value.page < totalPages.value) {
    pagination.value.page++;
    loadUsers();
  }
};

const prevPage = () => {
  if (pagination.value.page > 1) {
    pagination.value.page--;
    loadUsers();
  }
};

// 사용자 수정
const editUser = (user) => {
  selectedUser.value = { ...user };
  showEditModal.value = true;
};

// 사용자 삭제
const deleteUser = (user) => {
  selectedUser.value = user;
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  try {
    await adminApi.deleteGrantBasedUser(selectedUser.value.id);
    showDeleteModal.value = false;
    selectedUser.value = null;
    await loadUsers();
  } catch (err) {
    console.error('Failed to delete user:', err);
    error.value = '사용자 삭제 중 오류가 발생했습니다.';
  }
};

// 사용자 승인
const approveUser = async (user) => {
  try {
    await adminApi.updateGrantBasedUser(user.id, { status: 'verified' });
    await loadUsers();
  } catch (err) {
    console.error('Failed to approve user:', err);
    error.value = '사용자 승인 중 오류가 발생했습니다.';
  }
};

// 모달 닫기
const closeModal = () => {
  showCreateModal.value = false;
  showEditModal.value = false;
  selectedUser.value = null;
};

// 사용자 저장 처리
const handleSaveUser = async (userData) => {
  try {
    if (showEditModal.value) {
      await adminApi.updateGrantBasedUser(selectedUser.value.id, userData);
    } else {
      await adminApi.createGrantBasedUser(userData);
    }
    
    closeModal();
    await loadUsers();
  } catch (err) {
    console.error('Failed to save user:', err);
    error.value = '사용자 저장 중 오류가 발생했습니다.';
  }
};

onMounted(() => {
  loadUsers();
});

// 페이지 메타 설정
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
});
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>