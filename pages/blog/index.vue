<template>
  <div class="container mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">블로그</p>
      <p class="font-medium text-gray-600 text-xl text-gray-600">멤버들이 말하는 프로메테우스</p>
    </div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 items-start gap-6 mb-5">
			<nuxt-link v-for="post in postList" :key="post.id" :to="'/blog/view/' + post.id" class="flex overflow-hidden rounded-lg border hover:drop-shadow-xl hover:bg-gray-100">
				<div class="pt-[30%] rounded-l-lg bg-cover bg-center bg-no-repeat overflow-hidden w-1/3" :style="{ backgroundImage: 'url(' + useImage(post?.thumb, type) + ')', backgroundSize: 'cover', backgroundPosition: 'center'}"></div>
				<div class="p-4 w-2/3">
					<p class="truncate overflow-hidden font-bold text-2xl mb-2 line-clamp-1">{{ post?.title }}</p>
					<p class="truncate font-light text-base overflow-hidden mb-4 line-clamp-1">{{ post?.created_date.substring(0, 10) }}</p>
					<p class="font-light text-base mb-2"> by {{ post?.writer.username }}</p>
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

const {data: postList, error: postErr} = await useApi('/post/', {
  method: 'GET',
})

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
const { user } = storeToRefs(authStore);
</script>

