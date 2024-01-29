<template>
  <div class="relative bg-black flex main flex-col justify-center items-center">
    <img class="absolute w-full h-full bottom-16" src="@/assets/images/hackathon.png" />

    <div class="absolute h-full text-white justify-center text-center">
      <div class="mt-24 md:mt-32 h-1/3 items-center">
        <p id="writing1" class="font-bold text-4xl md:text-7xl mb-2 transition-opacity duration-500 ease-in"></p>
        <p id="writing2" class="font-bold text-4xl md:text-7xl mb-2 transition-ospanacity duration-500 ease-in"></p>
        <p id="writing3" class="md:text-4xl text-2xl mb-10 md:mb-20 transition-opacity duration-500 ease-in"></p>
      </div>
      <div v-if="showButton" class="h-1/3 fade flex flex-col items-center">
        <!-- <p class="text-sm md:text-lg font-light transition-opacity duration-500 ease-in">지원 기간</p>
        <p class="text-xs md:text-sm font-light mb-16 md:mb-32 transition-opacity duration-500 ease-in">12/18(월) ~ 01/21(일)</p>
        <a href="https://forms.gle/pmw1Qxzvr9JzZ7r97" class="font-medium mx-auto rounded bg-red-500 text-white px-4 py-2 mb-4 shadow-inner transition-transform transform hover:scale-110 focus:outline-none">
          지원하기
        </a> -->
        <p class="font-semibold text-xl md:text-2xl mb-12 transition-opacity duration-500 ease-in">본선 시작까지</p>
        <Countdown deadlineISO="2024-02-02T09:00:00" mainColor="#d4d4d8" secondFlipColor="#f4f4f5" mainFlipBackgroundColor="#292524"  secondFlipBackgroundColor="#57534e" :labels=labels labelColor="#ffffff"  />
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
import Home from './home.vue';
// import Post from './post.vue';
import Faq from './faq.vue'
import Info from './info.vue'
// import { Countdown } from 'vue3-flip-countdown';

const currentTab = ref('home');
const main = ref(null);

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

onMounted(() => {
  startTypingEffect();
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
