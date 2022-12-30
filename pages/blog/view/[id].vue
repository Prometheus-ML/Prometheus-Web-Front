<template>
  <NavBar></NavBar>

  <div class="container mx-auto pt-48">
    <div>
    <p class="font-bold text-5xl mb-9">{{ article?.name }}</p>
    <p class="text-end">{{ article?.writer?.username }} | {{ article?.created_date?.substring(0, 10) }}</p>
    </div>
  </div>
  <div class="container mx-auto py-24">
    <div class="mb-9" id="viewer"></div>
    <ul class="flex mt-5">
      <li v-for="tag in article?.tag" :key="tag" class="bg-red-100 text-red-900 text-sm px-3 py-1 mr-2">{{ tag }}</li>
    </ul>
    <nuxt-link :to="'/blog/edit/'+id" v-if="user?.id == article?.writer.id">
      <button class="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 mb-4 mr-2 border rounded shadow">
        Edit
      </button>
    </nuxt-link>
    <nuxt-link :to="'/blog'">
      <button class="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 mb-4 border rounded shadow">
        List
      </button>
    </nuxt-link>
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
