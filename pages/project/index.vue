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
        <div class="p-[6vw] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-6 mb-5">
          <div
            v-for="post in filteredPosts"
            :key="post.id"
            class="overflow-hidden rounded-lg hover:drop-shadow-xl hover:opacity-50 min-h-[20vh] flex flex-col"
          >
            <div class="flex flex-col h-full rounded-t-lg">
              <!-- Thumbnail -->
              <img
                :src="post.link_thumb ? '/api/proxy/image?id=' + post.link_thumb : mainImage"
                :alt="mainImage"
                class="w-full aspect-[3/2] object-cover rounded-t-lg"
                @error="handleImageError($event)"
              />
              <!-- Post Content -->
              <div class="flex-1 flex flex-col justify-between pt-2 px-4 bg-black/30">
                <div class="text-left">
                  <p class="font-semibold truncate text-sm md:text-base lg:text-lg line-clamp-2">
                    {{ post.title }}
                  </p>
                  <p class="truncate text-2xs md:text-xs lg:text-xs text-neutral-400 font-light line-clamp-2">
                    {{ post.description }}
                  </p>
                </div>
                <div v-if="post.tags && post.tags.length" class="my-3 flex flex-wrap gap-2">
                  <span
                    v-for="tag in post.tags"
                    :key="tag"
                    class="px-1 text-rose-400 opacity-70 rounded-full text-xs"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </div>
            </div>
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

const postList = ref([
  // key: '06' 프로젝트
  {
    id: 1,
    title: '🧥MIXXX',
    description: 'Mix and match your personal fashion style',
    key: '06',
    linkURL: 'temp',
    link_thumb: '1fv5iHBlXvtnle40rzt3AMdTbIYKKxFxb',
    tags: ['Multi-modal', 'Signal_Processing', 'Fashion', 'Image_retrieval']
  },
  {
    id: 2,
    title: '⚾0.005타니',
    description: 'KBO 경기 데이터를 학습하여 투수용, 타자용 예측 모델 개발',
    key: '06',
    linkURL: 'temp',
    link_thumb: '1pasacEf_c4jwurPleecESc5Zhqa61MMh',
    tags: ['Baseball Game', 'Encoder&Decoder', 'MLP']
  },
  {
    id: 3,
    title: '🎤톨스토이는 이렇게 말했다',
    description: '음성 합성을 통한 이야기 생성',
    key: '06',
    linkURL: 'temp',
    link_thumb: '14duprPX6b0AQFg77fzvyNdeRQbEbX7xI',
    tags: ['Diffusion', 'LLM', 'Voice Synthesis']
  },
  {
    id: 4,
    title: '📚TO:C',
    description: '개인 맞춤형 토플 학습 웹서비스',
    key: '06',
    linkURL: 'temp',
    link_thumb: '1vIpYugVYU46SucgDBqVjeB9FnxhiB3mz',
    tags: ['FineTuning', 'LLM', 'NLP', 'Prompt Tuning']
  },
  {
    id: 5,
    title: '💰프메투자증권',
    description: 'chatGPT agent가 말아주는 주식투자',
    key: '06',
    linkURL: 'temp',
    link_thumb: '1qgkbU43OKa_yVUN1yl5Hr8ZHohrqLYgl',
    tags: ['Financial Engineering', 'LLM', 'Multi-Agent']
  },
  {
    id: 6,
    title: '🧠나는 이 EEG 감정분석을 해봤어요!',
    description: 'EEG 측정 데이터 기반 Emotion Recognition 모델 개발',
    key: '06',
    linkURL: 'temp',
    link_thumb: '1NqM9QWEvZ-I-iVoNYAOmlxJvGS8T7wDS',
    tags: ['CNN LSTM with Attention', 'CNN-RNN', 'EEG', 'Emotion Recognition']
  },
  {
    id: 7,
    title: '💳Personal Business Card',
    description: '그날마다 다른 명함 프로젝트',
    key: '06',
    linkURL: 'temp',
    link_thumb: '1l9El8aEI9l63LMgSqmeQT_bPd5aCeO6n',
    tags: ['Stable Diffusion', 'blip2', 'hand detection', 'image classification', 'layout generation']
  },
  {
    id: 8,
    title: '🔒DeepSafe',
    description: '워터마킹 기반 딥페이크 예방 서비스',
    key: '06',
    linkURL: 'temp',
    link_thumb: '1NC8dAMvLjd16rdQTqotzO-j2yXSJkMDe',
    tags: ['DeepFake', 'Dual Defense', 'Face Swap', 'Watermark']
  },
  {
    id: 9,
    title: '📹럭키비키 CCTV',
    description: '실시간으로 모니터링 정보를 알려주는 CCTV',
    key: '06',
    linkURL: 'temp',
    link_thumb: '1xsSiAVoilBGjjdcVAx3o9YjcyFpgk68e',
    tags: ['Captioning', 'Detection', 'Multi-modal']
  },

  // key: '05' 프로젝트 (임의 분배)
  {
    id: 10,
    title: '📝Coreview',
    description: '후기 요약 서비스 Coreview',
    key: '06',
    linkURL: 'temp',
    link_thumb: '1SBJIyywDV8G9mQm7uNeTJAkd2u4IhDa3',
    tags: ['Keyword', 'NLP', '쿠팡']
  },
  {
    id: 11,
    title: '🎵PitchMatch',
    description: 'pitch-estimation을 이용하여 사용자의 음역대를 확인하고 이에 맞는 음악을 추천해주는 서비스',
    key: '06',
    linkURL: 'temp',
    link_thumb: '1bWDMlf3TEXhA9mbqxIHd-qFfexSnTXV9',
    tags: ['Pitch Estimation', 'Recommendation', '음정분석']
  },
  {
    id: 12,
    title: '🎨Pictory',
    description: '하루의 감정과 이야기가 담긴 하나뿐인 특별한 그림과 음악을 만들어주는 맞춤형 그림일기 서비스',
    key: '06',
    linkURL: 'temp',
    link_thumb: '1lc64l5Kestn6vPDMT0oQiinHA-2V7fbJ',
    tags: ['Diffusion', 'LLM', 'Multi-modal']
  },
  {
    id: 13,
    title: '😊My Memoji',
    description: '디퓨전 모델을 이용한 나만의 memoji 만들기',
    key: '06',
    linkURL: 'temp',
    link_thumb: '1ZOb6hdU1rCI4EAcfj2VjP2AbVbybQbOF',
    tags: ['GenerativeAI', 'LoRA', 'Model Fine Tuning', 'SDXL', 'Stable Diffusion']
  },
  {
    id: 14,
    title: '👄ReadMyLips',
    description: '오디오 뿐만 아니라 입술의 시각 정보를 활용한 비대면 회의 자막 생성',
    key: '06',
    linkURL: 'temp',
    link_thumb: '1m2KZgq2s6qHP7Y8jROIhMMJT6aHmCks1',
    tags: ['YOLO', 'asr', 'avsr', 'cross-modal', 'lipreading', 'vsr']
  },

  // key: '04' 프로젝트 (임의 분배)
  {
    id: 15,
    title: '🎶Moodify (Mood Spotify)',
    description: 'SNS 감성분석 BGM 추천 시스템',
    key: '06',
    linkURL: 'temp',
    link_thumb: '1RTDMIgfbcSm93yw5Taq2jmTom0n8Ss08',
    tags: ['Multi-modal', 'Self-Supervised Learning', 'Sentiment Analysis', 'Transformer', 'VATT']
  },
  {
    id: 16,
    title: '✏️TailyDoodly',
    description: 'Tailydoodly: AI가 빚어낸 이야기와 그림 속에서 내가 주인공!',
    key: '06',
    linkURL: 'temp',
    link_thumb: '1Fgz4ChG6wptKTBJ8hU0NIQDASaBOcD9s',
    tags: ['CV', 'Fine Tuning', 'Image Composition', 'Object Detection', 'Prompt Tuning', 'Stable Diffusion']
  },
  {
    id: 17,
    title: '🍿(프)멧플릭스',
    description: '개인화 추천 시스템(Personalized Recommendation)의 동작 과정 이해 및 체험하기',
    key: '06',
    linkURL: 'temp',
    link_thumb: '1SBJIyywDV8G9mQm7uNeTJAkd2u4IhDa3',
    tags: ['GenerativeAI', 'Interaction', 'LayoutLM', 'Recommendation']
  },
  {
    id: 18,
    title: '🧠너 자신을 알라 (Know Yourself)',
    description: '인공지능 지식을 잘 아는 인공지능 만들기',
    key: '06',
    linkURL: 'temp',
    link_thumb: '15u19wX-QA-F4JMOwpYCeUQvhls-w2iXI',
    tags: ['DPO', 'FineTuning', 'LLM']
  },
  {
    id: 1,
    title: '✏️ 버츄얼 드로잉',
    description: 'Hand Landmark Detector를 활용한 버츄얼 스케치 인터페이스',
    key: '05',
    linkURL: 'temp',
    link_thumb: '1Zz_LTm2l0rtyieVTcKwYJaX5Fz9DECuo',
    tags: ['CV', 'Diffusion', 'I2I']
  },
  {
    id: 2,
    title: '🎶 멜로디파이 Melodify',
    description: 'Demucs 음성 분리 모델을 이용한 음악 악보 자동 생성 프로그램',
    key: '05',
    linkURL: 'temp',
    link_thumb: '1jiHWYrlCUWI33yvRp7r9YlTk3o7bCPrs',
    tags: ['Audio', 'Signal_Processing']
  },
  {
    id: 3,
    title: '➗ 테무에서 산 콴다',
    description: 'OCR을 활용한 수학 문제 인식 후 유사 문제 추천 및 풀이 제공 서비스',
    key: '05',
    linkURL: 'temp',
    link_thumb: '1gJvp2npVAFIrg-GMRNZ9y5F7v5ryr2J6',
    tags: ['NLP', 'OCR', 'Prompt_Engineering']
  },
  {
    id: 4,
    title: '🍽️ 오늘 뭐먹지?',
    description: 'NLP를 활용한 식단 추천 챗봇 서비스',
    key: '05',
    linkURL: 'temp',
    link_thumb: '1hyTedX4ACf4toshPZPCk-j3uxxrmgVi8',
    tags: ['ChatBot', 'NLP', 'Recommendation']
  },
  {
    id: 5,
    title: '💸 주저하는 코인들을 위해',
    description: 'Clustering 기반으로 보강된 Transfer Learning을 이용한 Cryptocurrency 가격 예측 모델',
    key: '05',
    linkURL: 'temp',
    link_thumb: '1RZlzMZgECP6oQyar4G_0oJp_R4BqurCI',
    tags: ['NLP', 'Price_Prediction', 'Transfer_Learning']
  },
  {
    id: 6,
    title: '🚗 주행 가이드 AI',
    description: '차량 주행 환경 객체 인식을 통한 운전자 가이드 제공',
    key: '05',
    linkURL: 'temp',
    link_thumb: '109mK9sPYpD-R0DvOjhRZi2nTGJeyzU9y',
    tags: ['CV', 'Detection', 'Segmentation']
  },
  {
    id: 7,
    title: '🕵️ 내 이름은 김프메, 탐정이죠',
    description: '2024년 8월 23일, 프메 고등학교에서 살인사건이 발생한다. 피해자는 2학년에 재학 중인 학생회장 정승은. 그는 누구에게, 어떻게 살해된 것일까?',
    key: '05',
    linkURL: 'temp',
    link_thumb: '1Cj4rIe_yK69yUQ4-gsHdMXVINqeVn32V',
    tags: ['Agent', 'LLM', 'Persona']
  },
  {
    id: 8,
    title: '🎤 밤양갱 부르는 아이유',
    description: 'Retrieval Based Voice Conversion 기술을 활용한 AI 가수 만들기',
    key: '05',
    linkURL: 'temp',
    link_thumb: '1LRZh_OiLGdigM7_3syOehw3DQWQQ8svz',
    tags: ['Audio', 'Music', 'Voice_Cloning']
  },
  {
    id: 9,
    title: '🌳 놀러오세요 프메의 숲',
    description: 'LLM 페르소나 활용과 프롬프트 엔지니어링을 활용하여 자율 NPC 만들기',
    key: '05',
    linkURL: 'temp',
    link_thumb: '1K9GFe16VPpHrfoP7ewBgQqPPANQEIPPu',
    tags: ['LLM', 'Persona', 'Prompt_Engineering']
  },
  {
    id: 10,
    title: '🎨 흑백 세상의 컬러 영웅들',
    description: 'Stable Diffusion과 ControlNet을 이용한 이미지 채색, SegFormer를 이용한 인물 Segmentation을 활용한 인물 채색 시스템',
    key: '05',
    linkURL: 'temp',
    link_thumb: '1uMJ9hH8cLVeMd275sudog2rDINnTCp20',
    tags: ['CV', 'Colorization', 'Diffusion']
  },
  {
    id: 11,
    title: '🤟 수어 신고 시스템',
    description: 'YOLO를 활용하여 수어 인식을 바탕으로 경찰 신고를 할 수 있는 서비스',
    key: '05',
    linkURL: 'temp',
    link_thumb: '1ELDLYPjXccb31z7EI_PNiHlrY4B4drM0',
    tags: ['CV', 'Text_Generation', 'YOLO']
  },
  {
    id: 12,
    title: '🏠 3D로 미리보는 내 자취방',
    description: '3D Reconstruction을 활용한 자취방 3D 구현',
    key: '05',
    linkURL: 'temp',
    link_thumb: '14ktk2ODGwDryp6VPL_QXHCle6cuhbV_R',
    tags: ['3D_Reconstruction', 'CV', 'Regression']
  },
  {
    id: 13,
    title: '🗑️ 무단투기 멈춰!',
    description: 'YOLOv5를 활용한 CCTV 쓰레기 무단 투기 감지',
    key: '05',
    linkURL: 'temp',
    link_thumb: '1e1MBJ-suq_HL_Rf_7RooGDDAGCeOHXNV',
    tags: ['CV', 'Object_Tracking', 'YOLO']
  },
  {
    id: 14,
    title: '📚 선배, 추리소설 추천해주세요! 그래. 그럼 스릴러도 같이?!',
    description: 'GNN 기반 맞춤형 책 추천 시스템',
    key: '05',
    linkURL: 'temp',
    link_thumb: '13Y8r0qiaCiHV_mGRdT9kB7H7pf2Gv5MT',
    tags: ['GNN', 'Recommendation']
  },
  {
    id: 15,
    title: '💕 2D 남친 사귀기',
    description: 'XTTS와 Aniportrait을 이용한 가상 AI 아바타 만들기',
    key: '05',
    linkURL: 'temp',
    link_thumb: '1fz4Yi5AQlzSXY8VHhpeZ2J6EnkNXxqaQ',
    tags: ['Audio2Video', 'RAG', 'TTS']
  }
]);

const filteredPosts = ref([]);


const activeTab = ref('06'); // 초기값은 06

// const postList = ref([
// ])

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
  if(!newTab) {
    filteredPosts.value = postList.value;
    return;
  }
  filteredPosts.value = postList.value.filter((post) => post.key === newTab);

  // if (newTab) {
  //   await getPosts();
  // } else {
  //   postList.value = []; // activeTab이 비활성화되면 빈 배열로 초기화
  // }
});

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

onMounted(async() => {
	filteredPosts.value = postList.value.filter((post) => post.key === activeTab.value);
  // await getPosts();
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