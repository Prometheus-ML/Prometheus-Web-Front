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
import t1 from "@/assets/images/member/4_001.jpg";
import blank from "@/assets/images/member/blank.jpeg";
import t2 from "@/assets/images/member/4_002.jpg";
import t3 from "@/assets/images/member/4_003.jpg";
import t4 from "@/assets/images/member/4_004.jpg";
import t5 from "@/assets/images/member/4_005.jpg";
import t6 from "@/assets/images/member/4_006.jpg";
import t7 from "@/assets/images/member/4_007.jpg";
import t8 from "@/assets/images/member/4_008.jpg";
import t9 from "@/assets/images/member/4_009.jpg";
import t10 from "@/assets/images/member/4_010.jpg";
import t11 from "@/assets/images/member/4_011.jpg";
import t12 from "@/assets/images/member/4_012.jpg";
import t14 from "@/assets/images/member/4_014.jpg";
import t16 from "@/assets/images/member/4_016.jpg";
import t17 from "@/assets/images/member/4_017.jpg";
import t18 from "@/assets/images/member/4_018.jpg";
import t19 from "@/assets/images/member/4_019.jpg";
import t20 from "@/assets/images/member/4_020.jpg"; 
import t21 from "@/assets/images/member/4_021.jpg";
import t22 from "@/assets/images/member/4_022.jpg";
import t23 from "@/assets/images/member/4_023.jpg";
import t24 from "@/assets/images/member/4_024.jpg";
import t25 from "@/assets/images/member/4_025.jpg";
import t27 from "@/assets/images/member/4_027.jpg";
import t28 from "@/assets/images/member/4_028.jpg";

const tabs = [
	{ key: 'executives', name: '창립멤버' },
	{ key: 'operations', name: '운영진' },
	{ key: 'first_gen', name: '1기' },
		{ key: 'second_gen', name: '2기' },
		{ key: 'third_gen', name: '3기' },
		{ key: 'fourth_gen', name: '4기' },
	// 다른 탭 추가...
];

const activeTab = ref('fourth_gen'); // 초기 탭 설정

function navigateToTab(tab) {
		if(tab !== activeTab) navigateTo(tab)
	activeTab.value = tab;
}

const members = [
	{
		image: t1,
		position: "",
		name: "경윤서",
		major: "서울대학교 지구환경과학부"
	},
	{
		image: t2,
		position: "",
		name: "김소연",
		major: "이화여자대학교 인공지능학과"
	},
	{
		image: t3,
		position: "",
		name: "김수홍",
		major: "서울시립대학교 인공지능학과"
	},
	{
		image: t4,
		position: "4기 홍보부 부원",
		name: "김예지",
		major: "국민대학교 소프트웨어학부"
	},
	{
		image: t5,
		position: "",
		name: "김이준",
		major: "숭실대학교 신소재공학과"
	},
	{
		image: t6,
		position: "4기 섭외부 부원",
		name: "김정현",
		major: "한국항공대학교 전자정보공학부"
	},
	{
		image: t7,
		position: "",
		name: "김지수",
		major: "숭실대학교 글로벌미디어학부"
	},
	{
		image: t8,
		position: "",
		name: "김지환",
		major: "서울대학교 전기정보공학부"
	},
	{
		image: t9,
		position: "",
		name: "김홍주",
		major: "가천대학교 의공학과"
	},
	{
		image: t10,
		position: "4기 개발부 부원",
		name: "남경현",
		major: "동국대학교 산업공학과, 데이터사이언스 연계전공"
	},
	{
		image: t11,
		position: "4기 개발부 부원",
		name: "문승현",
		major: "단국대학교 컴퓨터공학과"
	},
	{
		image: t12,
		position: "",
		name: "박준형",
		major: "연세대학교 나노과학공학(NSE), AI융합심화 전공"
	},
	{
		image: t27,
		position: "",
		name: "송성헌",
		major: "성균관대학교 나노공학과, 전기전자공학부"
	},
	{
		image: t14,
		position: "",
		name: "송예한",
		major: "고려대학교 전기전자공학부"
	},
	{
		image: t28,
		position: "",
		name: "유동균",
		major: "홍익대학교 산업데이터공학과"
	},
	{
		image: t16,
		position: "",
		name: "윤재선",
		major: "숭실대학교 전자정보공학부"
	},
	{
		image: t17,
		position: "",
		name: "이민석",
		major: "숭실대학교 소프트웨어학부"
	},
	{
		image: t18,
		position: "",
		name: "이지민",
		major: "고려대학교 컴퓨터학과"
	},
	{
		image: t19,
		position: "",
		name: "이지은",
		major: "상명대학교 지능IoT융합학부"
	},
	{
		image: t20,
		position: "4기 섭외부 부원",
		name: "장민주",
		major: "홍익대학교 컴퓨터공학과"
	},
	{
		image: t21,
		position: "",
		name: "장윤서",
		major: "서울대학교 전기정보공학부"
	},
	{
		image: t22,
		position: "",
		name: "정기용",
		major: "성균관대학교 소프트웨어학과"
	},
	{
		image: t23,
		position: "4기 홍보부 부원",
		name: "정연석",
		major: "고려대학교 언어학과 & 국제학부"
	},
	{
		image: t24,
		position: "",
		name: "한지민",
		major: "이화여자대학교 전자전기전공"
	},
	{
		image: t25,
		position: "",
		name: "황호식",
		major: "한양대학교 데이터사이언스학과"
	}
];

</script>
