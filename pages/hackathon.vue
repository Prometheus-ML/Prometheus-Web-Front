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
            text text text text text text text text text text text
          </p>
          <button
            type="button"
            class="w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            @click="openGoogleForm()"
          >
            참가신청하기
          </button>
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
  methods: {
    openGoogleForm: function () {
      window.open("https://forms.gle/uVSuXEzgZq7VWL3E6");
    },
  },
};
</script>
