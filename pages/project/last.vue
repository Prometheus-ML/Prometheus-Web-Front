<template>
  <div class="custom mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">프로젝트</p>
      <p class="font-medium text-gray-600 text-xl text-gray-600">멤버들의 활동을 확인해보세요</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 items-start gap-6 mb-5">
			<div v-for="project in projectList" :key="project.id" class="p-5 pb-2 bg-neutral-900 border border-neutral-800 shadow-lg shadow-white/20 rounded-2xl">	
					<div class="mb-5 overflow-hidden">
						<div class="rounded-md pb-[60%] p-5" :style="{ backgroundImage: `url(${project.thumb})`, backgroundSize: 'cover', backgroundPosition: 'center' }"></div>
						<div class="h-8 my-4">
							<p class="font-light text-xs md:text-sm mb-2 line-clamp-1 text-neutral-200">{{ project.title }}</p>
							<!-- <p class="text-xs md:text-sm line-clamp-2">{{ project.description }}</p> -->
						</div>
					</div>

			</div>
		</div>
  </div>
</template>



<script setup>
import { storeToRefs } from "pinia";
import thumb_1 from '@/assets/images/thumb/1.png';
import thumb_2 from '@/assets/images/thumb/2.png';
import thumb_3 from '@/assets/images/thumb/3.png';
import thumb_4 from '@/assets/images/thumb/4.png';
import thumb_5 from '@/assets/images/thumb/5.png';
import thumb_6 from '@/assets/images/thumb/6.png';
	
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const projectList = ref([
  {
    id: 1,
    title: "라즈베리파이를 활용한 인공지능 자율주행차 제작 프로젝트",
    thumb: thumb_3,
    homepage: null,
    playstore: null,
    created_date: "2023-07-29T13:23:38",
    writer: "string",
    description: "",
    content: "d",
    github: null,
    appstore: null,
    updated_date: "2023-07-30T08:03:05"
  },
  {
    id: 2,
    title: "DACON 수상작 코드 리뷰 및 공모전 참가",
    thumb: thumb_5,
    homepage: null,
    playstore: null,
    created_date: "2023-07-30T06:37:54",
    writer: "admin",
    description: "",
    content: "",
    github: null,
    appstore: null,
    updated_date: "2023-08-13T08:09:37"
  },
	{
    id: 3,
    title: "Multi-modal Style Transfer 프로젝트",
    thumb: thumb_4,
    homepage: null,
    playstore: null,
    created_date: "2023-07-30T06:37:54",
    writer: "admin",
    description: "",
    content: "",
    github: null,
    appstore: null,
    updated_date: "2023-08-13T08:09:37"
  },
	{
    id: 4,
    title: "금융 시계열(주식or코인) 모델 제작 프로젝트",
    thumb: thumb_6,
    homepage: null,
    playstore: null,
    created_date: "2023-07-30T06:37:54",
    writer: "admin",
    description: "",
    content: "",
    github: null,
    appstore: null,
    updated_date: "2023-07-30T08:09:37"
  },
	{
    id: 5,
    title: "얼굴의 여러 요소를 바꾸어주는 GAN Image Generator 제작 프로젝트",
    thumb: thumb_1,
    homepage: null,
    playstore: null,
    created_date: "2023-07-30T06:37:54",
    writer: "admin",
    description: "",
    content: "",
    github: null,
    appstore: null,
    updated_date: "2023-07-30T08:09:37"
  },
	{
    id: 6,
    title: "강화학습을 활용한 snake 게임과 오목 구현 프로젝트",
    thumb: thumb_2,
    homepage: null,
    playstore: null,
    created_date: "2023-07-30T06:37:54",
    writer: "admin",
    description: "",
    content: "",
    github: null,
    appstore: null,
    updated_date: "2023-07-30T08:09:37"
  }
])

// const {data: projectList, error: postErr} = await useApi('/project/show_all_projects', {
//   method: 'GET',
// })


</script>

<style scoped>
.custom {
	max-width: 960px;
  
}
</style>