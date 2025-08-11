<template>
  <div>
    <!-- 페이지 헤더 -->
    <div class="md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          블랙리스트 관리
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          블랙리스트 멤버를 관리하고 사유를 확인하세요
        </p>
      </div>
      <div class="mt-4 flex md:mt-0 md:ml-4">
        <div class="flex space-x-3">
          <button
            @click="showAddModal = true"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            블랙리스트 추가
          </button>
        </div>
      </div>
    </div>

    <!-- 블랙리스트 멤버 목록 -->
    <div class="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="error" class="px-4 py-5 sm:p-6">
        <div class="text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">오류 발생</h3>
          <p class="mt-1 text-sm text-gray-500">{{ error }}</p>
        </div>
      </div>

      <ul v-else class="divide-y divide-gray-200">
        <li v-for="member in members" :key="member.id" class="px-4 py-4 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img
                  v-if="member.profile_image_url && !imageErrors[member.id]"
                  :src="getImageSrc(member.profile_image_url, 200)"
                  :alt="member.name"
                  class="h-10 w-10 rounded-full"
                  @error="handleImageError(member.id)"
                  loading="lazy"
                >
                <div v-else class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <span class="text-sm font-medium text-gray-700">{{ member.name.charAt(0) }}</span>
                </div>
              </div>
              <div class="ml-4">
                <div class="flex items-center">
                  <p class="text-sm font-medium text-gray-900">{{ member.name }}</p>
                  <span
                    class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                  >
                    블랙리스트
                  </span>
                </div>
                <p class="text-sm text-gray-500">{{ member.email }}</p>
                <p class="text-sm text-gray-500">{{ member.gen }}기 · {{ member.school }} {{ member.major }}</p>
                <p v-if="member.meta?.blacklist_reason" class="text-sm text-red-600 mt-1">
                  사유: {{ member.meta.blacklist_reason }}
                </p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button
                v-if="canManageBlacklist"
                @click="editBlacklistReason(member)"
                class="text-blue-600 hover:text-blue-900 text-sm font-medium"
              >
                사유 수정
              </button>
                <button
                 v-if="canDeleteMember"
                 @click="deleteMember(member)"
                 class="text-red-600 hover:text-red-900 text-sm font-medium"
               >
                 삭제
               </button>
            </div>
          </div>
        </li>
      </ul>

      <!-- 페이지네이션 -->
      <div v-if="totalPages > 1" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            이전
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            다음
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span>
              에서
              <span class="font-medium">{{ Math.min(currentPage * pageSize, total) }}</span>
              까지
              <span class="font-medium">{{ total }}</span>
              중
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                이전
              </button>
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  page === currentPage
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                다음
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- 통계 카드 -->
    <div class="mt-8">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-1">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">블랙리스트 멤버</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ total }}</dd>
                  </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 블랙리스트 추가 모달 -->
    <div v-if="showAddModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">블랙리스트 추가</h3>
          
          <!-- 멤버 검색 -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">멤버 검색</label>
            <div class="relative">
              <input
                v-model="searchQuery"
                @input="searchMembers"
                type="text"
                placeholder="이름, 이메일로 검색"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <!-- 검색 결과 드롭다운 -->
              <div v-if="searchResults.length > 0 && searchQuery" class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                <div
                  v-for="member in searchResults"
                  :key="member.id"
                  @click="selectMember(member)"
                  class="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
                >
                  <div class="font-medium">{{ member.name }}</div>
                  <div class="text-sm text-gray-500">{{ member.email }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 선택된 멤버 정보 -->
          <div v-if="selectedMemberForBlacklist" class="mb-4 p-3 bg-gray-50 rounded-md">
            <div class="flex items-center">
              <img
                v-if="selectedMemberForBlacklist.profile_image_url"
                  :src="getImageSrc(selectedMemberForBlacklist.profile_image_url, 200)"
                :alt="selectedMemberForBlacklist.name"
                class="h-8 w-8 rounded-full mr-3"
              >
              <div v-else class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                <span class="text-sm font-medium text-gray-700">{{ selectedMemberForBlacklist.name.charAt(0) }}</span>
              </div>
              <div>
                <div class="font-medium">{{ selectedMemberForBlacklist.name }}</div>
                <div class="text-sm text-gray-500">{{ selectedMemberForBlacklist.email }}</div>
              </div>
            </div>
          </div>

          <!-- 블랙리스트 사유 -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">블랙리스트 사유</label>
            <textarea
              v-model="blacklistReason"
              rows="3"
              placeholder="블랙리스트 사유를 입력하세요"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- 버튼 -->
          <div class="flex justify-end space-x-3">
            <button
              @click="closeAddModal"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              취소
            </button>
            <button
              @click="addToBlacklist"
              :disabled="!selectedMemberForBlacklist || !blacklistReason"
              class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              블랙리스트 추가
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 블랙리스트 사유 수정 모달 -->
    <div v-if="showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">블랙리스트 사유 수정</h3>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">멤버</label>
            <div class="p-3 bg-gray-50 rounded-md">
              <div class="flex items-center">
                <img
                  v-if="editingMember.profile_image_url"
                  :src="getImageSrc(editingMember.profile_image_url, 200)"
                  :alt="editingMember.name"
                  class="h-8 w-8 rounded-full mr-3"
                >
                <div v-else class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                  <span class="text-sm font-medium text-gray-700">{{ editingMember.name.charAt(0) }}</span>
                </div>
                <div>
                  <div class="font-medium">{{ editingMember.name }}</div>
                  <div class="text-sm text-gray-500">{{ editingMember.email }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">블랙리스트 사유</label>
            <textarea
              v-model="editBlacklistReasonText"
              rows="3"
              placeholder="블랙리스트 사유를 입력하세요"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              @click="closeEditModal"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              취소
            </button>
            <button
              @click="updateBlacklistReason"
              :disabled="!editBlacklistReason"
              class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              수정
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/composables/useAuth.js';
import { useApiClient } from '@/composables/useApiClient.js';
import { useImage } from '@/composables/useImage.js';

const authStore = useAuthStore();
const { adminApi } = useApiClient();

// 상태 변수
const members = ref([]);
const stats = ref({});
const isLoading = ref(false);
const error = ref('');
const imageErrors = ref({});

// 페이지네이션
const currentPage = ref(1);
const pageSize = ref(20);
const total = ref(0);
const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

// 블랙리스트 추가 모달
const showAddModal = ref(false);
const searchQuery = ref('');
const searchResults = ref([]);
const selectedMemberForBlacklist = ref(null);
const blacklistReason = ref('');

// 블랙리스트 수정 모달
const showEditModal = ref(false);
const editingMember = ref(null);
const editBlacklistReasonText = ref('');

// 권한 레벨 매핑
const grantHierarchy = {
  'Member': 1,
  'Manager': 2,
  'Administrator': 3,
  'Super': 4
};

// Administrator 이상만 블랙리스트 관리 가능
const canManageBlacklist = computed(() => {
  const currentUserGrant = authStore.user?.grant || 'Member';
  const currentLevel = grantHierarchy[currentUserGrant] || 0;
  const requiredLevel = grantHierarchy['Administrator'] || 3;
  return currentLevel >= requiredLevel;
});

// Super만 멤버 삭제 가능
const canDeleteMember = computed(() => {
  const currentUserGrant = authStore.user?.grant || 'Member';
  const currentLevel = grantHierarchy[currentUserGrant] || 0;
  const requiredLevel = grantHierarchy['Super'] || 4;
  return currentLevel >= requiredLevel;
});

const { getImageSrc } = useImage();

// 이미지 로딩 에러 처리
const handleImageError = (memberId) => {
  imageErrors.value[memberId] = true;
  console.warn(`Failed to load image for member ${memberId}`);
};

// 페이지네이션 계산
const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, currentPage.value + 2);
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

// 블랙리스트 멤버 목록 로드
const loadMembers = async () => {
  try {
    isLoading.value = true;
    error.value = '';
    
    const params = {
      page: currentPage.value,
      size: pageSize.value,
      status_filter: 'blacklist' // 항상 blacklist만 조회
    };
    
    const response = await adminApi.getMembers(params);
    members.value = response.members;
    total.value = response.total;
    
    imageErrors.value = {};
  } catch (err) {
    console.error('Failed to load blacklist members:', err);
    error.value = '블랙리스트 멤버 목록을 불러오는 중 오류가 발생했습니다.';
  } finally {
    isLoading.value = false;
  }
};

// 통계 로드는 제거되었습니다

// 페이지 이동
const goToPage = (page) => {
  currentPage.value = page;
  loadMembers();
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadMembers();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    loadMembers();
  }
};

// 멤버 검색
const searchMembers = async () => {
  if (!searchQuery.value || searchQuery.value.length < 2) {
    searchResults.value = [];
    return;
  }

  try {
    const response = await adminApi.getMembers({
      search: searchQuery.value,
      size: 10,
      status_filter: 'active,alumni' // 블랙리스트가 아닌 멤버만 검색
    });
    searchResults.value = response.members;
  } catch (err) {
    console.error('Failed to search members:', err);
    searchResults.value = [];
  }
};

// 멤버 선택
const selectMember = (member) => {
  selectedMemberForBlacklist.value = member;
  searchQuery.value = member.name;
  searchResults.value = [];
};

// 블랙리스트 추가
const addToBlacklist = async () => {
  if (!canManageBlacklist.value) {
    alert('블랙리스트 설정은 Administrator 권한 이상이 필요합니다.');
    return;
  }

  if (!selectedMemberForBlacklist.value || !blacklistReason.value) {
    alert('멤버와 사유를 모두 입력해주세요.');
    return;
  }

  if (!confirm(`정말로 ${selectedMemberForBlacklist.value.name}님을 블랙리스트에 추가하시겠습니까?\n사유: ${blacklistReason.value}`)) {
    return;
  }

  try {
    const updateData = {
      status: 'blacklist',
      meta: {
        blacklist_reason: blacklistReason.value
      }
    };
    
    await adminApi.updateMember(selectedMemberForBlacklist.value.id, updateData);
    await loadMembers();
    closeAddModal();
  } catch (err) {
    console.error('Failed to add to blacklist:', err);
    error.value = '블랙리스트 설정 중 오류가 발생했습니다.';
  }
};

// 블랙리스트 사유 수정
const editBlacklistReason = (member) => {
  if (!canManageBlacklist.value) {
    alert('블랙리스트 사유 수정은 Administrator 권한 이상이 필요합니다.');
    return;
  }

  editingMember.value = member;
  editBlacklistReasonText.value = member.meta?.blacklist_reason || '';
  showEditModal.value = true;
};

// 블랙리스트 사유 업데이트
const updateBlacklistReason = async () => {
  if (!editBlacklistReasonText.value) {
    alert('블랙리스트 사유를 입력해주세요.');
    return;
  }

  try {
    const updateData = {
      meta: {
        ...editingMember.value.meta,
        blacklist_reason: editBlacklistReasonText.value
      }
    };
    
    await adminApi.updateMember(editingMember.value.id, updateData);
    await loadMembers();
    closeEditModal();
  } catch (err) {
    console.error('Failed to update blacklist reason:', err);
    error.value = '블랙리스트 사유 수정 중 오류가 발생했습니다.';
  }
};

// 멤버 삭제
const deleteMember = async (member) => {
  if (!canDeleteMember.value) {
    alert('멤버 삭제는 Super 권한만 가능합니다.');
    return;
  }

  if (!confirm(`정말로 ${member.name}님을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
    return;
  }

  try {
    await adminApi.deleteMember(member.id);
    await loadMembers();
  } catch (err) {
    console.error('Failed to delete member:', err);
    error.value = '멤버 삭제 중 오류가 발생했습니다.';
  }
};

// 모달 닫기
const closeAddModal = () => {
  showAddModal.value = false;
  searchQuery.value = '';
  searchResults.value = [];
  selectedMemberForBlacklist.value = null;
  blacklistReason.value = '';
};

const closeEditModal = () => {
  showEditModal.value = false;
  editingMember.value = null;
  editBlacklistReasonText.value = '';
};

// 초기화
onMounted(async () => {
  await loadMembers();
});

// 페이지 메타 설정
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
});
</script>





