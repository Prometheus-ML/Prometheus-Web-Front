<template>
  <div class="relative w-screen h-screen mb-10 lg:mb-20">
		<img src="@/assets/images/hackathon.png" alt="" class="object-cover w-full">
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <p id="test" class="font-bold text-center text-4xl md:text-7xl mb-2 text-white transition-opacity duration-500 ease-in">PROMETHEUS</p>
      <p class="md:text-4xl text-2xl text-center text-white transition-opacity duration-500 ease-in mb-2">HACKATHON</p>
      <p class="text-sm text-center text-red-700 transition-opacity duration-500 ease-in">12월 11일 공개 예정</p>
    </div>

	</div>
</template>

<script setup>
const activeTab = ref('대회정보'); // 기본 탭 설정

const postList = ref([])
const tabs = ref([
  { key: 'information', name: '대회정보', },
  { key: 'participants', name: '참여자',  },
  { key: 'qa', name: 'Q&A',  },
]);

const getPosts = async () => {
  await $fetch(`${import.meta.env.VITE_API_URL}/hackathon/`, {
    method: 'GET',
  })
  .then((result) => {
    postList.value = result;
  })
  .catch((error) => {
		postErr.value = "error.message"
  })
}

const setActiveTab = (tab) => {
	activeTab.value = tab;
};

onMounted(async() => {
  await getPosts();
})
	
// 메소드나 computed 프로퍼티를 정의할 수 있습니다.
// 예를 들어, 탭이 클릭될 때의 동작을 정의할 수 있습니다.
// 탭 내용은 동적으로 로딩하거나 API를 통해 가져올 수 있습니다.
</script>

<style scoped>
/* 필요한 스타일링을 추가할 수 있습니다. */
</style>

