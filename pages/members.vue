<template>
	<div class="text-white bg-black">

		<img
      class="absolute inset-0 w-full h-full object-full "
      src="@/assets/design/main6.png"
      alt="Background"

    />

		<div class="w-[70vw] lg:w-[80vw] min-h-screen mx-auto pt-40">
      <div class="mb-12 flex flex-col text-center">
        <p class="font-medium prometheus text-xl lg:text-2xl text-rose-700">Members</p>
        <p class="font-bold text-3xl lg:text-4xl mb-12">멤버</p>
        <p class="font-light text-sm lg:text-lg">프로메테우스에서는 각기 다른 배경과 관심사를 가진 이들이 함께 모여,<br>인공지능을 통해 새로운 가치를 창출하며, 미래를 향한 도전을 이어가고 있습니다.</p>
      </div>

			<div class="flex justify-center items-center p-6 text-2xl">
					<div class="flex flex-wrap gap-2 lg:gap-5 mx-auto w-full detail justify-center">
						<div
							v-for="(tab, index) in tabs"
							:key="index"
							:class="{
								'font-bold': activeTab === tab.key,
								'text-neutral-500 hover:text-neutral-800': activeTab !== tab.key,
								'border-b-2 border-black': activeTab === tab.key,
							}"
							@click="setActiveTab(tab.key)"
							class="mr-4 md:mr-6 cursor-pointer flex items-center"
						>
							<span class="text-xs md:text-base lg:text-xl hover:-translate-y-0.5 hover:scale-105 duration-200 mx-auto z-10">{{ tab.name }}</span>
						</div>
					</div>
				</div>

				<div class="min-h-[50vh]">
					<div class="p-[5vw] auto-rows-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
						<div
							v-for="member in tempMembers"
							:key="member.id"
							class="overflow-hidden rounded-lg hover:drop-shadow-xl hover:opacity-50"
						>
							<button class="flex flex-col w-full h-full flex flex-col p-[1vw] items-center rounded-xl bg-white bg-opacity-20 backdrop-blur-lg inner-shadow">
								<!-- Thumbnail -->
								<img
									:src="member.image ? '/api/proxy/image?id=' + member.image : mainImage"
									class="w-[55%] aspect-[1/1] object-cover rounded-full my-2"
									@error="handleImageError($event)"
								/>
								
							<!-- Post Content -->
							<div class="flex flex-col items-center pb-3 mx-5">
								<div>
									<p class="font-medium truncate text-sm md:text-base lg:text-lg mb-3 line-clamp-2">
											{{ member.name }}
										</p>
									<p class="font-light flex-grow text-xs text-wrap">
										{{ member.major }}
									</p>
									
								</div>
								
									<!-- Tags -->
									<!-- <div v-if="post.tags && post.tags.length" class="mt-3 flex flex-wrap gap-2">
										<span
											v-for="tag in post.tags"
											:key="tag"
											class="px-2 py-1 bg-rose-100 text-rose-700 rounded-full text-xs"
										>
											#{{ tag }}
										</span>
									</div> -->
              </div>
            </button>
          </div>
        </div>
      </div>
		</div>
	</div>
  
</template>

<script setup>
import mainImage from '@/assets/design/logo2.png';

const currentTab = ref(6)
const type = "members"

const members = ref([]);
const tabs = [
  { key: 0, name: '창립멤버'},
  { key: -1, name: '운영진'},
  { key: 1, name: '1기'},
  { key: 2, name: '2기'},
  { key: 3, name: '3기'},
	{ key: 4, name: '4기'},
	{ key: 5, name: '5기'},
  { key: 6, name: '6기'}
];

const activeTab = ref(6);
	
const tempMembers = ref(
	[
  {
    "image": "1uXbajX-yUUv-BXF1wjXLdGVX0zIMolC9",
    "gen": -1,
    "name": "관리자",
    "major": "jinhomo03@gmail.c omjinhomo03@gmail.comjinh omo03@gmail.com",
    "github": null,
    "position": null,
		"executive": true
  },
  {
    "image": null,
    "gen": 2,
    "name": "test",
    "major": "test3@gmail.com",
    "github": null,
    "position": [],
		"executive": true
  },
  {
    "image": null,
    "gen": 2,
    "name": "test5",
    "major": "testtest@notion.com",
    "github": null,
    "position": [
      "나는",
      "그냥",
      "테스트"
    ],
		"executive": true
  },
  {
    "image": "string",
    "gen": 0,
    "name": "모진호",
    "major": "mjhsun2003@gmail.com",
    "github": "jinhomo03@gmail.com",
    "position": [
      "개발차장"
    ],
		"executive": true
  },
  {
    "image": null,
    "gen": 5,
    "name": "TEST2",
    "major": "test2@gmail.com",
    "github": null,
    "position": [
      "사람"
    ],
		"executive": true
  }
]
);

const getMembers = async () => {
	try {
		const response = await $fetch(`${import.meta.env.VITE_API_URL}/member/show_all_members`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});
		members.value = response;
	} catch (error) {
		console.error(error);
	}
};
	
const filteredMembers = computed(() => {
	members.value.sort((a, b) => a.name.localeCompare(b.name));
  if (activeTab.value === null) {
		return members.value;
	} else if (activeTab.value === -1) {
		const executiveMembers = members.value.filter((member) => member.executive === true);

    return executiveMembers.sort((a, b) => {
      const order = ["5기 대표", "5기 부대표", "5기 총무", "5기 개발부 부장", "5기 기획부 부장", "5기 홍보부 부장", "5기 개발부 차장", "5기 기획부 차장", "5기 홍보부 차장"];
      const getPositionIndex = (member) => order.indexOf(member.positions.slice(-1)[0]);
  		return getPositionIndex(a) - getPositionIndex(b);
    });
  }

  return members.value.filter((member) => member.gen == activeTab.value);
});

const setActiveTab = (tab) => {
	activeTab.value = activeTab.value === tab? null : tab;
};
	

onMounted(async () => {
  await getMembers();
});

</script>


<style>
.custom {
	max-width: 960px;
}

.custom-padding {
	padding: 6.5rem;
}
</style>
