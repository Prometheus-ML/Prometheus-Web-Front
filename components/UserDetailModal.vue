<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- 배경 오버레이 -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="$emit('close')"></div>

      <!-- 모달 컨테이너 -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                사용자 상세 정보
              </h3>

              <div v-if="user" class="space-y-6">
                <!-- 프로필 섹션 -->
                <div class="flex items-center space-x-4">
                  <img
                    v-if="user.image"
                    :src="user.image"
                    :alt="user.name"
                    class="h-16 w-16 rounded-full"
                  />
                  <div v-else class="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                    <span class="text-xl font-medium text-gray-700">{{ user.name.charAt(0) }}</span>
                  </div>
                  <div>
                    <h4 class="text-xl font-semibold text-gray-900">{{ user.name }}</h4>
                    <p class="text-gray-600">{{ user.email }}</p>
                    <div class="flex items-center mt-1 space-x-2">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        승인 대기
                      </span>
                      <span class="text-sm text-gray-500">{{ user.gen }}기</span>
                    </div>
                  </div>
                </div>

                <!-- 기본 정보 -->
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h5 class="text-sm font-medium text-gray-900 mb-3">기본 정보</h5>
                    <dl class="space-y-2">
                      <div v-if="user.school">
                        <dt class="text-xs text-gray-500">학교</dt>
                        <dd class="text-sm text-gray-900">{{ user.school }}</dd>
                      </div>
                      <div v-if="user.major">
                        <dt class="text-xs text-gray-500">전공</dt>
                        <dd class="text-sm text-gray-900">{{ user.major }}</dd>
                      </div>
                      <div v-if="user.student_id">
                        <dt class="text-xs text-gray-500">학번</dt>
                        <dd class="text-sm text-gray-900">{{ user.student_id }}</dd>
                      </div>
                      <div v-if="user.birthdate">
                        <dt class="text-xs text-gray-500">생년월일</dt>
                        <dd class="text-sm text-gray-900">{{ formatDate(user.birthdate) }}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h5 class="text-sm font-medium text-gray-900 mb-3">연락처 정보</h5>
                    <dl class="space-y-2">
                      <div v-if="user.phone">
                        <dt class="text-xs text-gray-500">전화번호</dt>
                        <dd class="text-sm text-gray-900">{{ user.phone }}</dd>
                      </div>
                      <div v-if="user.created_at">
                        <dt class="text-xs text-gray-500">가입일</dt>
                        <dd class="text-sm text-gray-900">{{ formatDateTime(user.created_at) }}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <!-- 소셜 링크 -->
                <div v-if="user.github || user.notion || user.figma">
                  <h5 class="text-sm font-medium text-gray-900 mb-3">소셜 링크</h5>
                  <div class="flex space-x-4">
                    <a
                      v-if="user.github"
                      :href="user.github"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
                      </svg>
                      GitHub
                    </a>
                    <a
                      v-if="user.notion"
                      :href="user.notion"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4.317 6.317L9 11l4.683-4.683a1 1 0 011.414 1.414l-5.39 5.39a1 1 0 01-1.414 0l-5.39-5.39a1 1 0 011.414-1.414z"></path>
                      </svg>
                      Notion
                    </a>
                    <a
                      v-if="user.figma"
                      :href="user.figma"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4.317 6.317L9 11l4.683-4.683a1 1 0 011.414 1.414l-5.39 5.39a1 1 0 01-1.414 0l-5.39-5.39a1 1 0 011.414-1.414z"></path>
                      </svg>
                      Figma
                    </a>
                  </div>
                </div>

                <!-- 이력 -->
                <div v-if="user.history && user.history.length > 0">
                  <h5 class="text-sm font-medium text-gray-900 mb-3">활동 이력</h5>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="(item, index) in user.history"
                      :key="index"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {{ item }}
                    </span>
                  </div>
                </div>

                <!-- 메타 정보 -->
                <div v-if="user.meta && Object.keys(user.meta).length > 0">
                  <h5 class="text-sm font-medium text-gray-900 mb-3">추가 정보</h5>
                  <div class="bg-gray-50 rounded-md p-3">
                    <pre class="text-xs text-gray-600">{{ JSON.stringify(user.meta, null, 2) }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            @click="$emit('approve', user)"
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            승인
          </button>
          <button
            @click="$emit('reject', user)"
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            거부
          </button>
          <button
            @click="$emit('close')"
            type="button"
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
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  user: {
    type: Object,
    default: null
  }
});

defineEmits(['close', 'approve', 'reject']);

// 날짜 포맷팅
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatDateTime = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
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