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

    <!-- 멤버 리스트 -->
		<div>
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
									<!-- Edit form -->
									<!-- Add this to your template -->
									<div v-if="memberEditing" class="mt-2">
											<!-- Edit form -->


											<form @submit.prevent="updateMember(member.id)">
													<!-- Name input field -->
													<div class="relative row-span-2 pb-44 rounded basis-80 bg-contain bg-center bg-no-repeat border border-dashed border-4"
															:style="{ backgroundImage: 'url(' + useImage(editMember?.image, type) + ')', backgroundSize: 'cover', backgroundPosition: 'center' }"
													>
															<div v-if="editMember.image" class="absolute top-0 right-0 flex items-center justify-center w-6 h-6 bg-white rounded-full cursor-pointer text-indigo-600 hover:text-indigo-700" @click="removeImage(editMember)">
																	X
															</div>
															<div v-else class="absolute inset-0 flex items-center justify-center">
																	<input id="image-upload" type="file" class="hidden" @change="handleImageUpload" />
																	<label for="image-upload" class="rounded-full cursor-pointer text-indigo-600 hover:bg-indigo-600 hover:text-white">
																			+
																	</label>
															</div>
													</div>

													<label for="name" class="text-gray-700">Name:</label>
													<input v-model="editMember.name" type="text" id="name" class="w-full border p-2 mb-2" />

													<!-- Education input field -->
													<label for="education" class="text-gray-700">Education:</label>
													<input v-model="editMember.education" type="text" id="education" class="w-full border p-2 mb-2" />

													<!-- Positions input field -->
													<label for="positions" class="text-gray-700">Positions:</label>
													<input v-model="editMember.positions" type="text" id="positions" class="w-full border p-2 mb-2" />

													<!-- History input field -->
													<label for="history" class="text-gray-700">History:</label>
													<input v-model="editMember.history" type="text" id="history" class="w-full border p-2 mb-2" />
													<label for="history" class="text-gray-700">Telephone:</label>
													<input v-model="editMember.tel" type="text" id="tel" class="w-full border p-2 mb-2" />
													<label for="history" class="text-gray-700">Gen:</label>
													<input v-model="editMember.gen" type="text" id="gen" class="w-full border p-2 mb-2" />
													<!-- Submit button -->
													<button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
													
													<!-- Cancel button -->
													<button @click="memberEditing = false" type="button" class="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
											</form>
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
          @click="showAddMemberForm = true"
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

      
		
    <!-- Temporary Member Add Div -->
		<div v-if="showAddMemberForm" class="fixed bottom-10 right-10 bg-white p-4 rounded shadow">
			<button class="absolute top-2 right-2 text-gray-600 hover:text-gray-800" @click="showAddMemberForm = false">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path
						fill-rule="evenodd"
						d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
			<h3 class="text-lg font-semibold mb-2">멤버 추가</h3>
			<div @submit.prevent="addMember">
				<!-- Generation, Name, Education, Executive -->
				<div class="grid grid-cols-4 gap-2 mb-5">
					<div class="relative row-span-2 pb-44 rounded basis-80 bg-contain bg-center bg-no-repeat border border-dashed border-4"
							 :style="{ backgroundImage: 'url(' + useImage(newMember?.image, type) + ')', backgroundSize: 'cover', backgroundPosition: 'center' }"
					>
						<div
								v-if="newMember.image"
								class="absolute top-0 right-0 flex items-center justify-center w-6 h-6 bg-white rounded-full cursor-pointer text-indigo-600 hover:text-indigo-700"
								@click="removeImage(newMember)"
						>
								X
						</div>
						<div
								v-else
								class="absolute inset-0 flex items-center justify-center"
						>
								<input
										id="image-upload"
										type="file"
										class="hidden"
										@change="handleImageUpload"
								>
								<label
										for="image-upload"
										class="rounded-full cursor-pointer text-indigo-600 hover:bg-indigo-600 hover:text-white"
								>
										+
								</label>
						</div>
				</div>
					
					
					<div class="col-span-1">
						<label for="gen" class="block text-sm font-medium text-gray-700">기수</label>
						<select
							v-model="newMember.gen"
							class="mt-1 pb-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
						>
							<option v-for="gen in gens" :key="gen">{{ gen }}</option>
						</select>
					</div>
					<div class="col-span-1">
						<label for="name" class="block text-sm font-medium text-gray-700">이름</label>
						<input
							v-model="newMember.name"
							type="text"
							id="name"
							class="mt-1 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
						>
					</div>
					<div class="col-span-1">
						<label for="tel" class="block text-sm font-medium text-gray-700">전화번호</label>
						<input
							v-model="newMember.tel"
							type="text"
							id="tel"
							class="mt-1 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
						>
					</div>
					<div class="col-span-1 flex items-center">
						<label for="executive" class="block text-sm font-medium text-gray-700">
							운영진
						</label>
						<input
							v-model="newMember.executive"
							type="checkbox"
							id="executive"
							class="ml-2 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-4 h-4 sm:w-5 sm:h-5 border-gray-300 rounded-md"
						/>
					</div>
					<div class="col-span-3">
						<label for="education" class="block text-sm font-medium text-gray-700">학력</label>
						<input
							v-model="newMember.education"
							type="text"
							id="education"
							class="mt-1 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
						>
					</div>
					
				</div>

				<!-- Positions input -->
				<div class="mb-5">
					<label for="positions" class="block text-sm font-medium text-gray-700">직책</label>
					<div class="relative">
						<input
							v-model="newPosition"
							type="text"
							class="mt-1 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md pr-8"
							@keyup.enter="addPosition"
						>
					</div>
					<div class="flex items-center mt-2">
						<p
							v-for="(value, index) in newMember.positions"
							:key="index"
							class="mr-2 p-1 bg-gray-100 rounded-lg"
						>{{ value }}</p>
						<button
							v-if="newMember.positions && newMember.positions.length > 0"
							@click="removePosition(index)"
							class="rounded-full hover:text-white text-red-300 hover:bg-gray-300 focus:outline-none"
						> -
						</button>
					</div>
				</div>

				<!-- History input -->
				<div class="mb-5">
					<label for="history" class="block text-sm font-medium text-gray-700">이력</label>
					<div class="relative">
						<input
							v-model="newHistory"
							type="text"
							class="mt-1 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md pr-8"
							@keyup.enter="addHistory"
						>
					</div>
					<div class="flex items-center mt-2">
						<p
							v-for="(value, index) in newMember.history"
							:key="index"
							class="mr-2 bg-gray-100 rounded-lg"
						>{{ value }}</p>
						<button
							v-if="newMember.history && newMember.history.length > 0"
							@click="removeHistory(index)"
							class="rounded-full hover:text-white text-red-300 hover:bg-gray-300 focus:outline-none"
						> -
						</button>
					</div>
				</div>

				<button
					@click="addMember"
					class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					완료
				</button>
			</div>
		</div>


		
  </div>
</template>

<script setup>
import blank from '@/assets/images/blank.jpeg';
	
const memberMenuOpen = ref(null);
const searchGen = ref('');
const gens = [0, 1, 2, 3, 4];
const members = ref([]);
const showAddMemberForm = ref(false);

const showTrashIcon = ref(false);
const newMember = ref({});
const newHistory = ref(null);
const newPosition = ref(null);
const activeTab = ref(null);
const activeMember = ref(null);
const editMember = ref({});
const type = "members"
const memberEditing = ref(false);

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
  if (!activeTab.value) {
    return members.value; // Show all members when no generation is selected
  }

  return members.value.filter((member) => member.gen === activeTab.value || (member.executive && activeTab.value == -1));
});


const addMember = async () => {
  try {
    const response = await $api(`${import.meta.env.VITE_API_URL}/member/create_member`, {
      method: 'POST',
			body: newMember.value,
    });
		newMember.value = {};
		await getMembers();
  } catch (error) {
    console.error(error);
  }
};

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

async function uploadImage(value) {
  if (!value) {
    return;
  }

  const formData = new FormData();
  formData.append('image', value);

  return $api(`/image/upload/${type}`, {
    method: 'POST',
    body: formData
  })
}

async function handleImageUpload(event) {
  const file = event.target.files[0]

  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
  const fileExtension = file.name.split('.').pop()
  const fileMimeType = file.type

  // Check file extension
  if (!allowedExtensions.exec(file.name)) {
    return false
  }

  // Check MIME type
  if (!allowedMimeTypes.includes(fileMimeType)) {
    return false
  }

  const image = await uploadImage(file)
  newMember.value.image = image.url

  return true
}

async function removeImage(member) {
	try {
		const response = await $api(`${import.meta.env.VITE_API_URL}/image/delete/${type}/${member.image}`, {
      method: 'DELETE',
    });
		await getMembers();
		editMember.value.image = null
	}	catch (error) {
		console.error(error)
	}
}
	


const addHistory = () => {
	if(newHistory.value === null || newHistory.value === '') return;
	if(newMember.value.history == null) newMember.value.history=[];
  newMember.value.history.push(newHistory.value);
	newHistory.value = '';
};

const removeHistory = (index) => {
  newMember.value.history.splice(index, 1);
};
	

const addPosition = () => {
	if(newPosition.value == null || newPosition.value === '') return;
	if(newMember.value.positions == null) newMember.value.positions=[];
  newMember.value.positions.push(newPosition.value);
	newPosition.value = '';
};

const removePosition = (index) => {
  newMember.value.positions.splice(index, 1);
};

const setActiveTab = (tab) => {
	activeTab.value = activeTab.value === tab? null : tab;
};
	
function toggleMember(memberId) {
  activeMember.value = activeMember.value === memberId ? null : memberId;
}

const showEditForm = async (id) => {
		editMember.value = await $api(`${import.meta.env.VITE_API_URL}/member/${id}`, {
      method: 'GET',
    });
    memberEditing.value = true;
    // Copy member data to edited properties to prevent direct modification
};

const updateMember = async (id) => {
		try {
			const response = await $api(`${import.meta.env.VITE_API_URL}/member/update/${id}`, {
				method: 'PUT',
				body: editMember.value
			});
		memberEditing.value = false;
		editMember.value = {};
		await getMembers();

		}	catch (error) {
			console.error(error)
		}
    // Use the member id to send the update request
    // You can access edited properties with member.editedName, member.editedEducation, etc.
    // Make the API request to update the member with the edited data

    // After a successful update, set editing to false
    // member.editing = false;
};

onMounted(async () => {
  await getMembers();
});

</script>
