<template>
  <div class="container mx-auto pt-40 pb-24">
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
					@click="setActiveTab(tab.key)"
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
							<img
								src="member.image"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
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
const activeTab = ref('2st_gen');
import executives from '~/assets/data/member/executives.json';
import operations from '~/assets/data/member/operations.json';
import firstGenMembers from '~/assets/data/member/first-gen.json';
import secondGenMembers from '~/assets/data/member/second-gen.json';
import thirdGenMembers from '~/assets/data/member/third-gen.json';

const tabs = [
  { key: 'executives', name: '창립멤버' },
  { key: 'operations', name: '운영진' },
  { key: '1st_gen', name: '1기' },
  { key: '2nd_gen', name: '2기' },
  { key: '3rd_gen', name: '3기' },
];

const setActiveTab = (tab) => {
	activeTab.value = tab;
};
	
const sortMembersByKoreanName = (data) => {
  return data.sort((a, b) => {
    const nameA = a.name;
    const nameB = b.name;

    // localeCompare 함수를 사용하여 한글 이름을 정렬
    return nameA.localeCompare(nameB, 'ko');
  });
};
	
const members = computed(() => {
			if (activeTab.value === 'executives') {
			  return sortMembersByKoreanName(executives);
			} else if (activeTab.value === 'operations') {
			  return sortMembersByKoreanName(operations);
			} else if (activeTab.value === '1st_gen') {
        return sortMembersByKoreanName(firstGenMembers);
      } else if (activeTab.value === '2nd_gen') {
        return sortMembersByKoreanName(secondGenMembers);
      } else if (activeTab.value === '3rd_gen') {
        return sortMembersByKoreanName(thirdGenMembers);
      }
      // 기타 탭에 대한 로직 추가
      return [];
});
	

</script>
