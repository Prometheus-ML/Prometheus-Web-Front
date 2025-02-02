<template>
  <div class="container mx-auto pt-40  pb-32">
    <div class="mb-14">
      <p class="mx-auto text-center text-rose-700 prometheus font-light text-sm md:text-xl mb-1">Blog</p>
      <p class="mx-auto text-center font-semibold detail text-lg md:text-4xl mb-16">블로그</p>
    </div>
		
		<div class="flex justify-center items-center p-6 text-2xl">
      <div class="flex flex-wrap md:gap-5 mx-auto w-[85%] detail text-2xs md:text-lg justify-center">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{
            'font-bold': activeTab === tab.key,
            'text-neutral-500 hover:text-neutral-800': activeTab !== tab.key,
            'border-b-2 border-black': activeTab === tab.key,
          }"
          @click="setActiveTab(tab.key)"
          class="mr-4 md:mr-6 cursor-pointer flex items-center"
        >
          <span class="mx-auto">{{ tab.name }}</span>
        </div>
      </div>
    </div>


    <div class="grid grid-cols-2 md:grid-cols-4 items-start gap-6 mb-5">
				<div v-for="post in filteredPosts" :key="post.id" class="relative w-full pb-[100%]">
					
          <font-awesome-icon v-if="user" @click="deletePost(post)" class="absolute top-0 right-0 cursor-pointer z-50 mr-1 hover:opacity-70 py-1 px-2 text-rose-600" icon="fa-solid fa-xmark"/>
          <nuxt-link :to="'/blog/edit/' + post.id">
            <font-awesome-icon v-if="user" class="absolute bottom-0 right-0 cursor-pointer z-50 mr-1 hover:opacity-70 py-1 px-2" icon="fa-solid fa-pen"/>
          </nuxt-link>

          <a :href="post.url" class="absolute drop-shadow-md rounded-lg border w-[100%] h-[100%] hover:opacity-70 bg-cover bg-center bg-no-repeat mb-2 sm:mb-5"
            :style="{ backgroundImage: 'url(' + useImage(post?.thumb, type) + ')', backgroundSize: 'cover', backgroundPosition: 'center' }">
					</a>
			</div>
			
		</div>
    <div class="relative flex justify-end">
			
      <nuxt-link :to="'/blog/new'" v-if="user" class="bg-white py-2 px-4 border rounded inline-block">
          글쓰기
      </nuxt-link>
			
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
const type = "links"

const tabs = [
  { key: 'news', name: 'AI NEWS'},
  { key: 'article', name: '외부기사'}
];

const activeTab = ref('news');

const postList = ref([
])

const getPosts = async () => {
  try {
    const response = await $api(`${import.meta.env.VITE_API_URL}/link/get_links`, {
      method: 'GET',
    });

    // 날짜별로 정렬
    response.sort((a, b) => {
      const dateA = new Date(a.created_date);
      const dateB = new Date(b.created_date);
      return dateB - dateA; // 내림차순 정렬
    });

    postList.value = response;
  } catch (error) {
    console.error(error)
  }
}

async function removeImage(link) {
	try {
		const response = await $api(`${import.meta.env.VITE_API_URL}/image/delete/${type}/${link.thumb}`, {
      method: 'DELETE',
    });
		await getPosts();
	}	catch (error) {
		console.error(error)
	}
}

const deletePost = async (link) => {
  try {
		await removeImage(link);
    const response_2 = await $api(`${import.meta.env.VITE_API_URL}/link/delete/${link.id}`, {
      method: 'DELETE',
    });
    await getPosts();
  } catch (error) {
    console.error(error);
  }
};


const filteredPosts = computed(() => {
  // Filter posts based on the current tab
  return postList.value.filter(post => post.category == activeTab.value);
});

const setActiveTab = (tab) => {
	activeTab.value = activeTab.value === tab? null : tab;
};

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

onMounted(async() => {
	await getPosts();
})
</script>

