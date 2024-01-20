<template>
  <div class="container mx-auto pt-40 pb-24">
    <p class="font-bold text-5xl mb-14">게시글 편집</p>
    <Editor :post="post" :editMode="true"/>
  </div>
</template>

<script setup>
const {data: post, error: postErr} = await useApi(`/post/${useRoute().params.id}`, {
  method: 'GET',
})

</script>
