<template>
  <div>
    <!-- 페이지 헤더 -->
    <div class="md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          멤버 관리
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          멤버 정보를 관리하고 통계를 확인하세요
        </p>
      </div>
      <div class="mt-4 flex md:mt-0 md:ml-4">
        <div class="flex space-x-3">
          <button
            @click="downloadExcelTemplate"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Excel 템플릿
          </button>

          <!-- Excel 업로드 섹션 -->
          <div class="flex items-center space-x-2">
            <input
              ref="fileInput"
              type="file"
              accept=".csv"
              @change="handleFileSelect"
              class="hidden"
            >
            <button
              @click="$refs.fileInput.click()"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              파일 선택
            </button>
            <span v-if="excelFile" class="text-sm text-gray-600">
              {{ excelFile.name }}
            </span>
            <button
              v-if="excelFile"
              @click="handleExcelUpload"
              :disabled="isUploading"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="isUploading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              {{ isUploading ? '업로드 중...' : '대량 추가' }}
            </button>
          </div>

          <button
            @click="showAddModal = true"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            멤버 추가
          </button>
        </div>
      </div>
    </div>

    <!-- 검색 및 필터 -->
    <div class="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <!-- 검색 -->
        <div>
          <label for="search" class="block text-sm font-medium text-gray-700">검색</label>
          <input
            id="search"
            v-model="filters.search"
            type="text"
            placeholder="이름, 이메일, 학번"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
        </div>

        <!-- 권한 필터 -->
        <div>
          <label for="grant" class="block text-sm font-medium text-gray-700">권한</label>
          <select
            id="grant"
            v-model="filters.grant_filter"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">전체</option>
            <option value="Super">Super</option>
            <option value="Administrator">Administrator</option>
            <option value="Manager">Manager</option>
            <option value="Member">Member</option>
          </select>
        </div>

        <!-- 기수 필터 -->
        <div>
          <label for="gen" class="block text-sm font-medium text-gray-700">기수</label>
          <select
            id="gen"
            v-model="filters.gen_filter"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">전체</option>
            <option v-for="gen in 15" :key="gen" :value="gen">{{ gen }}기</option>
          </select>
        </div>

        <!-- 상태 필터 -->
        <div>
          <label for="status" class="block text-sm font-medium text-gray-700">상태</label>
          <select
            id="status"
            v-model="filters.status_filter"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">전체</option>
            <option value="active">활동기수</option>
            <option value="alumni">알럼나이</option>
          </select>
        </div>
      </div>

      <div class="mt-4 flex justify-end space-x-3">
        <button
          @click="clearFilters"
          class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          필터 초기화
        </button>
        <button
          @click="applyFilters"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          검색
        </button>
      </div>
    </div>

    <!-- Excel 업로드 에러 메시지 -->
    <div v-if="uploadError" class="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Excel 업로드 오류</h3>
          <div class="mt-2 text-sm text-red-700">
            <p>{{ uploadError }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 멤버 목록 -->
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
                    class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getGrantClass(member.grant)"
                  >
                    {{ member.grant }}
                  </span>
                  <span
                    v-if="member.executive"
                    class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                  >
                    임원
                  </span>
                </div>
                <p class="text-sm text-gray-500">{{ member.email }}</p>
                <p class="text-sm text-gray-500">{{ member.gen }}기 · {{ member.school }} {{ member.major }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="viewMember(member)"
                class="text-blue-600 hover:text-blue-900 text-sm font-medium"
              >
                상세보기
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
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        
      </div>
    </div>

    <!-- 멤버 추가 모달 -->
    <MemberModal
      :is-open="showAddModal"
      :member="editingMember"
      @close="closeModal"
      @submit="handleMemberSubmit"
    />

    <!-- 멤버 상세보기 모달 -->
    <MemberModal
      :is-open="showDetailModal"
      :member="selectedMember"
      :show-blacklist-reason="false"
      @close="closeDetailModal"
      @submit="handleDetailSubmit"
      @delete="handleDeleteFromModal"
    />


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
const showAddModal = ref(false);
const editingMember = ref(null);
const showDetailModal = ref(false);
const selectedMember = ref(null);
const originalMemberData = ref(null); // 원본 데이터 저장
const activeTab = ref('basic'); // 활성 탭 (basic/optional)
const imageErrors = ref({}); // 이미지 로딩 에러 추적

// Excel 업로드 관련 상태
const excelFile = ref(null);
const isUploading = ref(false);
const uploadError = ref('');



// 페이지네이션
const currentPage = ref(1);
const pageSize = ref(20);
const total = ref(0);
const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

// 필터
const filters = ref({
  search: '',
  grant_filter: '',
  gen_filter: '',
  status_filter: '',
  is_active_filter: '',
  executive_filter: ''
});

// 필터링 적용 여부
const isFilterApplied = ref(false);

// 권한별 스타일 클래스
const getGrantClass = (grant) => {
  const classes = {
    'Super': 'bg-red-100 text-red-800',
    'Administrator': 'bg-purple-100 text-purple-800',
    'Manager': 'bg-blue-100 text-blue-800',
    'Member': 'bg-green-100 text-green-800'
  };
  return classes[grant] || 'bg-gray-100 text-gray-800';
};

const { getImageSrc } = useImage();

// 이미지 로딩 에러 처리
const handleImageError = (memberId) => {
  imageErrors.value[memberId] = true;
  console.warn(`Failed to load image for member ${memberId}`);
};

// 권한 레벨 매핑
const grantHierarchy = {
  'Member': 1,
  'Manager': 2,
  'Administrator': 3,
  'Super': 4
};

// alumni 멤버 수정 권한 확인 (Administrator 이상만)
const canModifyAlumni = (member) => {
  if (member.status !== 'alumni') return true;
  
  const currentUserGrant = authStore.user?.grant || 'Member';
  const currentLevel = grantHierarchy[currentUserGrant] || 0;
  const requiredLevel = grantHierarchy['Administrator'] || 3;
  
  return currentLevel >= requiredLevel;
};

// 멤버 삭제 권한 확인 (Super만)
const canDeleteMember = () => {
  const currentUserGrant = authStore.user?.grant || 'Member';
  const currentLevel = grantHierarchy[currentUserGrant] || 0;
  const requiredLevel = grantHierarchy['Super'] || 4;
  
  return currentLevel >= requiredLevel;
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

// 활동 기수를 문자열로 변환
const activeGensString = computed({
  get() {
    return selectedMember.value?.active_gens?.join(',') || '';
  },
  set(value) {
    if (selectedMember.value) {
      selectedMember.value.active_gens = value ? value.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n)) : [];
    }
  }
});

// 이력을 문자열로 변환
const historyString = computed({
  get() {
    return selectedMember.value?.history?.join('\n') || '';
  },
  set(value) {
    if (selectedMember.value) {
      selectedMember.value.history = value ? value.split('\n').filter(line => line.trim() !== '') : [];
    }
  }
});

// 멤버 목록 로드
const loadMembers = async (applyFilters = false) => {
  try {
    isLoading.value = true;
    error.value = '';
    
    const params = {
      page: currentPage.value,
      size: pageSize.value
    };
    
    // 필터링이 적용된 경우에만 필터 파라미터 추가
    if (applyFilters || isFilterApplied.value) {
      Object.keys(filters.value).forEach(key => {
        if (filters.value[key] !== '' && filters.value[key] !== null) {
          params[key] = filters.value[key];
        }
      });
    }
    
    const response = await adminApi.getMembers(params);
    members.value = response.members;
    total.value = response.total;
    
    // 새로운 멤버 목록이 로드되면 이미지 에러 상태 초기화
    imageErrors.value = {};
  } catch (err) {
    console.error('Failed to load members:', err);
    error.value = '멤버 목록을 불러오는 중 오류가 발생했습니다.';
  } finally {
    isLoading.value = false;
  }
};

// 통계 로드는 제거되었습니다

// 필터 적용
const applyFilters = () => {
  isFilterApplied.value = true;
  currentPage.value = 1; // 첫 페이지로 이동
  loadMembers(true);
};

// 필터 초기화
const clearFilters = () => {
  filters.value = {
    search: '',
    grant_filter: '',
    gen_filter: '',
    status_filter: '',
    is_active_filter: '',
    executive_filter: ''
  };
  isFilterApplied.value = false;
  currentPage.value = 1;
  loadMembers(false);
};

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

// 멤버 관리 함수들
const viewMember = (member) => {
  selectedMember.value = { ...member }; // 깊은 복사
  originalMemberData.value = { ...member }; // 원본 데이터 저장
  showDetailModal.value = true;
  activeTab.value = 'basic';
};

const editMember = (member) => {
  editingMember.value = member;
  showAddModal.value = true;
};

const deleteMember = async (member) => {
  if (!confirm(`정말로 ${member.name}님을 삭제하시겠습니까?`)) {
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



// 모달 관련 함수들
const closeModal = () => {
  showAddModal.value = false;
  editingMember.value = null;
};

const closeDetailModal = () => {
  showDetailModal.value = false;
  selectedMember.value = null;
  originalMemberData.value = null;
};

const cancelEdit = () => {
  // 원본 데이터로 되돌리기
  if (originalMemberData.value) {
    selectedMember.value = { ...originalMemberData.value };
  }
};

const updateMemberFromModal = async () => {
  try {
    await adminApi.updateMember(selectedMember.value.id, selectedMember.value);
    await loadMembers();
    closeDetailModal();
  } catch (err) {
    console.error('Failed to update member:', err);
    error.value = '멤버 정보 수정 중 오류가 발생했습니다.';
  }
};

const handleMemberSubmit = async (data) => {
  try {
    if (data.type === 'excel') {
      // Excel 파일 업로드 처리
      const formData = new FormData();
      formData.append('file', data.file);
      
      await adminApi.uploadMembersExcel(formData);
    } else {
      // 개별 멤버 추가/수정
      if (editingMember.value) {
        // 수정 모드: 서버에 업데이트 요청
        console.log('Updating member:', editingMember.value.id, data);
        
        // 역할이 제외된 경우 (권한 수정 토글이 비활성화된 경우) 알림
        if (!data.grant) {
          console.log('Grant update skipped - permission toggle disabled');
        }
        
        await adminApi.updateMember(editingMember.value.id, data);
      } else {
        // 추가 모드: 새 멤버 생성
        console.log('Creating new member:', data);
        await adminApi.createMember(data);
      }
    }
    
    // 성공 시 목록 새로고침
    await loadMembers();
    closeModal();
  } catch (err) {
    console.error('Failed to submit member:', err);
    error.value = '멤버 저장 중 오류가 발생했습니다.';
  }
};

// 상세보기 모달에서 멤버 수정 처리
const handleDetailSubmit = async (data) => {
  try {
    await adminApi.updateMember(selectedMember.value.id, data);
    await loadMembers();
    closeDetailModal();
  } catch (err) {
    console.error('Failed to update member from detail modal:', err);
    error.value = '멤버 정보 수정 중 오류가 발생했습니다.';
  }
};

// 상세보기 모달에서 멤버 삭제 처리
const handleDeleteFromModal = async (member) => {
  try {
    await adminApi.deleteMember(member.id);
    await loadMembers();
    closeDetailModal();
  } catch (err) {
    console.error('Failed to delete member from modal:', err);
    error.value = '멤버 삭제 중 오류가 발생했습니다.';
  }
};





// Excel 템플릿 다운로드
const downloadExcelTemplate = () => {
  // CSV 형식으로 템플릿 생성 (MemberResponse 스키마에 맞춤)
  const headers = [
    'name', 'email', 'gen', 'school', 'major', 'student_id', 
    'birthdate', 'phone', 'github', 'notion', 'figma', 'kakao_id', 
    'instagram_id', 'mbti', 'self_introduction', 'additional_career', 
    'coffee_chat_enabled', 'active_gens', 'history', 'grant', 'status',
    'profile_image_url', 'activity_start_date'
  ];
  
  const sampleData = [
    '홍길동', 'hong@example.com', '1', '서울대학교', '컴퓨터공학부',
    '2020123456', '2000-01-01', '010-1234-5678', 'https://github.com/hong', 
    'https://notion.so/hong', 'https://figma.com/hong', 'hong_kakao', 
    'hong_instagram', 'ENFP', '안녕하세요!', '프로젝트 경험', 'true', 
    '1,2,3', '프로젝트A,프로젝트B', 'Member', 'active', 
    'https://example.com/image.jpg', '2023-01-01'
  ];
  
  const csvContent = [headers.join(','), sampleData.join(',')].join('\n');
  
  // CSV 파일 다운로드
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'member_template.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Excel 파일 읽기 및 파싱
const parseExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const csv = e.target.result;
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        const members = [];
        
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim() === '') continue;
          
          const values = lines[i].split(',').map(v => v.trim());
          const member = {};
          
          headers.forEach((header, index) => {
            let value = values[index] || '';
            
            // 특정 필드 타입 변환
            if (header === 'gen' || header === 'student_id') {
              value = parseInt(value) || 0;
            } else if (header === 'coffee_chat_enabled') {
              value = value.toLowerCase() === 'true';
            } else if (header === 'active_gens') {
              value = value ? value.split(',').map(g => parseInt(g.trim())).filter(g => !isNaN(g)) : [];
            } else if (header === 'history') {
              value = value ? value.split(',').map(h => h.trim()).filter(h => h !== '') : [];
            } else if (header === 'birthdate' || header === 'activity_start_date') {
              // 날짜 형식 처리
              if (value && value.trim() !== '') {
                // YYYY-MM-DD 형식으로 변환
                const date = new Date(value);
                if (!isNaN(date.getTime())) {
                  value = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식
                } else {
                  value = null; // 유효하지 않은 날짜는 null로 설정
                }
              } else {
                value = null;
              }
            }
            
            member[header] = value;
          });
          
          // 필수 필드 검증
          if (member.name && member.email) {
            members.push(member);
          }
        }
        
        resolve(members);
      } catch (error) {
        reject(new Error('CSV 파일 파싱 중 오류가 발생했습니다.'));
      }
    };
    
    reader.onerror = () => reject(new Error('파일 읽기 중 오류가 발생했습니다.'));
    reader.readAsText(file);
  });
};

// Excel 파일 업로드 및 대량 생성
const handleExcelUpload = async () => {
  if (!excelFile.value) {
    alert('파일을 선택해주세요.');
    return;
  }
  
  try {
    isUploading.value = true;
    uploadError.value = '';
    
    // CSV 파일 파싱
    const members = await parseExcelFile(excelFile.value);
    
    if (members.length === 0) {
      alert('유효한 멤버 데이터가 없습니다.');
      return;
    }
    
    // 대량 생성 확인
    if (!confirm(`${members.length}명의 멤버를 추가하시겠습니까?`)) {
      return;
    }
    
    // 대량 생성 API 호출
    await adminApi.bulkCreateMembers(members);
    
    // 성공 시 목록 새로고침
    await loadMembers();
    await loadStats();
    
    // 파일 초기화
    excelFile.value = null;
    
    alert(`${members.length}명의 멤버가 성공적으로 추가되었습니다.`);
  } catch (error) {
    console.error('Excel upload error:', error);
    uploadError.value = error.message || '파일 업로드 중 오류가 발생했습니다.';
    alert(uploadError.value);
  } finally {
    isUploading.value = false;
  }
};

// 파일 선택 처리
const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file && file.type === 'text/csv') {
    excelFile.value = file;
    uploadError.value = '';
  } else {
    alert('CSV 파일만 업로드 가능합니다.');
    event.target.value = '';
  }
};

// 페이지 메타 설정
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
});
</script> 