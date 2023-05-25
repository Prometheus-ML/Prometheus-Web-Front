<template>
  <div class="container mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="pb-3 font-medium text-gray-600">
        <span class="mr-3">{{ post?.created_date?.substring(0, 10) }}</span>
        <span>{{ post?.writer?.name }}</span>
      </p>
      <p class="font-bold text-5xl">{{ post?.title }}</p>
    </div>
    <div class="pb-7">
      <div class="mb-3" v-show="false" v-html="post?.html"></div>
      <div class="mb-3" id="viewer"></div>

      <ul v-if="post?.tag" class="flex mt-5">
        <li v-for="tag in post?.tag" :key="tag" class="rounded bg-gray-100 text-sm px-3 py-1 mr-2">#{{ tag.name }}</li>
      </ul>
    </div>
    <div class="flex justify-end gap-x-2">
      <nuxt-link :to="'/blog'" class="bg-white py-2 px-4 border rounded inline-block">
          글목록
      </nuxt-link>
      <button @click="deletePost" v-if="user?.id == post?.writer.id || user?.grant == 'admin'" class="bg-white py-2 px-4 border rounded inline-block">
          삭제
      </button>
      <nuxt-link :to="'/blog/edit/'+id" v-if="user?.id == post?.writer.id" class="bg-white py-2 px-4 border rounded inline-block">
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

let viewer = ref()

const {data: post, error: postErr} = await useApi(`/post/${id}`, {
  method: 'GET',
})

async function createViewer(initialValue) {
  const {default: Viewer} = await import('@toast-ui/editor/dist/toastui-editor-viewer')

  const {default: codeSyntaxHighlight} = await import('@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js');
  viewer.value = new Viewer({
    el: document.querySelector('#viewer'),
    height: '600px',
    initialValue: initialValue,
    plugins: [codeSyntaxHighlight],
  });
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
  createViewer(post.value.content)
})

</script>