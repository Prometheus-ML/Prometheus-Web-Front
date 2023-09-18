<template>
  <div v-if="user" class="container mx-auto pt-16">
    <div class="text-center mb-8 bg-gray-100 rounded">
      <h1 class="text-3xl font-bold mb-2">{{ project?.title }}</h1>
      <p class="text-base text-gray-600 mb-4">{{ project?.description }}</p>
			<p
							v-for="(value, index) in project.members"
							:key="index"
							class="mr-2 p-1 bg-gray-100 rounded-lg"
						>{{ value }}</p>
    </div>

		
    <div class="flex flex-col md:flex-row">
      <div class="w-full pl-8">

        <!-- Add the Viewer component to display the project content -->
        <div class="max-w-screen-md mx-auto mb-5 viewer-container">
					<div id="viewer" class="rounded"></div>
				</div>
      </div>
    </div>
		<div class="container mx-auto pt-16">
			<!-- Your existing content here -->
    <!-- <div class="mb-9">
      <p class="font-medium text-2xl mb-3">외부 링크</p>
      <div class="mt-3">
        <a v-if="project.homepage" class="mr-4 text-2xl" :href="{project.homepage}"><font-awesome-icon icon="fa-solid fa-globe" /></a>
        <a v-if="project.github" class="mr-4 text-2xl" href="project.github"><font-awesome-icon icon="fa-brands fa-github" /></a>
        <a v-if="project.playstore" class="mr-4 text-2xl" href="project.playstore"><font-awesome-icon icon="fa-brands fa-google-play" /></a>
        <a v-if="project.appstore" class="mr-4 text-2xl" href="project.appstore"><font-awesome-icon icon="fa-brands fa-app-store" /></a>
      </div>
    </div> -->
			<!-- This is where the project details will be displayed -->
 	</div>
		<!-- <div class="flex items-center mb-4">
							<span class="text-sm text-gray-600 mr-2">참여 멤버: {{ project?.member }}</span>
						</div>
						<div class="flex items-center mb-4">
							<span class="text-sm text-gray-600 mr-2">외부 링크</span>
							<div class="flex items-center">
								<a v-if="project?.homepage" :href="project.homepage" class="mr-2">
									<font-awesome-icon :icon="['fas', 'globe']" />
								</a>
								<a v-if="project?.github" :href="project.github" class="mr-2">
									<font-awesome-icon icon="fa-brands fa-github" />
								</a>
								<a v-if="project?.playstore" :href="project.playstore" class="mr-2">
									<font-awesome-icon :icon="['fab', 'google-play']" />
								</a>
								<a v-if="project?.appstore" :href="project.appstore" class="mr-2">
									<font-awesome-icon :icon="['fab', 'apple']" />
								</a>
							</div>
						</div> -->
    <!-- Add any other project details or sections here -->

    <div v-if="user" class="flex justify-end gap-x-2 mb-5">
      <nuxt-link :to="'/project'" class="bg-white py-2 px-4 border rounded inline-block">
          글목록
      </nuxt-link>
      <button @click="deleteProject" v-if="user?.id == post?.writer.id || user?.grant == 'admin'" class="bg-white py-2 px-4 border rounded inline-block">
          삭제
      </button>
      <nuxt-link :to="'/project/edit/'+project?.id" v-if="user?.id == post?.writer.id || user?.grant == 'admin'" class="bg-white py-2 px-4 border rounded inline-block">
          수정
      </nuxt-link>
    </div>
  </div>
</template>


    <!-- <div id="controls-carousel" class="relative mb-9" data-carousel="static">
      <div class="relative h-56 overflow-hidden rounded md:h-96">
        <div class="duration-700 ease-in-out absolute inset-0 transition-all transform -translate-x-full z-10" data-carousel-item="">
          <img :src="project.img_slide[0]" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
        <div class="duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-0 z-20" data-carousel-item="active">
          <img :src="project.img_slide[0]" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
        <div class="duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-full z-10" data-carousel-item="">
          <img :src="project.img_slide[0]" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
        <div class="hidden duration-700 ease-in-out absolute inset-0 transition-all transform" data-carousel-item="">
          <img :src="project.img_slide[0]" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
        <div class="hidden duration-700 ease-in-out absolute inset-0 transition-all transform" data-carousel-item="">
          <img :src="project.img_slide[0]" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
      </div>
      <button type="button" class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev="">
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg aria-hidden="true" class="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>
      <button type="button" class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next="">
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg aria-hidden="true" class="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div> -->



    <!-- <ul class="flex mt-5">
      <li v-for="tag in project.tag" :key="tag" class="bg-red-100 text-red-900 text-sm px-3 py-1  mr-2">{{ tag }}</li>
    </ul> -->
  <!-- </div> -->



<script setup>
import _ from "lodash"
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore)


const viewer = ref();

const project = ref([])

const getProject = async () => {
  await $fetch(`${import.meta.env.VITE_API_URL}/project/${useRoute().params.id}`, {
    method: 'GET',
  	credentials: 'include',

  })
  .then((result) => {
    project.value = result;
		console.log(result);
  })
  .catch((error) => {
		navigateTo('/project');
  })
}

const editProject = () => {
  project.value.tags = []

  $fetch(`${import.meta.env.VITE_API_URL}/project/update/${useRoute().params.id}`, {
    method: 'PUT',
    body: project.value,
    credentials: 'include',
  })
  .then((result) => {
    useRouter().push({ path: `/project/view/${useRoute().params.id}` })
  })
  .catch((result) => {
  })
}

async function deleteProject() {
  try {
    const result = await $api(`/post/delete/${useRoute().params.id}`, {
      method: 'delete'
    })

    useRouter().push({ path: '/blog' })
  } catch (error) {
  }
}
	
const formatDate = (date) => {
  return new Date(date).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
	
onMounted(async () => {
  await getProject()
	viewer.value = await useViewer(project.value.content)
	console.log(project.value);
})

</script>

<style>
.viewer-container img {
  max-width: 100%; /* 이미지의 최대 너비를 컨테이너에 맞게 조절합니다. */
  height: auto; /* 이미지 비율을 유지하면서 높이를 자동으로 조절합니다. */
	margin: auto; /* 이미지를 가로로 중앙에 배치 */
}
</style>