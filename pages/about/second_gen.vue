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
import t1 from "@/assets/images/member/2_002.jpeg";
import t2 from "@/assets/images/member/2_003.jpeg";
import t3 from "@/assets/images/member/2_001.jpeg";
import t4 from "@/assets/images/member/2_004.jpeg";
import t5 from "@/assets/images/member/2_005.jpeg";
import t6 from "@/assets/images/member/2_006.jpeg";
import t8 from "@/assets/images/member/2_008.jpeg";
import t10 from "@/assets/images/member/2_010.jpeg";
import t11 from "@/assets/images/member/2_011.jpeg";
import t12 from "@/assets/images/member/2_012.jpeg";
import t13 from "@/assets/images/member/2_013.jpeg";
import t14 from "@/assets/images/member/2_014.jpg";
import t15 from "@/assets/images/blank.jpeg";
import t16 from "@/assets/images/member/2_015.jpeg";
import t17 from "@/assets/images/member/2_016.jpeg";


const tabs = [
  { key: 'executives', name: '창립멤버' },
  { key: 'operations', name: '운영진' },
  { key: 'first_gen', name: '1기' },
	{ key: 'second_gen', name: '2기' },
	{ key: 'third_gen', name: '3기' },
  { key: 'fourth_gen', name: '4기' },
  // 다른 탭 추가...
];

const activeTab = ref('second_gen'); // 초기 탭 설정

function navigateToTab(tab) {
	if(tab !== activeTab) navigateTo(tab)
  activeTab.value = tab;
}
	
const members = [
  {
    image: t1,
    position: "2·3·4기 홍보부 부장",
    name: "변가은",
    major: "성균관대학교 건축학과, 데이터사이언스 융합전공"
  },
 	{
    image: t2,
    position: "2기 개발부 차장, 3·4기 개발부 부장",
    name: "심수민",
    major: "연세대학교 컴퓨터과학과"
  },
	{
    image: t3,
    position: "2·3기 기획부 부원",
    name: "황보률",
    major: "연세대학교 인공지능학과"
  },
	{
    image: t4,
    position: "2기 개발부 부원",
    name: "김태윤",
    major: "서울대학교 컴퓨터공학부"
  },
	{
    image: t5,
    position: "2기 개발부 부원",
    name: "김종효",
    major: "성균관대학교 소프트웨어학과"
  },
	{
    image: t6,
    position: "",
    name: "여신호",
    major: "세종대학교 정보보호학과"
  },
	{
    image: t8,
    position: "2·3기 개발부 부원",
    name: "최지웅",
    major: "한국외국어대학교 포르투갈어과"
  },
	{
    image: t10,
    position: "2·3기 개발부 부원",
    name: "배윤호",
    major: "한양대학교 정책학과"
  },
	{
    image: t11,
    position: "2·3기 개발부 부원",
    name: "연유정",
    major: "고려대학교 산업경영공학부"
  },
	{
    image: t12,
    position: "2·3기 개발부 부원",
    name: "김준희",
    major: "숙명여자대학교 컴퓨터과학전공"
  },
	{
    image: t13,
    position: "",
    name: "권미주",
    major: "동덕여자대학교 정보통계학과"
  },
	{
    image: t14,
    position: "2기 섭외부 부원, 3기 섭외부 부장",
    name: "최태은",
    major: "연세대학교 언더우드국제대학, 경제학 전공, 컴퓨터과학 복수전공"
  },
	{
    image: t15,
    position: "",
    name: "김준희",
    major: "숙명여자대학교 컴퓨터과학전공"
  },
	{
    image: t16,
    position: "2기 섭외부 부원, 3기 개발부 부원",
    name: "오유진",
    major: "이화여자대학교 인공지능학과"
  },
	{
    image: t17,
    position: "",
    name: "이성민",
    major: "한국외국어대학교 컴퓨터공학부"
  }
]
</script>
