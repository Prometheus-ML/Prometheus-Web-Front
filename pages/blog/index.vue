<template>
  <div class="container mx-auto pt-40  pb-32">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">블로그</p>
      <p class="font-medium text-xl text-rose-700">Posts</p>
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

<!-- <div class="grid grid-cols-1 md:grid-cols-2 items-start gap-6 mb-5">
      <div v-for="post in postList" :key="post.id" class="overflow-hidden flex gap-12 flex-wrap items-center rounded-lg border hover:drop-shadow-xl hover:bg-gray-50">
        <nuxt-link :to="'/blog/view/' + post.id">
					<div>
						<div class="rounded-lg bg-cover bg-center bg-no-repeat w-64 pt-[55%]" :style="{ backgroundImage: 'url(' + useImage(post?.thumb) + ')' }"></div>
					</div>
					<div class="flex-1 flex flex-col justify-between py-3 bg-gray-50">
						<div class="text-left">
							<p class="font-light text-sm mb-3">{{ post?.writer?.name }}</p>
							<p class="max-h-16 font-bold text-3xl mb-3">{{ post?.title }}</p>
							<p class="font-light text-sm">{{ post?.created_date.substring(0, 10) }}</p>
						</div>
					</div>
				</nuxt-link>
      </div>
    </div>
 -->
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

