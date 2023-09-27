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
import t6 from "@/assets/images/member/1_014.jpeg";
import t7 from "@/assets/images/member/1_024.jpeg";
import t8 from "@/assets/images/member/1_007.jpeg";
import t9 from "@/assets/images/member/4_026.jpg";
import t10 from "@/assets/images/member/1_008.jpeg";

const tabs = [
  { key: 'executives', name: '창립멤버' },
  { key: 'operations', name: '운영진' },
  { key: 'first_gen', name: '1기' },
	{ key: 'second_gen', name: '2기' },
	{ key: 'third_gen', name: '3기' },
  { key: 'fourth_gen', name: '4기' },
  // 다른 탭 추가...
];

const activeTab = ref('executives'); // 초기 탭 설정

function navigateToTab(tab) {
	if(tab !== activeTab) navigateTo(tab)
  activeTab.value = tab;
}
	
const members = [
  {
    image: t1,
    position: "프로메테우스 Founder 1, 2기 대표",
    name: "정승훈",
    major: "세종대학교 인공지능학과"
  },
	{
    image: t2,
    position: "1, 2기 총무",
    name: "정회성",
    major: "연세대학교 글로벌융합공학부"
  },
  {
    image: t10,
    position: "2기 섭외부 차장, 3기 대표",
    name: "정승은",
    major: "연세대학교 컴퓨터과학과"
  },
	{
    image: t3,
    position: "1, 2기 개발부 부장",
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
    position: "1기 홍보부 부장",
    name: "김수민",
    major: "세종대학교 스마트기기공학과"
  },
	{
    image: t7,
    position: "",
    name: "김준형",
    major: "상명대학교 컴퓨터과학과"
  },
	{
    image: t8,
    position: "1, 2기 섭외부 부장",
    name: "이다솔",
    major: "고려대학교 컴퓨터학과"
  },
	{
    image: t9,
    position: "",
    name: "강민수",
    major: "고려대학교 컴퓨터학과"
  }
]
</script>
