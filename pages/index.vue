<template>
  <div class="bg-black text-white ">
    <div class="relative w-screen mb-10 lg:mb-20">
      <img src="@/assets/images/main.png" alt="" class="object-cover w-full">
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span class="font-bold text-center mb-2 text-rose-700 transition-opacity duration-500 ease-in" :style="{ fontSize: '4vw' }">P</span>
        <span class="font-bold text-center mb-2 text-white transition-opacity duration-500 ease-in" :style="{ fontSize: '4vw' }">ROMETHEUS</span>
        <p class="font-medium text-center text-black transition-opacity duration-500 ease-in" :style="{ fontSize: '1.25vw' }">대학생 인공지능 단체</p>
      </div>
      <!-- <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer" @click="scrollDown">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" class="w-6 h-6 animate-bounce">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div> -->
    </div>

    <div class="container mx-auto pt-8 lg:pt-16">
      <p class="font-semibold text-center text-base lg:text-2xl mb-20 md:mb-40">.<br>.<br>.</p>
      <p class="font-medium text-center text-base lg:text-2xl mt-12  mb-20 md:mb-40">프로메테우스는 인공지능으로 가치 있는 도전과 경험을 하고자 <br> <span class="font-light text-red-700">UP</span>에 대한 열정을 지닌 대학생들이 모인 인공지능 동아리입니다.</p>
    </div>
    <!-- <img src="@/assets/images/main.svg" alt="" class="w-full"> -->

    <div class="py-8 sm:py-16 md:py-32">
      <div class="container mx-auto">
        <p class="font-medium text-lg md:text-2xl text-red-700 uppercase mb-2.5">WE ARE</p>
        <p class="font-bold leading-snug sm:text-xl md:text-4xl mb-10 md:text-5xl">협업과 도전으로<br>이루어지는 활동들</p>
        <div class="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div v-for="(section, index) in intro" :key="index">
            <div class="rounded-lg relative h-[100px] lg:h-[300px] bg-center bg-cover" 
                :style="{ backgroundImage : `url(${section.img})`}" 
                @mouseenter="section.hover = true"
                @mouseleave="section.hover = false">
              <div class="rounded-lg absolute w-full h-full z-0 backdrop-grayscale bg-black/60 p-5 sm:p-10 text-white flex flex-col">
                <p class="text-left lg:text-center whitespace-pre font-bold text-lg lg:text-2xl mb-12 lg:mb-20" id="section"
                >{{ section.title }}</p>
                <!-- <p :style="{
                      opacity: section.hover ? 1 : 0,
                      pointerEvents: section.hover ? 'auto' : 'none',
                      transition: 'opacity 0.5s ease, transform 0.5s ease',
                      transform: section.hover ? 'translateY(-1.5rem)' : 'none'
                    }"
                  class="whitespace-normal text-sm lg:text-lg">{{ section.desc }}</p> -->
              </div>
            </div>
          </div>
        </div>
        <nuxt-link to="/about" class="block text-center font-medium text-lg text-red-700 hover:-translate-y-0.5 hover:scale-105 duration-200">
        더 알아보기
        <font-awesome-icon icon="fa-solid fa-angle-right" />
      </nuxt-link>
      </div>
    </div>

    <div class="py-8 sm:py-16 md:py-32 bg-neutral-800">
      <div class="container mx-auto">
        <div class="mb-10 md:mb-20 text-center">
          <p class="font-medium text-lg sm:text-xl md:text-2xl text-red-700 uppercase mb-2.5">프로젝트</p>
          <p class="font-bold leading-snug text-4xl md:text-5xl">멤버들의 활동을 확인해보세요</p>
        </div>
      </div>
      <carousel ref="projectCarousel" :items-to-show="itemsToShow" :wrap-around="true" class="mb-10 sm:mb-20 mx-3" :autoplay="3000">
        <slide class="relative p-10" v-for="project in recentProjects" :key="project.id">
          <div class="w-full mx-1 md:mx-4 text-left mb-6 sm:mb-8">
            <div class="drop-shadow-md w-full rounded-lg bg-center bg-cover pb-[60%] sm:pb-[50%] mb-4 sm:mb-5" :style="{ backgroundImage: `url(${project?.thumb}` , backgroundSize: 'cover', backgroundPosition: 'center' }"></div>
            <p class="font-bold md:text-lg text-xs mb-2 text-center">{{ project?.title }}</p>
            <p class="text-base">{{ project?.description }}</p>
          </div>
        </slide>

        <div class="absolute grid grid-cols-2">
          <button @click="projectCarouselPrev" />
          <button @click="projectCarouselNext" />
        </div>
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
          <div v-for="post in recentPosts" :key="post.id" class="relative w-full pb-[100%]">
              <a :href="post.url" class="absolute drop-shadow-md rounded-lg border w-[100%] h-[100%] hover:opacity-70 bg-cover bg-center bg-no-repeat mb-2 sm:mb-5"
                :style="{ backgroundImage: 'url(' + useImage(post?.thumb, postType) + ')', backgroundSize: 'cover', backgroundPosition: 'center' }">
              </a>
              <font-awesome-icon v-if="user" class="cursor-pointer text-red-700 absolute top-2 right-2 p-1" icon="fa-solid fa-xmark" @click="deletePost(post)" />
          </div>
        </div>

        <nuxt-link to="/blog" class="block text-center font-medium text-sm md:text-lg text-red-700 hover:-translate-y-0.5 hover:scale-105 duration-200">
          더 알아보기
          <font-awesome-icon icon="fa-solid fa-angle-right" />
        </nuxt-link>
      </div>
    </div>

    <div class="py-8 py-16 md:py-28 bg-neutral-800 ">
      <div class="container mx-auto">
        <div class="mb-10 md:mb-20 text-center">
          <p class="font-medium text-lg md:text-xl text-red-700 uppercase mb-2.5">SPONSOR</p>
          <p class="font-bold text-3xl md:text-5xl mb-5">후원사</p>
          <p class="font-medium text-base text-gray-300 mb-5">프로메테우스는 다음과 같은 후원사의 도움을 받습니다.</p>
        </div>
        <div class="grid grid-cols-5 gap-3 justify-center justify-items-center items-center px-4 sm:px-8">
          <img class="w-32 sm:w-48" src="@/assets/images/sponsor/commoncomputer.png" />
          <div></div>
          <img class="w-32 sm:w-48" src="@/assets/images/sponsor/neuralworkslab.png" />
          <div></div>
          <img class="w-32 sm:w-48" src="@/assets/images/sponsor/aifactory.png" />
          <img class="w-32 sm:w-48" src="@/assets/images/sponsor/kingsleyventures.png" />
          <div></div>
          <img class="w-32 sm:w-48" src="@/assets/images/sponsor/modulabs.png" />
          <div></div>
          <img class="w-32 sm:w-48" src="@/assets/images/sponsor/codeit.png" />
        </div>
      </div>
      <div>
        <div v-if="popupVisible" class="fixed inset-0 flex items-center justify-center z-50">
          <div class="relative bg-white p-4 w-[70%] md:w-[25%] mx-auto rounded-lg shadow-lg mt-24">
            <button @click="closePopup" class="absolute top-2 right-2 text-gray-500 hover:text-red-500 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <carousel ref="popup" class="my-3" :items-to-show="1" :autoplay="3000">
              <slide v-for="(image, index) in popupImages" :key="index">
                <img :src="image" :alt="image.alt" class="w-full h-auto" />
              </slide>
              <template #addons>
                <div class="flex justify-center items-center gap-3">
                  <pagination />
                </div>
              </template>
            </carousel>
          </div>
        </div>
      </div>
    </div>


  </div>
	
</template>


<script setup>
import { useAuth } from "@/store";

import studyImage from "@/assets/images/study.jpeg"
import hackathonImage from "@/assets/images/hackathon.jpg"
import tutoringImage from "@/assets/images/tutoring.jpg"
import seminarImage from "@/assets/images/seminar.jpg"
import thumb_1 from '@/assets/images/thumb/1.png';
import thumb_2 from '@/assets/images/thumb/2.png';
import thumb_3 from '@/assets/images/thumb/3.png';
import thumb_4 from '@/assets/images/thumb/4.png';
import thumb_5 from '@/assets/images/thumb/5.png';
import thumb_6 from '@/assets/images/thumb/6.png';
// import c_1 from '@/assets/images/codeit/12.png';
	
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
	


const recentPosts = ref([])
const postType = "links"
const recentProjects = ref([
  {
    id: 1,
    title: "라즈베리파이를 활용한 인공지능 자율주행차 제작 프로젝트",
    thumb: thumb_3,
    homepage: null,
    playstore: null,
    created_date: "2023-07-29T13:23:38",
    writer: "string",
    description: "",
    content: "d",
    github: null,
    appstore: null,
    updated_date: "2023-07-30T08:03:05"
  },
  {
    id: 2,
    title: "DACON 수상작 코드 리뷰 및 공모전 참가",
    thumb: thumb_5,
    homepage: null,
    playstore: null,
    created_date: "2023-07-30T06:37:54",
    writer: "admin",
    description: "",
    content: "",
    github: null,
    appstore: null,
    updated_date: "2023-08-13T08:09:37"
  },
	{
    id: 3,
    title: "텍스트로 생성된 이미지의 화풍을 부분별로 자유롭게 바꾸어주는 모델 제작 프로젝트",
    thumb: thumb_4,
    homepage: null,
    playstore: null,
    created_date: "2023-07-30T06:37:54",
    writer: "admin",
    description: "",
    content: "",
    github: null,
    appstore: null,
    updated_date: "2023-08-13T08:09:37"
  },
	{
    id: 4,
    title: "금융 시계열(주식or코인) 모델 제작 프로젝트",
    thumb: thumb_6,
    homepage: null,
    playstore: null,
    created_date: "2023-07-30T06:37:54",
    writer: "admin",
    description: "",
    content: "",
    github: null,
    appstore: null,
    updated_date: "2023-07-30T08:09:37"
  },
	{
    id: 5,
    title: "얼굴의 여러 요소를 바꾸어주는 GAN Image Generator 제작 프로젝트",
    thumb: thumb_1,
    homepage: null,
    playstore: null,
    created_date: "2023-07-30T06:37:54",
    writer: "admin",
    description: "",
    content: "",
    github: null,
    appstore: null,
    updated_date: "2023-07-30T08:09:37"
  },
	{
    id: 6,
    title: "강화학습을 활용한 snake 게임과 오목 구현 프로젝트",
    thumb: thumb_2,
    homepage: null,
    playstore: null,
    created_date: "2023-07-30T06:37:54",
    writer: "admin",
    description: "",
    content: "",
    github: null,
    appstore: null,
    updated_date: "2023-07-30T08:09:37"
  }
])

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
    desc: "프로메테우스는 인공지능 가치 창출 동아리로서 매년 초 'Prometheus AI Hackathon'을 개최합니다. 인공지능의 활용을 함께 고민하고 소통하여 미래 사회에 힘이 되고자합니다.",
		hover: false,
  },
  {
    summary: "tutoring",
    img: tutoringImage,
    title: "교육 봉사",
    desc: "프로메테우스는 청소년들에게도 좋은 영향력을 주고 싶습니다. 고등학생들에게 프로그래밍, 인공지능이라는 좋은 도구를 가르쳐 학생들이 꿈꾸는 무언가에 도전하게 하고 싶습니다.",
		hover: false,
  },
  {
    summary: "seminar",
    img: seminarImage,
    title: "정기 세미나",
    desc: "프로메테우스는 정기적으로 세미나를 통해 프로젝트 현황 발표를 합니다.",
		hover: false,
  }
])


// 반응성을 갖는 변수 정의
const itemsToShow = ref(3);

// 화면 크기를 감지하여 itemsToShow 값을 업데이트하는 함수
const updateItemsToShow = () => {
  // 화면 너비 가져오기
  const screenWidth = window.innerWidth;

  // 화면 크기에 따라 itemsToShow 값 설정
  if (screenWidth >= 1024) {
    itemsToShow.value = 5; // 대형 화면 (lg)
  } else if (screenWidth >= 768) {
    itemsToShow.value = 4; // 중형 화면 (md)
  } else {
    itemsToShow.value = 2; // 소형 화면 (sm)
  }
};


const projectCarousel = ref(null)
// const recentPosts = ref(null)
// const recentProjects = ref(null)

// function getRecentProjects() {
//   $fetch(`${import.meta.env.VITE_API_URL}/project/show_all_projects`, {
//     method: "GET",
//   })
//     .then((result) => {
//       recentProjects.value = result.slice(0, 5);
//     })
//     .catch((result) => {});
// }

function scrollDown() {
    const targetPosition = window.innerHeight;
		window.scrollTo({ top: targetPosition, behavior: 'smooth' });
}
	
async function getRecentPosts() {
  await $fetch(`${import.meta.env.VITE_API_URL}/link/get_links`, {
    method: "GET",
  })
    .then((result) => {
      
      result.sort((a, b) => {
        const dateA = new Date(a.created_date);
        const dateB = new Date(b.created_date);
        return dateB - dateA; // 내림차순 정렬
      });
      
      recentPosts.value = result.slice(0, 3);
      console.log(result);
    })
    .catch((result) => {});
}

function projectCarouselPrev() {
  projectCarousel.value.prev()
}

function projectCarouselNext() {
  projectCarousel.value.next()
}

// const popup = ref();
// const popupVisible = ref(true);
// const popupImages = ref([c_1])
// const closePopup = () => {
// 	popupVisible.value = false;
// };

onMounted(async ()=>{
  await getRecentPosts();
  updateItemsToShow();
})

</script>

<style>
.carousel__pagination {
  margin: 0;
}

html, body {
  overflow-x: hidden;
}

#test-fade-enter-active,
#test-fade-leave-active {
  opacity: 0;
}

#test-fade-enter, #test-fade-leave-to /* .nav-fade-leave-active in <2.1.8 */ {
  opacity: 1;
}

.animated-div {
  opacity: 0;
  transition: opacity 0.5s ease;
}

.fade-in {
  opacity: 1;
}

.carousel__slide {
  padding: 5px;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
}

.carousel__slide--sliding {
  transition: transform 0.5s ease;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}

</style>

