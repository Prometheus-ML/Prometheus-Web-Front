<template>
  <div class="relative bg-black flex main flex-col justify-center items-center">
    <img class="absolute w-full h-full bottom-16" src="@/assets/images/hackathon.png" />

    <div class="absolute h-full text-white justify-center text-center">
      <div class="mt-24 md:mt-32 h-1/3 items-center">
        <p id="writing1" class="font-bold text-4xl md:text-7xl mb-2 transition-opacity duration-500 ease-in"></p>
        <p id="writing2" class="font-bold text-4xl md:text-7xl mb-2 transition-ospanacity duration-500 ease-in"></p>
        <p id="writing3" class="md:text-4xl text-2xl mb-10 md:mb-20 transition-opacity duration-500 ease-in"></p>
      </div>
      <div v-if="showButton" class="h-1/3 mb-5 md:mb-12 fade flex flex-col items-center">
        <p class="md:text-lg text-xl mb-2 md:mb-4 transition-opacity duration-500 ease-in">해커톤이 종료되었습니다.</p>
        <p class="md:text-xl text-2xl font-semibold mb-5 md:mb-10 transition-opacity duration-500 ease-in">축하드립니다!</p>
        <carousel  ref="introCarousel" :items-to-show="1" :wrap-around="true" class="absolute w-1/2 mb-10 sm:mb-20" :autoplay="2000">
          <slide v-for="(section, index) in intro" :key="index">
            <div>
              <font-awesome-icon class="text-lg md:text-xl" :icon="['fas', 'crown']" :style="{ color: section.color }"/>
              <div class="text-3xl md:text-5xl font-bold py-3 rounded-lg">{{ section.label }}</div>
              <div class="text-xl md:text-3xl font-semibold py-3 rounded-lg">[ {{ section.name }} ]</div>
              <div class="text-base md:text-xl p-1 rounded-lg">{{ section.team }}</div>
              <div class="text-xs md:text-base font-light p-1 rounded-lg">{{ section.desc }}</div>
            </div>
             
          </slide>
          <template #addons>
            <div class="flex justify-center items-center gap-3">
              <button @click="prevSlide"><font-awesome-icon class="cursor-pointer" icon="fa-solid fa-angle-left" /></button>
              <pagination />
              <button @click="nextSlide"><font-awesome-icon class="cursor-pointer" icon="fa-solid fa-angle-right" /></button>
            </div>
          </template>

        </carousel>
        

      </div>
      <div v-if="main && showButton" class="h-1/3 fade-in mb-32 flex flex-col items-center">
        <p class="font-light md:text-2xl  md:font-medium transition-opacity duration-500 ease-in">먼저 생각하는 사람,</p>
        <p class="mb-1 md:mb-2 font-light md:font-medium md:text-2xl transition-opacity duration-500 ease-in">가치 있는 도전</p>
        <p class="mb-1 md:mb-3 font-light text-2xl transition-opacity duration-500 ease-in">▽</p>
        <p class="text-center mx-20 font-light text-xs md:text-base text-neutral-200 transition-opacity duration-500 ease-in">당신의 창의적인 아이디어로 AI의 무한한 가능성을 탐험하며, 현실을 넘어 새로운 가치를 창출하는 더 나은 미래를 그려보세요.</p>
      </div>
    </div>
      


    <div class="absolute bottom-12 w-full ">
      <div class="grid grid-cols-3 justify-between text-gray-500 font-normal">
        <button
          @click="changeTab('home')"
          class="py-2 md:py-4 bg-black duration-300 rounded-t-lg hover:text-white transition duration-300 text-sm md:text-lg flex-grow"
          :class="{ 'text-white border-b-2 border-white font-semibold': currentTab === 'home'}"
        >
          대회 정보
        </button>
        <!-- <button
          @click="changeTab('post')"
          class="py-2 md:py-4 bg-black duration-300 rounded-t-lg hover:text-white transition duration-300 text-sm md:text-lg flex-grow"
          :class="{ 'text-white border-b-2 border-white font-semibold': currentTab === 'post'}"
        >
          팀원 찾기
        </button> -->
        <button
          @click="changeTab('faq')"
          class="py-2 md:py-4 bg-black duration-300 rounded-t-lg hover:text-white transition duration-300 text-sm md:text-lg flex-grow"
          :class="{ 'text-white border-b-2 border-white font-semibold': currentTab === 'faq'}"
        >
          FAQ
        </button>
        <button
          @click="changeTab('info')"
          class="py-2 md:py-4 bg-black duration-300 rounded-t-lg hover:text-white transition duration-300 text-sm md:text-lg flex-grow"
          :class="{ 'text-white border-b-2 border-white font-semibold': currentTab === 'info'}"
        >
          공지
        </button>
      </div>
    </div>
  </div>
  <component :is="currentTabComponent" />
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

import Home from './home.vue';
// import Post from './post.vue';
import Faq from './faq.vue'
import Info from './info.vue'
// import { Countdown } from 'vue3-flip-countdown';

const currentTab = ref('home');
const main = ref(null);

const intro = ref([
  {
    label: "대상",
    name: "엔슬파트너스상",
    team: "KBJJ",
    desc: "고용법률관련 질의응답을 위한 법률 질의응답 챗봇",
    color: "#fde047"
  },

  {
    label: "최우수상",
    name: "콴다상",
    team: "I LUV BOOK",
    desc: "어린이를 위한 창의적인 영어 동화 앱",  
    color: "#f3f4f6"
  },
  {
    label: "우수상",
    name: "프로메테우스상",
    team: "BIS",
    desc: "AI 기술을 사용하여 무인점포 내 객체와 행위에 대한 자연어캡션을 클라이언트에게 브리핑 해주는 서비스", 
    color: "#d97706"
  },
  {
    label: "우수상",
    name: "딥노이드상",
    team: "사이토키닌",
    desc: "B2B 컨텐츠 맞춤 생성형 광고 솔루션", 
    color: "#d97706"
  },
])

const introCarousel = ref(null);

function prevSlide() {
  introCarousel.value.prev();
}

function nextSlide() {
  introCarousel.value.next();
}


// const shouldBlur = (index) => {
//   return index !== 1;
// };


const currentTabComponent = computed(() => {
  if (currentTab.value === 'home') return Home;
  if (currentTab.value === 'post') return Post;
  if (currentTab.value === 'faq') return Faq;
  if (currentTab.value === 'info') return Info;
});

const changeTab = (tab) => {
  currentTab.value = tab;
};


let Countdown;

onMounted(async () => {
  // Import Countdown component when the component is mounted
  const { Countdown: ImportedCountdown } = await import('vue3-flip-countdown');
  Countdown = ImportedCountdown;
});

onBeforeMount(async () => {
  document.addEventListener("scroll", (e) => {
    if (document.scrollingElement.scrollTop > 300) {
      main.value = true
    }
  })
});

let currentIndex = 0;
const showButton = ref(false)
const labels = {days: 'DAY',hours: 'HOUR',minutes: 'MIN',seconds: 'SEC',}

const startTypingEffect = () => {
  const sentences = ["2024", "PROMETHEUS", "AI HACKATHON"];
  

  const intervalId = setInterval(() => {
    if (currentIndex < sentences.length) {
      typeSentence(sentences[currentIndex]);
      currentIndex++;
    } else {
      clearInterval(intervalId);
      showButton.value = true;
    }
  }, 500); // Adjust the interval time here


};

const typeSentence = async (sentence) => {
  const targetElement = document.getElementById(`writing${currentIndex + 1}`);
  console.log(targetElement)
  targetElement.textContent = "";

  for (const char of sentence) {
    targetElement.textContent += char;
    await sleep(50); // Adjust the typing speed here
  }
};

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const initialState = ref(null)

onMounted(() => {
  startTypingEffect();
  initialState.value = true;
});

</script>

<style scoped>

.main {
  height: 150vh;
}

.fade-in {
  opacity: 0;
  animation: fadeInAnimation ease-in-out 1.5s forwards;
}

.fade {
  opacity: 0;
  animation: fadeInAnimation ease-in-out 1s forwards;
}


@keyframes fadeInAnimation {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}




</style>
