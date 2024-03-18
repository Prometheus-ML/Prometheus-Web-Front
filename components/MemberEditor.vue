<template>
  <!-- Temporary Member Add Div -->
  <div class="text-black absolute w-[100%] h-[92%]">
    
    <h3 class="text-lg font-semibold mb-2">멤버 추가/수정</h3>
    <div @submit.prevent="addMember">
      <!-- Generation, Name, Education, Executive -->
      <div class="grid grid-cols-4 gap-2 mb-5">
        <div class="relative row-span-2 pb-44 rounded basis-80 bg-contain bg-center bg-no-repeat border border-dashed border-4"
              :style="{ backgroundImage: 'url(' + useImage(formData?.image, type) + ')', backgroundSize: 'cover', backgroundPosition: 'center' }"
        >
          <div
              v-if="formData?.image"
              class="absolute top-0 right-0 flex items-center justify-center w-6 h-6 bg-white rounded-full cursor-pointer text-indigo-600 hover:text-indigo-700"
              @click="addImageStack(formData?.image)"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
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
            v-model="formData.gen"
            class="mt-1 pb-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option v-for="gen in gens" :key="gen">{{ gen }}</option>
          </select>
        </div>
        <div class="col-span-1">
          <label for="name" class="block text-sm font-medium text-gray-700">이름</label>
          <input
            v-model="formData.name"
            type="text"
            id="name"
            class="mt-1 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
        </div>
        <div class="col-span-1">
          <label for="tel" class="block text-sm font-medium text-gray-700">전화번호</label>
          <input
            v-model="formData.tel"
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
            v-model="formData.executive"
            type="checkbox"
            id="executive"
            class="ml-2 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-4 h-4 sm:w-5 sm:h-5 border-gray-300 rounded-md"
          />
        </div>
        <div class="col-span-3">
          <label for="education" class="block text-sm font-medium text-gray-700">학력</label>
          <input
            v-model="formData.education"
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
          <div class="flex items-center mt-2">
            <div
              v-for="(value, index) in formData.positions"
              :key="index"
              class="flex flex-row gap-1 mr-2 bg-gray-100 rounded-lg"
            >
              <p>{{ value }}</p>
              <button
                v-if="formData.positions && formData.positions.length > 0"
                @click="removePosition(index)"
                class="px-1 rounded-full hover:text-white text-red-300 hover:bg-gray-300 focus:outline-none"
              > -
              </button>
            </div>
          </div>
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
          <div
            v-for="(value, index) in formData.history"
            :key="index"
            class="flex flex-row gap-1 mr-2 bg-gray-100 rounded-lg"
          ><p>{{ value }}</p>
          <button
            v-if="formData.history && formData.history.length > 0"
            @click="removeHistory(index)"
            class="px-1 rounded-full hover:text-white text-red-300 hover:bg-gray-300 focus:outline-none"
          > -
          </button>
        </div>
          
        </div>
      </div>

      <button v-if="!props?.editMode"
        @click="addMember"
        class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        추가
      </button>
      <button v-else
        class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        @click="updateMember(member.id)"
      >
        수정
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import _ from "lodash"

const formData = ref(_.cloneDeep(props.member))

const props = defineProps({
  member: Object,
  editMode: Boolean
})

const emits = defineEmits(['closePost']);
const newHistory = ref(null)
const newPosition = ref(null)
const gens = [0, 1, 2, 3, 4, 5]
const type = "members"
const imageStack = ref([])

const addMember = async () => {
  if (!formData.value.executive) formData.value.executive = false;
  if (!formData.value.tel) formData.value.tel = '00000000000';
  try {
    const response = await $api(`${import.meta.env.VITE_API_URL}/member/create_member`, {
      method: 'POST',
			body: formData.value,
    });
    for(let i = 0;i<imageStack.value.length;++i){
      removeImage(imageStack.value[i]);
    }
		emits('closePost');
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

function addImageStack(value){
  imageStack.value.push(value)
  formData.value.image = null;
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
  formData.value.image = image.url

  return true
}

async function removeImage(value) {
	try {
		const response = await $api(`${import.meta.env.VITE_API_URL}/image/delete/${type}/${value}`, {
      method: 'DELETE',
    });
		formData.value.image = null
	}	catch (error) {
		console.error(error)
	}
}

const addHistory = () => {
	if(newHistory.value === null || newHistory.value === '') return;
	if(formData.value.history == null) formData.value.history=[];
  formData.value.history.push(newHistory.value);
	newHistory.value = '';
};

const removeHistory = (index) => {
  formData.value.history.splice(index, 1);
};
	

const addPosition = () => {
	if(newPosition.value == null || newPosition.value === '') return;
	if(formData.value.positions == null) formData.value.positions=[];
  formData.value.positions.push(newPosition.value);
	newPosition.value = '';
};

const removePosition = (index) => {
  formData.value.positions.splice(index, 1);
};


const updateMember = async (id) => {
		try {
			const response = await $api(`${import.meta.env.VITE_API_URL}/member/update/${id}`, {
				method: 'PUT',
				body: formData.value
			});
      for(let i = 0;i<imageStack.value.length;++i){
        removeImage(imageStack.value[i]);
      }
      emits('closePost');
		}	catch (error) {
			console.error(error)
		}
    // Use the member id to send the update request
    // You can access edited properties with member.editedName, member.editedEducation, etc.
    // Make the API request to update the member with the edited data

    // After a successful update, set editing to false
    // member.editing = false;
};

</script>