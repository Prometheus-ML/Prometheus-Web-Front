<template>
  <div class="container mx-auto pt-40 pb-24">
    <!-- 탭 -->
    <div class="flex justify-center items-center p-6 text-2xl">
      <div class="flex flex-wrap md:gap-3 text-base md:text-xl justify-center">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{
            'font-bold': activeTab === tab.key,
            'text-gray-500 hover:text-gray-800': activeTab !== tab.key,
            'border-b-2 border-black': activeTab === tab.key,
          }"
          @click="navigateToTab(tab.key)"
          class="mr-5 cursor-pointer flex items-center"
        >
          <span class="mx-auto">{{ tab.name }}</span>
        </div>
      </div>
    </div>
		
    <!-- 멤버 리스트 -->
    <div>
      <div class="p-8">
        <ul class="flex flex-wrap justify-center gap-9">
          <li
            v-for="(member, index) in members"
            :key="index"
            class="w-24 md:w-64 text-center"
          >
            <div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
              <div
                :style="{ backgroundImage : `url(${member.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}" 
                class="w-full h-full object-cover rounded-full md:rounded"
              ></div>
            </div>
            <p class="text-lg md:text-xl mb-2 font-bold">{{ member.name }}</p>
            <p class="text-sm md:text-base mb-2 font-medium text-gray-600">{{ member.position }}</p>
            <p class="text-xs md:text-sm mb-2 text-gray-600">{{ member.major }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import t1 from "@/assets/images/member/1_001.jpeg";
import t2 from "@/assets/images/member/1_002.jpeg";
import t3 from "@/assets/images/member/1_003.jpeg";
import t4 from "@/assets/images/member/1_004.jpeg";
import t5 from "@/assets/images/member/1_005.jpeg";
import t6 from "@/assets/images/member/1_006.jpeg";
import t7 from "@/assets/images/member/1_007.jpeg";
import t8 from "@/assets/images/member/1_008.jpeg";
import t9 from "@/assets/images/member/1_009.jpeg";
import t10 from "@/assets/images/member/1_010.jpeg";
import t11 from "@/assets/images/member/1_011.jpeg";
import t12 from "@/assets/images/member/1_012.jpeg";
import t13 from "@/assets/images/member/1_013.jpeg";
import t14 from "@/assets/images/member/1_014.jpeg";
import t15 from "@/assets/images/member/1_015.jpeg";
import t16 from "@/assets/images/member/1_016.jpeg";
import t17 from "@/assets/images/member/1_017.jpeg";
import t18 from "@/assets/images/member/1_018.jpeg";
import t19 from "@/assets/images/member/1_019.jpeg";
import t20 from "@/assets/images/member/1_020.jpeg";
import t21 from "@/assets/images/member/1_021.jpeg";
import t22 from "@/assets/images/member/1_022.jpeg";
import t23 from "@/assets/images/member/1_023.jpeg";
import t24 from "@/assets/images/member/1_024.jpeg";
import t25 from "@/assets/images/member/1_025.jpeg";
import t26 from "@/assets/images/member/1_026.jpeg";
import t27 from "@/assets/images/member/1_027.jpeg";
	
const tabs = [
  { key: 'executives', name: '창립멤버' },
  { key: 'operations', name: '운영진' },
  { key: 'first_gen', name: '1기' },
	{ key: 'second_gen', name: '2기' },
	{ key: 'third_gen', name: '3기' },
  { key: 'fourth_gen', name: '4기' },
  // 다른 탭 추가...
];

const activeTab = ref('first_gen'); // 초기 탭 설정

function navigateToTab(tab) {
	if(tab !== activeTab) navigateTo(tab)
  activeTab.value = tab;
}
	
const members = [
  {
    image: t1,
    position: "프로메테우스 Founder 1·2기 대표",
    name: "정승훈",
    major: "세종대학교 인공지능학과"
  },
	{
    image: t2,
    position: "1·2·3기 총무",
    name: "정회성",
    major: "연세대학교 글로벌융합공학부"
  },
	{
    image: t3,
    position: "1·2기 개발부 부장",
    name: "이혁준",
    major: "고려대학교 컴퓨터학과"
  },
	{
    image: t4,
    position: "1기 개발부 차장",
    name: "조현우",
    major: "세종대학교 인공지능학과"
  },
	{
    image: t5,
    position: "1, 2기 기획부 부장",
    name: "강동우",
    major: "고려대학교 심리학과"
  },
	{
    image: t6,
    position: "2기 기획부 차장, 3기 기획부 부장",
    name: "손수경",
    major: "숙명여자대학교 IT공학전공"
  },
	{
    image: t7,
    position: "1·2기 섭외부 부장",
    name: "이다솔",
    major: "고려대학교 컴퓨터학과"
  },
	{
    image: t8,
    position: "2기 섭외부 차장, 3·4기 대표",
    name: "정승은",
    major: "연세대학교 컴퓨터과학과"
  },
	{
    image: t9,
    position: "1·2기 개발부 부원",
    name: "조동현",
    major: "세종대학교 지능기전공학부"
  },
	{
    image: t10,
    position: "",
    name: "김하얀",
    major: "고려대학교 심리학부"
  },
	{
    image: t11,
    position: "",
    name: "김다정",
    major: "숙명여자대학교 기계공학과"
  },
	{
    image: t12,
    position: "",
    name: "류다윤",
    major: "한양대학교 경영학부, 빅데이터융합학부 / KB국민은행 데이터 직무"
  },
	{
    image: t13,
    position: "2기 개발부 부원",
    name: "황영훈",
    major: "한양대학교 철학과 / 스타트업 백엔드 인턴"
  },
	{
    image: t14,
    position: "1기 홍보부 부장",
    name: "김수민",
    major: "세종대학교 스마트기기공학과"
  },
	{
    image: t15,
    position: "1·2기 기획부 부원",
    name: "김수빈",
    major: "연세대학교 문헌정보학과, 산업공학과"
  },
	{
    image: t16,
    position: "1·2기 기획부 부원",
    name: "김은비",
    major: "한국외국어대학교 컴퓨터전자시스템공학부"
  },
	{
    image: t17,
    position: "",
    name: "박수연",
    major: "이화여자대학교 컴퓨터공학과"
  },
	{
    image: t18,
    position: "2기 섭외부 부원",
    name: "박지완",
    major: "한국외국어대학교 영어학과"
  },
	{
    image: t19,
    position: "",
    name: "서동재",
    major: "서울대학교 수리과학부"
  },
	{
    image: t20,
    position: "",
    name: "서지은",
    major: "덕성여자대학교 수학과, 정보통계학과 / LINE 데이터 분석 직무"
  },
	{
    image: t21,
    position: "2기 섭외부 부원",
    name: "양지연",
    major: "한양대학교 생체공학과 / 서울대학교 뇌인지과학과 석사 과정"
  },
	{
    image: t22,
    position: "",
    name: "장지오",
    major: "KAIST 전산학부"
  },
	{
    image: t23,
    position: "2기 섭외부 부원",
    name: "정민수",
    major: "고려대학교 생명공학과"
  },
	{
    image: t24,
    position: "",
    name: "김준형",
    major: "상명대학교 컴퓨터과학과"
  },
	{
    image: t25,
    position: "1·2기 개발부 부원",
    name: "김선웅",
    major: "한양대학교 인공지능학과 석사과정"
  },
	{
    image: t26,
    position: "1·2기 개발부 부원",
    name: "한재연",
    major: "한양대학교 수학과 / NAVER 취업"
  },
	{
    image: t27,
    position: "",
    name: "정지영",
    major: "고려대학교 신소재공학부"
  }
]
</script>
