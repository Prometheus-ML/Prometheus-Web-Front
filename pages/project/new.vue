<template>
  <div class="container mx-auto pt-40 pb-24">
    <p class="font-bold text-5xl mb-14">프로젝트 등록</p>
    <Editor :project="project"/>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

	
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const project = ref({
  tag: []
})
</script>