<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="border-b mb-4">
      <nav class="-mb-px flex space-x-6">
        <NuxtLink to="/my" :class="['py-2 px-1 border-b-2 text-sm', $route.path === '/my' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700']">기본 정보</NuxtLink>
        <NuxtLink to="/my/coffee_chat" :class="['py-2 px-1 border-b-2 text-sm', $route.path.startsWith('/my/coffee_chat') ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700']">커피챗</NuxtLink>
        <NuxtLink to="/my/project" :class="['py-2 px-1 border-b-2 text-sm', $route.path.startsWith('/my/project') ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700']">프로젝트</NuxtLink>
        <NuxtLink to="/my/post" :class="['py-2 px-1 border-b-2 text-sm', 'border-blue-600 text-blue-600']">게시글</NuxtLink>
      </nav>
    </div>
    <div class="text-gray-600">게시글 탭 준비 중...</div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>


