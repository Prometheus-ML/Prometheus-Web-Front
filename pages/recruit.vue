<template>
  <div class="bg-black">
    <div class="text-white custom mx-auto pt-40 pb-24">
      <div class="mb-14">
        <p class="font-bold text-4xl md:text-5xl mb-5">지원하기</p>
        <p class="font-medium text-gray-600 text-xl text-neutral-200">함께 성장해갈 동료를 모집합니다</p>
      </div>

      <div class="flex flex-wrap items-center rounded bg-neutral-800 md:h-40 p-10 mb-20">
        <div class="flex-1 text-center">

          
          <p class="font-bold text-2xl mb-9">프로메테우스 5기 가입 신청</p>
          <p>모집 기간이 아닙니다.</p>
          <!-- <a href="https://forms.gle/5QoNgoTt4dUKMV5S6" class="rounded px-5 py-2 text-base font-medium bg-rose-100 text-rose-900 hover:bg-red-200 hover:text-white">지원하기</a>  -->
        </div> 
      </div>
      
      
      <div class="relative mb-48">
        <p class="mx-auto text-center text-rose-500 font-light text-xl mb-1">Target</p>
        <p class="mx-auto text-center font-semibold text-4xl mb-16">모집 대상</p>
        <div class="grid grid-cols-2 gap-5">
          <div class="p-5 bg-neutral-800 rounded-xl justify-items-center">
            <font-awesome-icon class="text-2xl" :icon="['fas', 'screwdriver-wrench']" />
            <p class="font-semibold text-3xl">ML/DL Engineer</p>
            <p>인공지능 프로젝트에 관심이 있는 대학생</p>
          </div>
          <div class="p-5 bg-neutral-800 rounded-xl justify-items-center">
            <font-awesome-icon class="text-2xl" :icon="['fas', 'flask-vial']" />
            
            <p class="font-semibold text-3xl">ML/DL Researcher</p>
            <p>인공지능 논문 스터디에 관심이 있는 대학생</p>
          </div>
        </div>
      </div>

      <div class="relative mb-48">
        <p class="mx-auto text-center text-rose-500 font-light text-xl mb-1">Division</p>
        <p class="mx-auto text-center font-semibold text-4xl mb-16">모집 구분</p>
        <div class="grid grid-cols-3 gap-5">
          <div class="p-5 bg-neutral-800 rounded-xl text-center">   

            <font-awesome-icon class="text-rose-500 text-xl md:text-2xl" :icon="['fas', 'fire']"/>
              
            <p class="font-semibold text-lg md:text-3xl mb-1">Beginner</p>
            <p class="text-xs md:text-base">인공지능을 처음 접하고, 파이썬에 대한 기초지식이 있는 사람</p>
          </div>

          <div class="p-5 bg-neutral-800 rounded-xl text-center">
            <font-awesome-icon class="text-rose-500 text-xl md:text-2xl" :icon="['fas', 'fire']"/>   
            <font-awesome-icon class="text-rose-500 text-xl md:text-2xl" :icon="['fas', 'fire']"/>      

            <p class="font-semibold text-lg md:text-3xl mb-1">Junior</p>
            <p class="text-xs md:text-base" >인공지능에 대한 기초지식이 있고, 프로젝트를 진행해보고 싶은 사람</p>
          </div>
          <div class="p-5 bg-neutral-800 rounded-xl text-center"> 
            <font-awesome-icon class="text-rose-500 text-xl md:text-2xl" :icon="['fas', 'fire']"/>      
            <font-awesome-icon class="text-rose-500 text-xl md:text-2xl" :icon="['fas', 'fire']"/> 
            <font-awesome-icon class="text-rose-500 text-xl md:text-2xl" :icon="['fas', 'fire']"/>     
            <p class="font-semibold text-lg md:text-3xl mb-1">Senior</p>
            <p class="text-xs md:text-base">인공지능 프로젝트를 진행해본 적이 있거나, 논문 리딩에 수월한 사람</p>
          </div>
        </div>
      </div>

      <div class="relative mb-48">
        <p class="mx-auto text-center text-rose-500 font-light text-xl mb-1">Activities</p>
        <p class="mx-auto text-center font-semibold text-4xl mb-16">5기 활동 계획</p>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-5">
          <div class="p-5 bg-neutral-800 rounded-xl text-center">   
            <p class="font-semibold text-xl md:text-2xl mb-2">정기세미나</p>
            <p class="md:text-base text-xs">프로메테우스는 프로젝트와 스터디 진행 상황을 정기세미나를 통해 발표합니다.</p>
          </div>
          <div class="relative p-5 bg-neutral-800 rounded-xl text-center">       
            <p class="font-semibold text-xl md:text-2xl mb-2">내부 해커톤</p>
            <p class="md:text-base text-xs">프로메테우스는 동아리 자체적으로 내부 해커톤을 진행합니다.</p>
          </div>
          <div class="p-5 bg-neutral-800 rounded-xl text-center">             

            <p class="font-semibold text-xl md:text-2xl mb-2">교육봉사</p>
            <p class="md:text-base text-xs">프로메테우스는 중·고등학생을 대상으로 정기 교육봉사를 진행합니다.</p>
          </div>

          <div class="p-5 bg-neutral-800 rounded-xl text-center">             
            <p class="font-semibold text-xl md:text-2xl mb-2">친목행사</p>
            <p class="md:text-base text-xs">프로메테우스는 MT·불꽃놀이·뒤풀이를 진행하며 동아리원들간의 적극적인 네트워킹을 장려합니다.</p>
          </div>
          <div class="p-5 bg-neutral-800 rounded-xl text-center">           
            <p class="font-semibold text-xl md:text-2xl mb-2">데모데이</p>
            <p class="md:text-base text-xs">프로메테우스는 한 학기동안 진행한 프로젝트에 대하여 최종 발표와 프로토타입을 시연합니다.</p>
          </div>
          <div class="p-5 bg-neutral-800 rounded-xl text-center">           
            <p class="font-semibold text-xl md:text-2xl mb-2">외부 해커톤</p>
            <p class="md:text-base text-xs" >프로메테우스는 매년 겨울에 외부 해커톤을 개최하여 기회의 장을 열고 있습니다.</p>
          </div>
        </div>
      </div>

      <div class="relative mb-48">
        <p class="mx-auto text-center text-rose-500 font-light text-xl mb-1">Schedule</p>
        <p class="mx-auto text-center font-semibold text-4xl mb-16">면접 일정</p>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-5">
          <div class="p-5 bg-neutral-800 rounded-xl text-center">   
            <p class="font-semibold text-lg md:text-2xl mb-1">모집 기간</p>
            <p class="text-xs md:text-base">2.11(일)-2.20(화)</p>
          </div>

          <div class="p-5 bg-neutral-800 rounded-xl text-center">   
            <p class="font-semibold text-lg md:text-2xl mb-1">면접 대상자 공지</p>
            <p class="text-xs md:text-base">2.23(금)</p>
          </div>
          <div class="p-5 bg-neutral-800 rounded-xl text-center">   
            <p class="font-semibold text-lg md:text-2xl mb-1">면접</p>
            <p class="text-xs md:text-base">2.26(월)-2.28(수)</p>
          </div>
          <div class="p-5 bg-neutral-800 rounded-xl text-center">   
            <p class="font-semibold text-lg md:text-2xl mb-1">최종 합격자 공지</p>
            <p class="text-xs md:text-base">3.1(금)</p>
          </div>
          <div class="p-5 col-span-2 bg-neutral-800 rounded-xl text-center">   
            <p class="font-semibold text-lg md:text-2xl mb-1">5기 OT</p>
            <p class="text-xs md:text-base">3.2(토)</p>
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

	
	
const faq = ref([
  {
    title: '프로메테우스에 가입하기 위한 조건이 있나요?',
    value: '파이썬 기초 문법을 알고 직접 사용할 수 있는 분들은 모두 지원 가능합니다. 인공지능과 관련된 경험이 없더라도 인공지능에 대한 흥미와 관심이 있는 분, "업"에 대한 열정이 있는 분들을 모두 환영합니다.',
		on: false,
  },
  {
    title: '정기 모임은 어떤 방식으로 진행되나요? (시간과 장소는 어떻게 되나요?)',
    value: [
      '매 달(시험기간 제외) 초에 활동 기수 전원이 모여 스터디와 프로젝트의 진행 상황을 발표하고 운영진에서 동아리 공지사항을 전달합니다.',
      '시험 기간을 제외한 매 달 초 토요일 16:00~18:00에 진행하며 강남 모두의 연구소에서 진행합니다!',
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
</script>

<style>
.custom {
	max-width: 960px;
}
</style>