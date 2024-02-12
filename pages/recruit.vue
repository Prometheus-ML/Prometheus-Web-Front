<template>
  <div :style="{backgroundColor: 'rgb(23, 23, 23)'}">
    <div class="relative main">
      <img class="absolute w-full h-full bottom-16" src="@/assets/images/recruit.png" />
      <div class="absolute top-1/4 mb-14 w-full justify-center text-center">
        <p class="font-black text-4xl md:text-6xl mb-5">PROMETHEUS</p>
        <p class="my-20 font-semibold text-gray-600 text-xl md:text-3xl text-neutral-200">프로메테우스 5기 모집</p>

        <a href="https://forms.gle/ui1BWJ4Niu1fJ3XQ7" class="shadow-lg shadow-white/30 rounded-full px-8 py-2 text-lg md:text-xl font-semibold bg-white hover:opacity-80 text-black">지원하기</a> 

      </div>
    </div>
    
    <div class="text-white custom mx-auto pb-24" >
      
      <div class="relative mb-48">
        <p class="mx-auto text-center text-rose-500 font-light text-xl mb-1">Target</p>
        <p class="mx-auto text-center font-semibold text-4xl mb-16">모집 대상</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="mx-2 relative p-5 border border-neutral-700 rounded-xl text-center justify-items-center">
            <font-awesome-icon class="text-neutral-500 text-2xl absolute -top-2 left-1/2 -translate-x-1/2" :icon="['fas', 'screwdriver-wrench']" />
            <p class="font-semibold text-lg md:text-2xl">ML/DL Engineer</p>
            <p class="text-neutral-500 text-xs md:text-sm">인공지능 프로젝트에 관심이 있는 대학생</p>
          </div>
          <div class="mx-2 relative p-5 border border-neutral-700 rounded-xl text-center justify-items-center">
            <font-awesome-icon class="text-neutral-500 text-2xl absolute -top-2 left-1/2 -translate-x-1/2" :icon="['fas', 'flask-vial']" />
            
            <p class="font-semibold text-lg md:text-2xl">ML/DL Researcher</p>
            <p class="text-neutral-500 text-xs md:text-sm">인공지능 논문 스터디에 관심이 있는 대학생</p>
          </div>
        </div>
      </div>

      <div class="relative mb-48">
        <p class="mx-auto text-center text-rose-500 font-light text-xl mb-1">Division</p>
        <p class="mx-auto text-center font-semibold text-4xl mb-16">모집 구분</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="mx-2 grid grid-cols-3 md:grid-cols-1 p-5 bg-neutral-800 border border-neutral-300 shadow-lg shadow-white/30 rounded-2xl items-center text-center">   
            <img class="object-fit md:scale-110 scale-150" src="@/assets/images/beginner.png" />
            <div class="col-span-2">
              <p class="font-semibold text-lg md:text-2xl mb-2 md:mb-4">Beginner</p>
              <p class="text-xs md:base text-neutral-400">인공지능을 처음 접하고,<br> 파이썬에 대한 기초지식이 있는 사람</p>
            </div>
          </div>
          <div class="mx-2 grid grid-cols-3 md:grid-cols-1  p-5 bg-neutral-800 border border-neutral-300 shadow-lg shadow-white/30 rounded-2xl items-center text-center">
            <img class="object-fit md:scale-110 scale-150" src="@/assets/images/junior.png" />
            <div class="col-span-2">
              <p class="font-semibold text-lg md:text-2xl mb-2 md:mb-4">Junior</p>
              <p class="text-xs md:base text-neutral-400" >인공지능에 대한 기초지식이 있고,<br> 프로젝트를 진행해보고 싶은 사람</p>

            </div>
          </div>
          <div class="mx-2 grid grid-cols-3 md:grid-cols-1  p-5 bg-neutral-800 border border-neutral-300 shadow-lg shadow-white/30 rounded-2xl items-center text-center"> 
            <img class="object-fit md:scale-110 scale-150" src="@/assets/images/senior.png" />
            <div class="col-span-2">
              <p class="font-semibold text-lg md:text-2xl mb-2 md:mb-4">Senior</p>
              <p class="text-xs md:base text-neutral-400">인공지능 프로젝트를 진행해본 경험이<br>있고, 논문 리딩에 수월한 사람</p>

            </div>
          </div>
        </div>
      </div>

      <div class="relative mb-48">
        <p class="mx-auto text-center text-rose-500 font-light text-xl mb-1">Activities</p>
        <p class="mx-auto text-center font-semibold text-4xl mb-16">5기 활동 계획</p>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 mx-1">
          <div v-for="(activity, index) in activities" :key="index" class="p-5 bg-neutral-900 border border-neutral-300 shadow-lg shadow-white/30 rounded-2xl text-center">
            <p class="font-semibold text-lg md:text-2xl mb-4">{{ activity.title }}</p>
            <p class="text-xs md:base text-neutral-400">{{ activity.description }}</p>
          </div>
        </div>
      </div>


      <div class="relative mb-48">
        <p class="mx-auto text-center text-rose-500 font-light text-xl mb-1">Schedule</p>
        <p class="mx-auto text-center font-semibold text-4xl mb-16">면접 일정</p>
        <div class="rounded-2xl relative flex items-stretch flex-col">
					<div class="absolute rounded-t-full rounded-b-full top-1 bottom-1 left-1/2 transform -translate-x-1/2 w-3 bg-neutral-700">
						</div>
					<div v-for="(item, index) in schedule" :key="index" class="py-5 relative p-2 grid grid-cols-2">
						<!-- 왼쪽 내용 -->
						<div class="text-right pr-5">
							<p class="mb-1 font-semibold text-xl">{{ item.title }}</p>
						</div>
						<div class="text-left pl-5">
							<p class="mt-1">{{ item.date }}</p>
						</div>
						<div class="absolute py-6 left-1/2 transform -translate-x-1/2 p-3">
							<div class="relative w-6 h-6 rounded-full bg-neutral-700">
								<div class="absolute left-1/2 top-1/2 -translate-y-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full" :style="{backgroundColor: 'rgb(23, 23, 23)'}"></div>
							</div>
						</div>
					</div>
				</div>
      </div>

      <div class="relative mb-48">
        <p class="mx-auto text-center text-rose-500 font-light text-xl mb-1">FAQ</p>
        <p class="mx-auto text-center font-semibold text-4xl mb-16">자주 묻는 질문</p>
        <div class="grid grid-cols-1 gap-5">
          <div v-for="(item, index) in faq" class="w-full bg-neutral-800 rounded p-10 cursor-pointer" @click="openFaq(index, !faq[index].on)">
            <div>
              <div class="flex justify-between items-center gap-x-5 font-bold md:text-2xl">
                <p>{{item.title}}</p>
                <font-awesome-icon v-if="!item.on"  icon="fa-solid fa-angle-down" />
                <font-awesome-icon v-if="item.on" icon="fa-solid fa-angle-up" />
              </div>
              <p v-if="item.on && Array.isArray(item.value)" class="mt-5">
                <ul class="ml-5 list-disc list-outside">
                  <li class="pb-2" v-for="line in item.value">{{line}}</li>
                </ul>
              </p>
              <p v-else-if="item.on" class="mt-5">{{item.value}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>

const activities = [
  {
    title: "정기세미나",
    description: "프로메테우스는 매달 프로젝트 및 스터디 팀 별 현황을 공유하고 네트워킹을 위해 정기세미나를 진행합니다."
  },
  {
    title: "내부 해커톤",
    description: "프로메테우스 내부해커톤을 진행함으로써 동아리원의 개발역량 강화 및 협업 경험을 제공합니다."
  },
  {
    title: "교육봉사",
    description: "프로메테우스는 중·고등학생을 대상으로 정기 교육봉사를 진행합니다."
  },
  {
    title: "친목행사",
    description: "프로메테우스는 MT·불꽃놀이·뒤풀이를 진행하며 동아리원들간의 적극적인 네트워킹을 장려합니다."
  },
  {
    title: "데모데이",
    description: "프로메테우스는 한 학기동안 진행한 프로젝트에 대하여 최종 발표와 프로토타입을 시연합니다."
  },
  {
    title: "외부 해커톤",
    description: "프로메테우스는 매년 겨울, 외부 참가자들에게 기회의 장을 제공하기 위해 외부 해커톤을 개최합니다."
  }
];	
	
const faq = ref([
  {
    title: '프로메테우스에 지원하기 위한 조건이 있나요?',
    value: '파이썬 기초 문법을 알고 직접 사용할 수 있는 분들은 모두 지원 가능합니다. 인공지능과 관련된 경험이 없더라도 인공지능에 대한 흥미와 관심이 있는 분, "업"에 대한 열정이 있는 분들을 모두 환영합니다.',
		on: false,
  },
  {
    title: '정기 모임은 어떤 방식으로 진행되나요? (시간과 장소는 어떻게 되나요?)',
    value: [
      '매 달(시험기간 제외) 초에 활동 기수 전원이 모여 스터디와 프로젝트의 진행 상황을 발표하고 운영진에서 동아리 공지사항을 전달합니다.',
      '시험 기간을 제외한 매 달 한 번, 토요일 16:00~18:00에 진행하며 강남 모두의 연구소에서 진행합니다!',
    ],
		on: false,
  },
  {
    title: '프로그래밍에 대한 공부가 부족해도 지원할 수 있나요?',
    value: [
      '인공지능을 공부하기 위해서는 파이썬 코드를 읽고 해석할 수 있어야 합니다. 이론적인 내용을 이해하는데는 큰 문제가 없겠지만 실습할 때 기본적인 파이썬 문법을 일일이 알려드리기는 어렵습니다.',
      '파이썬 코드를 해석할 수 있고, 인공지능을 공부하면서 파이썬에 대한 공부를 병행할 수 있다면 지원하시면 좋습니다!',
    ],
		on: false,
  },
]);

const openFaq = (index, value) => {
  faq.value[index].on = value;
};

const schedule = [
  { title: "모집 기간", date: "2.11(일)-2.20(화)" },
  { title: "면접 대상자 공지", date: "2.23(금)" },
  { title: "면접", date: "2.26(월)-2.28(수)" },
  { title: "최종 합격자 공지", date: "3.1(금)" },
  { title: "5기 OT", date: "3.2(토)" }
];
</script>

<style>
.custom {
	max-width: 960px;
}

.main {
  height: 120vh;
}


</style>