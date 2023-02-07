<template>
  <NavBar></NavBar>
  <div class="container mx-auto pt-40 pb-24">
    <div class="pb-14">
      <p class="font-bold text-5xl">BLOG</p>
      <!-- <p class="text-end">Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br> Donec congue tincidunt massa, vel consequat ipsum pharetra nec. <br> Etiam vel congue urna, ut cursus nisi.</p> -->
    </div>
    <div>
      <div v-for="article in articleList" :key="article.id">
        <!-- <div class="flex gap-9 flex-wrap"> -->
          <!-- <div>
            <div class="rounded-md w-96 bg-gray-300 pb-[55%]"></div>
          </div> -->
          <div class="flex-1 flex flex-col justify-between py-3">
            <nuxt-link :to="'/blog/view/'+article.id">
              <div class="text-left">
                <p class="font-light text-sm mb-3">{{ article?.writer?.username }}</p>
                <p class="max-h-16 text-ellipsis overflow-hidden font-medium text-2xl mb-3">{{ article?.name }}</p>
                <p class="max-h-12 text-ellipsis overflow-hidden mb-3">{{ article?.article }} </p>
                <p class="font-light text-sm">{{ article?.created_date.substring(0, 10) }}</p>
              </div>
            </nuxt-link>
            <ul v-if="article?.tag" class="flex mt-5">
              <li v-for="tag in article?.tag" :key="tag" class="rounded-md bg-red-100 text-red-900 text-sm px-3 py-1 mr-2">{{ tag }}</li>
            </ul>
          </div>
        <!-- </div> -->
        <hr class="my-5">
      </div>
    </div>
    <div class="flex justify-end">
      <nuxt-link :to="'/blog/new'" v-if="user" class="bg-white py-2 px-4 border rounded inline-block">
          글쓰기
      </nuxt-link>
    </div>
  </div>
  

  <Footer></Footer>
</template>

<script setup>
import { useAuth } from "@/store"
console.log(useAuth().$state.accessToken)
const { data: user } = await useFetch(`${import.meta.env.VITE_API_URL}/user/my`, {
  method: 'GET',
  headers: {
    Authorization: useAuth().$state.accessToken
  }
})

const {data: articleList} = await useFetch(`${import.meta.env.VITE_API_URL}/article`, {
  method: 'GET',
  headers: {
    Authorization: useAuth().$state.accessToken
  }
})
</script>
<!-- 
<script>
import { useAuth } from "@/store"

export default {
  name: 'BlogView',
  components: {},
  data: () => ({
    user: null,
    articleList: null,
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
    getArticleList() {
      $fetch(`${import.meta.env.VITE_API_URL}/article`, {
        method: 'GET',
        headers: {
          Authorization: useAuth().$state.accessToken
        }
      })
      .then((result) => {
          this.articleList = result.sort((a, b) => (a.created_date > b.created_date) ? -1 : -1)
      })
      .catch((result) => {
      })
    }
  },
  // $fetch(`${import.meta.env.VITE_API_URL}/article`, {
  //   method: 'GET',
  //   headers: {
  //     Authorization: useAuth().$state.accessToken
  //   }
  // })
  // .then((result) => {
  //     this.articleList = result.sort((a, b) => (a.created_date > b.created_date) ? -1 : -1)
  // })
  // .catch((result) => {
  // })

  computed: {
  },
  mounted() {
    this.getCurrentUser()
    this.getArticleList()

  }
}
</script> -->
