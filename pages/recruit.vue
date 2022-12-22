<template>
  <NavBar></NavBar>

  <div class="container mx-auto pt-32 md:pt-48">
    <div>
      <p class="font-bold text-4xl md:text-6xl mb-9">Recruit</p>
      <p class="text-left md:text-right text-sm">프로메테우스의 기반을 튼튼히 다지고 함께 성장할 동료를 모집하고 있습니다.</p>
    </div>
  </div>
  <div class="container mx-auto py-16 md:py-24">
    <div class="flex flex-wrap items-center rounded-md bg-slate-100 md:h-80 p-10">
      <div class="flex-1 text-center">
        <p class="font-bold text-2xl mb-9">프로메테우스 2기 가입 신청</p>
        <p class="mb-9">프로메테우스는 대학생 최고의 인공지능 커뮤니티가 되기 위해 함께 성장할 동료를 모집하고 있습니다. <br>도전과 열정이 어울리는 당신이라면 대학생 인공지능 단체 프로메테우스와 함께 해주십시오.</p>
        <a href="#" class="rounded-md px-5 py-2 text-lg text-medium bg-red-100 text-red-900">가입 기간이 종료됐습니다</a> 
      </div> 
    </div>
  </div>
  <div class="container mx-auto py-16 md:py-24">
    <div class="text-center mb-14 md:mb-20">
      <p class="font-bold text-4xl md:text-6xl mb-5">모집 개요</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-9 ">
      <div class="w-full bg-slate-100 rounded-md p-10">
        <div>
          <p class="font-bold text-2xl mb-9">지원 자격</p>
          <ul class="ml-5 list-disc list-outside">
            <li>인공지능에 관심과 열정이 있는 모든 대학생</li>
            <li>프로메테우스와 함께 새로운 인공지능에 대해 탐구하고 스터디를 진행하며 프로젝트를 수행할 분</li>
          </ul>
        </div>
      </div>
      <div class="w-full bg-slate-100 rounded-md p-10">
        <div>
          <p class="font-bold text-2xl mb-9">활동 내용</p>
          <ul class="ml-5 list-disc list-outside">
            <li>고등학생 대상 프로그래밍 교육</li>
            <li>인공지능 스터디 & 프로젝트</li>
          </ul>
        </div>
      </div>
      <div class="w-full bg-slate-100 rounded-md p-10">
        <div>
          <p class="font-bold text-2xl mb-9">모집 인원</p>
          <p>20명 내외</p>
        </div>
      </div>
    </div>
  </div>
  <div class="container mx-auto py-16 md:py-24">
    <div class="text-center mb-14 md:mb-20">
      <p class="font-bold text-4xl md:text-6xl mb-5">모집 일정</p>
    </div>
    <div class="grid grid-cols-1 xl:grid-cols-4 gap-9 ">
      <div class="w-full bg-slate-100 rounded-md p-10">
        <div>
          <p class="font-bold text-2xl mb-5">서류 접수</p>
          <p class="mb-2">서류 면접 설명</p>
          <p class="font-medium">2022.08.10 ~ 2022.08.19</p>
        </div>
      </div>
      <div class="w-full bg-slate-100 rounded-md p-10">
        <div>
          <p class="font-bold text-2xl mb-5">서류 결과 통보</p>
          <p class="mb-2">개별 면접 일정 조정 설명</p>
          <p class="font-medium">2022. 08. 20 ~ 2022. 08. 23</p>
        </div>
      </div>
      <div class="w-full bg-slate-100 rounded-md p-10">
        <div>
          <p class="font-bold text-2xl mb-5">개별 면접</p>
          <p class="mb-2">개별 면접 설명</p>
          <p class="font-medium">2022. 08. 24 ~ 2022. 08. 25</p>
        </div>
      </div>
      <div class="w-full bg-slate-100 rounded-md p-10">
        <div>
          <p class="font-bold text-2xl mb-5">최종 합격자 발표</p>
          <p class="mb-2">최종 합격자 발표 설명</p>
          <p class="font-medium">2022. 08. 28</p>
        </div>
      </div>
    </div>
  </div>
  <div class="container mx-auto py-16 md:py-24">
    <div class="text-center mb-14 md:mb-20">
      <p class="font-bold text-4xl md:text-6xl mb-5">FAQ</p>
      <p class="mb-5">자주 묻는 질문</p>
    </div>
    <div class="grid grid-cols-1 gap-5">
      <div v-for="(item, index) in faq" class="w-full bg-slate-100 rounded-md p-10 cursor-pointer" @click="openFaq(index, !faq[index].on)">
        <div>
          <div class="flex justify-between items-center  gap-x-5 font-bold md:text-2xl">
            <p>{{item.title}}</p>
            <!-- <font-awesome-icon v-if="!item.on"  icon="fa-solid fa-angle-down" /> -->
            <!-- <font-awesome-icon v-if="item.on" icon="fa-solid fa-angle-up" /> -->
          </div>
          <p v-if="item.on && Array.isArray(item.value)" class="mt-5">
            <ul class="ml-5 list-disc list-outside">
              <li class="pb-2" v-for="line in item.value">{{line}}</li>
            </ul>
          </p>
          <p v-else-if="item.on" class="mt-5">{{ item.value}}</p>
        </div>
      </div>
    </div>
  </div>

  <Footer></Footer>
</template>

<script>
export default {
  name: 'RecruitView',
  components: {},
  data: () => ({
    faq: [
      {
        "title" : "프로메테우스에 가입하기 위한 조건이 있나요?",
        "value" : "파이썬 기초 문법을 알고 직접 사용할 수 있는 분들은 모두 지원 가능합니다. 인공지능과 관련된 경험이 없더라도 인공지능에 대한 흥미나 관심이 있는 분들도 지원 가능합니다."
      },
      {
        "title" : "정기 회의는 어떤 방식으로 진행되나요?",
        "value" : "각 분야별로 2주간 스터디를 진행합니다. 2주 동안의 스터디 과정과 결과물을 조장이 격주마다 진행되는 정기 회의 시간에 발표합니다. "
      },
      {
        "title" : "정기 회의 외에 프로메테우스에서 진행하는 활동이 있나요?",
        "value" : [
          "프로메테우스에서는 스터디 외에도 다양한 인공지능 박람회/세미나 등에 참여합니다. 해당 프로그램들에 참여하여 인공지능 관련 지식을 넓혀갑니다. 프로메테우스 1기에서는 4월 COEX AI EXPO에 참가하여 다양한 AI 기술을 체험하고 관람했습니다.",
          "프로메테우스에서는 부원들과 MT를 통해 부원들간에 화합과 협력을 도모합니다. 다양한 프로그램을 기획하여 부원들과의 친목을 다지기도 합니다.",
          "스터디 외에도 다양한 프로젝트를 통해 인공지능을 실제로 경험하고 견문을 넓힙니다."
        ]
      }
    ]
  }),
  methods: {
    openFaq(index, value){
      this.faq[index].on = value
    }
  },
}
</script>
