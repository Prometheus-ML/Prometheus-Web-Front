<template>
  <div class="container mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">소개</p>
      <p class="font-medium text-gray-600 text-xl text-gray-600">VISION 프로메테우스는 인공지능으로 가치 있는 도전과 경험을 하고자 '업'\
        에 대한 열정을 지닌 대학생들이 모인 인공지능 가치 창출 동아리로서 대학사회에 필요한 단체가 되는 것이 목표입니다.
      </p>
    </div>
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
