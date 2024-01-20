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
            class="transition duration-200 bg-red-600 hover:bg-red-400 focus:bg-red-900 focus:shadow-sm focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block mb-3"
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
            <!-- 카카오 로그인 버튼 -->
            <a href="https://kauth.kakao.com/oauth/authorize?client_id=4ae6367dd52253db58fbef5270c3667f
&redirect_uri=http://localhost:8000/api/v1/auth/kakao&response_type=code" class="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2.5 rounded text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block mb-3">
              <img src="@/assets/kakao.png" alt="카카오 로고" class="w-5 h-5 inline-block mr-1"/> 카카오 로그인
            </a>

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
    const response = await $fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      body: {
        username: username.value,
        password: password.value,
      },
      credentials: 'include'
    });

    const authStore = useAuthStore();
    await authStore.verify();
    navigateTo("/");
  } catch (error) {
    console.error(error);
  }
};


onMounted(async () => {
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);
  if (user.value !== null) navigateTo("/");
})
</script>
