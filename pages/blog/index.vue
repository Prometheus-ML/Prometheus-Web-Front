<template>
  <div class="container mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">블로그</p>
      <p class="font-medium text-gray-600 text-xl text-gray-600">멤버들이 말하는 프로메테우스</p>
    </div>
    <div>
      <div v-for="post in postList" :key="post.id" class="flex gap-12 flex-wrap items-center mb-16">
        <div>
          <div class="rounded-lg bg-cover bg-center bg-no-repeat w-96 pt-[55%]" :style="{ backgroundImage: 'url(' + useImage(post?.thumb) + ')' }"></div>
        </div>
        <div class="flex-1 flex flex-col justify-between py-3">
          <nuxt-link :to="'/blog/view/'+post.id">
            <div class="text-left">
              <p class="font-light text-sm mb-3">{{ post?.writer?.name }}</p>
              <p class="max-h-16 font-bold text-3xl mb-3">{{ post?.title }}</p>
              <ul v-if="post?.tag" class="flex mb-3">
                <li v-for="tag in post?.tag" :key="tag" class="rounded bg-gray-100 text-sm px-3 py-1 mr-2">#{{ tag.name }}</li>
              </ul>
              <p class="font-light text-sm">{{ post?.created_date.substring(0, 10) }}</p>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <nuxt-link :to="'/blog/new'" v-if="user" class="bg-white py-2 px-4 border rounded inline-block">
          글쓰기
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

const {data: postList, error: postErr} = await useApi('/post', {
  method: 'GET',
})

const authStore = useAuthStore();
const { user } = storeToRefs(authStore)
</script>

