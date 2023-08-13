<template>
  <div class="container mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">블로그</p>
      <p class="font-medium text-gray-600 text-xl text-gray-600">멤버들이 말하는 프로메테우스</p>
    </div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 items-start gap-6 mb-5">
			<a v-for="post in postList" :key="post.id" :href="post.link" class="flex overflow-hidden rounded-lg border hover:drop-shadow-xl hover:bg-gray-100">
				<div class="pt-[30%] rounded-l-lg bg-cover bg-center bg-no-repeat overflow-hidden w-1/3" :style="{ backgroundImage: `url(${post.thumb})`, backgroundSize: 'cover', backgroundPosition: 'center'}"></div>
				<div class="p-4 w-2/3">
					<p class="truncate overflow-hidden font-bold text-xl lg:text-2xl mb-2 line-clamp-1">{{ post?.title }}</p>
					<p class="truncate font-light text-base lg:text-lg overflow-hidden mb-4 line-clamp-1">{{ post?.created_date.substring(0, 10) }}</p>
					<p class="font-light text-sm lg:text-base mb-2"> by {{ post?.writer }}</p>
				</div>
			</a>
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
import thumb_11 from '@/assets/images/thumb/11.jpg';
import thumb_12 from '@/assets/images/thumb/12.png';
import thumb_13 from '@/assets/images/thumb/13.jpg';
	
const postList = ref([
	{
		title: "8월 1주차 인공지능 뉴스",
		thumb: thumb_13,
		updated_date: "2023-08-05T06:52:49",
		id: 3,
		content: "???",
		created_date: "2023-08-05T06:52:49",
		writer: "관리자",
		link:"https://mirage-cephalopod-77a.notion.site/8-1-8ba6adae7d9a4c7cb81012f0316f27a7"
	},
	{
		title: "7월 4주차 인공지능 뉴스",
		thumb: thumb_12,
		updated_date: "2023-07-31T06:52:49",
		id: 2,
		content: "???",
		created_date: "2023-07-31T06:52:49",
		writer: "관리자",
		link:"https://mirage-cephalopod-77a.notion.site/7-4-4a3a2ea23c5f44f0937b1624791a357f"
	},
	 {
		title: "7월 3주차 인공지능 뉴스",
		thumb: thumb_11,
		updated_date: "2023-07-23T06:52:49",
		id: 1,
		content: "???",
		created_date: "2023-07-23T06:52:49",
		writer: "관리자",
		link:"https://mirage-cephalopod-77a.notion.site/7-3-e8dc8b0672e44f47b71703079ccbe0d0"
	},

])
// const {data: postList, error: postErr} = await useApi('/post/show_all_posts', {
//   method: 'GET',
// })

// postList.value = [{
// 	title: "example1",
// 	created_date: "2023-07-24",
// },
// 					 {
// 	title: "example2",
// 	created_date: "2023-07-24",
// },
// 					 {
// 	title: "example3",
// 	created_date: "2023-07-24",
// }];
const authStore = useAuthStore();
const { user } = storeToRefs(authStore)
</script>

