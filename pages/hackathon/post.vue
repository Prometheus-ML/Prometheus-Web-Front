<template>
  <div class="bg-black text-white">
		<div class="p-5 container mx-auto">
      <h1 class="mb-2 text-3xl md:text-5xl font-bold">팀빌딩 게시판</h1>
      <p class="text-xs md:text-lg mb-12 font-light">게시글을 올릴 때 본인의 전화번호로 인증을 받은 후, 게시글의 비밀번호를 설정하세요. 게시글을 삭제하거나 수정할 때 해당 비밀번호가 필요합니다.</p>

			<input
				v-model="filter"
        type="text"
        class="focus:border-neutral-300 focus:border-2 bg-neutral-700 text-neutral-300 rounded-full py-2 w-full px-5 mb-3" 
        placeholder="제목 또는 키워드를 입력해보세요"
        required
			>
		</div>

    <div class="flex flex-wrap gap-2 container mx-auto text-white">
      <div class="flex mr-4 py-1">
        <p class="place-self-center mr-3 font-bold">모집상태</p>
        <div class="relative w-32">
          <button @click="toggleDropdown('state')"
            class="relative bg-neutral-800 text-white w-full py-2 focus:outline-none"
            :class="{ 'rounded-[20px]': !isStateOpen, 'rounded-t-[20px]' : isStateOpen }"
            @mouseleave="isStateOpen = false"
          >
            <span class="font-semibold mr-2">{{ currentState }}</span>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2">
              <svg v-if="!isStateOpen" class="h-4 w-4 text-neutral-500 transition-transform duration-300 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              <svg v-else class="h-4 w-4 text-neutral-500 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
          </button>

        <!-- Dropdown Content -->
          <div
            v-if="isStateOpen"
            @mouseenter="isStateOpen = true"
            @mouseleave="isStateOpen = false"
            class="absolute z-30 bg-neutral-800 w-full px-2 flex flex-col pb-2 rounded-b-[20px] shadow-lg"
          >
            <button
              v-for="(item, index) in stateOptions"
              @click="selectOption('state', item)"
              :key="index"
              :class="{ 'bg-neutral-500 rounded-[20px]' : item === currentState }"
              class="px-6 py-2 transition-colors duration-300 text-sm rounded-lg hover:bg-neutral-200 focus:outline-none"
            >
              {{ item }}
            </button>
          </div>
        </div>
      </div>
      

   
      <div class="flex  py-1">
        <p class="place-self-center mr-3 font-bold">모집역할</p>
        <div class="relative w-36">
          <button @click="toggleDropdown('role')"
            class="relative bg-neutral-800 text-white w-full py-2 focus:outline-none"
            :class="{ 'rounded-[20px]': !isRoleOpen, 'rounded-t-[20px]' : isRoleOpen }"
            @mouseleave="isRoleOpen = false"
          >
            <span class="font-semibold mr-2">{{ currentRole }}</span>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2">
              <svg v-if="!isRoleOpen" class="h-4 w-4 text-neutral-500 transition-transform duration-300 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              <svg v-else class="h-4 w-4 text-neutral-500 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
          </button>

        <!-- Dropdown Content -->
          <div
            v-if="isRoleOpen"
            @mouseenter="isRoleOpen = true"
            @mouseleave="isRoleOpen = false"
            class="absolute z-30 bg-neutral-800 w-full px-2 flex flex-col pb-2 rounded-b-[20px] shadow-lg"
          >
            <button
              v-for="(item, index) in roleOptions"
              @click="selectOption('role', item)"
              :key="index"
              :class="{ 'bg-neutral-500 rounded-[20px]' : item === currentRole }"
              class="px-6 py-2 transition-colors duration-300 text-sm rounded-lg hover:bg-neutral-200 focus:outline-none"
            >
              {{ item }}
            </button>
          </div>
        </div>
      </div>
  

      <!-- Write Button -->
      <button @click="openNewPost()" class="md:text-lg text-base md:font-semibold transition-transform transform hover:scale-105 focus:outline-none ml-auto left-1 px-3 py-1 md:px-4 md:py-2 bg-red-500 text-white rounded-lg transition-colors duration-300 focus:outline-none">
        <font-awesome-icon class="mr-1" icon="fa-solid fa-pen"/>
        팀원 모집 글쓰기
      </button>
      
    </div>

    <div class="main container bg-black text-white mx-auto pb-3" :style="{ 'min-height': '80vh' }">
      <div class="grid grid-cols-1 items-start gap-6 w-full">
        <div class="p-1 border-b-2"></div>
        <div v-for="post in filteredPosts"  @click="openPost(post?.id)" :key="post?.id" :to="'/hackathon/post/view/' + post?.id" class="md:mx-10 cursor-pointer bg-neutral-700">
            <!-- Thumbnail with overlay -->
            <div class="grid grid-cols-4 md:grid-cols-5 py-1 md:py-2">
              <div class="flex flex-col place-items-center px-2 lg:px-4 pt-2 justify-center">
                <img class="w-1/2 lg:w-1/3 mb-2" src="@/assets/fire.png" :class="{ 'grayscale' : post?.done }">
                <div v-if="post?.done" class="bg-neutral-500 rounded-full text-xs md:text-lg text-neutral-400 md:px-3 py-1 px-2 font-bold">모집완료</div>
                <div v-if="!post?.done" class="bg-rose-500 rounded-full text-xs md:text-lg text-white md:px-3 py-1 px-2 font-bold">모집중</div>
              </div>

              <div class="col-span-3 md:col-span-4 flex flex-col">
                <div class="flex items-center flex-wrap gap-1 py-1 text-xs md:text-lg">
                  <div v-for="(value, index) in post?.h_tag" :key="index" class="hidden md:inline-block py-1 px-3 mr-2 font-bold rounded-full text-black bg-neutral-400">
                    {{ value.name }}
                  </div>
                </div>
                <div class="grid">
                  <p class="font-bold truncate text-3xl md:text-4xl py-1 mt-2 mb-2">{{ post?.title }}</p>
                </div>
                <div class="flex flex-col md:flex-row my-1 mr-auto">
                  <p class="text-neutral-400 font-light text-xs md:text-sm mr-2"> [생성] {{ post?.created_date.replace('T', ' ') }}</p>
                  <p v-if="post?.created_date != post?.updated_date" class="font-light text-neutral-400 text-xs md:text-sm md:mr-2">[수정] {{ post?.updated_date.replace('T', ' ') }}</p>
                </div>
              </div>
            </div>
        </div>
		  </div>
    </div>

    <div class="flex justify-center items-center pb-16">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="mr-2 px-3 py-2 text-white rounded-lg transition-colors duration-300 focus:outline-none">
        <font-awesome-icon :class="{'text-black' : currentPage === 1}" icon="fa-solid fa-angle-left" />
      </button>
      <span class="text-white">{{ currentPage }}</span>
      <button @click="goToPage(currentPage + 1)" :disabled="totalPages === 0 || currentPage === totalPages" class="ml-2 px-3 py-2 text-white rounded-lg transition-colors duration-300 focus:outline-none">
        <font-awesome-icon :class="{'text-black' : totalPages === 0 || currentPage === totalPages}"  icon="fa-solid fa-angle-right" />
      </button>
    </div>

    <div v-if="visiblePost || newPost === true" class="mt-5 z-60 shadow-2xl rounded-lg fixed top-1/2 md:w-[80%] w-[90%] h-[85%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-700">
      <div class="p-1 rounded-t-lg bg-neutral-800 flex justify-end">
        <font-awesome-icon v-if="viewMode === 'view'" @click="viewMode = 'edit'" class="cursor-pointer py-1 mr-2 px-2 border rounded inline-block" icon="fa-solid fa-pen"  />
        <font-awesome-icon v-if="viewMode === 'edit' && !newPost" @click="viewMode = 'view'" class="cursor-pointer mr-2  py-1 px-2 border rounded inline-block" icon="fa-solid fa-angle-left"/>
        <font-awesome-icon @click="closePost()" class="cursor-pointer mr-2 py-1 px-2 border rounded inline-block" icon="fa-solid fa-xmark" />
      </div>
      <HackathonView v-if="viewMode === 'view' && visiblePost" :id="visiblePost"/>
      <HackathonEdit v-if="viewMode === 'edit' && visiblePost" :editMode="true" :id="visiblePost" @closePost="closePost()"/>
      <HackathonEdit v-if="newPost === true" :editMode="false" @closePost="closePost()"/>
    </div>

  </div>
</template>

<script setup>
const postList = ref([
])

const getPosts = async () => {
  try {
    const response = await $api(`${import.meta.env.VITE_API_URL}/hackathon/get_posts`, {
      method: 'GET',
    });
    postList.value = response;
  } catch (error) {
		console.error(error)
  }
}


// const filteredPosts = computed(() => {
//   return postList.value.filter(post => post.type == currentTab.value);
// });

const isRoleOpen = ref(false)
const isStateOpen = ref(false)

const stateOptions = ['전체', '모집중', '모집완료']
const roleOptions = ['전체', '프론트엔드', '백엔드', '디자이너', 'PM', 'AI', '기타']

const currentState = ref('전체')
const currentRole = ref('전체')
const filter = ref()
const visiblePost = ref()
const viewMode = ref('view')
const newPost = ref()
const totalPages = ref(1)

// Toggle Dropdown
const toggleDropdown = (dropdown) => {
  if (dropdown === 'state') {
    isStateOpen.value = !isStateOpen.value;
  } else if (dropdown === 'role') {
    isRoleOpen.value = !isRoleOpen.value;
  }
};

// Select Role Option
const selectOption = (dropdown, value) => {
  if(dropdown === 'state') {
    currentState.value = value;
    currentPage.value = 1;
    isStateOpen.value = false;
  } else if (dropdown === 'role') {
    currentRole.value = value;
    currentPage.value = 1;
    isRoleOpen.value = false;
  }
};

function openPost(postId)  {
  visiblePost.value = postId
  isRoleOpen.value = false
  isStateOpen.value = false
}

async function closePost() {
  visiblePost.value = null
  newPost.value = false
  viewMode.value = 'view'
  await getPosts();

}

function openNewPost() {
  newPost.value = true
  viewMode.value = 'edit'
  isRoleOpen.value = false
  isStateOpen.value = false
}

const postsPerPage = 4;
const currentPage = ref(1);

const filteredPosts = computed(() => {
  const lowercaseFilter = filter.value ? filter.value.toLowerCase() : '';

  let filtered = postList.value.filter(post => {
    const isStateMatch = currentState.value === '전체' || post.done === (currentState.value === '모집완료');
    const isRoleMatch = currentRole.value === '전체' || post.h_tag.some(tag => tag.name.includes(currentRole.value));
    const isKeywordMatch = !lowercaseFilter || post.title.toLowerCase().includes(lowercaseFilter);
    return isStateMatch && isRoleMatch && isKeywordMatch;
  });
  
  const startIndex = (currentPage.value - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  totalPages.value = Math.ceil(filtered.length / postsPerPage);
  return filtered.slice(startIndex, endIndex);
});

watch(filter, () => {
  currentPage.value = 1;
});



const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};



onMounted(async() => {
	await getPosts();
})






</script>

<style>
.fade-in-out {
  transition: opacity 0.3s ease-in-out;
}

.main {
  min-height: 100vh;
}
</style>