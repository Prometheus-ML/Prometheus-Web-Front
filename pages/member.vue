<template>
  <div class="container mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">멤버</p>
      <p class="font-medium text-gray-600 text-xl mb-5">프로메테우스의 멤버들</p>
    </div>

    <!-- 탭 -->
		<div class="flex justify-center items-center p-6 text-2xl">
			<div class="flex flex-wrap md:gap-5 text-base md:text-xl justify-center">
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
					<li v-for="(member, index) in filteredMembers" :key="index" class="w-24 md:w-64 text-center">
						<div class="relative">
							<div
								class="w-24 h-24 md:w-64 md:h-80 mb-1 rounded flex items-center justify-center"
								:style="{ backgroundImage: 'url(' + useImage(member?.image) + ')', backgroundSize: 'cover', backgroundPosition: 'center' }"
								@mouseenter="member.hover = true"
								@mouseleave="member.hover = false"
								@click="toggleMember(member.id)"
							>
								<!-- Additional information div displayed on hover -->
								<div v-if="member.hover || activeMember === member.id" class="absolute bg-gray-800 opacity-80 top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
									<div class="w-24 h-24 md:w-64 md:h-80 p-2 overflow-y-auto">
										<p class="text-lg md:text-2xl font-bold text-white mb-1">{{ member.name }}</p>
										<p class="text-xs md:text-base mb-3 text-gray-50">{{ member.education }}</p>

										
										<!-- Positions ordered list -->
										<hr v-if="member.positions.length > 0" class="mb-2">
										<ol class="text-xs md:text-base font-light text-white mb-2">
											<li v-for="(value, idx) in member.positions" :key="idx">{{ value }}</li>
										</ol>
										
										<!-- History ordered list -->
										<hr v-if="member.history.length > 0" class="mb-2">
										<ol class="text-xs md:text-base mb-2 font-light text-white">
											<li v-for="(value, idx) in member.history" :key="idx">{{ value }}</li>
										</ol>

									</div>
								</div>
							</div>
							<div class="w-full h-full pb-2 flex items-center justify-center">
								<p class="text-base md:text-xl font-bold">{{ member.name }}</p>
							</div>
						</div>
					</li>


				</ul>
			</div>
		</div>
    
    
  </div>
</template>


<script setup>
import blank from '@/assets/images/blank.jpeg';

const members = ref([]);
const tabs = [
  { key: 0, name: '창립멤버'},
  { key: -1, name: '운영진'},
  { key: 1, name: '1기'},
  { key: 2, name: '2기'},
  { key: 3, name: '3기'},
	{ key: 4, name: '4기'}
];

const activeTab = ref(3);
const activeMember = ref(null);
	
	
const getMembers = async () => {
	try {
		const response = await $fetch(`${import.meta.env.VITE_API_URL}/member/show_all_members`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});
		members.value = response;
	} catch (error) {
		console.error(error);
	}
};
	
const filteredMembers = computed(() => {
  if (!activeTab.value) {
    return members.value; // Show all members when no generation is selected
  }
	if(activeTab.value == -1) {
		return members.value.filter((member) => member.executive === true);
	}
	
	return members.value.filter((member) => member.gen === activeTab.value)
  
});

const setActiveTab = (tab) => {
	activeTab.value = activeTab.value === tab? null : tab;
};
	


function toggleMember(memberId) {
  activeMember.value = activeMember.value === memberId ? null : memberId;
}

onMounted(async () => {
  await getMembers();
});

</script>
