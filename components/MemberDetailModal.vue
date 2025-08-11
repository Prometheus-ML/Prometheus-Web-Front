<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- 배경 오버레이 -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>

      <!-- 모달 컨텐츠 -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                멤버 상세 정보
              </h3>
              
              <!-- 수정 모드 토글 -->
              <div class="mt-4 flex items-center justify-end">
                <span class="text-sm text-gray-700 mr-3">수정 모드</span>
                <button
                  type="button"
                  @click="editMode = !editMode"
                  class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  :class="editMode ? 'bg-blue-600' : 'bg-gray-200'"
                >
                  <span
                    class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    :class="editMode ? 'translate-x-5' : 'translate-x-0'"
                  ></span>
                </button>
              </div>

                             <!-- 멤버 정보 -->
               <div class="mt-6 space-y-6">
                 <!-- 프로필 이미지 -->
                 <div>
                   <h4 class="text-md font-medium text-gray-900 mb-4">프로필 이미지</h4>
                   <div class="flex items-center space-x-4">
                     <div class="flex-shrink-0">
                       <img
                         v-if="form.image || member?.image"
                         :src="form.image || member?.image"
                         :alt="form.name"
                         class="h-16 w-16 rounded-full object-cover"
                       >
                       <div v-else class="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                         <span class="text-lg font-medium text-gray-700">{{ form.name?.charAt(0) || 'U' }}</span>
                       </div>
                     </div>
                     
                     <div class="flex-1">
                       <div v-if="!editMode" class="text-sm text-gray-500">
                         현재 이미지
                       </div>
                       <div v-else class="space-y-2">
                         <label class="block text-sm font-medium text-gray-700">Google Drive 이미지 URL</label>
                         <input
                           v-model="form.image"
                           type="url"
                           placeholder="https://drive.google.com/file/d/..."
                           class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                         >
                         <p class="text-xs text-gray-500">
                           Google Drive에서 이미지를 업로드하고 공유 링크를 붙여넣으세요
                         </p>
                       </div>
                     </div>
                   </div>
                 </div>

                 <!-- 기본 정보 -->
                <div>
                  <h4 class="text-md font-medium text-gray-900 mb-4">기본 정보</h4>
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label class="block text-sm font-medium text-gray-700">이름</label>
                      <input
                        v-model="form.name"
                        type="text"
                        :disabled="!editMode"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="!editMode ? 'bg-gray-100 cursor-not-allowed' : ''"
                      >
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700">이메일</label>
                      <input
                        v-model="form.email"
                        type="email"
                        :disabled="!editMode"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="!editMode ? 'bg-gray-100 cursor-not-allowed' : ''"
                      >
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700">기수</label>
                      <input
                        v-model.number="form.gen"
                        type="number"
                        :disabled="!editMode"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="!editMode ? 'bg-gray-100 cursor-not-allowed' : ''"
                      >
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700">역할</label>
                      <select
                        v-model="form.grant"
                        :disabled="!editMode"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="!editMode ? 'bg-gray-100 cursor-not-allowed' : ''"
                      >
                        <option value="Super">Super</option>
                        <option value="Administrator">Administrator</option>
                        <option value="Manager">Manager</option>
                        <option value="Member">Member</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- 학교 정보 -->
                <div>
                  <h4 class="text-md font-medium text-gray-900 mb-4">학교 정보</h4>
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label class="block text-sm font-medium text-gray-700">학교</label>
                      <input
                        v-model="form.school"
                        type="text"
                        :disabled="!editMode"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="!editMode ? 'bg-gray-100 cursor-not-allowed' : ''"
                      >
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700">전공</label>
                      <input
                        v-model="form.major"
                        type="text"
                        :disabled="!editMode"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="!editMode ? 'bg-gray-100 cursor-not-allowed' : ''"
                      >
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700">학번</label>
                      <input
                        v-model="form.student_id"
                        type="text"
                        :disabled="!editMode"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="!editMode ? 'bg-gray-100 cursor-not-allowed' : ''"
                      >
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700">전화번호</label>
                      <input
                        v-model="form.phone"
                        type="tel"
                        :disabled="!editMode"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="!editMode ? 'bg-gray-100 cursor-not-allowed' : ''"
                      >
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700">생년월일</label>
                      <input
                        v-model="form.birthdate"
                        type="date"
                        :disabled="!editMode"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="!editMode ? 'bg-gray-100 cursor-not-allowed' : ''"
                      >
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700">승인 상태</label>
                      <select
                        v-model="form.status"
                        :disabled="!editMode"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="!editMode ? 'bg-gray-100 cursor-not-allowed' : ''"
                      >
                        <option value="not verified">승인 대기</option>
                        <option value="verified">승인됨</option>
                        <option value="admin">관리자</option>
                        <option value="ob">OB</option>
                        <option value="yb">YB</option>
                        <option value="blacklist">블랙리스트</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- 소셜 링크 -->
                <div>
                  <h4 class="text-md font-medium text-gray-900 mb-4">소셜 링크</h4>
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label class="block text-sm font-medium text-gray-700">GitHub</label>
                      <input
                        v-model="form.github"
                        type="url"
                        :disabled="!editMode"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="!editMode ? 'bg-gray-100 cursor-not-allowed' : ''"
                      >
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700">Notion</label>
                      <input
                        v-model="form.notion"
                        type="url"
                        :disabled="!editMode"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="!editMode ? 'bg-gray-100 cursor-not-allowed' : ''"
                      >
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700">Figma</label>
                      <input
                        v-model="form.figma"
                        type="url"
                        :disabled="!editMode"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="!editMode ? 'bg-gray-100 cursor-not-allowed' : ''"
                      >
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700">카카오 ID</label>
                      <input
                        v-model="form.kakao_id"
                        type="text"
                        :disabled="!editMode"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="!editMode ? 'bg-gray-100 cursor-not-allowed' : ''"
                      >
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700">인스타그램 ID</label>
                      <input
                        v-model="form.instagram_id"
                        type="text"
                        :disabled="!editMode"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="!editMode ? 'bg-gray-100 cursor-not-allowed' : ''"
                      >
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700">MBTI</label>
                      <input
                        v-model="form.mbti"
                        type="text"
                        :disabled="!editMode"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="!editMode ? 'bg-gray-100 cursor-not-allowed' : ''"
                      >
                    </div>
                  </div>
                </div>

                <!-- 추가 정보 -->
                <div>
                  <h4 class="text-md font-medium text-gray-900 mb-4">추가 정보</h4>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700">자기소개</label>
                      <textarea
                        v-model="form.self_introduction"
                        rows="3"
                        :disabled="!editMode"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="!editMode ? 'bg-gray-100 cursor-not-allowed' : ''"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700">추가 경력</label>
                      <textarea
                        v-model="form.additional_career"
                        rows="3"
                        :disabled="!editMode"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="!editMode ? 'bg-gray-100 cursor-not-allowed' : ''"
                      ></textarea>
                    </div>
                    
                                         <div class="space-y-4">
                       <div class="flex items-center">
                         <input
                           v-model="form.coffee_chat_enabled"
                           type="checkbox"
                           :disabled="!editMode"
                           class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                           :class="!editMode ? 'bg-gray-100 cursor-not-allowed' : ''"
                         >
                         <label class="ml-2 block text-sm text-gray-900">커피챗 활성화</label>
                       </div>
                       
                       <div>
                         <label class="block text-sm font-medium text-gray-700">활성 기수</label>
                         <div class="mt-2 space-y-2">
                           <div v-for="gen in 15" :key="gen" class="flex items-center">
                             <input
                               :id="`gen-${gen}`"
                               v-model="form.active_gens"
                               :value="gen"
                               type="checkbox"
                               :disabled="!editMode"
                               class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                               :class="!editMode ? 'bg-gray-100 cursor-not-allowed' : ''"
                             >
                             <label :for="`gen-${gen}`" class="ml-2 block text-sm text-gray-900">{{ gen }}기</label>
                           </div>
                         </div>
                       </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 모달 하단 버튼 -->
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            v-if="editMode"
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
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  member: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close', 'submit']);

// 상태 변수
const editMode = ref(false);
const isSubmitting = ref(false);

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
  grant: 'Guest',
  status: 'not verified',
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
  image: ''
});

// 멤버 데이터로 폼 초기화
const initializeForm = () => {
  if (props.member) {
    Object.keys(form.value).forEach(key => {
      if (props.member[key] !== undefined) {
        // active_gens는 배열로 처리
        if (key === 'active_gens') {
          form.value[key] = Array.isArray(props.member[key]) ? props.member[key] : [];
        } else {
          form.value[key] = props.member[key];
        }
      }
    });
  }
};

// 모달 닫기
const closeModal = () => {
  editMode.value = false;
  emit('close');
};

// 폼 제출 처리
const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    
    const submitData = { ...form.value };
    
    // 빈 문자열을 null로 변환
    Object.keys(submitData).forEach(key => {
      if (submitData[key] === '') {
        submitData[key] = null;
      }
    });
    
    emit('submit', submitData);
    editMode.value = false;
  } catch (error) {
    console.error('Submit error:', error);
  } finally {
    isSubmitting.value = false;
  }
};

// 멤버 데이터가 변경될 때 폼 초기화
watch(() => props.member, () => {
  if (props.member) {
    initializeForm();
  }
}, { immediate: true });
</script> 