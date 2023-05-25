<template>
  <div class="container mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">지원하기</p>
      <p class="font-medium text-gray-600 text-xl text-gray-600">함께 성장해갈 동료를 모집합니다</p>
    </div>

    <div class="flex flex-wrap items-center rounded bg-slate-100 md:h-80 p-10 mb-20">
      <div class="flex-1 text-center">
        <p class="font-bold text-2xl mb-9">프로메테우스 3기 가입 신청</p>
        <p class="mb-9">프로메테우스는 대학생 최고의 인공지능 커뮤니티가 되기 위해 함께 성장할 동료를 모집하고 있습니다. <br>도전과 열정이 어울리는 당신이라면 대학생 인공지능 단체 프로메테우스와 함께 해주십시오.</p>
        <a href="#" class="rounded px-5 py-2 text-lg text-medium bg-red-100 text-red-900">가입 기간이 종료됐습니다</a> 
      </div> 
    </div>

    <div class="text-center mb-14">
      <p class="font-bold text-4xl">모집 개요</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-9 mb-20">
      <div class="w-full bg-slate-100 rounded p-10">
        <div>
          <p class="font-bold text-2xl mb-9">지원 자격</p>
          <ul class="ml-5 list-disc list-outside">
            <li>새로운 도전에 대한 열정을 지닌 대학생</li>
            <li>다양한 학교의 인재들이 모인 곳에서 동료와 멘토를 찾고싶은 대학생</li>
            <li>인공지능에 관심과 열정을 지닌 대학생</li>
            <li>직접 회사를 찾아가고 기업 미팅을 경험하고 싶은 대학생</li>
            <li>해커톤 행사를 기획하고 진행에 참여하고 싶은 대학생</li>
            <li>대학시절 의미있는 경험과 추억을 만들고 싶은 대학생</li>
          </ul>
        </div>
      </div>
      <div class="w-full bg-slate-100 rounded p-10">
        <div>
          <p class="font-bold text-2xl mb-9">활동 내용</p>
          <ul class="ml-5 list-disc list-outside">
            <li>고등학생 대상 프로그래밍(파이썬) 및 인공지능 기초 교육 봉사 활동</li>
            <li>인공지능 기초 스터디 진행 [python Numpy, Pandas, EDA, CNN 등 인공지능 학습에 필요한 기초 지식]</li>
            <li>내부 해커톤 및 데모데이</li>
            <li>PROMETHEUS STARTUP HACKATHON 2024 해커톤 대회 개최 예정</li>
            <li>친목 도모/ MT / 뒷풀이 등</li>
          </ul>
        </div>
      </div>
      <div class="w-full bg-slate-100 rounded p-10">
        <div>
          <p class="font-bold text-2xl mb-9">기타</p>
          <p class="font-medium text-xl mb-2">모집 인원</p>
          <p>30명 내외</p>
          <br/>
          <p class="font-medium text-xl mb-2">대면 OT</p>
          <p>3/5(일) (장소 추후 공지 예정)</p>
          <br/>
        </div>
      </div>
    </div>

    <div class="text-center mb-14">
      <p class="font-bold text-4xl mb-5">모집 일정</p>
    </div>
    <div class="grid grid-cols-1 xl:grid-cols-4 gap-9 mb-20">
      <div class="w-full bg-slate-100 rounded p-10">
        <div>
          <p class="font-bold text-2xl mb-5">모집 기한</p>
          <!-- <p class="mb-2">서류 면접 설명</p> -->
          <p class="font-medium">2/8(수) ~ 2/18(일)</p>
        </div>
      </div>
      <div class="w-full bg-slate-100 rounded p-10">
        <div>
          <p class="font-bold text-2xl mb-5">서류 합격자 발표</p>
          <!-- <p class="mb-2">개별 면접 일정 조정 설명</p> -->
          <p class="font-medium">2/21(화)</p>
        </div>
      </div>
      <div class="w-full bg-slate-100 rounded p-10">
        <div>
          <p class="font-bold text-2xl mb-5">면접 일정</p>
          <!-- <p class="mb-2">개별 면접 설명</p> -->
          <p class="font-medium">2/22(수) ~ 2/24(금)</p>
        </div>
      </div>
      <div class="w-full bg-slate-100 rounded p-10">
        <div>
          <p class="font-bold text-2xl mb-5">최종 합격자 발표</p>
          <!-- <p class="mb-2">최종 합격자 발표 설명</p> -->
          <p class="font-medium">2/27(월)</p>
        </div>
      </div>
    </div>

    <div class="text-center mb-14 md:mb-20">
      <p class="font-bold text-4xl">FAQ</p>
    </div>
    <div class="grid grid-cols-1 gap-5">
      <div v-for="(item, index) in faq" class="w-full bg-slate-100 rounded p-10 cursor-pointer" @click="openFaq(index, !faq[index].on)">
        <div>
          <div class="flex justify-between items-center  gap-x-5 font-bold md:text-2xl">
            <p>{{item.title}}</p>
            <font-awesome-icon v-if="!item.on"  icon="fa-solid fa-angle-down" />
            <font-awesome-icon v-if="item.on" icon="fa-solid fa-angle-up" />
          </div>
          <p v-if="!item.on && Array.isArray(item.value)" class="mt-5">
            <ul class="ml-5 list-disc list-outside">
              <li class="pb-2" v-for="line in item.value">{{line}}</li>
            </ul>
          </p>
          <p v-else-if="!item.on" class="mt-5">{{item.value}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecruitView',
  components: {},
  data: () => ({
    faq: [
      {
        "title" : "프로메테우스에 가입하기 위한 조건이 있나요?",
        "value" : "파이썬 기초 문법을 알고 직접 사용할 수 있는 분들은 모두 지원 가능합니다. 인공지능과 관련된 경험이 없더라도 인공지능에 대한 흥미와 관심이 있는 분, '업'에 대한 열정이 있는분들을 모두 환영합니다."
      },
      {
        "title" : "정기모임은 어떤 방식으로 진행되나요?",
        "value" : "매 달(시험기간 제외) 한번씩 모여 스터디와 프로젝트의 진행상황과 동아리 공지사항을 발표하는 시간을 가집니다."
      },
      {
        "title" : "정기모인 외에 프로메테우스에서 진행하는 활동이 있나요?",
        "value" : [
          "프로메테우스는 단순 프로그래밍 동아리는 아닙니다! 스터디와 프로젝트 외에 다양한 인공지능 공모전과 박람회에 참여합니다.",
          "여름방학 기간에 고등학생 대상 프로그래밍 교육봉사를 진행합니다.",
          "매 년 프로메테우스 스타트업 해커톤을 주최합니다."
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
