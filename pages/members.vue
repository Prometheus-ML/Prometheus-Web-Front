<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 헤더 섹션 -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">멤버</h1>
            <p class="text-gray-600 mt-1">프로메테우스 멤버들과 소통하고 연결하세요</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <div class="text-2xl font-bold text-blue-600">{{ totalMembers }}</div>
              <div class="text-sm text-gray-500">총 멤버</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 필터 탭 -->
      <div class="mb-8">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="setActiveTab(tab.key)"
            :class="[
              activeTab === tab.key
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50',
              'px-4 py-2 rounded-md text-sm font-medium border transition-colors'
            ]"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>

      <!-- 멤버 그리드 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="member in filteredMembers"
          :key="member.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <!-- 프로필 카드 -->
          <div class="text-center mb-4">
            <img
              :src="member.image ? getImageSrc(member.image, 160) : '/default-avatar.png'"
              :alt="member.name"
              class="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              @error="handleImageError"
            />
            <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ member.name }}</h3>
            <p class="text-sm text-gray-600 mb-2">{{ member.major }}</p>
            <div class="flex items-center justify-center space-x-2 mb-4">
              <span
                v-if="member.positions && member.positions.length"
                class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {{ member.positions[0] }}
              </span>
              <span
                v-if="member.gen"
                class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
              >
                {{ member.gen }}기
              </span>
            </div>
          </div>

          <!-- 커피챗 버튼 -->
          <div class="flex items-center justify-center mb-4">
            <button
              @click="requestCoffeeChat(member)"
              class="flex items-center space-x-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
            >
              <span class="text-lg">☕</span>
              <span class="text-sm">커피챗 신청</span>
            </button>
          </div>

          <!-- 프로젝트 히스토리 -->
          <div v-if="member.projects && member.projects.length" class="mb-4">
            <h4 class="text-sm font-medium text-gray-900 mb-2">프로젝트 히스토리</h4>
            <div class="space-y-2">
              <div
                v-for="project in member.projects.slice(0, 3)"
                :key="project.id"
                class="text-xs text-gray-600 bg-gray-50 p-2 rounded"
              >
                {{ project.title }}
              </div>
            </div>
          </div>

          <!-- 1:1 연결 버튼 -->
          <div class="flex space-x-2">
            <button
              @click="openChat(member)"
              class="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md text-sm hover:bg-blue-700 transition-colors"
            >
              채팅
            </button>
            <button
              @click="viewProfile(member)"
              class="flex-1 bg-gray-600 text-white py-2 px-3 rounded-md text-sm hover:bg-gray-700 transition-colors"
            >
              프로필
            </button>
          </div>
						</div>
					</div>
				</div>

    <!-- 커피챗 신청 모달 -->
    <div v-if="showCoffeeChatModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">커피챗 신청</h3>
          <p class="text-sm text-gray-600 mb-6">{{ selectedMember?.name }}님에게 커피챗을 신청합니다</p>
          
          <div class="space-y-4">
            <textarea
              v-model="coffeeChatMessage"
              placeholder="메시지를 입력해주세요..."
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
            ></textarea>
            
            <div class="flex space-x-3">
              <button
                @click="submitCoffeeChatRequest"
                class="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors"
              >
                신청하기
              </button>
              <button
                @click="closeCoffeeChatModal"
                class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 프로필 상세 모달 -->
    <div v-if="showProfileModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="text-center mb-6">
            <img
              :src="selectedMember?.image ? getImageSrc(selectedMember.image, 192) : '/default-avatar.png'"
              :alt="selectedMember?.name"
              class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ selectedMember?.name }}</h3>
            <p class="text-gray-600">{{ selectedMember?.major }}</p>
          </div>
          
          <div class="space-y-4">
            <div v-if="selectedMember?.positions && selectedMember.positions.length">
              <h4 class="font-medium text-gray-900">직책</h4>
              <p class="text-gray-600">{{ selectedMember.positions.join(', ') }}</p>
								</div>
								
            <div v-if="selectedMember?.projects && selectedMember.projects.length">
              <h4 class="font-medium text-gray-900">프로젝트</h4>
              <div class="space-y-2">
                <div
                  v-for="project in selectedMember.projects"
                  :key="project.id"
                  class="text-sm text-gray-600 bg-gray-50 p-2 rounded"
                >
                  <div class="font-medium">{{ project.title }}</div>
                  <div class="text-xs text-gray-500">{{ project.description }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-6 flex space-x-3">
            <button
              @click="closeProfileModal"
              class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
		</div>
	</div>
</template>

<script setup>
import { useAuthStore } from '@/composables/useAuth';
import { storeToRefs } from 'pinia';
import { useImage } from '@/composables/useImage.js';

const authStore = useAuthStore();
const { getImageSrc } = useImage();
const { user } = storeToRefs(authStore);

// 탭 상태
const activeTab = ref(6);
const tabs = [
  { key: 0, name: '창립멤버'},
  { key: -1, name: '운영진'},
  { key: 1, name: '1기'},
  { key: 2, name: '2기'},
  { key: 3, name: '3기'},
	{ key: 4, name: '4기'},
	{ key: 5, name: '5기'},
  { key: 6, name: '6기'}
];

// 모달 상태
const showCoffeeChatModal = ref(false);
const showProfileModal = ref(false);
const selectedMember = ref(null);
const coffeeChatMessage = ref('');

// 멤버 데이터
const members = ref([]);

// 샘플 데이터 (실제 API 호출로 대체)
const sampleMembers = ref([
  {
    id: 1,
    name: '김지후',
    major: '컴퓨터공학과',
    gen: 6,
    positions: ['대표'],
    image: null,
    projects: [
      { id: 1, title: 'AI 챗봇 개발', description: '자연어 처리 기반 챗봇' },
      { id: 2, title: '이미지 분류 시스템', description: 'CNN을 활용한 이미지 분류' }
    ]
  },
  {
    id: 2,
    name: '이민수',
    major: '소프트웨어학과',
    gen: 6,
    positions: ['부대표'],
    image: null,
    projects: [
      { id: 3, title: '웹 애플리케이션', description: 'React 기반 웹 앱' }
    ]
  },
  {
    id: 3,
    name: '박서연',
    major: '데이터사이언스학과',
    gen: 5,
    positions: ['기획부 부장'],
    image: null,
    projects: [
      { id: 4, title: '데이터 분석 프로젝트', description: '머신러닝 기반 예측 모델' }
    ]
  }
]);

// 계산된 속성들
const totalMembers = computed(() => filteredMembers.value.length);

const filteredMembers = computed(() => {
  if (activeTab.value === null) {
    return sampleMembers.value;
  } else if (activeTab.value === -1) {
    return sampleMembers.value.filter(member => 
      member.positions && member.positions.some(pos => 
        pos.includes('대표') || pos.includes('부장') || pos.includes('차장')
      )
    );
  }
  return sampleMembers.value.filter(member => member.gen === activeTab.value);
});

// 메서드들
const setActiveTab = (tab) => {
  activeTab.value = activeTab.value === tab ? null : tab;
};

const handleImageError = (event) => {
  event.target.src = '/default-avatar.png';
};

const requestCoffeeChat = (member) => {
  selectedMember.value = member;
  showCoffeeChatModal.value = true;
};

const closeCoffeeChatModal = () => {
  showCoffeeChatModal.value = false;
  selectedMember.value = null;
  coffeeChatMessage.value = '';
};

const submitCoffeeChatRequest = () => {
  if (selectedMember.value && coffeeChatMessage.value) {
    // API 호출 로직 추가
    console.log('커피챗 신청:', {
      to: selectedMember.value.name,
      message: coffeeChatMessage.value
    });
  }
  closeCoffeeChatModal();
};

const viewProfile = (member) => {
  selectedMember.value = member;
  showProfileModal.value = true;
};

const closeProfileModal = () => {
  showProfileModal.value = false;
  selectedMember.value = null;
};

const openChat = (member) => {
  // 채팅 기능 구현
  console.log('채팅 열기:', member.name);
};

// 실제 API 호출 (주석 처리)
const getMembers = async () => {
	try {
		const response = await $fetch(`${import.meta.env.VITE_API_URL}/member/show_all_members`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});
		members.value = response;
	} catch (error) {
		console.error(error);
	}
};

onMounted(async () => {
  // await getMembers(); // 실제 API 호출 시 활성화
});
</script>


<style>
.custom {
	max-width: 960px;
}

.custom-padding {
	padding: 6.5rem;
}
</style>
