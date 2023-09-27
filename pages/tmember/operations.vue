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
import t1 from "@/assets/images/member/1_008.jpeg";
import t2 from "@/assets/images/member/4_026.jpg";
import t3 from "@/assets/images/member/2_003.jpeg";
import t4 from "@/assets/images/member/3_021.jpg";
import t6 from "@/assets/images/member/3_003.jpeg";
import t7 from "@/assets/images/member/2_014.jpg";
import t8 from "@/assets/images/member/3_018.jpeg";
import t9 from "@/assets/images/member/2_002.jpeg";
import t10 from "@/assets/images/member/3_010.jpeg";

const tabs = [
  { key: 'executives', name: '창립멤버' },
  { key: 'operations', name: '운영진' },
  { key: 'first_gen', name: '1기' },
	{ key: 'second_gen', name: '2기' },
	{ key: 'third_gen', name: '3기' },
  { key: 'fourth_gen', name: '4기' },
  // 다른 탭 추가...
];

const activeTab = ref('operations'); // 초기 탭 설정

function navigateToTab(tab) {
	if(tab !== activeTab) navigateTo(tab)
  activeTab.value = tab;
}
	
const members = [
  {
    image: t1,
    position: "대표",
    name: "정승은",
    major: "연세대학교 컴퓨터과학과"
  },
	{
    image: t2,
    position: "총무",
    name: "강민수",
    major: "고려대학교 컴퓨터학과"
  },
	{
    image: t3,
    position: "개발부 부장",
    name: "심수민",
    major: "연세대학교 컴퓨터과학과"
  },
	{
    image: t4,
    position: "개발부 차장",
    name: "김도현",
    major: "한양대학교 데이터사이언스학부"
  },
	{
    image: t6,
    position: "기획부 부장",
    name: "김준석",
    major: "세종대학교 인공지능학과"
  },
	{
    image: t7,
    position: "섭외부 부장",
    name: "최태은",
    major: "연세대학교 언더우드국제대학, 경제학 전공, 컴퓨터과학 복수전공"
  },
	{
		image: t8,
    position: "섭외부 차장",
    name: "진유진",
    major: "숙명여자대학교 IT공학전공"
	},
	{
    image: t9,
    position: "홍부부 부장",
    name: "변가은",
    major: "성균관대학교 건축학과, 데이터사이언스 융합전공"
  },
	{
    image: t10,
    position: "홍보부 차장",
    name: "안서연",
    major: "세종대학교 디자인이노베이션학과, 만화애니메이션학과 복수전공"
  }
]

</script>
