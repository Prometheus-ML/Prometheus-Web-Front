<template>
  <div class="container mx-auto pt-16">
    <!-- Project Header -->
    <div class="bg-gray-100 rounded-lg flex flex-col md:flex-row items-center text-center mb-8 px-8 py-4">
      <!-- Left 2/3 -->
      <div class="w-full md:w-2/3 text-left md:order-1">
        <!-- Generation and Tags -->
        <div class="flex items-center mb-2 p-2">
          <div class="bg-rose-500 rounded-full text-white text-lg py-1 px-5 font-bold mr-5">{{ project?.gen }}기</div>
          <div v-for="(value, index) in project.tag" :key="index" class="mr-2 mt-3 px-1 bg-gray-300">
            {{ value.name }}
          </div>
        </div>
        <!-- Project Title -->
        <h1 class="text-4xl font-bold mb-4 pr-10">{{ project?.title }}</h1>
        <!-- Project Description -->
        <div class="flex items-center mb-4">
          <p class="font-medium text-lg pr-10">개요</p>
          <p class="text-lg text-gray-600 mb-6 pr-10">{{ project?.description }}</p>
        </div>
        
        <!-- Project Members -->
        <div class="flex items-center mb-4">
          <p class="font-medium text-lg pr-10">참여 멤버</p>
          <p class="text-base pt-1 text-gray-600">{{ project?.member }}</p>
        </div>

        <!-- External Links -->
        <div class="flex items-center mb-4">
          <p class="font-medium text-lg pr-10">외부 링크</p>
          <div class="flex pt-1 items-center">
            <a v-if="project?.homepage" :href="project.homepage" class="mr-4">
              <font-awesome-icon :icon="['fas', 'globe']" />
            </a>
            <a v-if="project?.github" :href="project.github" class="mr-4">
              <font-awesome-icon icon="fa-brands fa-github" />
            </a>
            <a v-if="project?.playstore" :href="project.playstore" class="mr-4">
              <font-awesome-icon :icon="['fab', 'google-play']" />
            </a>
            <a v-if="project?.appstore" :href="project.appstore" class="mr-4">
              <font-awesome-icon :icon="['fab', 'apple']" />
            </a>
          </div>
        </div>
      </div>
      <!-- Right 1/3 -->
      <div class="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4 md:order-2">
        <div class="pb-[60%] relative border" :style="{ backgroundImage: 'url(' + useImage(project?.thumb, type) + ')', backgroundSize: 'cover', backgroundPosition: 'center' }"></div>
      </div>
    </div>

    <div class="mx-auto mb-5 viewer-container bg-white rounded p-4">
      <div id="viewer" class="rounded"></div>
    </div>


    <!-- Action Buttons -->
    <div v-if="user" class="flex justify-end gap-x-2 mb-5">
      <nuxt-link :to="'/project'" class="bg-white py-2 px-4 border rounded inline-block">
          글목록
      </nuxt-link>
      <button @click="deleteProject" v-if="user?.id == project?.writer?.id || user?.grant == 'admin'" class="bg-white py-2 px-4 border rounded inline-block">
          삭제
      </button>
      <nuxt-link :to="'/project/edit/'+project.id" v-if="user?.id == project?.writer?.id" class="bg-white py-2 px-4 border rounded inline-block">
          수정
      </nuxt-link>
    </div>
  </div>
</template>


    <!-- <div id="controls-carousel" class="relative mb-9" data-carousel="static">
      <div class="relative h-56 overflow-hidden rounded md:h-96">
        <div class="duration-700 ease-in-out absolute inset-0 transition-all transform -translate-x-full z-10" data-carousel-item="">
          <img :src="project.img_slide[0]" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
        <div class="duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-0 z-20" data-carousel-item="active">
          <img :src="project.img_slide[0]" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
        <div class="duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-full z-10" data-carousel-item="">
          <img :src="project.img_slide[0]" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
        <div class="hidden duration-700 ease-in-out absolute inset-0 transition-all transform" data-carousel-item="">
          <img :src="project.img_slide[0]" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
        <div class="hidden duration-700 ease-in-out absolute inset-0 transition-all transform" data-carousel-item="">
          <img :src="project.img_slide[0]" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
      </div>
      <button type="button" class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev="">
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg aria-hidden="true" class="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>
      <button type="button" class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next="">
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg aria-hidden="true" class="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div> -->



    <!-- <ul class="flex mt-5">
      <li v-for="tag in project.tag" :key="tag" class="bg-red-100 text-red-900 text-sm px-3 py-1  mr-2">{{ tag }}</li>
    </ul> -->
  <!-- </div> -->



<script setup>
import _ from "lodash"
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore)
const type = "thumbs"

const viewer = ref();

const project = ref([])

const getProject = async () => {
  await $fetch(`${import.meta.env.VITE_API_URL}/project/${useRoute().params.id}`, {
    method: 'GET',
  })
  .then((result) => {
    project.value = result;
  })
  .catch((error) => {
		navigateTo('/project');
  })
}

const editProject = () => {
  project.value.tags = []

  $fetch(`${import.meta.env.VITE_API_URL}/project/update/${useRoute().params.id}`, {
    method: 'PUT',
    body: project.value,
    credentials: 'include',
  })
  .then((result) => {
    useRouter().push({ path: `/project/view/${useRoute().params.id}` })
  })
  .catch((result) => {
  })
}

async function deleteProject() {
  try {
    const result = await $api(`/project/delete/${useRoute().params.id}`, {
      method: 'delete'
    })

    useRouter().push({ path: '/project' })
  } catch (error) {
  }
}
	
const formatDate = (date) => {
  return new Date(date).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
	
onMounted(async () => {
  await getProject();
	viewer.value = await useViewer(project.value.content);
})

</script>

<style>
.viewer-container img {
  max-width: 100%; /* 이미지의 최대 너비를 컨테이너에 맞게 조절합니다. */
  height: auto; /* 이미지 비율을 유지하면서 높이를 자동으로 조절합니다. */
	margin: auto; /* 이미지를 가로로 중앙에 배치 */
}
</style>