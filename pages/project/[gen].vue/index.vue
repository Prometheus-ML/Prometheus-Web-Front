<template>
  <div class="custom mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">프로젝트</p>
      <p class="font-medium text-gray-600 text-xl text-gray-600">멤버들의 활동을 확인해보세요</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 items-start gap-6 mb-5">
      <div v-for="(project, index) in projectList" :key="project.id" @click="openProjectPopup(project, index)" class="cursor-pointer p-5 pb-2 bg-neutral-800 border border-neutral-800 shadow-lg shadow-white/20 rounded-2xl">
        <div class="mb-5 overflow-hidden">
          <div class="rounded-md pb-[60%] p-5" :style="{ backgroundImage: 'url(' + useImage(project?.thumb, type) + ')', backgroundSize: 'cover', backgroundPosition: 'center' }"></div>
          <div class="h-8 my-4">
            <p class="font-light text-xs md:text-sm mb-2 line-clamp-1 text-neutral-200">{{ project.title }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="relative flex justify-end">
      <nuxt-link :to="'/project/new'" v-if="user" class="bg-white py-2 px-4 border rounded inline-block">
        글쓰기
      </nuxt-link>
    </div>

    <!-- Project Popup -->
    <div v-if="OpenedProjectIndex != -1" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-neutral-800 rounded-lg custom mx-auto">
        <div class="flex justify-between">
          <h2 class="font-bold text-xl">{{ selectedProject.title }}</h2>
          <button @click="closeProjectPopup" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <p class="text-sm text-gray-500 mb-4">{{ selectedProject.description }}</p>
        <div class="flex items-center">
          <div class="rounded-md pb-[60%] p-5" :style="{ backgroundImage: 'url(' + useImage(selectedProject?.thumb, type) + ')', backgroundSize: 'cover', backgroundPosition: 'center' }"></div>
          <span class="text-sm text-gray-500">{{ selectedProject.member }} participants</span>
        </div>
        <a :href="selectedProject.github" target="_blank" class="text-blue-500 hover:underline">GitHub Page</a>
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

const type = 'thumbs';

const projectList = ref([]);

const OpenedProjectIndex = ref(-1);
const selectedProject = ref(null);

const openProjectPopup = (project, index) => {
  selectedProject.value = project;
  OpenedProjectIndex.value = index;
};

const closeProjectPopup = () => {
  selectedProject.value = null;
  OpenedProjectIndex.value = -1;
};

const getProjects = async () => {
  try {
    const response = await $api(`${import.meta.env.VITE_API_URL}/project/get_projects`, {
      method: 'GET',
    });

    response.filter(project => project.gen === useRoute().params.gen);

    projectList.value = response;
  } catch (error) {
    console.error(error)
  }
};

onMounted(async() => {
  getProjects();
});
</script>

<style scoped>
.custom {
  max-width: 960px;
}
</style>
