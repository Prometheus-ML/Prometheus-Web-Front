<template>
  <div class="container mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">관리자 페이지</p>
      <p class="font-medium text-gray-600 text-xl text-gray-600">임시용</p>
    </div>
    <div>
      
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore)
</script>

