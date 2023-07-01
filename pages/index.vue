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
    desc: "프로메테우스는 매 분기별, 인공지능의 다양한 분야를 주제로 팀별 프로젝트를 진행하고 있습니다."
  },
  {
    summary: "hackathon",
    img: hackathonImage,
    title: "해커톤",
    desc: "프로메테우스는 대학생 최고의 인공지능 단체가 되기를 꿈꾸고 있습니다. 이에 프로메테우스는 동아리 내부 부원뿐 아니라 외부 대학생들이 참여하는 해커톤을 열어 대학사회에서 인정받는 해커톤으로 자리잡고자 합니다."
  },
  {
    summary: "tutoring",
    img: tutoringImage,
    title: "외부 튜터링",
    desc: "프로메테우스는 청소년들에게도 좋은 영향력을 주고 싶습니다. 고등학생들에게 프로그래밍, 인공지능이라는 좋은 도구를 가르쳐 학생들이 꿈꾸는 무언가에 도전하게 하고 싶습니다."
  }
]

const projectCarousel = ref(null)
const recentPosts = ref(null)
const recentProjects = ref([
  {
    thumb: "",
    title: "기초 스터디 팀",
    description: "인공지능을 잘 모르는 부원에게 양질의 자료를 제공하고, 후에 프로젝트를 진행 및 주도할 수 있도록 기반을 다지는 스터디 팀입니다."
  },
  {
    thumb: "",
    title: "데이콘 코드 리뷰 및 논문 분석 팀",
    description: "DACON 대회에서 쓰인 코드를 리뷰하고 관련 논문을 분석하면서 최신 기법들에 익숙해지거 다양한 접근 방법들을 공부한 후 DACON 참가를 목표로 하는 팀입니다."
  },
  {
    thumb: "",
    title: "인공지능 자율주행차 프로젝트 팀",
    description: "CV강의, 논문을 통해 스터디를 진행하고 인공지능 자율주행 자동차 학습 교재를 통해 프로젝트를 구현하고 개선하는 것을 목표로 하는 팀입니다."
  },
  {
    thumb: "",
    title: "화풍을 바꿔주는 모델 제작 팀",
    description: "CNN과 GAN에 대한 이해를 바탕으로 특정 물체 혹은 배경에 대해서만 화풍을 바꿔주는 모델을 개발하는 것을 목표로 하는 팀입니다"
  },
  {
    thumb: "",
    title: " 금융시계열 모델 제작 팀",
    description: "시계열 분석에 더해 CV, 크롤링, NLP 등의 추가적인 요소들을 추가하는 등 다양한 방식을 활용하여 주식/코인의 가격을 예측하는 모델을 제작하는 것을 목표로 하는 팀입니다."
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