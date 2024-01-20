<template>
  <div class="container mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">관리자 페이지</p>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="link in links"
        :key="link.path"
        class="relative bg-white p-4 rounded shadow flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors duration-300"
      >
        <nuxt-link :to="link.path">
          <h2 class="text-lg font-semibold">{{ link.label }}</h2>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const links = [
  { label: 'User List', path: '/admin/userlist' },
  { label: 'Member List', path: '/admin/memberlist' },
  { label: 'Register Token', path: '/admin/registertoken' },
];


onMounted(async () => {
	try {
		const response = await $fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
			method: 'POST',
			credentials: 'include',
		})
    console.log(response.grant)
    if(response.grant !== "admin" && response.grant !== "master") navigateTo("/")
	} catch (error) {
		navigateTo("/")
	}

})
</script>

