<template>
  <div class="container mx-auto pt-40">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">블로그</p>
      <p class="font-medium text-gray-600 text-xl text-gray-600">멤버들이 말하는 프로메테우스</p>
    </div>
		
		<div class="mb-4 space-x-4 relative">
			<div class="absolute left-0 top-8 md:top-9 w-full h-0.5 bg-rose-700"></div>
			<button
				@click="changeTab('news')"
				:class="{ 'bg-rose-700': currentTab === 'news', 'font-bold text-white': currentTab === 'news' }"
				class="py-1 px-4 border-b-2 border-rose-700 duration-300 rounded-t-lg hover:text-white focus:outline-none hover:bg-rose-300 transition duration-300 text-base md:text-lg"
			>
				AI 뉴스
			</button>
			<button
				@click="changeTab('articles')"
				:class="{ 'bg-rose-700': currentTab === 'articles', 'font-bold text-white': currentTab === 'articles' }"
				class="py-1 px-4 border-b-2 border-rose-700 duration-300 rounded-t-lg hover:text-white focus:outline-none hover:bg-rose-300 transition duration-300 text-base md:text-lg"
			>
				외부 기사
			</button>
			<button
				@click="changeTab('reviews')"
				:class="{ 'bg-rose-700': currentTab === 'reviews', 'font-bold text-white': currentTab === 'reviews' }"
				class="py-1 px-4 border-b-2 border-rose-700 duration-300 rounded-t-lg hover:text-white focus:outline-none hover:bg-rose-300 transition duration-300 text-base md:text-lg"
			>
				활동 후기
			</button>
		</div>


    <div class="grid grid-cols-2 md:grid-cols-4 items-start gap-6 mb-5">
			<nuxt-link v-for="post in filteredPosts" :key="post.id" :to="'/blog/view/' + post.id" class="overflow-hidden border-gray-200 rounded-lg border hover:drop-shadow-2xl">
					<!-- Thumbnail with overlay -->
					<div class="pt-[100%] bg-cover bg-center bg-no-repeat hover:opacity-50 hover:bg-gray-500" :style="{ backgroundImage: 'url(' + useImage(post?.thumb, type) + ')', backgroundSize: 'cover', backgroundPosition: 'center'}">
				</div>
			</nuxt-link>
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
    <div class="flex justify-end">
      <nuxt-link :to="'/blog/new'" v-if="user" class="bg-white py-2 px-4 border rounded inline-block">
          글쓰기
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
const type = "thumbs"


const postList = ref([])

const getPosts = async () => {
  try {
    const response = await $api(`${import.meta.env.VITE_API_URL}/post/get_posts`, {
      method: 'GET',
    });
		console.log(response);
    postList.value = response;
  } catch (error) {
		console.error(error)
  }
}

const currentTab = ref('news');

const changeTab = (tab) => {
  currentTab.value = tab;
};

const filteredPosts = computed(() => {
  // Filter posts based on the current tab
  return postList.value.filter(post => post.type == currentTab.value);
});

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

onMounted(async() => {
	await getPosts();
})
</script>

