<template>
  <div v-if="post" class="absolute w-[100%] h-[92%] overflow-y-scroll">
    <div class="mb-14 container mx-auto">
      <div class="p-2 flex flex-col lg:flex-row items-center justify-between">
        <div class="flex flex-wrap md:mr-5 mb-2 justify-start items-center">
          <div
            :class="{ 'bg-neutral-500': post.done, 'bg-rose-500': !post.done }"
            class="rounded-full justify-center place-items-center py-1 px-2 md:px-5 mr-3"
          >
            <p class="text-xs md:text-lg font-semibold text-white text-center">{{ post.done ? '모집완료' : '모집중' }} </p>
          </div>
          <p class="text-center font-bold text-lg md:text-2xl">{{ post?.title }}</p>
        </div>
        
        <div class="font-light flex lg:ml-auto lg:flex-col flex-row">
          <p class="text-neutral-400 text-xs md:text-sm mr-3"> [생성] {{ post?.created_date.replace('T', ' ') }}</p>
          <p v-if="post?.created_date !==  post?.updated_date" class="text-neutral-400 text-xs md:text-sm md:mr-3"> [수정] {{ post?.updated_date.replace('T', ' ') }}</p>
        </div>
        
      </div>
      <div class="border-white border-t p-1"></div>
      <div class="grid grid-cols-4">
        <!-- 모집 역할 -->
        <div class="text-sm md:text-2xl font-bold flex justify-center items-center mr-3 md:mr-5 mb-1 p-4 col-span-1">
          <p class="mb-2">모집 역할</p>
        </div>
        <div class="col-span-3 flex flex-wrap py-4 flex place-items-start flex-row">
          <div v-for="(value, index) in post?.h_tag" :key="index" class="text-xs md:text-base py-1 px-5 mr-2 mb-1 font-bold rounded-full text-black bg-neutral-400">
            {{ value.name }}
          </div>
        </div>

        <!-- 모집 인원 -->
        <div class="text-sm md:text-2xl font-bold flex justify-center items-center mr-3 md:mr-5 mb-1 p-4 col-span-1">
          <p class="mb-2">모집 인원</p>
        </div>
        <p class="col-span-3 py-4">{{ post?.personnel }}</p>

        <!-- 연락 방법 -->
        <div class="text-sm md:text-2xl font-bold flex justify-center items-center mr-3 md:mr-5 mb-1 p-4 col-span-1">
          <p class="mb-2">연락 방법</p>
        </div>
        <p class="col-span-3 py-4">{{ post?.contact }}</p>

        <!-- 상세 내용 -->
        <div class="text-sm md:text-2xl font-bold flex justify-center items-center mr-3 md:mr-5 mb-1 p-4 col-span-1">
          <p class="mb-2">상세 내용</p>
        </div>
        <div class="col-span-3 py-4">
          <div class="px-2 viewer-container border border-black rounded bg-white overflow-y-scroll">
            <div id="viewer" class="rounded"></div>
          </div>
        </div>
      </div>
      
    </div>

  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";


import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor/dist/toastui-editor.css'

const props = defineProps({
  id: Number,
  editMode: Boolean
})


const viewer = ref()
const post = ref()
const postErr = ref()


const getPost = async () => {
  try {
    const response = await $fetch(`${import.meta.env.VITE_API_URL}/hackathon/${props?.id}`, {
      method: 'GET',
    })
    post.value = response;t
  } catch (error){
    if(error.status == 400) postErr.value="글이 존재하지 않습니다."
    else postErr.value="권한이 없습니다."
  }
}

// async function deletePost() {
//   try {
//     const result = await $api(`/post/delete/${useRoute().params.id}`, {
//       method: 'delete'
//     })

//     useRouter().push({ path: '/blog' })
//   } catch (error) {
//   }
// }

onMounted(async () => {
	try {
    await getPost();
    viewer.value = await useViewer(post.value.content)
  } catch (error) {
    console.log(error)
  }
})

</script>

<style>
.viewer-container {
  height: 50vh; /* Set an initial height based on a percentage of the viewport height */
  max-height: 200px; /* Set a max height to prevent overflow */
  margin: auto;
}

@media (min-width: 768px) {
  /* Adjust the height for larger screens if needed */
  .viewer-container {
    height: 70vh;
    max-height: 400px;
  }
}

</style>