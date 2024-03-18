<template>
  <div class="custom mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">프로젝트</p>
      <p class="font-medium text-gray-600 text-xl text-gray-600">멤버들의 활동을 확인해보세요</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 items-start gap-6 mb-5">
      <div v-for="project in projectList" :key="project.id" @click="openProjectPopup(project.id)" class="cursor-pointer hover:opacity-60 p-5 pb-2 bg-neutral-800 border border-neutral-800 shadow-lg shadow-white/20 rounded-2xl">
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
    <div v-if="OpenedProjectIndex != -1" class="fixed inset-0 h-[70%] flex items-center justify-center bg-black bg-opacity-70">
      <div class="relative">
        <button @click="closeProjectPopup" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <ProjectView :id="OpenedProjectIndex"></ProjectView>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from "pinia";



const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const type = 'thumbs';
const viewer = ref()
const projectList = ref([]);

const OpenedProjectIndex = ref(-1);

const openProjectPopup = (id) => {
  OpenedProjectIndex.value = id;
};

const closeProjectPopup = () => {
  OpenedProjectIndex.value = -1;
};

const getProjects = async () => {
  try {
    const response = await $api(`${import.meta.env.VITE_API_URL}/project/get_projects`, {
      method: 'GET',
    });
    response.filter(projects => projects.gen === 4);
    projectList.value = response;
  } catch (error) {
    console.error(error)
  }
};

onMounted(async() => {
  await getProjects();
})

</script>

<style scoped>
.custom {
  max-width: 960px;
}
</style>
