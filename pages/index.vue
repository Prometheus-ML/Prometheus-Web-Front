<template>
	<div class="relative h-screen w-screen mb-10 lg:mb-20">
		<img src="@/assets/images/main.jpeg" alt="" class="object-cover w-full h-full grayscale">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
			<p class="font-bold text-center text-4xl md:text-7xl mb-5 md:mb-14 text-white">PROMETHEUS</p>
			
		</div>
		<div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer" @click="scrollDown">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" class="w-6 h-6 animate-bounce">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
		</div>
	</div>

  <div class="container mx-auto pt-16 lg:pt-32">
    <p class="font-bold text-center text-base md:text-2xl mb-20 md:mb-40 text-gray-600">프로메테우스는 인공지능으로 가치 있는 도전과 경험을 하고자 <br> <span class="text-red-700">UP</span>에 대한 열정을 지닌 대학생들이 모인 인공지능 동아리입니다.</p>
  </div>
  <img src="@/assets/images/main.svg" alt="" class="w-full">

  <div class="py-8 sm:py-16 md:py-32">
    <div class="container mx-auto">
      <p class="font-medium text-lg md:text-2xl text-red-700 uppercase mb-2.5">WE ARE</p>
      <p class="font-bold leading-snug sm:text-xl md:text-4xl mb-10 md:text-5xl">협업과 도전으로<br>이루어지는 활동들</p>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div v-for="(section, index) in intro" :key="index">
          <div class="rounded-lg relative h-[200px] lg:h-[500px] bg-center bg-cover" 
							 :style="{ backgroundImage : `url(${section.img})`}" 
							 @mouseenter="section.hover = true"
							 @mouseleave="section.hover = false">
            <div class="rounded-lg absolute w-full h-full z-0 backdrop-grayscale bg-black/60 p-5 sm:p-10 text-white flex flex-col" :class="{ 'backdrop-blur': section.hover }">
              <p class="text-left lg:text-center whitespace-pre font-bold text-lg lg:text-2xl mb-12 lg:mb-20" id="section"
								 :style="{
										transform: section.hover ? 'scale(1.25)' : 'none',
										width: section.hover ? '20px' : '100%',
										transition: 'width 0.5s ease, transform 0.6s ease'
									}"
							>{{ section.title }}</p>
              <p :style="{
										opacity: section.hover ? 1 : 0,
										pointerEvents: section.hover ? 'auto' : 'none',
										transition: 'opacity 0.5s ease, transform 0.5s ease',
										transform: section.hover ? 'translateY(-1.5rem)' : 'none'
									}"
								 class="whitespace-normal text-center text-sm lg:text-lg">{{ section.desc }}</p>
            </div>
          </div>
        </div>
      </div>
			
    </div>
  </div>

  <div class="py-8 sm:py-16 md:py-32 bg-gray-50">
    <div class="container mx-auto">
      <div class="mb-10 md:mb-20 text-center">
        <p class="font-medium text-lg sm:text-xl md:text-2xl text-red-700 uppercase mb-2.5">프로젝트</p>
        <p class="font-bold leading-snug text-4xl md:text-5xl">멤버들의 활동을 확인해보세요</p>
      </div>
    </div>
    <carousel ref="projectCarousel" :items-to-show="3" :wrap-around="true" class="mb-10 sm:mb-20 mx-3" :autoplay="3000">
      <slide v-for="project in recentProjects" :key="project.id">
        <div class="w-full mx-2 sm:mx-5 text-left mb-6 sm:mb-8">
          <div class="drop-shadow-md w-full rounded-lg bg-center bg-cover pb-[60%] sm:pb-[50%] mb-4 sm:mb-5" :style="{ backgroundImage: 'url(' + useImage(project?.thumb) + ')', backgroundSize: 'cover', backgroundPosition: 'center' }"></div>
          <p class="font-bold md:text-lg sm:text-xl mb-2">{{ project?.title }}</p>
          <p class="text-base">{{ project?.description }}</p>
        </div>
      </slide>

      <template #addons>
        <div class="flex justify-center items-center gap-3">
          <button @click="projectCarouselPrev"><font-awesome-icon class="cursor-pointer" icon="fa-solid fa-angle-left" /></button>
          <pagination />
          <button @click="projectCarouselNext"><font-awesome-icon class="cursor-pointer" icon="fa-solid fa-angle-right" /></button>
        </div>
      </template>
    </carousel>

    <nuxt-link to="/project" class="block text-center font-medium text-lg text-red-700 hover:-translate-y-0.5 hover:scale-105 duration-200">
      더 알아보기
      <font-awesome-icon icon="fa-solid fa-angle-right" />
    </nuxt-link>
  </div>

  <div class="py-8 py-16 md:py-32">
    <div class="container mx-auto">
      <div class="mb-10 md:mb-20 text-center">
        <p class="font-medium text-lg md:text-xl text-red-700 uppercase mb-2.5">블로그</p>
        <p class="font-bold leading-snug text-3xl md:text-5xl mb-10">멤버들이 말하는 프로메테우스</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-5 mb-10 md:mb-20">
        <nuxt-link :to="`/blog/view/${post.id}`" v-for="post in recentPosts" :key="post.id">
          <div class="drop-shadow-md rounded-lg pb-[55%] bg-cover bg-center bg-no-repeat mb-2 sm:mb-5" :style="{ backgroundImage: 'url(' + useImage(post?.thumb) + ')', backgroundSize: 'cover', backgroundPosition: 'center' }"></div>
          <p class="font-bold text-lg md:text-xl mb-1">{{ post?.title }}</p>
          <p class="text-sm md:text-base"> by {{ post?.writer }}</p>
        </nuxt-link>
      </div>

      <nuxt-link to="/blog" class="block text-center font-medium text-sm md:text-lg text-red-700 hover:-translate-y-0.5 hover:scale-105 duration-200">
        더 알아보기
        <font-awesome-icon icon="fa-solid fa-angle-right" />
      </nuxt-link>
    </div>
  </div>

  <div class="py-8 py-16 md:py-28 bg-gray-50 ">
    <div class="container mx-auto">
      <div class="mb-10 md:mb-20 text-center">
        <p class="font-medium text-lg md:text-xl text-red-700 uppercase mb-2.5">SPONSOR</p>
        <p class="font-bold text-3xl md:text-5xl mb-5">후원사</p>
        <p class="font-medium text-base text-gray-600 mb-5">프로메테우스는 다음과 같은 후원사의 도움을 받습니다.</p>
      </div>
      <div class="grid grid-cols-5 gap-3 justify-center justify-items-center items-center px-4 sm:px-8">

        <img class="w-32 sm:w-48 animate-bounce" src="@/assets/images/sponsor/commoncomputer.png" />
				<div></div>
        <img class="w-32 sm:w-48 animate-bounce" src="@/assets/images/sponsor/neuralworkslab.png" />
				<div></div>
        <img class="w-32 sm:w-48 animate-bounce" src="@/assets/images/sponsor/aifactory.png" />
				<div></div>
        <img class="w-32 sm:w-48 animate-bounce" src="@/assets/images/sponsor/kingsleyventures.png" />
				<div></div>
        <img class="w-32 sm:w-48 animate-bounce" src="@/assets/images/sponsor/modulabs.png" />
				<div></div>
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

const intro = ref([
  {
    summary: "project",
    img: studyImage,
    title: "팀별 스터디와\n프로젝트",
    desc: "프로메테우스는 매 분기별, 인공지능의 다양한 분야를 주제로 팀별 프로젝트를 진행하고 있습니다.",
		hover: false,
  },
  {
    summary: "hackathon",
    img: hackathonImage,
    title: "해커톤",
    desc: "프로메테우스는 대학생 최고의 인공지능 단체가 되기를 꿈꾸고 있습니다. 이에 프로메테우스는 동아리 내부 부원뿐 아니라 외부 대학생들이 참여하는 해커톤을 열어 대학사회에서 인정받는 해커톤으로 자리잡고자 합니다.",
		hover: false,
  },
  {
    summary: "tutoring",
    img: tutoringImage,
    title: "외부 튜터링",
    desc: "프로메테우스는 청소년들에게도 좋은 영향력을 주고 싶습니다. 고등학생들에게 프로그래밍, 인공지능이라는 좋은 도구를 가르쳐 학생들이 꿈꾸는 무언가에 도전하게 하고 싶습니다.",
		hover: false,
  }
])

const projectCarousel = ref(null)
const recentPosts = ref(null)
const recentProjects = ref(null)

function getRecentProjects() {
  $fetch(`${import.meta.env.VITE_API_URL}/project/show_all_projects`, {
    method: "GET",
  })
    .then((result) => {
      recentProjects.value = result.slice(0, 5);
    })
    .catch((result) => {});
}

function scrollDown() {
    const targetPosition = window.innerHeight;
		window.scrollTo({ top: targetPosition, behavior: 'smooth' });
}
	
function getRecentPosts() {
  $fetch(`${import.meta.env.VITE_API_URL}/post/show_all_posts`, {
    method: "GET",
  })
    .then((result) => {
      recentPosts.value = result.slice(0, 4);
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
	getRecentProjects();
})

</script>

<style>
.carousel__pagination {
  margin: 0;
}
	

</style>