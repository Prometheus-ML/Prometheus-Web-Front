<template>
  <NuxtLayout>
      <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
onMounted( async () => {
  const authStore = useAuthStore();
  await authStore.verify();
})
</script>

<style>
body {
  font-family: 'Noto Sans KR', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: -0.7px;
}
p {
  word-wrap: break-word;
  word-break: keep-all
}

.toastui-editor-contents{
  font-size: 17px !important;
  font-family: inherit !important;
}
</style>