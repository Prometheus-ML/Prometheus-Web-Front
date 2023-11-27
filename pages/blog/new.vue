<template>
  <div class="container mx-auto pt-40 pb-24">
    <p class="font-bold text-5xl mb-14">게시글 등록</p>
    <Editor :post="post"/>
  </div>
</template>

<script setup>
const post = ref({
  tag: []
})
</script>