<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
    <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <div class="bg-white shadow w-full rounded divide-y divide-gray-200">
        <div class="px-5 py-7">
          <label class="font-semibold text-sm text-gray-600 pb-1 block">유저이름</label>
          <input v-model="userInfo.username" type="text" class="border rounded bg-gray-200 px-3 py-2 mt-1 mb-5 text-sm w-full" readonly />
          <label class="font-semibold text-sm text-gray-600 pb-1 block">이름</label>
          <input v-model="userInfo.name" type="text" class="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full" />
					<label class="font-semibold text-sm text-gray-600 pb-1 block">기수</label>
          <input v-model="userInfo.gen" type="text" class="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full" />
					<label class="font-semibold text-sm text-gray-600 pb-1 block">소속</label>
          <input v-model="userInfo.position" type="text" class="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full" />
					<label class="font-semibold text-sm text-gray-600 pb-1 block">깃허브</label>
          <input v-model="userInfo.github" type="text" class="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full" />
					<label class="font-semibold text-sm text-gray-600 pb-1 block">페이스북</label>
					<input v-model="userInfo.facebook" type="text" class="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full" />
					<label class="font-semibold text-sm text-gray-600 pb-1 block">인스타그램</label>
					<input v-model="userInfo.instagram" type="text" class="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full" />
					<label class="font-semibold text-sm text-gray-600 pb-1 block">트위터</label>
          <input v-model="userInfo.twitter" type="text" class="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full" />
					<label class="font-semibold text-sm text-gray-600 pb-1 block">홈페이지</label>
          <input v-model="userInfo.homepage" type="text" class="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full" />
					<label class="font-semibold text-sm text-gray-600 pb-1 block">자기소개</label>
          <input v-model="userInfo.description" type="text" class="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full" />
          <button @click="updateUserInfo" type="button" class="transition mb-3  duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
            <span class="inline-block mr-2">수정</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
					<button @click="deleteUser" type="button" class="transition mb-3 duration-200 bg-red-500 hover:bg-red-600 focus:bg-red-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
            <span class="inline-block mr-2">삭제</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore)

const userInfo = ref({
  username: null,
	name: null,
	gen: '',
	position: '',
	github: '',
	facebook: '',
	instagram: '',
	twitter: '',
	homepage: '',
	description: '',
});

const deleteUser = async () => {
	try {
		const response = await $fetch(`${import.meta.env.VITE_API_URL}/user/delete_user_by_admin`, {
			method: "DELETE",
      body: {
				username: userInfo.value.username,
			},
      headers: { "Content-Type": "application/json" },
		});
		await authStore.checkAuth();
		if (user.value === userInfo.value.username) await authStore.logout();
		else if(user.value === "admin") navigateTo("/admin");
	} catch (error) {
		console.error(error);
	}
	
}

const updateUserInfo = async () => {
  try {
    const response = await $fetch(`${import.meta.env.VITE_API_URL}/user/update_user_info_by_admin`, {
      method: "POST",
      body: {
				username: userInfo.value.username,
				name: userInfo.value.name,
				gen: userInfo.value.gen,
				position: userInfo.value.position,
				github: userInfo.value.github,
				facebook: userInfo.value.facebook,
				instagram: userInfo.value.instagram,
				twitter: userInfo.value.twitter,
				homepage: userInfo.value.homepage,
				description: userInfo.value.description,
			},
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
		navigateTo("/admin");
    // 수정 완료 후 동작 (예: 페이지 리로드 또는 경로 이동)
  } catch (error) {
    console.error(error);
  }
};

onMounted( async () => {
	try {
		const response = await $fetch(`${import.meta.env.VITE_API_URL}/user/${useRoute().params.id}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
    });
		userInfo.value = response;
	} catch (error) {
		console.error(error);
	}
	if(userInfo.value.username == null) navigateTo("/");
	console.log(userInfo);
});

</script>