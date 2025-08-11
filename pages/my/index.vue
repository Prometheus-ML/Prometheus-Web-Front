<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <h1 class="text-2xl font-bold text-gray-900 mb-4">내 정보</h1>

    <div class="border-b mb-4">
      <nav class="-mb-px flex space-x-6">
        <NuxtLink to="/my" :class="['py-2 px-1 border-b-2 text-sm', $route.path === '/my' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700']">기본 정보</NuxtLink>
        <NuxtLink to="/my/coffee_chat" :class="['py-2 px-1 border-b-2 text-sm', $route.path.startsWith('/my/coffee_chat') ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700']">커피챗</NuxtLink>
        <NuxtLink to="/my/project" :class="['py-2 px-1 border-b-2 text-sm', $route.path.startsWith('/my/project') ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700']">프로젝트</NuxtLink>
        <NuxtLink to="/my/post" :class="['py-2 px-1 border-b-2 text-sm', $route.path.startsWith('/my/post') ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700']">게시글</NuxtLink>
      </nav>
    </div>

    <!-- 내 프로필 -->
    <div class="space-y-6">
      <div class=" rounded-lg border p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">내 프로필</h2>
        </div>

        <div class="flex items-center gap-4 mb-6">
          <div class="relative">
            <img
              v-if="myProfile.profile_image_url && !profileImageError"
              :src="getImageSrc(myProfile.profile_image_url, 160)"
              :alt="myProfile.name"
              class="w-20 h-20 rounded-full object-cover border"
              @error="() => (profileImageError = true)"
            />
            <div v-else class="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-medium">
              {{ getFirstLetter(myProfile.name) }}
            </div>
            <input ref="profileImageInput" type="file" accept="image/*" class="hidden" @change="onMyProfileImageChange" />
          </div>
          <div class="flex-1">
            <div class="text-xl font-semibold">{{ myProfile.name }}</div>
            <div class="text-sm text-gray-600">{{ myProfile.email }}</div>
          </div>
          <button v-if="profileInnerTab==='optional' && profileEditMode" @click="triggerMyProfileImageSelect" :disabled="profileSubmitting" class="px-3 py-1.5 rounded border  hover:bg-gray-50">이미지 변경</button>
        </div>

        <!-- 내부 탭 -->
        <div class="border-b mb-4">
          <nav class="-mb-px flex space-x-6">
            <button @click="profileInnerTab = 'basic'" :class="['py-2 px-1 border-b-2 text-sm', profileInnerTab==='basic' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700']">기본 정보</button>
            <button @click="profileInnerTab = 'optional'" :class="['py-2 px-1 border-b-2 text-sm', profileInnerTab==='optional' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700']">선택 정보</button>
          </nav>
        </div>

        <!-- 기본 정보: 읽기 전용 -->
        <div v-if="profileInnerTab==='basic'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label class="text-xs text-gray-500">이름</label><div class="mt-1">{{ myProfile.name }}</div></div>
          <div><label class="text-xs text-gray-500">이메일</label><div class="mt-1">{{ myProfile.email }}</div></div>
          <div><label class="text-xs text-gray-500">권한</label><div class="mt-1">{{ myProfile.grant }}</div></div>
          <div><label class="text-xs text-gray-500">상태</label><div class="mt-1">{{ myProfile.status }}</div></div>
          <div><label class="text-xs text-gray-500">기수</label><div class="mt-1">{{ myProfile.gen ?? '-' }}</div></div>
          <div><label class="text-xs text-gray-500">학교</label><div class="mt-1">{{ myProfile.school ?? '-' }}</div></div>
          <div><label class="text-xs text-gray-500">전공</label><div class="mt-1">{{ myProfile.major ?? '-' }}</div></div>
          <div><label class="text-xs text-gray-500">학번</label><div class="mt-1">{{ myProfile.student_id ?? '-' }}</div></div>
          <div><label class="text-xs text-gray-500">생년월일</label><div class="mt-1">{{ myProfile.birthdate ?? '-' }}</div></div>
          <div><label class="text-xs text-gray-500">전화번호</label><div class="mt-1">{{ myProfile.phone ?? '-' }}</div></div>
          <div class="md:col-span-2"><label class="text-xs text-gray-500">활동 시작일</label><div class="mt-1">{{ myProfile.activity_start_date ?? '-' }}</div></div>
          <div class="md:col-span-2" v-if="myProfile.active_gens?.length"><label class="text-xs text-gray-500">활동 기수</label><div class="mt-1">{{ myProfile.active_gens.join(', ') }}</div></div>
          <div class="md:col-span-2" v-if="myProfile.history?.length"><label class="text-xs text-gray-500">이력</label><div class="mt-1">{{ myProfile.history.join(', ') }}</div></div>
        </div>

        <!-- 선택 정보: 편집 가능 -->
        <div v-else>
          <div class="flex items-center justify-end mb-3 space-x-2">
            <button v-if="!profileEditMode" @click="profileEditMode = true" class="px-3 py-1.5 rounded border hover:bg-gray-50">수정</button>
            <template v-else>
              <button @click="submitMyProfile" :disabled="profileSubmitting" class="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">{{ profileSubmitting ? '저장 중...' : '저장' }}</button>
              <button @click="cancelMyProfileEdit" :disabled="profileSubmitting" class="px-3 py-1.5 rounded border hover:bg-gray-50">취소</button>
            </template>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-xs text-gray-600">GitHub</label>
            <input v-model="myProfileDraft.github" :disabled="!profileEditMode" type="url" class="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="text-xs text-gray-600">Notion</label>
            <input v-model="myProfileDraft.notion" :disabled="!profileEditMode" type="url" class="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="text-xs text-gray-600">Figma</label>
            <input v-model="myProfileDraft.figma" :disabled="!profileEditMode" type="url" class="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="text-xs text-gray-600">카카오 ID</label>
            <input v-model="myProfileDraft.kakao_id" :disabled="!profileEditMode" type="text" class="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="text-xs text-gray-600">인스타그램 ID</label>
            <input v-model="myProfileDraft.instagram_id" :disabled="!profileEditMode" type="text" class="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="text-xs text-gray-600">MBTI</label>
            <input v-model="myProfileDraft.mbti" :disabled="!profileEditMode" type="text" maxlength="4" class="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="text-xs text-gray-600">커피챗 활성화</label>
            <select v-model="myProfileDraft.coffee_chat_enabled" :disabled="!profileEditMode" class="mt-1 w-full border rounded px-3 py-2">
              <option :value="true">활성화</option>
              <option :value="false">비활성화</option>
            </select>
          </div>
          <div class="md:col-span-2">
            <label class="text-xs text-gray-600">자기소개</label>
            <div class="mt-1">
              <textarea
                v-model="myProfileDraft.self_introduction"
                :disabled="!profileEditMode"
                rows="4"
                maxlength="300"
                class="w-full border rounded px-3 py-2"
              ></textarea>
              <div class="text-right text-xs text-gray-500 mt-1">{{ selfIntroCount }}/300</div>
            </div>
          </div>
          <div class="md:col-span-2">
            <label class="text-xs text-gray-600">추가 경력</label>
            <div class="mt-1">
              <textarea
                v-model="myProfileDraft.additional_career"
                :disabled="!profileEditMode"
                rows="4"
                maxlength="300"
                class="w-full border rounded px-3 py-2"
              ></textarea>
              <div class="text-right text-xs text-gray-500 mt-1">{{ additionalCareerCount }}/300</div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 프로젝트/게시글은 별도 라우트에서 표시됨 -->

    <!-- 커피챗 요청 모달은 coffee_chat 페이지에서 관리 -->
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

// 상단 라우트 탭은 NuxtLink로 처리

// UI state (index 전용)
// My profile
const myProfile = ref({
  id: '', name: '', email: '', grant: '', status: '',
  gen: null, school: null, major: null, student_id: null, birthdate: null, phone: null,
  github: null, notion: null, figma: null, kakao_id: null, instagram_id: null, mbti: null,
  coffee_chat_enabled: false, self_introduction: '', additional_career: '', profile_image_url: '',
  activity_start_date: null, active_gens: [], history: [], meta: null
})
const myProfileDraft = ref({
  github: '', notion: '', figma: '', kakao_id: '', instagram_id: '', mbti: '', coffee_chat_enabled: false,
  self_introduction: '', additional_career: '', profile_image_url: ''
})
const profileInnerTab = ref('basic')
const profileEditMode = ref(false)
const profileSubmitting = ref(false)
const profileImageInput = ref(null)
const profileImageError = ref(false)
const getFirstLetter = (name) => (name && name.length ? String(name).trim().charAt(0) : 'U')
const selfIntroCount = computed(() => (myProfileDraft.value.self_introduction || '').length)
const additionalCareerCount = computed(() => (myProfileDraft.value.additional_career || '').length)

const loadMyProfile = async () => {
  try {
    const res = await $fetch(`${API_BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${authStore.accessToken}` }
    })
    myProfile.value = res || myProfile.value
    // sync draft from response
    myProfileDraft.value = {
      github: res.github ?? '',
      notion: res.notion ?? '',
      figma: res.figma ?? '',
      kakao_id: res.kakao_id ?? '',
      instagram_id: res.instagram_id ?? '',
      mbti: res.mbti ?? '',
      coffee_chat_enabled: !!res.coffee_chat_enabled,
      self_introduction: res.self_introduction ?? '',
      additional_career: res.additional_career ?? '',
      profile_image_url: res.profile_image_url ?? ''
    }
    profileImageError.value = false
  } catch (err) {
    console.error('Failed to load my profile:', err)
  }
}

const triggerMyProfileImageSelect = () => { profileImageInput.value?.click() }
const onMyProfileImageChange = async (e) => {
  const file = e.target?.files?.[0]
  if (!file) return
  try {
    profileSubmitting.value = true
    const formData = new FormData()
    formData.append('file', file)
    formData.append('category', 'member')
    const res = await $fetch('/storage/image/upload', {
      baseURL: API_BASE_URL,
      method: 'POST',
      body: formData,
      headers: { Authorization: `Bearer ${authStore.accessToken}` }
    })
    // 우선 CDN, 없으면 응답 URL들 중 적절한 것 사용
    const cdn = res?.publicCdnUrl || (res?.id ? `https://lh3.googleusercontent.com/d/${res.id}=s512-c` : '')
    myProfileDraft.value.profile_image_url = cdn || res?.publicEmbedUrl || res?.publicEmbedUrlAlt || myProfileDraft.value.profile_image_url
  } catch (err) {
    console.error('Upload failed:', err)
    alert('이미지 업로드 실패')
  } finally {
    profileSubmitting.value = false
    if (e.target) e.target.value = ''
  }
}

const submitMyProfile = async () => {
  try {
    profileSubmitting.value = true
    const payload = { ...myProfileDraft.value }
    await $fetch(`${API_BASE_URL}/users/me`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authStore.accessToken}` },
      body: payload
    })
    await loadMyProfile()
    profileEditMode.value = false
    alert('저장되었습니다')
  } catch (err) {
    console.error('Profile update failed:', err)
    alert('저장 실패')
  } finally {
    profileSubmitting.value = false
  }
}

const cancelMyProfileEdit = () => { profileEditMode.value = false; loadMyProfile() }

// coffee chat 관련 라우트로 이동

onMounted(() => { loadMyProfile() })
</script>

<style scoped>
</style>


