<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
    <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <!-- 로고 -->
      

      <!-- 로그인 양식 -->
      <div class="bg-white shadow w-full rounded divide-y divide-gray-200">
        <img src="@/assets/logo.png" alt="로고" class="mx-auto px-2 py-2" />

        <div class="px-7 py-7">
          <label class="font-semibold text-sm text-gray-600 pb-1 block"
              >아이디</label
          >
          <input
          v-model="username"
          type="text"
          class="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full"
          />
          <label class="font-semibold text-sm text-gray-600 pb-1 block"
              >비밀번호</label
          >
          <input
              v-model="password"
              type="password"
              class="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full"
          />
          <button
            @click="submitLogin"
            type="button"
            class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block mb-3"
          >
            <span class="inline-block mr-2">로그인</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-4 h-4 inline-block"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>

          <!-- 회원가입 링크 -->
          <p class="flex items-center text-sm mb-4">
            회원이 아니신가요? 
            <nuxt-link to="/signup" class="text-blue-500 hover:underline ml-1">
              회원가입하기
            </nuxt-link>
          </p>
          
          <div class="flex gap-2">
            <!-- 구글 로그인 버튼 -->
            <button @click="loginWithKakao" class="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2.5 rounded text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block mb-3">
              <img src="@/assets/kakao.png" alt="카카오 로고" class="w-5 h-5 inline-block mr-1"/> 카카오 로그인
            </button>

            <!-- GitHub 로그인 버튼 -->
            <button @click="loginWithGitHub" class="w-full bg-gray-700 hover:bg-gray-900 text-white py-2.5 rounded text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block mb-3">
              <font-awesome-icon :icon="['fab', 'github']" class="text-white mr-1" /> 깃허브 로그인
            </button>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>
  
<script setup>
import { storeToRefs } from "pinia";

const username = ref("");
const password = ref("");

const submitLogin = async () => {
  try {
    const result = await $fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      body: {
        username: username.value,
        password: password.value,
      },
      credentials: 'include'
    });

    const authStore = useAuthStore();
    if(result.message === "The user not exists in the system.") console.log(1);
    authStore.setAccessToken(result.accessToken);
    await authStore.verify();
    useRouter().push({ path: "/" });
  } catch (error) {
    console.error(error);
  }
};

// 로그인 되어 있으면 팝업 띄우고 index 페이지로 이동시키기

const loginWithKakao = () => {
  // 카카오 로그인 처리 로직
};

const loginWithGitHub = () => {
  // GitHub 로그인 처리 로직
};

onMounted(async () => {
    const authStore = useAuthStore();
    const { user } = storeToRefs(authStore);
    await authStore.verify();
    if (user.value !== null) navigateTo("/")
})
</script>
