<template>
  <NavBar></NavBar>
  
  <div class="container mx-auto pt-48">
    <p class="font-bold text-7xl mb-9">New Post</p>
    <!-- <p class="text-end">Write new post</p> -->
  </div>
  <div class="container mx-auto py-24">
    <div class="mb-9">
      <div class="mb-6">
        <label for="name" class="block mb-2 text-lg font-large text-gray-900 dark:text-white">Title</label>
        <input v-model="article.name" type="text" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pro" required="">
      </div>
      <div id="editor"></div>
    </div>
    <!-- <ul class="flex mt-5">
      <li v-for="tag in article.tag" :key="tag" class="bg-red-100 text-red-900 text-sm px-3 py-1 mr-2">{{ tag }}</li>
    </ul> -->
    <button @click="saveArticle" class="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 mb-4 border rounded shadow">
      Save
    </button>
  </div>

  <Footer></Footer>
</template>

<script>
  import { useAuth } from "@/store"
  import Editor from '@toast-ui/editor'
  import '@toast-ui/editor/dist/toastui-editor.css'
  
  export default {
    name: 'ArticleEdit',
    components: {},
    data: () => ({
      user: null,
      article: {},
      editor: null,
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
      getDate() {
        const current = new Date();
        const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
        return date;
      },
      createEditor(initialValue) {
        this.editor = new Editor({
          el: document.querySelector('#editor'),
          height: '500px',
          initialValue: initialValue,
          initialEditType: 'markdown',
          previewStyle: 'vertical'
        })
      },
      getArticle() {
        this.article = {
          name: "",
          tags: [],
        }
        this.createEditor('')
      },
      saveArticle() {
        this.article.article = this.editor.getMarkdown();
        this.article.tags = []

        this.article.create_date = this.getDate()
        this.article.writer = this.user.name

        $fetch(`${import.meta.env.VITE_API_URL}/article/new`, {
          method: 'POST',
          body: this.article,
          headers: {
            Authorization: useAuth().$state.accessToken
          }
        })
        .then((result) => {
          useRouter().push({ path: `/blog/view/${result.id}` })
        })
        .catch((result) => {
        })
      },
    },
    mounted(){
      this.getCurrentUser()
      this.getArticle()
    }
  }
  </script>
  