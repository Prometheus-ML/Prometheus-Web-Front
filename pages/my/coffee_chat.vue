<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="border-b mb-4">
      <nav class="-mb-px flex space-x-6">
        <NuxtLink to="/my" :class="['py-2 px-1 border-b-2 text-sm', $route.path === '/my' ? 'border-transparent text-gray-500' : 'border-transparent text-gray-500']">기본 정보</NuxtLink>
        <NuxtLink to="/my/coffee_chat" :class="['py-2 px-1 border-b-2 text-sm', 'border-blue-600 text-blue-600']">커피챗</NuxtLink>
        <NuxtLink to="/my/project" :class="['py-2 px-1 border-b-2 text-sm', $route.path.startsWith('/my/project') ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700']">프로젝트</NuxtLink>
        <NuxtLink to="/my/post" :class="['py-2 px-1 border-b-2 text-sm', $route.path.startsWith('/my/post') ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700']">게시글</NuxtLink>
      </nav>
    </div>

    <div class="border-b mb-4">
      <nav class="-mb-px flex space-x-6">
        <button @click="tab = 'available'" :class="['py-2 px-1 border-b-2 text-sm', tab==='available' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700']">가능 사용자</button>
        <button @click="tab = 'sent'" :class="['py-2 px-1 border-b-2 text-sm', tab==='sent' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700']">보낸 요청</button>
        <button @click="tab = 'received'" :class="['py-2 px-1 border-b-2 text-sm', tab==='received' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700']">받은 요청</button>
      </nav>
    </div>

    <!-- 가능 사용자 -->
    <div v-if="tab==='available'" class="space-y-4">
      <div class="flex items-center gap-2">
        <input v-model="availableFilters.search" type="text" placeholder="검색" class="border rounded px-3 py-2" />
        <select v-model.number="availableFilters.gen_filter" class="border rounded px-3 py-2">
          <option :value="null">기수 전체</option>
          <option v-for="g in 20" :key="g" :value="g">{{ g }}기</option>
        </select>
        <button @click="fetchAvailableUsers" class="bg-blue-600 text-white px-3 py-2 rounded">검색</button>
      </div>
      <div v-if="loading.available" class="py-8 text-center">불러오는 중...</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="u in availableUsers" :key="u.id" class="border rounded p-4 flex items-center gap-4">
          <img :src="u.profile_image_url ? getImageSrc(u.profile_image_url, 96) : '/default-avatar.png'" class="w-12 h-12 rounded-full object-cover" />
          <div class="flex-1">
            <div class="font-medium">{{ u.name }} <span v-if="u.gen" class="text-xs text-gray-500">· {{ u.gen }}기</span></div>
            <div class="text-sm text-gray-600">{{ u.school }} {{ u.major }}</div>
            <div class="text-xs text-gray-500" v-if="u.mbti">MBTI: {{ u.mbti }}</div>
          </div>
          <button @click="openRequest(u)" class="bg-yellow-500 text-white px-3 py-1 rounded">요청</button>
        </div>
      </div>
      <div class="flex items-center justify-center gap-2 mt-4" v-if="availableTotalPages>1">
        <button @click="prevAvailable" :disabled="availablePage===1" class="px-2 py-1 border rounded">이전</button>
        <span class="text-sm text-gray-600">{{ availablePage }}/{{ availableTotalPages }}</span>
        <button @click="nextAvailable" :disabled="availablePage===availableTotalPages" class="px-2 py-1 border rounded">다음</button>
      </div>
    </div>

    <!-- 보낸 요청 -->
    <div v-else-if="tab==='sent'" class="space-y-3">
      <div class="flex items-center gap-2">
        <select v-model="sentStatus" class="border rounded px-3 py-2">
          <option value="">전체</option>
          <option value="pending">대기</option>
          <option value="accepted">수락</option>
          <option value="rejected">거절</option>
        </select>
        <button @click="fetchSent" class="bg-blue-600 text-white px-3 py-2 rounded">조회</button>
      </div>
      <div v-if="loading.sent" class="py-8 text-center">불러오는 중...</div>
      <div v-else>
        <div v-for="r in sentRequests" :key="r.id" class="border rounded p-4">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium">{{ getRecipientName(r) }}<span v-if="getRecipientGen(r) !== null" class="text-xs text-gray-500"> · {{ getRecipientGen(r) }}기</span></div>
              <div class="text-xs text-gray-600">{{ getRecipientSchool(r) }} {{ getRecipientMajor(r) }}</div>
              <div class="text-sm text-gray-600 mt-1">상태: {{ r.status }}</div>
              <div class="text-sm text-gray-700">메시지: {{ r.message || '없음' }}</div>
            </div>
            <a v-if="r.status==='accepted'" @click.prevent="viewContact(r)" class="text-blue-600 text-sm cursor-pointer">연락처 보기</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 받은 요청 -->
    <div v-else-if="tab==='received'" class="space-y-3">
      <div class="flex items-center gap-2">
        <select v-model="receivedStatus" class="border rounded px-3 py-2">
          <option value="">전체</option>
          <option value="pending">대기</option>
          <option value="accepted">수락</option>
          <option value="rejected">거절</option>
        </select>
        <button @click="fetchReceived" class="bg-blue-600 text-white px-3 py-2 rounded">조회</button>
      </div>
      <div v-if="loading.received" class="py-8 text-center">불러오는 중...</div>
      <div v-else>
        <div v-for="r in receivedRequests" :key="r.id" class="border rounded p-4">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium">{{ getRequesterName(r) }}<span v-if="getRequesterGen(r) !== null" class="text-xs text-gray-500"> · {{ getRequesterGen(r) }}기</span></div>
              <div class="text-xs text-gray-600">{{ getRequesterSchool(r) }} {{ getRequesterMajor(r) }}</div>
              <div class="text-sm text-gray-600 mt-1">상태: {{ r.status }}</div>
              <div class="text-sm text-gray-700">메시지: {{ r.message || '없음' }}</div>
            </div>
            <div class="flex items-center gap-2">
              <button @click="respond(r,'accepted')" class="bg-green-600 text-white px-3 py-1 rounded">수락</button>
              <button @click="respond(r,'rejected')" class="bg-red-600 text-white px-3 py-1 rounded">거절</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 요청 모달 -->
    <div v-if="showRequest" class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button @click="closeRequest" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">✕</button>
        <h3 class="text-lg font-semibold mb-3">커피챗 요청</h3>
        <p class="text-sm text-gray-700 mb-2">대상: {{ requestTarget?.name }}</p>
        <textarea v-model="requestMessage" rows="4" maxlength="300" placeholder="메시지 (선택)" class="w-full border rounded px-3 py-2"></textarea>
        <button @click="createRequest" :disabled="isRequesting" class="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 disabled:opacity-50">
          {{ isRequesting ? '요청 중...' : '보내기' }}
        </button>
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

const tab = ref('available')

// Available users
const availableUsers = ref([])
const availableTotal = ref(0)
const availablePage = ref(1)
const availableSize = ref(12)
const availableTotalPages = computed(() => Math.max(1, Math.ceil(availableTotal.value / availableSize.value)))
const availableFilters = ref({ search: '', gen_filter: null })

// Requests
const sentRequests = ref([])
const receivedRequests = ref([])
const sentStatus = ref('')
const receivedStatus = ref('')

const loading = ref({ available: false, sent: false, received: false })

const fetchAvailableUsers = async () => {
  try {
    loading.value.available = true
    const params = new URLSearchParams()
    params.set('page', String(availablePage.value))
    params.set('size', String(availableSize.value))
    if (availableFilters.value.search) params.set('search', availableFilters.value.search)
    if (availableFilters.value.gen_filter != null) params.set('gen_filter', String(availableFilters.value.gen_filter))
    const res = await $fetch(`${API_BASE_URL}/users/coffee-chats/available-users?${params.toString()}`, {
      headers: { Authorization: `Bearer ${authStore.accessToken}` }
    })
    availableUsers.value = res.users || []
    availableTotal.value = res.total || availableUsers.value.length
  } catch (err) {
    console.error('Failed to load available users:', err)
    availableUsers.value = []
    availableTotal.value = 0
  } finally {
    loading.value.available = false
  }
}

const prevAvailable = () => { if (availablePage.value > 1) { availablePage.value--; fetchAvailableUsers() } }
const nextAvailable = () => { if (availablePage.value < availableTotalPages.value) { availablePage.value++; fetchAvailableUsers() } }

const fetchSent = async () => {
  try {
    loading.value.sent = true
    const params = new URLSearchParams()
    params.set('page', '1')
    params.set('size', '20')
    if (sentStatus.value) params.set('status_filter', sentStatus.value)
    const res = await $fetch(`${API_BASE_URL}/users/coffee-chats/requests/sent?${params.toString()}`, {
      headers: { Authorization: `Bearer ${authStore.accessToken}` }
    })
    sentRequests.value = res.requests || []
  } catch (err) {
    console.error('Failed to load sent requests:', err)
    sentRequests.value = []
  } finally {
    loading.value.sent = false
  }
}

const fetchReceived = async () => {
  try {
    loading.value.received = true
    const params = new URLSearchParams()
    params.set('page', '1')
    params.set('size', '20')
    if (receivedStatus.value) params.set('status_filter', receivedStatus.value)
    const res = await $fetch(`${API_BASE_URL}/users/coffee-chats/requests/received?${params.toString()}`, {
      headers: { Authorization: `Bearer ${authStore.accessToken}` }
    })
    receivedRequests.value = res.requests || []
  } catch (err) {
    console.error('Failed to load received requests:', err)
    receivedRequests.value = []
  } finally {
    loading.value.received = false
  }
}

const showRequest = ref(false)
const requestTarget = ref(null)
const requestMessage = ref('')
const isRequesting = ref(false)

const openRequest = (user) => { requestTarget.value = user; requestMessage.value = ''; showRequest.value = true }
const closeRequest = () => { showRequest.value = false; requestTarget.value = null; requestMessage.value = '' }

const createRequest = async () => {
  if (!requestTarget.value) return
  try {
    isRequesting.value = true
    await $fetch(`${API_BASE_URL}/users/coffee-chats/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authStore.accessToken}` },
      body: { recipient_id: requestTarget.value.id, message: requestMessage.value || undefined }
    })
    alert('요청을 보냈습니다.')
    closeRequest()
    fetchSent()
  } catch (err) {
    console.error('Failed to create request:', err)
    alert('요청 실패. 잠시 후 다시 시도해주세요.')
  } finally {
    isRequesting.value = false
  }
}

const respond = async (req, status) => {
  try {
    await $fetch(`${API_BASE_URL}/users/coffee-chats/requests/${req.id}/respond`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authStore.accessToken}` },
      body: { status }
    })
    fetchReceived()
  } catch (err) {
    console.error('Failed to respond request:', err)
    alert('처리 실패')
  }
}

const viewContact = async (req) => {
  try {
    const res = await $fetch(`${API_BASE_URL}/users/coffee-chats/requests/${req.id}/contact-info`, {
      headers: { Authorization: `Bearer ${authStore.accessToken}` }
    })
    alert(`연락처: ${res?.contact || '제공되지 않음'}`)
  } catch (err) {
    console.error('Failed to get contact info:', err)
    alert('연락처 조회 실패')
  }
}

onMounted(() => { fetchAvailableUsers(); fetchSent(); fetchReceived() })

// Helpers to tolerate both nested user objects and flat fields from API
const getRecipientName = (r) => r.recipient?.name || r.recipient_name || ''
const getRecipientGen = (r) => typeof (r.recipient?.gen ?? r.recipient_gen) === 'number' ? (r.recipient?.gen ?? r.recipient_gen) : null
const getRecipientSchool = (r) => r.recipient?.school || r.recipient_school || ''
const getRecipientMajor = (r) => r.recipient?.major || r.recipient_major || ''

const getRequesterName = (r) => r.requester?.name || r.requester_name || ''
const getRequesterGen = (r) => typeof (r.requester?.gen ?? r.requester_gen) === 'number' ? (r.requester?.gen ?? r.requester_gen) : null
const getRequesterSchool = (r) => r.requester?.school || r.requester_school || ''
const getRequesterMajor = (r) => r.requester?.major || r.requester_major || ''
</script>

<style scoped>
</style>


