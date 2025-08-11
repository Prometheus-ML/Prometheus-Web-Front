<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                내 프로필 수정
              </h3>

              <!-- 탭 버튼들 -->
              <div class="border-b border-gray-200 mb-6">
                <nav class="-mb-px flex space-x-8">
                  <button
                    @click="activeTab = 'basic'"
                    :class="[
                      activeTab === 'basic'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                      'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
                    ]"
                  >
                    기본 정보
                  </button>
                  <button
                    @click="activeTab = 'optional'"
                    :class="[
                      activeTab === 'optional'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                      'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
                    ]"
                  >
                    선택 정보
                  </button>
                </nav>
              </div>

              <!-- 기본 정보 탭 -->
              <div v-if="activeTab === 'basic'" class="mt-6">
                <form @submit.prevent="handleSubmit" class="space-y-6">
                  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <!-- 이름 (읽기 전용) -->
                    <div>
                      <label for="name" class="block text-sm font-medium text-gray-700">이름</label>
                      <input
                        id="name"
                        v-model="form.name"
                        type="text"
                        disabled
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                      >
                    </div>

                    <!-- 이메일 (읽기 전용) -->
                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-700">이메일</label>
                      <input
                        id="email"
                        v-model="form.email"
                        type="email"
                        disabled
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                      >
                    </div>

                    <!-- 기수 (읽기 전용) -->
                    <div>
                      <label for="gen" class="block text-sm font-medium text-gray-700">기수</label>
                      <input
                        id="gen"
                        v-model.number="form.gen"
                        type="number"
                        disabled
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                      >
                    </div>

                    <!-- 권한 (읽기 전용) -->
                    <div>
                      <label for="grant" class="block text-sm font-medium text-gray-700">권한</label>
                      <input
                        id="grant"
                        v-model="form.grant"
                        type="text"
                        disabled
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                      >
                    </div>

                    <!-- 학교 (읽기 전용) -->
                    <div>
                      <label for="school" class="block text-sm font-medium text-gray-700">학교</label>
                      <input
                        id="school"
                        v-model="form.school"
                        type="text"
                        disabled
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                      >
                    </div>

                    <!-- 전공 (읽기 전용) -->
                    <div>
                      <label for="major" class="block text-sm font-medium text-gray-700">전공</label>
                      <input
                        id="major"
                        v-model="form.major"
                        type="text"
                        disabled
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                      >
                    </div>

                    <!-- 학번 (읽기 전용) -->
                    <div>
                      <label for="student_id" class="block text-sm font-medium text-gray-700">학번</label>
                      <input
                        id="student_id"
                        v-model="form.student_id"
                        type="text"
                        disabled
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                      >
                    </div>

                    <!-- 생년월일 (읽기 전용) -->
                    <div>
                      <label for="birthdate" class="block text-sm font-medium text-gray-700">생년월일</label>
                      <input
                        id="birthdate"
                        v-model="form.birthdate"
                        type="date"
                        disabled
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                      >
                    </div>

                    <!-- 전화번호 (읽기 전용) -->
                    <div>
                      <label for="phone" class="block text-sm font-medium text-gray-700">전화번호</label>
                      <input
                        id="phone"
                        v-model="form.phone"
                        type="text"
                        disabled
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                      >
                    </div>

                    <!-- 상태 (읽기 전용) -->
                    <div>
                      <label for="status" class="block text-sm font-medium text-gray-700">상태</label>
                      <input
                        id="status"
                        v-model="form.status"
                        type="text"
                        disabled
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                      >
                    </div>

                    <!-- 활동 시작일 (읽기 전용) -->
                    <div>
                      <label for="activity_start_date" class="block text-sm font-medium text-gray-700">활동 시작일</label>
                      <input
                        id="activity_start_date"
                        v-model="form.activity_start_date"
                        type="date"
                        disabled
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                      >
                    </div>

                    <!-- 활동 기수 (읽기 전용) -->
                    <div class="sm:col-span-2">
                      <label for="active_gens" class="block text-sm font-medium text-gray-700">활동 기수</label>
                      <input
                        id="active_gens"
                        v-model="activeGensString"
                        type="text"
                        disabled
                        placeholder="활동 기수를 입력하세요 (예: 1,2,3)"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                      >
                    </div>

                    <!-- 이력 (읽기 전용) -->
                    <div class="sm:col-span-2">
                      <label for="history" class="block text-sm font-medium text-gray-700">이력</label>
                      <textarea
                        id="history"
                        v-model="historyString"
                        rows="3"
                        disabled
                        placeholder="이력을 입력하세요 (한 줄에 하나씩)"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                      ></textarea>
                    </div>

                    <!-- 프로필 이미지 -->
                    <div class="sm:col-span-2">
                      <label for="profile_image_url" class="block text-sm font-medium text-gray-700">프로필 이미지</label>
                      <input
                        id="profile_image_url"
                        v-model="form.profile_image_url"
                        type="url"
                        placeholder="이미지 URL을 입력하세요"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                    </div>
                  </div>
                </form>
              </div>

              <!-- 선택 정보 탭 -->
              <div v-if="activeTab === 'optional'" class="mt-6">
                <form @submit.prevent="handleSubmit" class="space-y-6">
                  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <!-- GitHub -->
                    <div>
                      <label for="github" class="block text-sm font-medium text-gray-700">GitHub</label>
                      <input
                        id="github"
                        v-model="form.github"
                        type="url"
                        placeholder="https://github.com/username"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                    </div>
                    
                    <!-- Notion -->
                    <div>
                      <label for="notion" class="block text-sm font-medium text-gray-700">Notion</label>
                      <input
                        id="notion"
                        v-model="form.notion"
                        type="url"
                        placeholder="https://notion.so/page"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                    </div>
                    
                    <!-- Figma -->
                    <div>
                      <label for="figma" class="block text-sm font-medium text-gray-700">Figma</label>
                      <input
                        id="figma"
                        v-model="form.figma"
                        type="url"
                        placeholder="https://figma.com/file/..."
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                    </div>
                    
                    <!-- 카카오 ID -->
                    <div>
                      <label for="kakao_id" class="block text-sm font-medium text-gray-700">카카오 ID</label>
                      <input
                        id="kakao_id"
                        v-model="form.kakao_id"
                        type="text"
                        placeholder="카카오톡 ID"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                    </div>
                    
                    <!-- 인스타그램 ID -->
                    <div>
                      <label for="instagram_id" class="block text-sm font-medium text-gray-700">인스타그램 ID</label>
                      <input
                        id="instagram_id"
                        v-model="form.instagram_id"
                        type="text"
                        placeholder="Instagram 계정명"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                    </div>

                    <!-- MBTI와 커피챗 활성화 -->
                    <div class="flex space-x-4">
                      <div class="flex-1">
                        <label for="mbti" class="block text-sm font-medium text-gray-700">MBTI</label>
                        <input
                          id="mbti"
                          v-model="form.mbti"
                          type="text"
                          maxlength="4"
                          placeholder="ENFP"
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                      </div>
                      
                      <div class="flex-1">
                        <label for="coffee_chat_enabled" class="block text-sm font-medium text-gray-700">커피챗 활성화</label>
                        <select
                          id="coffee_chat_enabled"
                          v-model="form.coffee_chat_enabled"
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option :value="true">활성화</option>
                          <option :value="false">비활성화</option>
                        </select>
                      </div>
                    </div>
                    
                    <!-- 자기소개 -->
                    <div class="sm:col-span-2">
                      <div class="flex justify-between items-center">
                        <label for="self_introduction" class="block text-sm font-medium text-gray-700">자기소개</label>
                        <span class="text-sm text-gray-500">{{ selfIntroductionLength }}/300</span>
                      </div>
                      <textarea
                        id="self_introduction"
                        v-model="form.self_introduction"
                        rows="5"
                        maxlength="300"
                        placeholder="자신에 대해 간단히 소개해주세요. (예: 안녕하세요! 저는 AI에 관심이 많은 학생입니다. 다양한 프로젝트를 통해 실력을 키우고 싶습니다.)"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      ></textarea>
                    </div>
                    
                    <!-- 추가 경력 -->
                    <div class="sm:col-span-2">
                      <div class="flex justify-between items-center">
                        <label for="additional_career" class="block text-sm font-medium text-gray-700">추가 경력</label>
                        <span class="text-sm text-gray-500">{{ additionalCareerLength }}/300</span>
                      </div>
                      <textarea
                        id="additional_career"
                        v-model="form.additional_career"
                        rows="5"
                        maxlength="300"
                        placeholder="추가 경력이나 활동을 입력해주세요. (예: AI 스터디 그룹 리더, 웹 개발 프로젝트 참여, 해커톤 수상 경험 등)"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            @click="handleSubmit"
            :disabled="isSubmitting"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
          >
            <div v-if="isSubmitting" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            수정
          </button>
          <button
            @click="closeModal"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useApiClient } from '@/composables/useApiClient.js'

const { userApi } = useApiClient()

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'updated'])

// 탭 상태
const activeTab = ref('basic')

// 제출 상태
const isSubmitting = ref(false)

// 폼 데이터
const form = ref({
  name: '',
  email: '',
  gen: 0,
  school: '',
  major: '',
  student_id: '',
  birthdate: '',
  phone: '',
  grant: '',
  status: '',
  activity_start_date: '',
  profile_image_url: '',
  github: '',
  notion: '',
  figma: '',
  kakao_id: '',
  instagram_id: '',
  mbti: '',
  self_introduction: '',
  additional_career: '',
  coffee_chat_enabled: false,
  active_gens: [],
  history: []
})

// 활동 기수를 문자열로 변환
const activeGensString = computed({
  get() {
    return form.value.active_gens?.join(', ') || ''
  },
  set(value) {
    form.value.active_gens = value ? value.split(',').map(g => parseInt(g.trim())).filter(g => !isNaN(g)) : []
  }
})

// 이력을 문자열로 변환
const historyString = computed({
  get() {
    return form.value.history?.join('\n') || ''
  },
  set(value) {
    form.value.history = value ? value.split('\n').filter(line => line.trim() !== '') : []
  }
})

// 글자수 계산을 위한 computed 속성들
const selfIntroductionLength = computed(() => {
  return (form.value.self_introduction || '').length
})

const additionalCareerLength = computed(() => {
  return (form.value.additional_career || '').length
})

// 모달이 열릴 때 프로필 데이터 로드
watch(() => props.isOpen, async (newVal) => {
  if (newVal) {
    await loadMyProfile()
  }
})

// 내 프로필 로드
const loadMyProfile = async () => {
  try {
    const response = await userApi.getMyProfile()
    form.value = { ...response }
  } catch (error) {
    console.error('프로필 로드 오류:', error)
    alert('프로필을 불러오는 중 오류가 발생했습니다.')
  }
}

// 폼 제출
const handleSubmit = async () => {
  if (!confirm('프로필을 수정하시겠습니까?')) {
    return
  }

  try {
    isSubmitting.value = true

    // 수정 가능한 필드만 포함
    const updateData = {
      github: form.value.github,
      notion: form.value.notion,
      figma: form.value.figma,
      kakao_id: form.value.kakao_id,
      instagram_id: form.value.instagram_id,
      mbti: form.value.mbti,
      coffee_chat_enabled: form.value.coffee_chat_enabled,
      self_introduction: form.value.self_introduction,
      additional_career: form.value.additional_career,
      profile_image_url: form.value.profile_image_url
    }

    await userApi.updateMyProfile(updateData)
    
    emit('updated')
    closeModal()
    alert('프로필이 성공적으로 수정되었습니다.')
  } catch (error) {
    console.error('프로필 수정 오류:', error)
    alert('프로필 수정 중 오류가 발생했습니다.')
  } finally {
    isSubmitting.value = false
  }
}

// 모달 닫기
const closeModal = () => {
  emit('close')
}
</script>
