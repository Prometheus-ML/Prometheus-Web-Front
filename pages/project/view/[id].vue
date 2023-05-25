<template>
  <div class="container mx-auto pt-48">
    <div>
      <p class="font-bold text-5xl mb-9">{{project.name}}</p>
      <p class="text-end">{{project.description}}</p>
    </div>
  </div>
  <div class="container mx-auto py-24">
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

    <div class="mb-9">
      <p class="font-medium text-2xl mb-3">프로젝트 소개</p>
      <p> {{ project.detail }}</p>
    </div>
    <div class="mb-9">
      <p class="font-medium text-2xl mb-3">참여 멤버</p>
      <p> {{ project.member }}</p>
    </div>
    <!-- <div class="mb-9">
      <p class="font-medium text-2xl mb-3">외부 링크</p>
      <div class="mt-3">
        <a v-if="project.homepage" class="mr-4 text-2xl" href="#"><font-awesome-icon icon="fa-solid fa-globe" /></a>
        <a v-if="project.github" class="mr-4 text-2xl" href="#"><font-awesome-icon icon="fa-brands fa-github" /></a>
        <a v-if="project.playstore" class="mr-4 text-2xl" href="#"><font-awesome-icon icon="fa-brands fa-google-play" /></a>
        <a v-if="project.appstore" class="mr-4 text-2xl" href="#"><font-awesome-icon icon="fa-brands fa-app-store" /></a>
      </div>
    </div> -->
    <!-- <ul class="flex mt-5">
      <li v-for="tag in project.tag" :key="tag" class="bg-red-100 text-red-900 text-sm px-3 py-1  mr-2">{{ tag }}</li>
    </ul> -->
  </div>
</template>

<script>
import { useAuth } from "@/store"

export default {
  name: 'ProjectView',
  components: {}, 
  data: () => ({
    project: {},
  }),
  methods: {
    getProject() {
      $fetch(`${import.meta.env.VITE_API_URL}/project/${useRoute().params.id}`, {
        method: 'GET',
        headers: {
          Authorization: useAuth().$state.accessToken
        }
      })
      .then((result) => {
        this.project = result
      })
      .catch((result) => {
      })
    },
    editProject() {
      this.project.tags = []

      $fetch(`${import.meta.env.VITE_API_URL}/project/update`, {
        method: 'PUT',
        body: this.project,
        headers: {
          Authorization: useAuth().$state.accessToken
        }
      })
      .then((result) => {
        useRouter().push({ path: `/project/view/${useRoute().params.id}` })
      })
      .catch((result) => {
      })
    },
  },
  mounted(){
    this.getProject()
  }
} 
</script>
