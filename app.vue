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

::-webkit-scrollbar {
  width: 12px;
}

/* Define the scrollbar thumb */
::-webkit-scrollbar-thumb {
  background-color: #737373; /* Change the color to your preference */
  border-radius: 6px; /* Rounded corners for the thumb */
}



/* Define the scrollbar thumb on hover */
::-webkit-scrollbar-thumb:hover {
  background-color: #737373; /* Change the color to your preference */
}

</style>