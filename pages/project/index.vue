<template>
	<div class="container mx-auto pt-40 pb-24">
		<div class="mb-14">
			<p class="font-bold text-4xl md:text-5xl mb-5">프로젝트</p>
    	<p class="font-medium text-gray-600 text-xl text-gray-600">멤버들의 활동을 확인해보세요</p>
		</div>
		<div class="grid grid-cols-3 items-start gap-9">
			<div v-for="project in projectList" class="w-full">
				<nuxt-link :to="'/project/view/'+project.id">
					<div class="rounded w-full bg-gray-300 pb-[55%] mb-5"></div>
					<div class="text-left">
						<p class="max-h-16 text-ellipsis overflow-hidden font-medium text-2xl mb-2">{{ project.name }}</p>
						<p class="max-h-12 text-ellipsis overflow-hidden">{{ project.description }} </p>
					</div>
				</nuxt-link>
			</div >
		</div>

		<div class="flex justify-end">
			<nuxt-link :to="'/project/new'" v-if="user" class="bg-white py-2 px-4 border rounded inline-block">
				글쓰기
			</nuxt-link>
		</div>
	</div>
</template>
<script setup>

import { storeToRefs } from "pinia";

const {data: projectList, error: postErr} = await useApi('/project', {
  method: 'GET',
})

const authStore = useAuthStore();
const { user } = storeToRefs(authStore)
</script>
