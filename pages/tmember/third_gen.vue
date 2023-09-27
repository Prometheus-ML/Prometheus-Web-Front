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
import t1 from "@/assets/images/member/3_001.jpeg";
import blank from "@/assets/images/member/blank.jpeg";
import t2 from "@/assets/images/member/3_002.jpeg";
import t3 from "@/assets/images/member/3_003.jpeg";
import t4 from "@/assets/images/member/3_004.jpeg";
import t5 from "@/assets/images/member/3_005.jpeg";
import t6 from "@/assets/images/member/3_006.jpeg";
import t7 from "@/assets/images/member/3_007.jpeg";
import t8 from "@/assets/images/member/3_008.jpeg";
import t9 from "@/assets/images/member/3_009.jpeg";
import t10 from "@/assets/images/member/3_010.jpeg";
import t11 from "@/assets/images/member/3_011.jpeg";
import t12 from "@/assets/images/member/3_012.jpeg";
import t13 from "@/assets/images/member/3_013.jpeg";
import t14 from "@/assets/images/member/3_014.jpeg";
import t15 from "@/assets/images/member/3_015.jpeg";
import t16 from "@/assets/images/member/3_016.jpeg";
import t17 from "@/assets/images/member/3_017.jpeg";
import t18 from "@/assets/images/member/3_018.jpeg";
import t19 from "@/assets/images/member/3_019.jpeg";
import t20 from "@/assets/images/member/3_020.jpeg";
import t21 from "@/assets/images/member/3_021.jpg";
	
const tabs = [
  { key: 'executives', name: '창립멤버' },
  { key: 'operations', name: '운영진' },
  { key: 'first_gen', name: '1기' },
	{ key: 'second_gen', name: '2기' },
	{ key: 'third_gen', name: '3기' },
  { key: 'fourth_gen', name: '4기' },
  // 다른 탭 추가...
];

const activeTab = ref('third_gen'); // 초기 탭 설정

function navigateToTab(tab) {
	if(tab !== activeTab) navigateTo(tab)
  activeTab.value = tab;
}
	
const members = [
  {
    image: t1,
    position: "",
    name: "권용우",
    major: "한양대학교 물리학과"
  },
  {
    image: t21,
    position: "3기 개발부 차장",
    name: "김도현",
    major: "한양대학교 데이터사이언스학부"
  },
  {
    image: t2,
    position: "3기 섭외부 부원",
    name: "김예진",
    major: "이화여자대학교 인공지능학과"
  },
  {
    image: t3,
    position: "3기 기획부 차장",
    name: "김준석",
    major: "세종대학교 인공지능학과"
  },
  {
    image: t4,
    position: "",
    name: "남승현",
    major: "이화여자대학교 컴퓨터공학과"
  },
  {
    image: t5,
    position: "3기 개발부 부원",
    name: "모진호",
    major: "상명대학교 지능IOT융합전공"
  },
  {
    image: t6,
    position: "",
    name: "박은주",
    major: "성신여자대학교 융합보안공학과"
  },
  {
    image: t7,
    position: "3기 기획부 부원",
    name: "배아람",
    major: "경희대학교 경영대학 경영학과"
  },
  {
    image: t8,
    position: "",
    name: "성원희",
    major: "이화여자대학교 컴퓨터공학과"
  },
  {
    image: t9,
    position: "3기 개발부 부원",
    name: "심하민",
    major: "고려대학교 전기전자공학부"
  },
  {
    image: t10,
    position: "3기 홍보부 차장",
    name: "안서연",
    major: "세종대학교 디자인이노베이션학과, 만화애니메이션학과 복수전공"
  },
  {
    image: t11,
    position: "",
    name: "윤선미",
    major: "성신여자대학교 AI융합학부"
  },
  {
    image: t12,
    position: "",
    name: "이대헌",
    major: "한양대학교 자원환경공학과"
  },
  {
    image: t13,
    position: "",
    name: "이지윤",
    major: "연세대학교 생명공학과"
  },
  {
    image: t14,
    position: "3기 홍보부 부원",
    name: "임서연",
    major: "이화여자대학교 인공지능학과"
  },
  {
    image: t15,
    position: "",
    name: "임준섭",
    major: "연세대학교 국어국문학과"
  },
  {
    image: t16,
    position: "",
    name: "장나래",
    major: "숙명여자대학교 청정융합에너지공학과"
  },
  {
    image: t17,
    position: "",
    name: "조우현",
    major: "연세대학교 컴퓨터과학과"
  },
  {
    image: t18,
    position: "3기 섭외부 차장",
    name: "진유진",
    major: "숙명여자대학교 IT공학전공"
  },
  {
    image: t19,
    position: "",
    name: "최민재",
    major: "서울대학교 바이오시스템소재학부"
  },
  {
    image: t20,
    position: "",
    name: "최 환",
    major: "한국외국어대학교 경제학과"
  }
];

</script>
