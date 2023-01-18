<template>
  <NavBar></NavBar>

  <div class="container mx-auto pt-32 md:pt-48">
    <div>
      <p class="font-bold text-4xl md:text-6xl mb-9">Hackathon</p>
    </div>
    <div class="container mx-auto pb-16 md:pb-24">
      <div class="grid grid-cols-1 gap-9 lg:grid-cols-2">
        <img
          src="@/assets/images/hackathon.jpeg"
          class="w-full bg-gray-300 mb-5 rounded-md"
        />
        <div class="container">
          <p class="text-l mb-2">title</p>
          <p class="text-sm mb-2">
            texttexttexttexttexttexttexttexttexttexttext
          </p>
        </div>
      </div>
    </div>
  </div>

  <Footer></Footer>
</template>

<script>
export default {
  name: "HackathonView",
  components: {},
  data: () => ({}),
  methods: {},
};
</script>
