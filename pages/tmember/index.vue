<template>
	<div>
		<div class="relative h-96 bg-gray-300">
			<div class="container mx-auto">
				<img alt="PROMETHEUS" src="@/assets/prometheus.jpg" class="absolute top-80 shadow-lg rounded-lg object-cover w-32 h-32"/>
			</div>
		</div>
		
		<div class="container mx-auto pt-40 pb-24">
    <!-- 타이틀 -->
		
		
			<p class="font-bold text-4xl md:text-5xl mb-5">소개</p>

			<div class="mb-14 flex-1 items-center font-medium text-gray-600 text-base leading-relaxed"> <!-- flex 클래스 추가하여 로고와 글귀를 수평 정렬하고 간격 조절 -->
				<p>'프로메테우스'는 인공지능으로 가치 있는 도전과 경험을 하고자 '업'에 대한 열정을 지닌 대학생들이 모인 인공지능 가치 창출 동아리입니다.</p>
				<p>그저 인공지능을 구현하기 위한 코드를 공부하는 것이 아닌, 인공지능의 활용을 고민하고 가치를 만들어내어 대학 사회에 영감을 주고 싶습니다.</p>
				<p>또한 열정을 지닌 대학생 인재들이 네트워킹할 수 있는 공간이 되어 서로에게 동료, 멘토가 되는 공동체를 지향합니다.</p>
				<p>이를 위해 프로메테우스는 인공지능을 공부하고 프로젝트를 수행하며, 매년 스타트업 해커톤을 주최해 인공지능으로 가치를 찾는 새로운 시도에 도전합니다.</p>
			</div>

			<!-- 멤버 탭 -->
			<div class="mb-14">
				<p class="font-bold text-4xl md:text-5xl mb-5">멤버</p>
				<p class="font-medium text-gray-600 text-xl text-gray-600">프로메테우스의 멤버들</p>
			</div>

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
		</div>

	</div>
  
</template>

<script setup>
const tabs = [
  { key: 'executives', name: '창립멤버' },
  { key: 'operations', name: '운영진' },
  { key: 'first_gen', name: '1기' },
	{ key: 'second_gen', name: '2기' },
	{ key: 'third_gen', name: '3기' },
  { key: 'fourth_gen', name: '4기' },
  // 다른 탭 추가...
];

const activeTab = ref(null); // 초기 탭 설정

function navigateToTab(tab) {
	if(tab !== activeTab) navigateTo(`tmember/${tab}`)
  activeTab.value = tab;
}
</script>
