<template>
  <div class="container mx-auto pt-40 pb-24">
    <p class="font-bold text-5xl mb-14">프로젝트 편집</p>
    <Editer :project="project" :editMode="true"/>
  </div>
</template>

<script setup>
const {data: project, error: postErr} = await useApi(`/project/${useRoute().params.id}`, {
  method: 'GET',
})

</script>
