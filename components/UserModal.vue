<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- 배경 오버레이 -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="$emit('close')"></div>

      <!-- 모달 컨테이너 -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <form @submit.prevent="handleSubmit">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {{ isEdit ? '사용자 수정' : '사용자 추가' }}
                </h3>

                <div class="space-y-4">
                  <!-- 이름 -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700">이름 *</label>
                    <input
                      v-model="formData.name"
                      type="text"
                      required
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      :class="{ 'border-red-300': errors.name }"
                    />
                    <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
                  </div>

                  <!-- 이메일 -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700">이메일 *</label>
                    <input
                      v-model="formData.email"
                      type="email"
                      required
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      :class="{ 'border-red-300': errors.email }"
                    />
                    <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                  </div>

                  <!-- 기수 -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700">기수 *</label>
                    <select
                      v-model="formData.gen"
                      required
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      :class="{ 'border-red-300': errors.gen }"
                    >
                      <option value="">기수 선택</option>
                      <option v-for="gen in availableGens" :key="gen" :value="gen">{{ gen }}기</option>
                    </select>
                    <p v-if="errors.gen" class="mt-1 text-sm text-red-600">{{ errors.gen }}</p>
                  </div>

                  <!-- 학교 -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700">학교</label>
                    <input
                      v-model="formData.school"
                      type="text"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <!-- 전공 -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700">전공</label>
                    <input
                      v-model="formData.major"
                      type="text"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <!-- 학번 -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700">학번</label>
                    <input
                      v-model="formData.student_id"
                      type="text"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <!-- 생년월일 -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700">생년월일</label>
                    <input
                      v-model="formData.birthdate"
                      type="date"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <!-- 전화번호 -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700">전화번호</label>
                    <input
                      v-model="formData.phone"
                      type="tel"
                      placeholder="010-1234-5678"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <!-- 역할 -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700">역할 *</label>
                    <select
                      v-model="formData.grant"
                      required
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      :class="{ 'border-red-300': errors.grant }"
                    >
                      <option value="">역할 선택</option>
                      <option v-for="grant in manageableGrants" :key="grant" :value="grant">{{ grant }}</option>
                    </select>
                    <p v-if="errors.grant" class="mt-1 text-sm text-red-600">{{ errors.grant }}</p>
                  </div>

                  <!-- 승인 상태 -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700">승인 상태</label>
                    <select
                      v-model="formData.status"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="not verified">승인 대기</option>
                      <option value="verified">승인됨</option>
                    </select>
                  </div>

                  <!-- 임원 여부 -->
                  <div>
                    <div class="flex items-center">
                      <input
                        v-model="formData.executive"
                        type="checkbox"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label class="ml-2 block text-sm text-gray-900">임원</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            >
              <span v-if="isSubmitting">저장 중...</span>
              <span v-else>{{ isEdit ? '수정' : '생성' }}</span>
            </button>
            <button
              type="button"
              @click="$emit('close')"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  user: {
    type: Object,
    default: null
  },
  manageableGrants: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['close', 'save']);

const isSubmitting = ref(false);
const errors = ref({});

const isEdit = computed(() => !!props.user?.id);

const availableGens = computed(() => {
  const gens = [];
  for (let i = 1; i <= 15; i++) {
    gens.push(i);
  }
  return gens.sort((a, b) => b - a);
});

const formData = ref({
  name: '',
  email: '',
  gen: '',
  school: '',
  major: '',
  student_id: '',
  birthdate: '',
  phone: '',
  grant: 'Member',
  status: 'not verified',
  executive: false
});

// props.user가 변경될 때 폼 데이터 초기화
watch(() => props.user, (newUser) => {
  if (newUser) {
    formData.value = {
      name: newUser.name || '',
      email: newUser.email || '',
      gen: newUser.gen || '',
      school: newUser.school || '',
      major: newUser.major || '',
      student_id: newUser.student_id || '',
      birthdate: newUser.birthdate || '',
      phone: newUser.phone || '',
      grant: newUser.grant || 'Member',
      status: newUser.status || 'not verified',
      executive: newUser.executive || false
    };
  } else {
    // 새 사용자 생성시 초기화
    formData.value = {
      name: '',
      email: '',
      gen: '',
      school: '',
      major: '',
      student_id: '',
      birthdate: '',
      phone: '',
      grant: 'Member',
      status: 'not verified',
      executive: false
    };
  }
  errors.value = {};
}, { immediate: true });

// 폼 유효성 검사
const validateForm = () => {
  errors.value = {};

  if (!formData.value.name.trim()) {
    errors.value.name = '이름을 입력해주세요.';
  }

  if (!formData.value.email.trim()) {
    errors.value.email = '이메일을 입력해주세요.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = '올바른 이메일 형식이 아닙니다.';
  }

  if (!formData.value.gen) {
    errors.value.gen = '기수를 선택해주세요.';
  }

  if (!formData.value.grant) {
    errors.value.grant = '역할을 선택해주세요.';
  }

  return Object.keys(errors.value).length === 0;
};

// 폼 제출 처리
const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    isSubmitting.value = true;

    // 빈 값들을 제거하고 숫자 타입 변환
    const submitData = { ...formData.value };
    if (submitData.gen) submitData.gen = parseInt(submitData.gen);
    
    // 빈 문자열을 null로 변환
    Object.keys(submitData).forEach(key => {
      if (submitData[key] === '') {
        submitData[key] = null;
      }
    });

    emit('save', submitData);
  } catch (error) {
    console.error('Form submission error:', error);
  } finally {
    isSubmitting.value = false;
  }
};

// 모달이 닫힐 때 폼 초기화
watch(() => props.show, (isShown) => {
  if (!isShown) {
    errors.value = {};
  }
});
</script>

<style scoped>
/* 모달 애니메이션 */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>