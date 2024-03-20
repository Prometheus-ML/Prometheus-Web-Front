<template>
  <div class="custom mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">프로젝트</p>
      <p class="font-medium text-gray-600 text-xl text-gray-600">멤버들의 활동을 확인해보세요</p>
    </div>
    <div class="flex justify-center items-center p-6 text-2xl">
      <div class="flex flex-wrap md:gap-5 text-base md:text-xl justify-center">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{
            'font-bold': activeTab === tab.key,
            'text-gray-500 hover:text-gray-800': activeTab !== tab.key,
            'border-b-2 border-black': activeTab === tab.key,
          }"
          @click="setActiveTab(tab.key)"
          class="mr-5 cursor-pointer flex items-center"
        >
          <span class="mx-auto">{{ tab.name }}</span>
        </div>
      </div>
    </div>
    <div class="grid auto-rows-fr grid-cols-1 md:grid-cols-2 mx-4 lg:grid-cols-3 items-start gap-6 mb-5 ">
      <div v-for="project in filteredProjects" 
        :style="{ backgroundImage: 'url(' + useImage(project?.thumb, type) + ')', backgroundSize: 'cover', backgroundPosition: 'center' }" 
        :key="project.id" 
        @mouseenter="project.hover = true"
        @mouseleave="project.hover = false"
        class="relative bg-rose-100 bg-white w-full h-48 hover:bg-opacity-80 "
      >
        <font-awesome-icon v-if="user" @click="deleteProject(project)" class="absolute top-0 right-0 cursor-pointer z-50 mr-1 hover:opacity-70 py-1 px-2 text-rose-600" icon="fa-solid fa-xmark"/>
        <div v-if="project.hover" class="relative inset-0 p-1 h-full backdrop-blur-sm bg-black/30">
          <div class="flex flex-row mr-10 pt-2 pb-2 ml-2 mb-1">
            <p v-if="project.gen !== 3" class="font-bold text-sm rounded-lg px-2 pb-1 bg-rose-500 text-white mt-auto mr-2">{{ project?.gen }}기</p>
            <h2 class="font-bold text-xl">{{ project?.title }}</h2>
          </div>
          <div class="flex flex-wrap mr-8 px-1 flex items-center text-xs font-light text-white">
            <p class="ml-1 mr-2 mb-2 text-sm font-neutral-100 font-semibold break-all">{{ project?.description }}</p>
            <span v-for="(tag, index) in project?.tag" class="ml-1 mr-2" :key="index">
              #{{ tag.name }}
            </span>
          </div>
          <div class="absolute top-2 right-0 flex flex-col">
            <a v-if="project.github" class="mx-3 text-2xl hover:scale-110 hover:-translate-y-1 hover:opacity-60" :href="project?.github" target="_blank">
              <font-awesome-icon icon="fa-brands fa-github" />
            </a>
            <a v-if="project.homepage" class="mx-3 text-xl hover:scale-110 hover:-translate-y-1 hover:opacity-60" :href="project?.homepage" target="_blank">
              <font-awesome-icon icon="fa-solid fa-house" />
            </a>
          </div>
          <div class="absolute bottom-2 flex flex-col">
            <div class="mb-2 flex flex-wrap items-center font-medium member-font text-gray-500">
              <div v-for="(member, index) in project?.member.split(' ')" class="mr-1" :key="index">
                <span v-if="index === 0" class="ml-1 px-1 pb-0.5 font-semibold rounded-lg bg-rose-600 text-white">{{ member }}</span>
                <span v-else class="px-1 pb-0.5 rounded-lg  bg-neutral-500 text-white" >{{ member }}</span>
                <span v-if="index !== project?.member.split(' ').length - 1"> </span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>

    <div class="relative flex justify-end">
      <nuxt-link :to="'/project/new'" v-if="user" class="bg-white py-2 px-4 border rounded inline-block">
        글쓰기
      </nuxt-link>
    </div>

    <!-- Project Popup
    <div v-if="OpenedProjectIndex != -1" class="fixed inset-0 h-[70%] flex items-center justify-center bg-black bg-opacity-70">
      <div class="relative">
        <button @click="closeProjectPopup" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <ProjectView :id="OpenedProjectIndex"></ProjectView>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from "pinia";

const tabs = [
  { key: 4, name: '4기'},
  { key: 3, name: '이전기수'}
];

const activeTab = ref(4);

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const type = 'thumbs';
const projectList = ref([]);

const setActiveTab = (tab) => {
	activeTab.value = activeTab.value === tab? null : tab;
};

const getProjects = async () => {
  try {
    const response = await $fetch(`${import.meta.env.VITE_API_URL}/project/get_projects`, {
      method: 'GET',
    });
    response.filter(projects => projects.gen === 4);
    projectList.value = response;
  } catch (error) {
    console.error(error)
  }
};

async function removeImage(project) {
	try {
		const response = await $api(`${import.meta.env.VITE_API_URL}/image/delete/${type}/${project.thumb}`, {
      method: 'DELETE',
    });
		await getProjects();
	}	catch (error) {
		console.error(error)
	}
}

const deleteProject = async (project) => {
  try {
		await removeImage(project);
    const response_2 = await $api(`${import.meta.env.VITE_API_URL}/project/delete/${project.id}`, {
      method: 'DELETE',
    });
    await getProjects();
  } catch (error) {
    console.error(error);
  }
};

const filteredProjects = computed(() => {
  return projectList.value.filter((project) => project.gen == activeTab.value);
});

onMounted(async() => {
  await getProjects();
})

</script>

<style scoped>
.custom {
  max-width: 960px;
}

.member-font {
  font-size: 0.68rem; 
  line-height: 0.9rem;
}
</style>
