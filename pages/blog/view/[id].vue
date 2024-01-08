<template>
  <div class="container mx-auto pt-40 pb-24">
    <Error :errorMessage="postErr" v-if="postErr" />
    <div class="mb-14 ">
      <!-- <p class="pb-3 font-medium text-gray-600">
        <span class="mr-3">{{ post?.created_date?.substring(0, 10) }}</span>
        <span>{{ post?.writer?.name }}</span>
      </p> -->
      <p class="font-bold text-5xl">{{ post?.title }}</p>
    </div>
    <div class="pb-7">
      <div class="mb-3" v-show="false" v-html="post?.html"></div>
      <div class="overflow-auto flex justify-center mb-8">
        <div class="mx-auto mb-5 viewer-container bg-white rounded p-4">
          <div id="viewer" class=""></div>
        </div>
      </div>
      <!-- <ul v-if="post?.tag" class="flex mt-5">
        <li v-for="tag in post?.tag" :key="tag" class="rounded bg-gray-100 text-sm px-3 py-1 mr-2">#{{ tag.name }}</li>
      </ul> -->
    </div>
    <div v-if="user" class="flex justify-end gap-x-2 mb-5">
      <nuxt-link :to="'/blog'" class="bg-white py-2 px-4 border rounded inline-block">
          글목록
      </nuxt-link>
      <button @click="deletePost" v-if="user?.id == post?.writer?.id || user?.grant == 'admin'" class="bg-white py-2 px-4 border rounded inline-block">
          삭제
      </button>
      <nuxt-link :to="'/blog/edit/'+post.id" v-if="user?.id == post?.writer?.id" class="bg-white py-2 px-4 border rounded inline-block">
          수정
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";


import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import '@toast-ui/editor/dist/toastui-editor.css'

const id = useRoute().params.id

const authStore = useAuthStore();
const { user } = storeToRefs(authStore)

const viewer = ref()

const postErr = ref()

const post= ref()
  
const getPost = async () => {
  await $api(`${import.meta.env.VITE_API_URL}/post/${useRoute().params.id}`, {
    method: 'GET',
  	credentials: 'include',
  })
  .then((result) => {
    post.value = result;
  })
  .catch((error) => {
		if(error.status == 400) postErr.value="글이 존재하지 않습니다."
    else postErr.value="권한이 없습니다."
  })
}

async function deletePost() {
  try {
    const result = await $api(`/post/delete/${useRoute().params.id}`, {
      method: 'delete'
    })

    useRouter().push({ path: '/blog' })
  } catch (error) {
  }
}

onMounted(async () => {
	try {
    await getPost();
    viewer.value = await useViewer(post.value.content)
  } catch {
  }
})

</script>

<style>
.viewer-container img {
  max-width: 100%; /* 이미지의 최대 너비를 컨테이너에 맞게 조절합니다. */
  height: auto; /* 이미지 비율을 유지하면서 높이를 자동으로 조절합니다. */
	margin: auto; /* 이미지를 가로로 중앙에 배치 */
}


</style>