<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">멤버</h1>
          <p class="text-gray-600 mt-1">프로메테우스 멤버 목록</p>
        </div>
        <div class="flex items-center space-x-3">
          <span v-if="isPrivate" class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            로그인 전용 상세보기 활성화
          </span>
          <div class="text-right">
            <div class="text-2xl font-bold text-blue-600">{{ total }}</div>
            <div class="text-sm text-gray-500">총 멤버</div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white border rounded-md p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input v-model="filters.search" type="text" placeholder="이름/이메일 검색" class="border rounded-md px-3 py-2" />
          <select v-model="filters.grant" class="border rounded-md px-3 py-2">
            <option value="">권한 전체</option>
            <option value="Super">Super</option>
            <option value="Administrator">Administrator</option>
            <option value="Manager">Manager</option>
            <option value="Member">Member</option>
          </select>
          <select v-model.number="filters.gen" class="border rounded-md px-3 py-2">
            <option :value="null">기수 전체</option>
            <option v-for="g in 20" :key="g" :value="g">{{ g }}기</option>
          </select>
          <div class="flex items-center space-x-2">
            <button @click="applyFilters" class="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700">검색</button>
            <button @click="resetFilters" class="flex-1 bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300">초기화</button>
          </div>
        </div>
      </div>

      <div v-if="isLoading" class="flex justify-center items-center py-16">
        <div class="animate-spin h-8 w-8 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
      </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="user in users" :key="user.id" class="relative bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition" @click="onCardClick(user)">
          <div class="text-center mb-4">
            <div class="relative inline-block">
              <img
                v-if="user.profile_image_url && !imageErrors[user.id]"
                :src="getImageSrc(user.profile_image_url, 160)"
                :alt="user.name"
                class="w-20 h-20 rounded-full object-cover"
                @error="(e) => onImgErr(e, user)"
              />
              <div v-else class="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-medium">
                {{ getFirstLetter(user.name) }}
              </div>
              <div v-if="isPrivate && user.coffee_chat_enabled" class="absolute -top-1 -left-1 bg-yellow-500 text-white text-xs rounded-full px-2 py-0.5">☕</div>
            </div>
            <h3 class="mt-3 text-lg font-semibold text-gray-900">{{ user.name }}</h3>
            <template v-if="!isPrivate">
              <div class="mt-2 flex flex-wrap justify-center gap-2 text-xs">
                <span v-if="user.school" class="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{{ user.school }}</span>
                <span v-if="user.major" class="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{{ user.major }}</span>
                <span v-if="user.student_id" class="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{{ user.student_id }}</span>
              </div>
            </template>
            <template v-else>
              <div class="mt-2 flex items-center justify-center space-x-2">
                <span v-if="user.gen" class="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">{{ user.gen }}기</span>
                <span v-if="user.school" class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">{{ user.school }}</span>
                <span v-if="user.major" class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">{{ user.major }}</span>
                <span v-if="user.student_id" class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">{{ user.student_id }}</span>
              </div>
            </template>
          </div>

          <div v-if="user.history && user.history.length" class="text-xs text-gray-700 bg-gray-50 p-3 rounded space-y-1">
            <div v-for="(h, idx) in user.history" :key="idx">• {{ h }}</div>
          </div>
        </div>
      </div>

      <div v-if="totalPages > 1" class="mt-6 flex items-center justify-center space-x-2">
        <button @click="prevPage" :disabled="page === 1" class="px-3 py-1 border rounded disabled:opacity-50">이전</button>
        <span class="text-sm text-gray-600">{{ page }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="page === totalPages" class="px-3 py-1 border rounded disabled:opacity-50">다음</button>
      </div>
    </div>

    <!-- 상세 모달 (private일 때만, 읽기 전용 + 커피챗 요청) -->
    <div v-if="isPrivate && showDetail" class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        <button @click="closeDetail" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">✕</button>
        <div class="text-center mb-6">
          <img
            v-if="selectedUser?.profile_image_url && !modalImageError"
            :src="getImageSrc(selectedUser.profile_image_url, 192)"
            :alt="selectedUser?.name"
            class="w-24 h-24 rounded-full mx-auto object-cover"
            @error="() => (modalImageError = true)"
          />
          <div v-else class="w-24 h-24 rounded-full mx-auto bg-gray-300 flex items-center justify-center text-gray-700 font-medium">
            {{ getFirstLetter(selectedUser?.name) }}
          </div>
          <h3 class="mt-3 text-xl font-semibold text-gray-900">{{ selectedUser?.name }}</h3>
          <p class="text-sm text-gray-600">{{ selectedUser?.school }} {{ selectedUser?.major }}</p>
        </div>
        <div class="space-y-3 text-sm text-gray-800">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><span class="font-medium">상태:</span> {{ selectedUser?.status }}</div>
            <div><span class="font-medium">기수:</span> {{ selectedUser?.gen ?? '-' }}</div>
            <div><span class="font-medium">학교:</span> {{ selectedUser?.school ?? '-' }}</div>
            <div><span class="font-medium">전공:</span> {{ selectedUser?.major ?? '-' }}</div>
            <div><span class="font-medium">학번:</span> {{ selectedUser?.student_id ?? '-' }}</div>
            <div><span class="font-medium">MBTI:</span> {{ selectedUser?.mbti ?? '-' }}</div>
            <div class="md:col-span-2" v-if="selectedUser?.github || selectedUser?.notion || selectedUser?.figma">
              <span class="font-medium">링크:</span>
              <a v-if="selectedUser?.github" :href="selectedUser.github" target="_blank" class="ml-2 px-2 py-0.5 bg-gray-100 rounded text-blue-700">GitHub</a>
              <a v-if="selectedUser?.notion" :href="selectedUser.notion" target="_blank" class="ml-2 px-2 py-0.5 bg-gray-100 rounded text-blue-700">Notion</a>
              <a v-if="selectedUser?.figma" :href="selectedUser.figma" target="_blank" class="ml-2 px-2 py-0.5 bg-gray-100 rounded text-blue-700">Figma</a>
            </div>
          </div>
          <div v-if="selectedUser?.self_introduction" class="pt-2"><span class="font-medium">자기소개:</span>
            <div class="mt-1 whitespace-pre-wrap text-gray-700">{{ selectedUser.self_introduction }}</div>
          </div>
          <div v-if="selectedUser?.additional_career" class="pt-2"><span class="font-medium">추가 경력:</span>
            <div class="mt-1 whitespace-pre-wrap text-gray-700">{{ selectedUser.additional_career }}</div>
          </div>
          <div v-if="selectedUser?.active_gens && selectedUser.active_gens.length" class="pt-2"><span class="font-medium">활동 기수:</span>
            <div class="mt-1 text-gray-700">{{ selectedUser.active_gens.join(', ') }}</div>
          </div>
          <div v-if="selectedUser?.history && selectedUser.history.length" class="pt-2"><span class="font-medium">이력:</span>
            <ul class="mt-1 list-disc list-inside text-gray-700">
              <li v-for="(h, i) in selectedUser.history" :key="i">{{ h }}</li>
            </ul>
          </div>
        </div>
        <div class="mt-6 space-y-3">
          <div v-if="selectedUser?.coffee_chat_enabled">
            <textarea v-model="coffeeChatMessage" rows="3" maxlength="300" placeholder="커피챗 요청 메시지 (선택)" class="w-full border rounded-md px-3 py-2"></textarea>
            <button @click="sendCoffeeChat" :disabled="isRequesting" class="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 disabled:opacity-50">
              {{ isRequesting ? '요청 중...' : '커피챗 요청하기' }}
            </button>
          </div>
          <div v-else class="text-sm text-gray-600 text-center">이 사용자는 커피챗을 받지 않습니다.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import { useAuthStore } from '@/composables/useAuth.js'
import { useImage } from '@/composables/useImage.js'

const config = useRuntimeConfig()
const API_BASE_URL = config.public.apiBaseUrl
const authStore = useAuthStore()
const { getImageSrc } = useImage()

const isPrivate = ref(false)
const isLoading = ref(false)
const isRequesting = ref(false)
const coffeeChatMessage = ref('')
const imageErrors = ref({})
const modalImageError = ref(false)

const users = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(20)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / size.value)))

const filters = ref({ search: '', grant: '', gen: null })

const showDetail = ref(false)
const selectedUser = ref(null)

const onImgErr = (e, user) => { if (user?.id) imageErrors.value[user.id] = true }
const getFirstLetter = (name) => (name && name.length ? name.trim().charAt(0) : 'U')

const fetchUsers = async () => {
  try {
    isLoading.value = true
    isPrivate.value = !!authStore.accessToken
    const endpoint = isPrivate.value ? '/users/private' : '/users/public'

    const params = new URLSearchParams()
    params.set('page', String(page.value))
    params.set('size', String(size.value))
    if (filters.value.search) params.set('search', filters.value.search)
    if (filters.value.grant) params.set('grant', filters.value.grant)
    if (filters.value.gen != null) params.set('gen', String(filters.value.gen))

    const response = await $fetch(`${API_BASE_URL}${endpoint}?${params.toString()}`, {
      method: 'GET',
      headers: isPrivate.value && authStore.accessToken ? { Authorization: `Bearer ${authStore.accessToken}` } : {}
    })

    users.value = response.users || []
    total.value = response.total || users.value.length
  } catch (err) {
    console.error('Failed to fetch users:', err)
    users.value = []
    total.value = 0
  } finally {
    isLoading.value = false
  }
}

const applyFilters = () => { page.value = 1; fetchUsers() }
const resetFilters = () => { filters.value = { search: '', grant: '', gen: null }; page.value = 1; fetchUsers() }
const prevPage = () => { if (page.value > 1) { page.value--; fetchUsers() } }
const nextPage = () => { if (page.value < totalPages.value) { page.value++; fetchUsers() } }

const onCardClick = (user) => { if (!isPrivate.value) return; selectedUser.value = user; showDetail.value = true }
const closeDetail = () => { showDetail.value = false; selectedUser.value = null; coffeeChatMessage.value = ''; modalImageError.value = false }

const sendCoffeeChat = async () => {
  if (!selectedUser.value) return
  try {
    isRequesting.value = true
    await $fetch(`${API_BASE_URL}/users/coffee-chats/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authStore.accessToken}` },
      body: { recipient_id: selectedUser.value.id, message: coffeeChatMessage.value || undefined }
    })
    alert('커피챗 요청을 보냈습니다.')
    closeDetail()
  } catch (err) {
    console.error('Failed to send coffee chat request:', err)
    alert('요청에 실패했습니다. 잠시 후 다시 시도해주세요.')
  } finally {
    isRequesting.value = false
  }
}

onMounted(() => { fetchUsers() })
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>


