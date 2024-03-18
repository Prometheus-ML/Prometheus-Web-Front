<template>
  <div class="bg-neutral-800 text-white rounded-lg w-full custom mx-auto">
    <!-- Title -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-2">

      </div>
    </div>
    <!-- Thumbnail and Description -->
    <div class="grid grid-cols-4 items-start space-x-4 mb-4">
      <div class="row-span-4 w-64 h-32 overflow-hidden flex-shrink-0 px-2">
        <img :src="useImage(project?.thumb, type)" alt="Thumbnail" class=" rounded-lg  w-full h-full object-cover">
      </div>
      <div class="flex flex-row col-span-3">
        <p class="font-bold text-sm rounded px-2 pb-1 bg-rose-700 text-white mt-auto mr-2">{{ project?.gen }}기</p>
        <h2 class="font-bold text-xl">{{ project?.title }}</h2>
        <a class="mx-3 text-xl hover:scale-110 hover:-translate-y-1 hover:opacity-60" :href="project?.github" target="_blank">
          <font-awesome-icon icon="fa-brands fa-github" />
        </a>
      </div>
      <div class="col-span-3  font-light text-sm text-neutral-300 mb-3">
        <p class="ml-1">: {{ project?.description }}</p>
      </div>
      <div class="col-span-3 mt-auto mb-2 flex items-center text-sm text-gray-500">
        <span v-for="(member, index) in project?.tag" class="mx-1" :key="index">
          # {{ member.name }}
        </span>
      </div>
      <div class="col-span-3 mt-auto mb-2 flex items-center text-sm text-gray-500">
        <span v-for="(member, index) in project?.member.split(' ')" class="mx-1" :key="index">
          <span v-if="index === 0" class="px-2 py-1 font-semibold rounded-lg bg-rose-600 text-white">{{ member }}</span>
          <span v-else class="px-2 py-1 font-medium rounded-lg bg-neutral-500 text-white" >{{ member }}</span>
          <span v-if="index !== project?.member.split(' ').length - 1"> </span>
        </span>
      </div>
    </div>
    <!-- Content and GitHub -->
    <div class="flex justify-between items-start">
      <div class="flex-grow">
        <!-- Content -->
        <div class="mx-2 py-1 h-full h-24 mb-2" id="viewer"></div>
        <!-- GitHub -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from "pinia";

import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor/dist/toastui-editor.css'

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const props = defineProps({
  id: Number,
})

const type = 'thumbs';

const viewer = ref()
const project = ref()
const projectErr = ref()

const getProject = async () => {
  try {
    const response = await $fetch(`${import.meta.env.VITE_API_URL}/project/${props?.id}`, {
      method: 'GET',
    })
    project.value = response;
  } catch (error){
    if(error.status == 400) projectErr.value="글이 존재하지 않습니다."
    else projectErr.value="권한이 없습니다."
  }
}

onMounted(async () => {
	try {
    await getProject();
    viewer.value = await useViewer(project?.value.content)
  } catch (error) {
    console.log(error)
  }
})
</script>

<style scoped>
.custom {
  max-width: 960px;
}
</style>
