<template>
  <div class="container mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">프로필 설정</p>
      <p class="font-medium text-gray-600 text-xl text-gray-600">프로필을 업데이트합니다</p>
    </div>
    <div>
      
    </div>
    <div class="flex justify-end">
      <nuxt-link :to="'/blog/new'" v-if="user" class="bg-white py-2 px-4 border rounded inline-block">
          업데이트
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore)
</script>

