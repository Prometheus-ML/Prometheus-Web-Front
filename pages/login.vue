<template>
  <div class="text-white bg-black relative h-screen overflow-hidden">
    <img src="@/assets/design/login.png" alt="login" class="object-cover w-full h-full">
    <div class="absolute transform -translate-x-1/2 -translate-y-1/2 top-[40%] md:top-[55%] left-[50%] drop-shadow-2xl w-[70%] md:w-[50%] lg:w-[25%] rounded-xl bg-opacity-5 bg-white">
      <div class="px-7 py-7">
        <label class="pb-1 block font-normal detail text-2xs md:text-base"
            >E-mail</label
        >
        <input
        v-model="email"
        type="text"
        class="rounded bg-neutral-300 font-normal detail bg-opacity-20 px-3 py-2 mt-1 mb-5 text-sm w-full"
        />
        <label class="pb-1 block font-normal text-2xs md:text-base"
            >Password</label
        >
        <input
            v-model="password"
            type="password"
            class="rounded bg-neutral-300 font-normal bg-opacity-20 px-3 py-2 mt-1 mb-5 text-sm w-full"
        />
        <button
          @click="submitLogin"
          type="button"
          class="transition duration-200 bg-red-600 hover:opacity-70 text-white w-full py-2.5 rounded text-sm shadow-sm hover:shadow-md detail font-normal text-center inline-block mb-3"
        >
          <span class="inline-block mr-2 text-2xs md:text-base">Log In</span>
        </button>

        <!-- 회원가입 링크 -->
        <p class="detail font-normal flex items-center text-2xs md:text-base mb-4">
          Not registered?
          <nuxt-link to="/register" class="text-red-600 hover:underline ml-1">
            Register
          </nuxt-link>
        </p>
      </div>
    </div>

  </div>
</template>
  
<script setup>
import { useAuthStore } from '@/composables/useAuthStore';

const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const submitLogin = async () => {
  try {
    const response = await $fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
      credentials: 'include'
    });
    authStore.access_token = response.access_token;
    authStore.refresh_token = response.refresh_token;
    navigateTo("/");
  } catch (error) {
    console.error(error);
  }
};


onMounted(async () => {
  if (authStore.user !== null) navigateTo("/");
})
</script>

<style scoped>

.detail {
  font-family: 'Detail', sans-serif;
}
</style>
