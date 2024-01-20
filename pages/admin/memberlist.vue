<template>
  <div class="container mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">관리자 페이지</p>
    </div>

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

		<div class="p-8">
				<ul class="flex flex-wrap justify-center gap-9">
						<li v-for="(member, index) in filteredMembers" :key="index" class="w-24 md:w-64 text-center">
								<div class="relative">
										<div
												class="w-24 h-24 md:w-64 md:h-80 mb-1 rounded flex items-center justify-center"
												:style="{ backgroundImage: 'url(' + useImage(member?.image, type) + ')', backgroundSize: 'cover', backgroundPosition: 'center' }"
												@mouseenter="member.hover = true"
												@mouseleave="member.hover = false"
										>
												<!-- Additional information div displayed on hover -->
												<div v-if="member.hover" class="absolute bg-gray-800 opacity-80 top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center overflow-visible">
														<div class="w-32 h-32 md:w-64 md:h-80 p-2 overflow-y-auto">
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
														<!-- Trash Icon -->
														<svg
																@click="deleteMember(member)"
																xmlns="http://www.w3.org/2000/svg"
																class="h-6 w-6 text-red-600 absolute top-1 right-1 cursor-pointer"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
														>
																<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
														</svg>
														<!-- Edit Icon and functionality -->
														<svg
																@click="showEditForm(member.id)"
																xmlns="http://www.w3.org/2000/svg"
																class="h-6 w-6 text-green-400 absolute bottom-1 right-1 cursor-pointer"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
														>
																<path
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		stroke-width="2"
																		d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
																/>
																<path
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		stroke-width="2"
																		d="M2 18c2.666-1.333 7.333-1.333 10 0m0 0c2.667 1.333 7.333 1.333 10 0m-10 5v-3a4 4 0 118 0v3"
																/>
														</svg>
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
	<!-- + button to open the member add div -->
	<div class="fixed bottom-10 right-10">
		<div class="flex items-center">
			<div class="bg-white text-indigo-600 px-3 py-1 rounded-lg mr-2">
				멤버 추가하려면 클릭하세요!
			</div>
			<div
				class="bg-indigo-600 p-3 rounded-full shadow cursor-pointer flex items-center justify-center text-white"
				@click="showAddForm()"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
					></path>
				</svg>
			</div>
		</div>
	</div>
		
	<div v-if="showMemberForm" class ="mt-5 z-60 shadow-2xl rounded-lg fixed top-1/2 md:w-[80%] w-[90%] h-[85%] bg-white left-1/2 transform -translate-x-1/2 -translate-y-1/2">
		<div class="flex justify-end">
			<button class="right-0 p-1 text-gray-600 hover:text-gray-800" @click="showMemberForm = false">
				<font-awesome-icon icon="fa-solid fa-xmark" />
			</button>
		</div>
		
		<MemberEditor :editMode="editMode" :member="newMember" @closePost="closePost()"/>
	</div> 


		

</template>

<script setup>
import blank from '@/assets/images/blank.jpeg';
	

const members = ref([]);
const showMemberForm = ref(false);

const newMember = ref({});
const activeTab = ref(null);
const activeMember = ref(null);
const type = "members"
const editMode = ref(false);

const tabs = [
	{ key: 0, name: '창립멤버'},
	{ key: -1, name: '운영진'},
  { key: 1, name: '1기'},
  { key: 2, name: '2기'},
  { key: 3, name: '3기'},
	{ key: 4, name: '4기'},
];

const getMembers = async () => {
  try {
    const response = await $api(`${import.meta.env.VITE_API_URL}/member/show_all_members`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    members.value = response;
  } catch (error) {
    console.error(error);
  }
};

const filteredMembers = computed(() => {
  if (activeTab.value === null) {
    return members.value; 
  }

  return members.value.filter((member) => member.gen == activeTab.value || (member.executive && activeTab.value === -1));
});

async function closePost() {
  showMemberForm.value = false;
	newMember.value = {};
	editMode.value = false;
	await getMembers();
}



const deleteMember = async (member) => {
  try {
		const response_1 = await removeImage(member);
    const response_2 = await $api(`${import.meta.env.VITE_API_URL}/member/delete/${member.id}`, {
      method: 'DELETE',
    });
    await getMembers();
  } catch (error) {
    console.error(error);
  }
};

async function removeImage(member) {
	try {
		const response = await $api(`${import.meta.env.VITE_API_URL}/image/delete/${type}/${member.image}`, {
      method: 'DELETE',
    });
		await getMembers();
	}	catch (error) {
		console.error(error)
	}
}

const setActiveTab = (tab) => {
	activeTab.value = activeTab.value === tab? null : tab;
};
	
function toggleMember(memberId) {
  activeMember.value = activeMember.value === memberId ? null : memberId;
}

const showAddForm = async () => {
	editMode.value = false;
	showMemberForm.value = true;
	newMember.value = {};
}

const showEditForm = async (id) => {
		newMember.value = await $api(`${import.meta.env.VITE_API_URL}/member/${id}`, {
      method: 'GET',
    });
		editMode.value = true;
		showMemberForm.value = true;
};

onMounted(async () => {
  await getMembers();
});

</script>
