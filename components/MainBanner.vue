<template>
  <div class="w-full h-screen relative">
    <div class="bg-container w-full h-full absolute bg-[url('@/assets/images/main.jpeg')] bg-center bg-cover"></div>
    <div class="w-full h-full absolute grid bg-black-alpha place-content-center">
      <div class="text-center text-white">
        <p class="font-black text-6xl mb-5">AI for the future</p>
        <span class="text-2xl">Prometheus</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainBanner',
  components: {},
  data: () => ({})
}
</script>

<style>
@supports ( -webkit-touch-callout : none) {
  .bg-container {
    background-attachment:scroll
  }
}

@supports not ( -webkit-touch-callout : none) {
  .bg-container {
    background-attachment: fixed;
  }
}
</style>
