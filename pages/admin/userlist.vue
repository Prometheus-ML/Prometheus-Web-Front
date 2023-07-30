<template>
  <div class="container mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">관리자 페이지</p>
    </div>

    <div class="relative mt-4 flex justify-between items-center mb-15">
			<h2 class="text-2xl md:text-3xl font-semibold mb-6">유저 정보</h2>
			<div class="flex justify-start items-center">
				 <h2 class="text-lg font-semibold whitespace-nowrap mr-4">기수 :</h2>
				<select v-model="searchGen" class="bg-gray-100 w-full px-3 py-2 rounded shadow">
					<option value="">전체</option>
					<option v-for="gen in gens" :key="gen" :value="gen">{{ gen }}</option>
				</select>
			</div>
		</div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        class="relative bg-white p-4 rounded shadow flex items-center justify-between"
				:class="{'bg-gray-300': user.active === 'none'}"
				@click="userMenuOpen = user.username"
      >
        <div class="grid grid-cols-2 gap-4 items-center">
          <div>
						<h2 class="text-lg font-semibold">{{ user.username }}</h2>
            <p class="text-sm text-gray-500">{{ user.name }}</p>
          </div>
					
					<div id="userMenu"
          v-show="userMenuOpen === user.username"
          class="absolute border right-0 mt-5 w-48 font-normal rounded-lg z-100 bg-white"
        	>
						<!-- User Menu -->
						<ul>
							<li><nuxt-link :to="`/account/${user.username}`" class="block px-3 py-2">정보수정</nuxt-link></li>
							<li><button class="block px-3 py-2" @click="toggleUserStatus(user.username)">상태변경</button></li>
						</ul>
					</div>
					
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const userMenuOpen = ref(null);
const searchGen = ref('');
const gens = [1, 2, 3, 4];
const users = ref([]);

const filteredUsers = computed(() => {
  let filtered = users.value;

  if (searchGen.value) {
    filtered = filtered.filter((user) => user.gen === Number(searchGen.value));
  }

  return filtered;
});

const toggleUserStatus = async (username) => {
  try {
    const response = await $fetch(`${import.meta.env.VITE_API_URL}/user/update_active`, {
			method: 'PUT',
			body: JSON.stringify({ username }),
			headers: { 'Content-Type': 'application/json' }
		})
		const userToUpdate = users.value.find((user) => user.username === username);
    if (userToUpdate) {
      userToUpdate.active = response.message; // Assuming the response has an 'active' property
    }
		toggleUserMenu(null);
  } catch (error) {
    console.error(error);
  }
};
	
const toggleUserMenu = (username) => {
	userMenuOpen.value = userMenuOpen.value === null ? username : null;
}

const getUsers = async () => {
	try {
		const response = await $fetch(`${import.meta.env.VITE_API_URL}/user/get_all_User`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
		// const data = await response.json();
		users.value = response
	} catch (error) {
		console.error(error)
	}
}

onMounted(async () => {
	getUsers();
})

onBeforeMount(async () => {
	document.addEventListener('mouseup', function(e) {
		var container = document.getElementById('userMenu');
		if (!container?.contains(e.target)) {
			userMenuOpen.value = null;
		}
	})
})
</script>