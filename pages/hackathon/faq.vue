<template>
  <div class="bg-black text-white">
    <div class="pt-10 pb-32">
      <div class="flex flex-col container mx-auto">
        <h1 class="mb-2 text-3xl md:text-5xl font-bold">자주 묻는 질문</h1>
        <p class="text-xs md:text-lg mb-8 font-light">아래 사항 중 해당하는 내용이 없다면, '문의하기' 버튼을 눌러주세요.</p>
        <a class="mx-2 text-center transition-transform transform hover:scale-105 focus:outline-none md:font-semibold px-3 py-1 md:px-5 md:py-2 bg-red-500 rounded text-sm md:text-lg text-base ml-auto mb-4 right-0 cursor-pointer" href="https://open.kakao.com/o/g8KFfgYf">문의하기</a>
        <div class="grid grid-cols-5 font-semibold" v-for="(category, categoryName) in faq" :key="categoryName">
          <div class="pt-1 border-t col-span-5"></div>
          <div class="mr-2 justify-self-center mt-1 row-span-3">
            <h2 class="justify-self-center self-center text-lg md:text-2xl">{{ categoryName }}</h2>
          </div>
          <div class="flex flex-col col-span-4 text-base font-light pb-1">
            <div @click="openFaq(categoryName, index)" :class="{'bg-neutral-600 hover:bg-neutral-500 border-b border-black' : item.on, 'hover:bg-neutral-700': !item.on }" class="p-1 cursor-pointer" v-for="(item, index) in category" :key="index">

              <div class="flex">
                <!-- <font-awesome-icon v-if="item.on" class="mr-2 mt-1" icon="fa-solid fa-angle-down" />
                <font-awesome-icon v-if="!item.on" class="mr-2  mt-1" icon="fa-solid fa-angle-up" /> -->
                <h3 class="mb-2 font-semibold">Q. {{ item.title }}</h3>
 
              </div>
              
                  
              <p class="text-sm" v-if="item.on">A. {{ item.value }}</p>
            </div>
          </div>
          
        </div>
        <div class="py-1 border-t col-span-5"></div>
      </div>
    </div>
	</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
const type = "thumbs"


const postList = ref([])

const getPosts = async () => {
  try {
    const response = await $api(`${import.meta.env.VITE_API_URL}/post/get_posts`, {
      method: 'GET',
    });
		console.log(response);
    postList.value = response;
  } catch (error) {
		console.error(error)
  }
}

const currentTab = ref('news');

const changeTab = (tab) => {
  currentTab.value = tab;
};

const faq = ref({
  "대회 신청" : [
    {
      title: '해커톤 참가에 필요한 비용이 있나요?',
      value: '아니요, 없습니다. 프로메테우스 해커톤은 무료로 참가하실 수 있습니다.',
      on: false,
    },
    {
      title: '이전 회차 참가자 및 수상자도 참여 가능한가요?',
      value: '이전 회차 참가자 및 수상자도 참여가능합니다. 다만, 이전 회차에서 제출하셨던 제출물과 수상작은 다시 제출하실 수 없습니다.',
      on: false,
    },
    {
      title: '참가 대상은 누구인가요?',
      value: '인공지능에 관심있는 대학생 및 대학원생은 모두 참가 가능합니다! 휴학생 및 수료생 모두 가능합니다.',
      on: false,
    },
  ],

  "팀빌딩" : [
    {
      title: '개인 지원도 가능한가요?',
      value: '아니요, 개인 지원은 불가합니다. 최소 4~5명의 인원으로 팀원을 구성하셔서 지원해주셔야 합니다.',
      on: false,
    },
    {
      title: '팀원은 어떻게 모집할 수 있나요?',
      value: '팀원 모집은 직접 팀원을 구하시거나, 프로메테우스 해커톤 홈페이지 내에 있는 ‘팀빌딩’ 게시판을 활용하여 팀원 모집을 진행하실 수 있습니다.',
      on: false,
    },
    {
      title: '팀원 구성에 대한 조건이 있나요?',
      value: '4~5명의 인원으로 팀원을 구성하셔야 하며, 최소 1명 이상의 기획자, 개발자, 디자이너가 포함되어야 합니다. ',
      on: false,
    },
  ],
  "예선" : [
    {
      title: '예선에서는 어떤 기준으로 심사하나요?',
      value: '예선은 각 팀별로 제출한 기획안을 바탕으로 심사합니다.',
      on: false,
    },
    {
      title: '신청 이후 예선기간에는 팀을 변경하거나 추가할 수 있나요?',
      value: '팀 신청 이후 예선 기간 중에는 팀원 변경 및 추가가 가능합니다. 그러나 예선 기획안 제출 이후에는 팀원 변동이 불가합니다.',
      on: false,
    },
    {
      title: '예선 결과는 언제 발표되나요?',
      value: '프로메테우스 홈페이지에 1월 31일 오전 11시에 발표됩니다.',
      on: false,
    },
  ],
  "본선" : [
    {
      title: '본선에서는 어떤 기준으로 심사하나요?',
      value: '본선에서는 기획안과 앱, 웹 프로토타입을 바탕으로 심사합니다. 세부 기준은 예선 직후 공지드릴 예정입니다.',
      on: false,
    },
    {
      title: '본선에서는 다른 팀들과 교류할 수 있는 기회가 있나요?',
      value: '본선에서 간단한 레크레이션, 교류 평가 등 팀끼리 교류할 수 있는 시간이 마련 되어있습니다.',
      on: false,
    },
    {
      title: '본선 진행 중에 멘토링 기회가 주어지나요?',
      value: '본선에서는 프로메테우스 해커톤 파트너십 회사들의 VC, 개발 멘토링이 진행됩니다. 확정된 멘토단과 멘토링 일정은 추후 공지해드리겠습니다.',
      on: false,
    },
    {
      title: '본선 진행 중에 기존에 진행하던 프로젝트 내용을 수정 또는 변경해도 괜찮나요?',
      value: '프로메테우스 해커톤은 멘토님들의 피드백을 반영하여 프로젝트를 발전시킬 수 있는 환경을 제공하고 있습니다. 본선에서도 참가자분들은 프로젝트를 지속적으로 수정 및 업데이트 할 수 있습니다.',
      on: false,
    },
  ],
  "기타" : [
    {
      title: '본선 장소에서 주차가 가능한가요?',
      value: '주차는 불가능합니다.',
      on: false,
    },
  ],
})

const authStore = useAuthStore();

const openFaq = (category, index) => {
  faq.value[category][index].on = !faq.value[category][index].on;
};

onMounted(async() => {
	await getPosts();
})
</script>

