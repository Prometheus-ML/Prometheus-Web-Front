<template>
  <div class="bg-black text-white ">
    <div class="relative w-screen mb-16 md:mb-32">
      <img src="@/assets/design/main1.png" alt="main1" class="object-cover w-full">
      <img src="@/assets/design/logo.png" alt="logo" class="w-[80%] md:w-[56%] transform -translate-x-1/2 -translate-y-1/2 absolute top-[40%] left-[52%]">
    </div>

    <div class="relative w-screen py-8 md:py-16 lg:py-24">
      <img src="@/assets/design/main2.png" alt="main2" class="opacity-30 object-cover w-full">
      <div class="absolute mt-2 md:mt-5 w-full transform -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%] text-center font-semibold text-2xs detail md:text-2xl lg:text-3xl">
        <p class="md:mb-1 lg:mb-2 tracking-normal">프로메테우스는 인공지능으로 가치 있는 도전과 경험을 하고자 </p>
        <p class="tracking-normal"><span class="text-[#e83225]">UP</span>에 대한 열정을 지닌 대학생들이 모인 인공지능 동아리입니다.</p>
      </div>
    </div>

    <div id='1' class="relative mt-8 pt-24 pb-32 mb-8 md:mb-16 lg:mb-24">
      <img src="@/assets/design/main3.png" alt="main3" class="absolute object-cover w-full h-full top-0 left-0 z-0">
      <div class="custom mx-auto z-10 relative text-center">
        <p class="font-bold text-xs md:text-lg lg:text-xl prometheus text-red-700 uppercase mb-1 md:mb-2.5">WE ARE</p>
        <p class="font-bold text-sm detail md:text-xl md:text-4xl">협업과 도전으로</p>
        <p class="font-bold text-sm detail md:text-xl mb-6 md:mb-10 md:text-4xl">이루어지는 활동들</p>

        <!-- 그리드 섹션 -->
        <div class="mb-10 grid grid-cols-2 gap-5 relative">
          <!-- 각 섹션에 대한 반복 -->
          <div v-for="(section, index) in intro" :key="index">
            <div 
              class="rounded-lg relative h-[150px] md:h-[200px] lg:h-[250px] bg-center bg-cover" 
              :style="{ backgroundImage : `url(${section?.img})`}" 
              @mouseenter="section.hover = true"
              @mouseleave="section.hover = false"
            >
              <!-- 빨간 반투명 배경 -->
              <div class="absolute inset-0 bg-red-600 opacity-0 transition-opacity duration-300 z-10 rounded-lg"
                  :class="{ 'opacity-50': section?.hover }"></div>
              
              <!-- 텍스트 컨텐츠 -->
              <div class="absolute w-full h-full z-20 flex flex-col pt-[20%]">
                <p class="prometheus detail text-xs lmd:text-xl lg:text-2xl transition-all duration-300"
                  :class="{ 'translate-y-[-1rem] lg:translate-y-[-2rem]': section?.hover }">
                  {{ section?.summary }}</p>
                <p class="font-bold detail mb-5 md:mb-1 lg:mb-3 text-xs md:text-xl lg:text-2xl transition-all duration-300"
                  :class="{ 'translate-y-[-1rem] lg:translate-y-[-2rem]': section?.hover }">
                  {{ section?.title }}
                </p>
                <p class="detail px-[15%] md:px-[10%] lg:px-[15%] opacity-0 text-3xs md:text-sm lg:text-base transition-all duration-300" 
                  :class="{ 'translate-y-[-1rem] lg:translate-y-[-2rem] !opacity-100': section.hover }">
                  {{ section?.desc }}
                </p>
              </div>
            </div>
          </div>


        </div>

        <div class="text-center font-medium text-xs md:text-base lg:text-lg rounded-full w-[40%] md:w-[25%] lg:w-[20%] mx-auto bg-red-700 text-white py-2 px-4 mt-4 hover:opacity-80 hover:-translate-y-0.5 hover:scale-105 duration-200">
          <nuxt-link to="/about" >
            더 알아보기
            <font-awesome-icon icon="fa-solid fa-angle-right" />
          </nuxt-link>
        </div>
      </div>
    </div>



    <div id='2' class="relative h-screen bg-neutral-800 md:mb-24">
      <img src="@/assets/design/main4.png" alt="main4" class="object-cover w-full h-full">
      
      <div class="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%] custom gap-x-5 mx-auto grid grid-cols-3">
        <!-- 왼쪽 텍스트 섹션 -->
        <div class="mt-20 mb-10 md:mb-20 text-left">
          <p class="font-bold text-xs md:text-lg lg:text-xl prometheus text-red-700 uppercase mb-1 md:mb-2.5">PROJECTS</p>
          <p class="font-bold text-sm detail md:text-xl md:text-4xl">멤버들의 활동을</p>
          <p class="font-bold text-sm detail md:text-xl mb-6 md:mb-10 md:text-4xl">확인해보세요</p>

          <div class="text-center font-medium text-2xs md:text-base lg:text-lg rounded-full w-[75%] lg:w-[60%] mr-auto bg-red-700 text-white py-2 px-4 mt-4 hover:opacity-80 hover:-translate-y-0.5 hover:scale-105 duration-200">
            <nuxt-link to="/about">
              더 알아보기
              <font-awesome-icon icon="fa-solid fa-angle-right" />
            </nuxt-link>
          </div>
        </div>
        
        <!-- 오른쪽 Flicking 슬라이드 섹션 -->
        <div class="col-span-2 h-[40vh] w-[100%] md:w-[80%] lg:w-[100%] md:h-[40vh] lg:h-[70vh] flicking-viewport vertical overflow-hidden flex justify-center items-center">
          <Flicking
            :options="{ preventDefaultOnDrag: true, panelsPerView: 2.2, align: 'center', circular: true, horizontal: false, moveType: 'freeScroll' }"
            :plugins="plugins"
            class="h-full w-full"
          >
            <!-- 각 프로젝트에 대한 슬라이드 -->
            <div
              v-for="(project, index) in recentProjects"
              :key="index"
              class="flicking-panel flex justify-center items-center relative"

            >
              <!-- 원형 이미지 -->
              <div class="w-[100%] h-[100%] rounded-xl overflow-hidden shadow-2xl shadow-white/20 rounded-xl relative" style="box-shadow: 0 10px 30px 10px rgba(255, 255, 255, 0.2);">
                
                <img :src="project.project_thumb" alt="Project image" class="absolute w-full h-full object-cover" />
                
              </div>
              <!-- 왼쪽 하단 텍스트 -->
              <div class="absolute bottom-[10%] left-[5%] mr-[5%] text-left text-white">
                <div class="flex mb-2">
                  <span
                    v-for="(tag, tagIndex) in project.tags"
                    :key="tagIndex"
                    class="bg-[#AE2117] detail md:font-semibold text-2xs lg:text-xs rounded-full px-4 py-1 mr-2"
                  >
                    #{{ tag }}
                  </span>
                </div>
                <h3 class="text-lg md:text-xl lg:text-2xl font-bold">{{ project.title }}</h3>
                <div class="">
                  <p class="text-justify mt-1 text-2xs md:text-xs lg:text-base">{{ project.description }}</p>
                </div>
                
              </div>
            </div>
          </Flicking>
        </div>
      </div>
    </div>

    <div id='3' class="relative h-screen bg-black py-[10vh] lg:py-[20vh]">
      <img src="@/assets/design/main5.png" alt="main5" class="absolute -top-[10vh] lg:-top-[50vh] left-0 object-cover w-full">
      <div class="relative custom mt-12 md:mt-12 mx-auto text-left font-semibold text-2xs detail md:text-2xl lg:text-3xl">
        <p class="font-bold text-xs md:text-lg lg:text-xl prometheus text-red-700 uppercase mb-1 md:mb-2.5">BLOG</p>
        <p class="font-bold text-sm detail md:text-2xl lg:text-4xl">멤버들이 말하는</p>
        <p class="font-bold text-sm text-[#DEA0A0] detail md:text-2xl mb-6 md:mb-10 lg:text-4xl">프로메테우스</p>

        <div class="flex relative flex-row items-center justify-center h-full mb-[10vh]">
          
          <Carousel
            class="w-full h-full" ref="carouselRef" v-model="currentSlide"
            :autoplay="2000" 
            :items-to-show="4"
            :wrap-around="true" 
          >
            
            <Slide
              v-for="(link, index) in recentLinks"
              :key="index"
              class="flex justify-center w-full h-[50vh] items-center relative" 
            >
              <div class="w-full md:p-[2vw] p-[4vw] relative rounded-xl " :class="{ 'md:!p-[1vw] !p-[3vw]': currentSlide === index }">
                <img
                  :src="link.link_thumb ? '/api/proxy/image?id=' + link.link_thumb : mainImage"
                  :alt="mainImage"
                  class="w-full h-full object-cover rounded-xl "
                  @error="handleImageError($event)"
                  style="box-shadow: 0 8px 28px 8px rgba(255, 255, 255, 0.2);"
                />
              </div>
            </Slide>
          </Carousel>
        </div>
      </div>
    </div>

    <!-- <div class="py-8 py-16 md:py-32">
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
      </div>
      <nuxt-link to="/blog" class="text-center detail text-sm w-12md:text-lg text-red-700 hover:-translate-y-0.5 hover:scale-105 duration-200">
        더 알아보기
        <font-awesome-icon icon="fa-solid fa-angle-right" />
      </nuxt-link>
    </div> -->

    <div id='4' class="py-8 py-16 md:py-28 bg-black ">
      <div class="custom mx-auto">
        <div class="mb-10 md:mb-20 text-center">
          <p class="font-medium text-lg md:text-xl text-red-700 prometheus uppercase mb-2.5">SPONSOR</p>
          <p class="font-bold text-sm detail md:text-2xl lg:text-4xl detail mb-2 md:mb-4 lg:mb-6">후원사</p>
          <p class="font-light text-neutral-300 text-3xs detail md:text-base lg:text-lg detail mb-2 md:mb-4 lg:mb-6">프로메테우스는 다음과 같은 후원사의 도움을 받습니다.</p>
        </div>
        <div class="grid grid-cols-5 gap-3 justify-center justify-items-center items-center px-4 sm:px-8">
          <img class="w-32 sm:w-48 h-16 sm:h-32 object-contain" src="@/assets/images/sponsor/commoncomputer.png" />
          <div></div>
          <img class="w-32 sm:w-48 h-16 sm:h-32 object-contain" src="@/assets/images/sponsor/neuralworkslab.png" />
          <div></div>
          <img class="w-32 sm:w-48 h-16 sm:h-32 object-contain" src="@/assets/images/sponsor/codeit.png" />
          <img class="w-32 sm:w-48 h-16 sm:h-32 object-contain" src="@/assets/images/sponsor/enslpartners.png" />
          
          <div></div>
          <img class="w-32 sm:w-48 h-16 sm:h-32 object-contain" src="@/assets/images/sponsor/modulabs.png" />
          <div></div>
          <img class="w-32 sm:w-48 h-16 sm:h-32 object-contain" src="@/assets/images/sponsor/aifactory.png" />
          <img class="w-32 sm:w-48 h-16 sm:h-32 object-contain" src="@/assets/images/sponsor/kingsleyventures.png" />
          <div></div>
          <img class="w-32 sm:w-48 h-16 sm:h-32 object-contain" src="@/assets/images/sponsor/deepnoid.png" />
          <div></div>
          <img class="w-32 sm:w-48 h-16 sm:h-32 object-contain" src="@/assets/images/sponsor/intel.png" />
          <img class="w-32 sm:w-48 h-16 sm:h-32 object-contain" src="@/assets/images/sponsor/qanda.png" />
          <div></div>
          <img class="w-32 sm:w-48 h-16 sm:h-32 object-contain" src="@/assets/images/sponsor/line.png" />
          <div></div>
          <img class="w-32 sm:w-48 h-16 sm:h-32 object-contain" src="@/assets/images/sponsor/ncsoft.png" />
        </div>
      </div>
    </div>

    
    <div class="fixed right-0 top-1/2 transform text-2xs md:text-base -translate-y-1/2 z-50 prometheus">
      <ul class="space-y-4">
        <div
          v-for="(section, index) in sections"
          :key="index"
          :class="{
            'w-20 md:w-32 translate-x-[-1rem] bg-[#BA281E]': activeSection === section.id,
            'w-14 md:w-24 translate-x-0 text-[#222222] bg-[#7D7D7D] opacity-80': activeSection !== section.id
          }"
          class="transition-all duration-500 transform cursor-pointer px-2 rounded-l-full"
          @click="scrollToSection(section.id)"
        >
          {{ section.name }}
        </div>
      </ul>
    </div>
    
  </div>

</template>


<script setup>
import { useAuthStore } from "@/composables/useAuthStore";

import studyImage from "@/assets/images/study.jpeg"
import hackathonImage from "@/assets/images/hackathon.jpg"
import tutoringImage from "@/assets/images/tutoring.jpg"
import seminarImage from "@/assets/images/seminar.jpg"
import Flicking from "@egjs/vue3-flicking";
import { AutoPlay, Fade, Perspective } from "@egjs/flicking-plugins";
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import mainImage from '@/assets/design/logo2.png';

import 'vue3-carousel/dist/carousel.css'
const plugins = [new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: false }), new Fade(), new Perspective({ rotate: -0.2})];
	

const sections = ref([
  { id: '1', name: 'activity' },
  { id: '2', name: 'project' },
  { id: '3', name: 'blog' },
  { id: '4', name: 'sponsor' },
]);


const activeSection = ref(null);
const currentSlide = ref(0);

const handleScroll = () => {
  let foundActiveSection = false;
  sections.value.forEach((section) => {
    const sectionElement = document.getElementById(section.id);
    const rect = sectionElement.getBoundingClientRect();


    if (rect.top <= window.innerHeight / 2) {
      activeSection.value = section.id;
      foundActiveSection = true;
    }
  });

  if (!foundActiveSection) {
    activeSection.value = null;
  }
};

const recentLinks = ref([
])

const getRecentPosts = async () => {
  

  try {
    const response = await $api(`/link/newest_links`, {
      method: 'GET',
    });

    recentLinks.value = response;
  } catch (error) {
    console.error(error);
  }
};

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    window.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth',
    });
  }
};

const recentProjects = ref([
  // {
  //   id: 101,
  //   Members: [1, 2, 3],
  //   title: 'Project A',
  //   description: 'This is the description of Project A.',
  //   content: 'html,',
  //   github: 'https://github.com/projectA',
  //   notion: 'https://notion.so/projectA',
  //   project_panel: '/images/projectA_panel.jpg',
  //   project_thumb: studyImage,
  //   videoURL: 'https://youtube.com/embed/projectA',
  //   tags: ['Vue', 'TailwindCSS']
  // },
  // {
  //   id: 102,
  //   Members: [4, 5, 6],
  //   title: 'Project B',
  //   description: 'This is the description of Project B.',
  //   content: 'html,',
  //   github: 'https://github.com/projectB',
  //   notion: 'https://notion.so/projectB',
  //   project_panel: '/images/projectB_panel.jpg',
  //   project_thumb: studyImage,
  //   videoURL: 'https://youtube.com/embed/projectB',
  //   tags: ['React', 'CSS']
  // },
  // {
  //   id: 103,
  //   Members: [1, 2, 3],
  //   title: 'Project A',
  //   description: 'This is the description of Project C.',
  //   content: 'html,',
  //   github: 'https://github.com/projectA',
  //   notion: 'https://notion.so/projectA',
  //   project_panel: '/images/projectA_panel.jpg',
  //   project_thumb: studyImage,
  //   videoURL: 'https://youtube.com/embed/projectA',
  //   tags: ['Vue', 'TailwindCSS']
  // },
  // {
  //   id: 104,
  //   Members: [4, 5, 6],
  //   title: 'Project B',
  //   description: 'This is the description of Project D. This is the description of Project D. This is the description of Project D.',
  //   content: 'html,',
  //   github: 'https://github.com/projectB',
  //   notion: 'https://notion.so/projectB',
  //   project_panel: '/images/projectB_panel.jpg',
  //   project_thumb: studyImage,
  //   videoURL: 'https://youtube.com/embed/projectB',
  //   tags: ['React', 'CSS']
  // },
]);

const intro = ref([  
  {
    summary: "SEMINAR",
    img: seminarImage,
    title: "정기 세미나",
    desc: "정기 세미나를 통해 프로젝트 및 스터디 발표를 합니다.",
		hover: false,
  },
  {
    summary: "TUTORING",
    img: tutoringImage,
    title: "교육 봉사",
    desc: "고등학생들에게 프로그래밍, 인공지능이라는 좋은 도구를 가르쳐 학생들이 꿈꾸는 무언가에 도전하게 하고 싶습니다.",
		hover: false,
  },
  {
    summary: "HACKATHON",
    img: hackathonImage,
    title: "해커톤",
    desc: "내부 해커톤과 외부 해커톤을 통해 인공지능의 활용을 함께 고민하고 소통하여 미래 사회에 힘이 되고자합니다.",
		hover: false,
  },
  {
    summary: "DEMODAY",
    img: studyImage,
    title: "데모데이",
    desc: "분기마다 프로젝트 결과물을 발표하는 데모데이를 진행합니다.",
		hover: false,
  },



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


// async function getRecentProjects() {
//   $fetch(`${import.meta.env.VITE_API_URL}/project/show_all_projects`, {
//     method: "GET",
//   })
//     .then((result) => {
//       recentProjects.value = result.slice(0, 5);
//     })
//     .catch((result) => {});
// }


	
// async function getRecentPosts() {
//   await $fetch(`${import.meta.env.VITE_API_URL}/link/get_links`, {
//     method: "GET",
//   })
//     .then((result) => {
      
//       result.sort((a, b) => {
//         const dateA = new Date(a.created_date);
//         const dateB = new Date(b.created_date);
//         return dateB - dateA; // 내림차순 정렬
//       });
      
//       recentPosts.value = result.slice(0, 3);
//     })
//     .catch((result) => {});
// }

const handleImageError = (event) => {
  event.target.src = mainImage; // 기본 이미지로 대체
};


onMounted(async ()=>{
  // await getRecentPosts();
  updateItemsToShow();
  await getRecentPosts();
  window.addEventListener('scroll', handleScroll);
})

onUnmounted(()=> {
  window.removeEventListener('scroll', handleScroll);

})

</script>

<style>



html, body {
  overflow-x: hidden;
}

.custom {
	width: 70vw;
}

.detail {
  font-family: 'Detail', sans-serif;
}

</style>

