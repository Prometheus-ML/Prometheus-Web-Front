<template>
  <div class="container mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">프로젝트</p>
      <p class="font-medium text-gray-600 text-xl text-gray-600">멤버들의 활동을 확인해보세요</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start mb-5">
      <div v-for="project in projectList" :key="project.id" class="rounded-lg border hover:drop-shadow-2xl hover:bg-gray-50">
        <nuxt-link :to="'/project/view/' + project.id">
          <div class="relative overflow-hidden rounded-t-md h-48">
            <img
              :src="useImage(project?.thumb)"
              alt="Project Thumbnail"
              class="object-cover w-full h-full"
            />
          </div>
          <div class="p-4">
            <p class="font-bold text-lg md:text-xl mb-2 line-clamp-2">{{ project.title }}</p>
            <p class="text-sm md:text-base text-gray-600 line-clamp-3">{{ project.description }}</p>
          </div>
        </nuxt-link>
      </div>
    </div>

    <div class="flex justify-end">
      <nuxt-link v-if="user" :to="'/project/new'" class="bg-gray-200 py-2 px-4 border rounded inline-block">
        글쓰기
      </nuxt-link>
    </div>
  </div>
</template>



<script setup>
import { storeToRefs } from "pinia";

	
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);


const projectList = ref([])
const projectErr = ref()

function truncateText(text, maxLength) {
	if (text.length > maxLength) {
		return text.slice(0, maxLength) + '...';
	}
	return text;
}

const getProjects = async () => {
  try {
    const result = await $api(`${import.meta.env.VITE_API_URL}/project`, {
      method: 'GET',
    })
    projectList.value = result;
  } catch (error) {
		console.error(error)
  }
}

onMounted(async() => {
	await getProjects();
})

</script>
