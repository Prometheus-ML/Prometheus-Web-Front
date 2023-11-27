<template>
  <div class="container mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">참여자 페이지</p>
    </div>

    <div class="flex justify-center items-center p-6 text-2xl relative">
      <div class="flex  justify-center transform mx-auto bg-red-100 w-full py-16 mb-32">
        <p class="text-align-center text-red-800">12월에 공개 예정</p>
      </div>
      <div class="flex flex-wrap md:gap-3 text-base md:text-xl justify-center">
        <!-- 탭 코드가 여기에 올 것입니다. -->
      </div>
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

