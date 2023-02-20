<template>
  <NavBar></NavBar>
  <MainBanner></MainBanner>

  <div class="container mx-auto py-16 md:py-24">
    <div class="mb-20">
      <p class="font-bold text-4xl md:text-6xl mb-9">Prometheus</p>
      <p class="text-left md:text-right text-sm">
        프로메테우스는 인공지능으로 가치있는 무언가를 만들고자 합니다
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-9 lg:gap-12">
      <div class="w-full">
        <div
          class="rounded-md w-full bg-[url('@/assets/images/class.png')] bg-center bg-cover pb-[55%] mb-9"
        ></div>
        <div class="text-left">
          <p class="font-bold text-2xl mb-3">고등학교 코딩 교육</p>
          <p>
            프로그래밍은 상상하는 바를 가장 빠르게 구현할 수 있는 도구 중
            하나입니다. <br class="hidden md:inline" />프로메테우스는 10대들에게
            도움이 되고자 2022년 7월, 양재고등학교를 시작으로 학생들에게 코딩과
            인공지능 교육을 하고 있습니다.
          </p>
        </div>
      </div>
      <div class="w-full">
        <div
          class="rounded-md w-full bg-[url('@/assets/images/study.jpeg')] bg-center bg-cover pb-[55%] mb-9"
        ></div>
        <div class="text-left">
          <p class="font-bold text-2xl mb-3">스터디&프로젝트</p>
          <p>
            각 분야별로 팀을 꾸려 문제를 정의하고 인공지능으로 해결합니다.
            <br class="hidden md:inline" />인공지능을 어떻게 활용할지 끊임없이
            고민하며 사고력과 응용력을 키웁니다.
          </p>
        </div>
      </div>
      <div class="md:col-span-2 w-full">
        <div
          class="relative rounded-md max-w-lg bg-gray-100 bg-center bg-cover mb-9 mx-auto"
        >
          <img
            src="@/assets/images/hackathon.jpeg"
            class="w-full bg-gray-300 mb-5 rounded-md mx-auto"
          />
        </div>
        <div class="text-center md:mx-auto w-full md:w-max">
          <p class="font-bold text-2xl mb-3">인공지능 해커톤 개최</p>
          <nuxt-link to="/hackathon" class="font-medium text-red-700"
            >참가신청하기</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>

  <div class="bg-slate-100 relative overflow-hidden">
    <img
      class="block absolute w-full min-w-[2000px] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
      src="@/assets/images/activity_back.svg"
    />
    <div class="container py-16 md:py-24 mx-auto relative z-10">
      <div class="text-center mb-14 md:mb-20">
        <p class="font-bold text-4xl md:text-6xl mb-5">ACTIVITIES</p>
        <p class="mb-5">정기모임/세미나/프로젝트/친목활동/MT</p>
        <nuxt-link to="/recruit" class="font-medium text-red-700"
          >더 알아보기
          <!-- <font-awesome-icon icon="fa-solid fa-angle-right" /> -->
        </nuxt-link>
      </div>

      <!-- <div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-9 relative z-10">
        <div v-for="index in gallary_list.length" :key="index" class="rounded-md inline-block w-full mb-8 bg-center bg-cover" :style="{height: get_random_height(), backgroundImage: get_gallary(shuffle_gallary[index-1])} "></div>
      </div> -->
      <div
        class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-9 relative z-10"
      >
        <div
          class="rounded-md inline-block w-full mb-8 bg-center bg-cover bg-[url('@/assets/images/gallary/1.jpeg')]"
          :style="{ height: get_random_height() }"
        ></div>
        <div
          class="rounded-md inline-block w-full mb-8 bg-center bg-cover bg-[url('@/assets/images/gallary/2.jpeg')]"
          :style="{ height: get_random_height() }"
        ></div>
        <div
          class="rounded-md inline-block w-full mb-8 bg-center bg-cover bg-[url('@/assets/images/gallary/3.jpeg')]"
          :style="{ height: get_random_height() }"
        ></div>
        <div
          class="rounded-md inline-block w-full mb-8 bg-center bg-cover bg-[url('@/assets/images/gallary/4.jpeg')]"
          :style="{ height: get_random_height() }"
        ></div>
        <div
          class="rounded-md inline-block w-full mb-8 bg-center bg-cover bg-[url('@/assets/images/gallary/5.jpeg')]"
          :style="{ height: get_random_height() }"
        ></div>
        <div
          class="rounded-md inline-block w-full mb-8 bg-center bg-cover bg-[url('@/assets/images/gallary/6.jpeg')]"
          :style="{ height: get_random_height() }"
        ></div>
        <div
          class="rounded-md inline-block w-full mb-8 bg-center bg-cover bg-[url('@/assets/images/gallary/7.jpeg')]"
          :style="{ height: get_random_height() }"
        ></div>
        <div
          class="rounded-md inline-block w-full mb-8 bg-center bg-cover bg-[url('@/assets/images/gallary/8.jpeg')]"
          :style="{ height: get_random_height() }"
        ></div>
        <div
          class="rounded-md inline-block w-full mb-8 bg-center bg-cover bg-[url('@/assets/images/gallary/9.jpeg')]"
          :style="{ height: get_random_height() }"
        ></div>
        <div
          class="rounded-md inline-block w-full mb-8 bg-center bg-cover bg-[url('@/assets/images/gallary/10.jpeg')]"
          :style="{ height: get_random_height() }"
        ></div>
        <div
          class="rounded-md inline-block w-full mb-8 bg-center bg-cover bg-[url('@/assets/images/gallary/11.jpeg')]"
          :style="{ height: get_random_height() }"
        ></div>
        <div
          class="rounded-md inline-block w-full mb-8 bg-center bg-cover bg-[url('@/assets/images/gallary/12.jpeg')]"
          :style="{ height: get_random_height() }"
        ></div>
      </div>
    </div>
  </div>

  <div class="container mx-auto py-16 md:py-24">
    <div class="text-center mb-14 md:mb-20">
      <p class="font-bold text-4xl md:text-6xl mb-5">Blog</p>
      <p class="mb-5">프로메테우스 기술 블로그</p>
      <nuxt-link to="/blog" class="font-medium text-red-700"
        >더 알아보기
        <!-- <font-awesome-icon icon="fa-solid fa-angle-right" /> -->
      </nuxt-link>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
      <div v-for="article in recent_articles" :key="article.id" class="w-full">
        <!-- <div class="w-full bg-gray-100 pb-[55%] mb-5 rounded-md relative">
          <p class="text-xl font-bold text-gray-500 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">Coming Soon</p>
        </div> -->
        <div class="text-left">
          <p class="font-medium text-2xl mb-3">{{ article.name }}</p>
          <p class="max-h-12 text-ellipsis overflow-hidden">
            {{ article.article }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <Footer></Footer>
</template>

<script>
import { useAuth } from "@/store";

export default {
  name: "HomeView",
  components: {},
  data: () => ({
    gallary_list: [
      "1.jpeg",
      "2.jpeg",
      "3.jpeg",
      "4.jpeg",
      "5.jpeg",
      "6.jpeg",
      "7.jpeg",
      "8.jpeg",
    ],
    recent_articles: null,
  }),
  methods: {
    get_random_height() {
      return Math.floor(Math.random() * 300) + 300 + "px";
    },
    get_gallary(name) {
      return `url('@/assets/images/gallary/${name}')`;
    },
    get_recent_articles() {
      $fetch(`${import.meta.env.VITE_API_URL}/article`, {
        method: "GET",
        headers: {
          Authorization: useAuth().$state.accessToken,
        },
      })
        .then((result) => {
          this.recent_articles = result
            .sort((a, b) => (a.created_date > b.created_date ? -1 : -1))
            .slice(0, 3);
        })
        .catch((result) => {});
    },
  },
  computed: {
    shuffle_gallary() {
      this.gallary_list.sort(() => Math.random() - 0.5);
      return this.gallary_list;
    },
  },
  mounted() {
    this.get_recent_articles();
  },
};
</script>
