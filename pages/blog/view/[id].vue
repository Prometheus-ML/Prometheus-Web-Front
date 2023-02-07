<template>
  <NavBar></NavBar>
  <div class="container mx-auto pt-40 pb-24">
    <div class="pb-14">
      <p class="pb-3 font-medium text-gray-600">
        <span class="mr-3">{{ article?.created_date?.substring(0, 10) }}</span>
        <span>{{ article?.writer?.username }}</span>
      </p>
      <p class="font-bold text-5xl mb-9">{{ article?.name }}</p>
    </div>
    <div class="pb-7">
      <div class="mb-3" id="viewer"></div>
      <ul v-if="article?.tag" class="flex mt-5">
        <li v-for="tag in article?.tag" :key="tag" class="bg-red-100 text-red-900 text-sm px-3 py-1 mr-2">{{ tag }}</li>
      </ul>
    </div>
    <div class="flex justify-end gap-x-2">
      <nuxt-link :to="'/blog/edit/'+id" v-if="user?.id == article?.writer.id" class="bg-white py-2 px-4 border rounded inline-block">
          수정
      </nuxt-link>
      <nuxt-link :to="'/blog'" class="bg-white py-2 px-4 border rounded inline-block">
          글목록
      </nuxt-link>
    </div>
  </div>

  <Footer></Footer>
</template>

<script>
import { useAuth } from "@/store"
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor.css'

export default {
  name: 'ArticleView',
  components: {}, 
  data: () => ({
    id: useRoute().params.id,
    user: null,
    article: null,
    viewer: null,
  }),
  methods: {
    getCurrentUser() {
      $fetch(`${import.meta.env.VITE_API_URL}/user/my`, {
        method: 'GET',
        headers: {
          Authorization: useAuth().$state.accessToken
        }
      })
      .then((result) => {
        this.user = result
      })
      .catch((result) => {
      })
    },
    createViewer(initialValue) {
      this.viewer = new Viewer({
        el: document.querySelector('#viewer'),
        height: '600px',
        initialValue: initialValue
      });
    },
    getArticle() {
      $fetch(`${import.meta.env.VITE_API_URL}/article/${this.id}`, {
        method: 'GET',
        headers: {
          Authorization: useAuth().$state.accessToken
        }
      })
      .then((result) => {
          this.article = result
          this.createViewer(this.article.article)
      })
      .catch((result) => {
      })
    },
  },
  mounted() {
    this.getCurrentUser()
    this.getArticle()
  }
}
</script>
