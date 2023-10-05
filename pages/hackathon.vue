<template>
  <div class="container mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">해커톤</p>
      <p class="font-medium text-gray-600 text-xl mb-5">준비중입니다 (일정:1월 말)</p>
    </div>

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
					@click="setActiveTab(tab.key)"
					class="mr-5 cursor-pointer flex items-center"
				>
					<span class="mx-auto">{{ tab.name }}</span>
				</div>
			</div>
		</div>

  </div>
</template>

<script setup>
const activeTab = ref('대회정보'); // 기본 탭 설정


const tabs = ref([
  { key: 'information', name: '대회정보', },
  { key: 'participants', name: '참여자',  },
  { key: 'qa', name: 'Q&A',  },
]);

const setActiveTab = (tab) => {
	activeTab.value = tab;
};
	
// 메소드나 computed 프로퍼티를 정의할 수 있습니다.
// 예를 들어, 탭이 클릭될 때의 동작을 정의할 수 있습니다.
// 탭 내용은 동적으로 로딩하거나 API를 통해 가져올 수 있습니다.
</script>

<style scoped>
/* 필요한 스타일링을 추가할 수 있습니다. */
</style>
