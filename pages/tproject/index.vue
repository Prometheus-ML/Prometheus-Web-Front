<template>
  <div class="container mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">프로젝트</p>
      <p class="font-medium text-gray-600 text-xl text-gray-600">멤버들의 활동을 확인해보세요</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 items-start gap-6 mb-5">
			<div v-for="project in projectList" :key="project.id" class="w-full rounded-lg border hover:drop-shadow-2xl hover:bg-gray-50">
				
					<div class="mb-5 overflow-hidden">
						<div class="rounded-t-md pb-[60%] p-5" :style="{ backgroundImage: 'url(' + useImage(project?.thumb) + ')', backgroundSize: 'cover', backgroundPosition: 'center' }"></div>
						<div class="p-4">
							<p class="truncate overflow-hidden font-bold text-lg md:text-2xl mb-2 line-clamp-1">{{ project.title }}</p>
							<p class="truncate text-xs md:text-base overflow-hidden line-clamp-1">{{ project.description }}</p>
						</div>
					</div>

			</div>
		</div>
  </div>
</template>



<script setup>
import { storeToRefs } from "pinia";
import projectList from '@/assets/data/projects.json';
	
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);


// const {data: projectList, error: postErr} = await useApi('/project/show_all_projects', {
//   method: 'GET',
// })


</script>
