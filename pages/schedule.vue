<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 헤더 섹션 -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">일정 관리</h1>
            <p class="text-gray-600 mt-1">{{ user?.name }}님, 2025년 2학기 프메 활동 중입니다</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <div class="text-2xl font-bold text-green-600">{{ attendanceRate }}%</div>
              <div class="text-sm text-gray-500">출석률</div>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-orange-600">{{ remainingAbsences }}</div>
              <div class="text-sm text-gray-500">남은 결석</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 탭 네비게이션 -->
      <div class="border-b border-gray-200 mb-8">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.name"
            @click="activeTab = tab.name"
            :class="[
              activeTab === tab.name
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            {{ tab.label }}
          </button>
        </nav>
      </div>

      <!-- 일정 카드 뷰 -->
      <div v-if="activeTab === 'upcoming'" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="event in upcomingEvents"
            :key="event.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-2">
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      event.type === 'seminar' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    ]"
                  >
                    {{ event.type === 'seminar' ? '세미나' : '정기모임' }}
                  </span>
                  <span
                    v-if="event.attendance"
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      event.attendance === 'present' ? 'bg-green-100 text-green-800' :
                      event.attendance === 'absent' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    ]"
                  >
                    {{ event.attendance === 'present' ? '출석' : 
                       event.attendance === 'absent' ? '결석' : '미제출' }}
                  </span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ event.title }}</h3>
                <p class="text-gray-600 text-sm mb-4">{{ event.description }}</p>
                <div class="flex items-center text-sm text-gray-500 mb-4">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {{ formatDate(event.date) }}
                </div>
                <div class="flex items-center justify-between">
                  <button
                    v-if="!event.attendance"
                    @click="openAttendanceModal(event)"
                    class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                  >
                    출석 체크
                  </button>
                  <button
                    v-else-if="event.attendance === 'absent'"
                    @click="openAbsenceReasonModal(event)"
                    class="text-orange-600 text-sm hover:text-orange-700"
                  >
                    결석 사유 입력
                  </button>
                  <span v-else class="text-sm text-gray-500">
                    {{ event.attendance === 'present' ? '출석 완료' : '결석 처리됨' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 캘린더 뷰 -->
      <div v-else-if="activeTab === 'calendar'" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">캘린더</h3>
          <div class="flex items-center space-x-4">
            <button
              @click="previousMonth"
              class="p-2 rounded-md hover:bg-gray-100"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <span class="text-lg font-medium">{{ currentMonthYear }}</span>
            <button
              @click="nextMonth"
              class="p-2 rounded-md hover:bg-gray-100"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 캘린더 그리드 -->
        <div class="grid grid-cols-7 gap-1">
          <!-- 요일 헤더 -->
          <div v-for="day in ['일', '월', '화', '수', '목', '금', '토']" :key="day" 
               class="p-2 text-center text-sm font-medium text-gray-500">
            {{ day }}
          </div>
          
          <!-- 날짜 셀 -->
          <div
            v-for="date in calendarDays"
            :key="date.date"
            :class="[
              'p-2 min-h-[80px] border border-gray-100',
              date.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
              date.isToday ? 'bg-blue-50 border-blue-200' : ''
            ]"
          >
            <div class="text-sm font-medium mb-1">{{ date.day }}</div>
            <div v-if="date.events.length > 0" class="space-y-1">
              <div
                v-for="event in date.events"
                :key="event.id"
                :class="[
                  'text-xs p-1 rounded truncate',
                  event.type === 'seminar' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                ]"
              >
                {{ event.title }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 통계 뷰 -->
      <div v-else-if="activeTab === 'stats'" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <div class="text-2xl font-bold text-gray-900">{{ stats.totalEvents }}</div>
                <div class="text-sm text-gray-500">총 일정</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <div class="text-2xl font-bold text-gray-900">{{ stats.attendedEvents }}</div>
                <div class="text-sm text-gray-500">출석한 일정</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <div class="text-2xl font-bold text-gray-900">{{ stats.absentEvents }}</div>
                <div class="text-sm text-gray-500">결석한 일정</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 출석률 차트 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">월별 출석률</h3>
          <div class="space-y-4">
            <div v-for="month in monthlyStats" :key="month.month" class="flex items-center">
              <div class="w-20 text-sm text-gray-600">{{ month.month }}</div>
              <div class="flex-1 mx-4">
                <div class="bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-green-500 h-2 rounded-full"
                    :style="{ width: month.rate + '%' }"
                  ></div>
                </div>
              </div>
              <div class="w-16 text-sm font-medium text-gray-900">{{ month.rate }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 출석 체크 모달 -->
    <div v-if="showAttendanceModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">출석 체크</h3>
          <p class="text-sm text-gray-600 mb-6">{{ selectedEvent?.title }}</p>
          
          <div class="space-y-4">
            <button
              @click="submitAttendance('present')"
              class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              출석
            </button>
            <button
              @click="submitAttendance('absent')"
              class="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
              결석
            </button>
            <button
              @click="closeAttendanceModal"
              class="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 결석 사유 모달 -->
    <div v-if="showAbsenceReasonModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">결석 사유 입력</h3>
          <textarea
            v-model="absenceReason"
            placeholder="결석 사유를 입력해주세요..."
            class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
          ></textarea>
          
          <div class="flex space-x-3 mt-4">
            <button
              @click="submitAbsenceReason"
              class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              제출
            </button>
            <button
              @click="closeAbsenceReasonModal"
              class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              취소
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

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

// 탭 상태
const activeTab = ref('upcoming');
const tabs = [
  { name: 'upcoming', label: '다가오는 일정' },
  { name: 'calendar', label: '캘린더' },
  { name: 'stats', label: '통계' }
];

// 출석 관련 상태
const attendanceRate = ref(85);
const remainingAbsences = ref(2);

// 모달 상태
const showAttendanceModal = ref(false);
const showAbsenceReasonModal = ref(false);
const selectedEvent = ref(null);
const absenceReason = ref('');

// 샘플 데이터
const upcomingEvents = ref([
  {
    id: 1,
    title: '정기 세미나 - AI 프로젝트 발표',
    description: '팀별 AI 프로젝트 결과 발표 및 토론',
    date: '2025-01-20',
    type: 'seminar',
    attendance: null
  },
  {
    id: 2,
    title: '정기 모임',
    description: '주간 활동 점검 및 다음 주 계획 수립',
    date: '2025-01-22',
    type: 'meeting',
    attendance: 'present'
  },
  {
    id: 3,
    title: '해커톤 준비 미팅',
    description: '내부 해커톤 준비 및 역할 분담',
    date: '2025-01-25',
    type: 'seminar',
    attendance: 'absent'
  }
]);

// 통계 데이터
const stats = ref({
  totalEvents: 12,
  attendedEvents: 10,
  absentEvents: 2
});

const monthlyStats = ref([
  { month: '1월', rate: 85 },
  { month: '2월', rate: 90 },
  { month: '3월', rate: 88 },
  { month: '4월', rate: 92 }
]);

// 캘린더 관련
const currentDate = ref(new Date());
const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('ko-KR', { 
    year: 'numeric', 
    month: 'long' 
  });
});

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];
  
  // 이전 달의 마지막 날들
  const firstDayOfWeek = firstDay.getDay();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    days.push({
      date: date.toISOString().split('T')[0],
      day: date.getDate(),
      isCurrentMonth: false,
      isToday: false,
      events: []
    });
  }
  
  // 현재 달의 날들
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i);
    const today = new Date();
    days.push({
      date: date.toISOString().split('T')[0],
      day: i,
      isCurrentMonth: true,
      isToday: date.toDateString() === today.toDateString(),
      events: upcomingEvents.value.filter(event => event.date === date.toISOString().split('T')[0])
    });
  }
  
  // 다음 달의 첫 날들
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i);
    days.push({
      date: date.toISOString().split('T')[0],
      day: date.getDate(),
      isCurrentMonth: false,
      isToday: false,
      events: []
    });
  }
  
  return days;
});

// 메서드들
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const openAttendanceModal = (event) => {
  selectedEvent.value = event;
  showAttendanceModal.value = true;
};

const closeAttendanceModal = () => {
  showAttendanceModal.value = false;
  selectedEvent.value = null;
};

const submitAttendance = (status) => {
  if (selectedEvent.value) {
    selectedEvent.value.attendance = status;
    // API 호출 로직 추가
  }
  closeAttendanceModal();
};

const openAbsenceReasonModal = (event) => {
  selectedEvent.value = event;
  showAbsenceReasonModal.value = true;
};

const closeAbsenceReasonModal = () => {
  showAbsenceReasonModal.value = false;
  selectedEvent.value = null;
  absenceReason.value = '';
};

const submitAbsenceReason = () => {
  if (selectedEvent.value && absenceReason.value) {
    // API 호출 로직 추가
    console.log('결석 사유 제출:', absenceReason.value);
  }
  closeAbsenceReasonModal();
};

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
};

// 페이지 메타 설정
definePageMeta({
  middleware: 'auth'
});
</script> 