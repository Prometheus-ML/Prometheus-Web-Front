<template>
  <div class="container min-h-screen mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">관리자 페이지</p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="link in links"
        :key="link.path"
        class="relative bg-white text-black p-4 rounded shadow flex flex-col items-center justify-center cursor-pointer hover:opacity-70 hover:scale-105 hover:-translate-y-2 duration-300"
        @click="navigateTo(link.path)"
        >
        <p class="text-black">{{ link.label }}</p>
        <h1 class="text-5xl"> {{ link.icon }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/composables/useAuthStore';

const authStore = useAuthStore();
const { user } = authStore;

const links = [
  { icon: '😊', label: '유저 관리', path: '/admin/userlist' },
  { icon: '😎', label: '멤버 관리', path: '/admin/memberlist' },
  { icon: '🗓️', label: '출결 관리', path: '/admin/attendqrcode' },
  { icon: '💻', label: '프로젝트 관리', path: '/admin/registertoken' },
  { icon: '📰', label: '블로그 관리', path: '/admin/registertoken' },
  { icon: '⚙️', label: '설정', path: '/admin/registertoken' },
];


onMounted(async () => {
	// await authStore.verifyUser();
  // if(!authStore.user || authStore.user.grant !== 'admin') {
  //   console.log("!");
  //   navigateTo('/');
  // }

})
</script>

