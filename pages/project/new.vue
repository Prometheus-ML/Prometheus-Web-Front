<template>
  <div class="container mx-auto pt-40 pb-24">
    <p class="font-bold text-5xl mb-14">프로젝트 등록</p>
    <Editer :project="project"/>
  </div>
</template>

<script setup>
const project = ref({
  tag: []
})
</script>