<template>
  <div class="relative pb-32">
    <img
      class="absolute inset-0 w-full h-full object-full "
      src="@/assets/design/main6.png"
      alt="Background"

    />
    <div class="w-[70vw] min-h-screen mx-auto pt-40">
      <div class="mb-14 flex flex-col text-center">
        <p class="font-medium  text-xl lg:text-2xl prometheus text-rose-700">Projects</p>
        <p class="font-bold text-3xl lg:text-4xl md:text-5xl mb-5">프로젝트</p>
      </div>
      
    
      <div class="flex flex-col justify-center items-center p-6 z-10">
        <div class="flex flex-wrap md:gap-12 text-base md:text-xl justify-center">
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            :class="{
              'font-semibold': activeTab === tab.key,
              'text-neutral-400 font-light ': activeTab !== tab.key,
              'border-b-2 border-black': activeTab === tab.key,
            }"
            @click="setActiveTab(tab.key)"
            class="mr-5 cursor-pointer flex items-center "
          >
            <span class="text-xs md:text-base lg:text-xl hover:-translate-y-0.5 hover:scale-105 duration-200 mx-auto z-10">{{ tab.name }}</span>
          </div>
        </div>
      </div>


      <div class="min-h-[50vh] rounded-xl bg-white bg-opacity-20 backdrop-blur-lg inner-shadow">
        <div class="p-[5vw] auto-rows-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[20vh] gap-x-2 gap-y-6 mb-5">
          <div
            v-for="post in postList"
            :key="post.id"
            class="overflow-hidden rounded-lg hover:drop-shadow-xl hover:opacity-50"
          >
            <a :href="post.linkURL" class="flex flex-col h-full flex flex-col">
              <!-- Thumbnail -->
              <img
                :src="post.link_thumb ? '/api/proxy/image?id=' + post.link_thumb : mainImage"
                :alt="mainImage"
                class="w-full aspect-[3/2] object-cover rounded-t-lg"
                @error="handleImageError($event)"
              />
              
              <!-- Post Content -->
              <div class="flex-1 flex flex-col justify-between pt-2 px-4 bg-black/30 h-1/3">
                <div class="text-left">
                  <p class="font-semibold truncate text-sm md:text-base lg:text-lg mb-3 line-clamp-2">
                      {{ post.title }}
                    </p>
                  
                  <div class="flex flex-row pt-2">
                    <p class="font-light flex-grow text-xs text-neutral-500">
                      {{ post.meta.date }}
                    </p>
                    <p class="font-light text-sm mb-2  text-neutral-500">
                      {{ post.meta.editor }}
                    </p>
                  </div>
                  
                </div>
                
                <!-- Tags -->
                <!-- <div v-if="post.tags && post.tags.length" class="mt-3 flex flex-wrap gap-2">
                  <span
                    v-for="tag in post.tags"
                    :key="tag"
                    class="px-2 py-1 bg-rose-100 text-rose-700 rounded-full text-xs"
                  >
                    #{{ tag }}
                  </span>
                </div> -->
              </div>
            </a>
          </div>
        </div>
        
      </div>

    


      <div class="relative flex justify-end">
        
        <nuxt-link :to="'/blog/new'" v-if="user" class="bg-white hover:-translate-y-0.5 hover:scale-105 duration-200 hover:opacity-80 text-black py-1 px-3 border rounded-lg inline-block">
            글쓰기
        </nuxt-link>
        
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { storeToRefs } from "pinia";
import mainImage from '@/assets/design/logo2.png';
import { Carousel, Slide,Pagination,Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css'


const carouselRef = ref();
const currentSlide = ref(0);

const next = () => {
  if (carouselRef.value) {
    carouselRef.value.next();
  }
};

const prev = () => {
  if (carouselRef.value) {
    carouselRef.value.prev();
  }
};

const tabs = [
  { key: '06', name: '6기'},
  { key: '05', name: '5기'},
  { key: '04', name: '이전기수'},
];

// const recentLinks = ref([
//   {
//     id: 1,
//     title: 'Awesome Vue Resources',
//     description: 'A collection of awesome Vue.js resources.',
    
//     linkURL: 'https://awesome-vue.com',
//     tags: ['Vue', 'Resources']
//   },
//   {
//     id: 2,
//     title: 'TailwindCSS Docs',
//     description: 'Official documentation for TailwindCSS.',
//     linkURL: 'https://tailwindcss.com/docs',
    
//     tags: ['CSS', 'TailwindCSS']
//   },
//   {
//     id: 3,
//     title: 'Awesome Vue Resources',
//     description: 'A collection of awesome Vue.js resources.',
    
//     linkURL: 'https://awesome-vue.com',
//     tags: ['Vue', 'Resources']
//   },
//   {
//     id: 4,
//     title: 'TailwindCSS Docs',
//     description: 'Official documentation for TailwindCSS.',
//     linkURL: 'https://tailwindcss.com/docs',
    
//     tags: ['CSS', 'TailwindCSS']
//   },
// ]);



const activeTab = ref('05');

const postList = ref([
])

const getPosts = async () => {
  if (!activeTab.value) return; // activeTab이 null이면 요청하지 않음

  try {
    const response = await $api(`/link/get_links/${activeTab.value}`, {
      method: 'GET',
    });

    postList.value = response;
  } catch (error) {
    console.error(error);
  }
};

const handleImageError = (event) => {
  event.target.src = mainImage; // 기본 이미지로 대체
};


const setActiveTab = (tab) => {
	activeTab.value = activeTab.value === tab? null : tab;
};

watch(activeTab, async (newTab) => {
  // activeTab 값이 변경되면 호출
  if (newTab) {
    await getPosts();
  } else {
    postList.value = []; // activeTab이 비활성화되면 빈 배열로 초기화
  }
});

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

onMounted(async() => {
	await getPosts();
})
</script>

<style scoped>
/* Custom Carousel Slide Item */
.carousel__item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: #ddd;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 24px;
  font-weight: bold;
}

</style>