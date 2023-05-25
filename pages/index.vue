<template>
  <div class="container mx-auto pt-60">
    <p class="font-bold text-center text-4xl md:text-7xl mb-14">PROMETHEUS</p>
    <p class="font-bold text-center text-4xl md:text-3xl mb-40 text-gray-600">프로메테우스는 인공지능으로 가치 있는 도전과 경험을 하고자 <br> <span class="text-red-700">UP</span>에 대한 열정을 지닌 대학생들이 모인 인공지능 동아리입니다.</p>
  </div>
  <img src="@/assets/images/main.svg" alt="" class="w-full">

  <div class="py-16 md:py-32">
    <div class="container mx-auto">
      <p class="font-medium text-xl text-red-700 uppercase mb-2.5">WE ARE</p>
      <p class="font-bold !leading-snug text-4xl md:text-5xl mb-20">협업과 도전으로<br>이루어지는 활동들</p>

      <div class="grid grid-cols-3 gap-x-3">
        <div v-for="(section, index) in intro">
          <div class="rounded-lg relative h-[500px] bg-center bg-cover" :style="{backgroundImage : `url(${section.img})`}">
            <div class="rounded-lg absolute w-full h-full z-0 backdrop-grayscale bg-black/60 p-10 text-white flex flex-col justify-end">
              <p class="whitespace-pre font-bold text-4xl mb-5">{{ section.title }}</p>
              <p class="text-xl">{{ section.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div class="py-16 md:py-32 bg-gray-50">
    <div class="container mx-auto">
      <div class="mb-14 md:mb-20 text-center">
        <p class="font-medium text-xl text-red-700 uppercase mb-2.5">프로젝트</p>
        <p class="font-bold !leading-snug text-4xl md:text-5xl">멤버들의 활동을 확인해보세요</p>
      </div>
    </div>
    <carousel ref="projectCarousel" :items-to-show="2.7" :wrapAround="true" class="mb-20">
      <slide v-for="project in recentProjects" :key="project">
        <div class="w-full mx-5 text-left mb-8">
          <div class="w-full rounded-lg bg-center bg-cover pb-[50%] mb-5 " :style="{ backgroundImage: 'url(' + useImage(project?.thumb) + ')' }"></div>
          <p class="font-bold text-xl mb-2">{{ project?.title }}</p>
          <p>{{ project?.description }}</p>
        </div>
      </slide>

      <template #addons>
        <div class="flex justify-center items-center gap-3">
          <button @click="projectCarouselPrev"><font-awesome-icon @click="" class="cursor-pointer" icon="fa-solid fa-angle-left" /></button>
          <pagination />
          <button @click="projectCarouselNext"><font-awesome-icon class="cursor-pointer" icon="fa-solid fa-angle-right" /></button>
        </div>
      </template>

    </carousel>

    <nuxt-link to="/project" class="block text-center font-medium text-lg text-red-700">
      더 알아보기
      <font-awesome-icon icon="fa-solid fa-angle-right" />
    </nuxt-link>
  </div>

  <div class="py-16 md:py-32">
    <div class="container mx-auto">
      <div class="mb-14 md:mb-20 text-center">
        <p class="font-medium text-red-700 uppercase mb-2.5">블로그</p>
        <p class="font-bold !leading-snug text-4xl md:text-5xl mb-20">멤버들이 말하는 프로메테우스</p>
      </div>
      <div class="grid auto-cols-fr grid-cols-3 gap-5 mb-20">
        <nuxt-link :to="`/blog/view/${post.id}`" v-for="post in recentPosts" :key="post.id">
          <div 
            class="rounded-lg pb-[55%] bg-cover bg-center bg-no-repeat mb-5"
            :style="{ backgroundImage: 'url(' + useImage(post?.thumb) + ')' }"></div>
          <p class="font-bold text-xl mb-2">{{ post?.title }}</p>
          <p>{{ post?.writer?.name }}</p>
        </nuxt-link>
      </div>

      <nuxt-link to="/blog" class="block text-center font-medium text-lg text-red-700">
        더 알아보기
        <font-awesome-icon icon="fa-solid fa-angle-right" />
      </nuxt-link>
    </div>
  </div>

  <div class="bg-gray-50 py-16 md:py-28">
    <div class="container  mx-auto">
      <div class="mb-14 md:mb-20 text-center">
        <p class="font-medium text-red-700 uppercase mb-2.5">SPONSOR</p>
        <p class="font-bold text-4xl md:text-5xl mb-5">후원사</p>
        <p class="font-medium text-xl text-gray-600 mb-5">프로메테우스는 다음과 같은 후원사의 도움을 받습니다</p>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-12 justify-items-center items-center px-8">
        <img class="w-48" src="@/assets/images/sponsor/commoncomputer.png" />
        <img class="w-48" src="@/assets/images/sponsor/neuralworkslab.png" />
        <img class="w-48" src="@/assets/images/sponsor/aifactory.png" />
        <img class="w-48" src="@/assets/images/sponsor/kingsleyventures.png" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from "@/store";

import studyImage from "@/assets/images/study.jpeg"
import hackathonImage from "@/assets/images/hackathon.jpg"
import tutoringImage from "@/assets/images/tutoring.jpg"

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const intro = [
  {
    summary: "project",
    img: studyImage,
    title: "팀별 스터디와\n프로젝트",
    desc: "팀별 스터디에 대한 문구"
  },
  {
    summary: "hackathon",
    img: hackathonImage,
    title: "해커톤",
    desc: "해커톤에 대한 문구"
  },
  {
    summary: "tutoring",
    img: tutoringImage,
    title: "외부 튜터링",
    desc: "튜터링에 대한 문구"
  }
]

const projectCarousel = ref(null)
const recentPosts = ref(null)
const recentProjects = ref([
  {
    thumb: "",
    title: "프로젝트1",
    description: "프로젝트 설명"
  },
  {
    thumb: "",
    title: "프로젝트2",
    description: "프로젝트 설명"
  },
  {
    thumb: "",
    title: "프로젝트3",
    description: "프로젝트 설명"
  }
])

function getRecentPosts() {
  $fetch(`${import.meta.env.VITE_API_URL}/post`, {
    method: "GET",
    headers: {
      Authorization: useAuth().$state.accessToken,
    },
  })
    .then((result) => {
      recentPosts.value = result.slice(0, 3);
    })
    .catch((result) => {});
}

function projectCarouselPrev() {
  projectCarousel.value.prev()
}

function projectCarouselNext() {
  projectCarousel.value.next()
}

onMounted(()=>{
  getRecentPosts();
})

</script>

<style>
.carousel__pagination {
  margin: 0;
}
</style>