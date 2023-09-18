<template>
  <div class="container mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">관리자 페이지</p>
    </div>
		<div class="flex items-center">
			<div class="mr-2"><span class="text-xl md:text-2xl font-semibold"> 가입토큰 :  {{ registerKey }}</span></div>
			<button @click="regenerateKey" class="flex items-center font-semibold py-2 px-1 rounded focus:outline-none">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path d="M13.5 2c-5.629 0-10.212 4.436-10.475 10h-3.025l4.537 5.917 4.463-5.917h-2.975c.26-3.902 3.508-7 7.475-7 4.136 0 7.5 3.364
									 7.5 7.5s-3.364 7.5-7.5 7.5c-2.381 0-4.502-1.119-5.876-2.854l-1.847 2.449c1.919 2.088 4.664 3.405 7.723 3.405 5.798
									 0 10.5-4.702 10.5-10.5s-4.702-10.5-10.5-10.5z"/></svg>
			</button>
		</div>
	</div>
</template>

<script setup>
const registerKey = ref('')

const regenerateKey = async () => {
	try {
		const response = await $fetch(`${import.meta.env.VITE_API_URL}/auth/generate_key`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});
	  registerKey.value = response.key;
	} catch (error) {
		console.error(error);
	}
};
	
onMounted(async() => {
	try {
		const response = await $fetch(`${import.meta.env.VITE_API_URL}/auth/get_key`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
		registerKey.value = response.key;
	} catch (error) {
		console.log(error);
	}
})
</script>
