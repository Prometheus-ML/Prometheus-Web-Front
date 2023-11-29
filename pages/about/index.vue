<template>
	<div>
		<div class="relative h-96 bg-gray-300">
      <div class="container mx-auto h-full">
        <!-- Original icon image -->
        <img alt="PROMETHEUS" src="@/assets/prometheus.jpg" class="absolute z-10 top-80 shadow-lg rounded-lg object-cover w-32 h-32" />

        <img alt="New Image" src="@/assets/images/about.png" class="absolute top-0 left-0 w-full h-full object-cover rounded-lg grayscale opacity-130" />
      </div>
    </div>

		
		<div class="container mx-auto flex-row items-center pt-40 pb-24">
    <!-- 타이틀 -->
			<div class="mb-48">
				<p class="font-bold text-4xl md:text-5xl mb-5">동아리 소개</p>
				<div class="bg-gray-200 w-full h-auto py-5 px-4 rounded-lg">
					<li>'프로메테우스'는 인공지능으로 가치 있는 도전과 경험을 하고자 '업'에 대한 열정을 지닌 대학생들이 모인 인공지능 가치 창출 동아리입니다.</li>
					<li>그저 인공지능을 구현하기 위한 코드를 공부하는 것이 아닌, 인공지능의 활용을 고민하고 가치를 만들어내어 대학 사회에 영감을 주고 싶습니다.</li>
					<li>또한 열정을 지닌 대학생 인재들이 네트워킹할 수 있는 공간이 되어 서로에게 동료, 멘토가 되는 공동체를 지향합니다.</li>
					<li>이를 위해 프로메테우스는 인공지능을 공부하고 프로젝트를 수행하며, 매년 스타트업 해커톤을 주최해 인공지능으로 가치를 찾는 새로운 시도에 도전합니다.</li>
				</div>
			</div>

			<div class="mb-48">
				<p class="font-bold text-4xl md:text-5xl mb-5">핵심가치</p>

				<div class="flex justify-center space-x-8 mb-10">
					<!-- Box 1: 교육 -->
					<div class="flex-1 flex flex-col items-center bg-gray-300 p-6 rounded-lg">
						<font-awesome-icon :icon="['fas', 'school']" class="text-3xl mb-2" />
						<p class="text-lg font-medium">교육</p>
					</div>

					<!-- Box 2: 네트워킹 -->
					<div class="flex-1 flex flex-col items-center bg-gray-300 p-6 rounded-lg">
						<font-awesome-icon icon="users" class="text-3xl mb-2" />
						<p class="text-lg font-medium">네트워킹</p>
					</div>

					<!-- Box 3: 도전 -->
					<div class="flex-1 flex flex-col items-center bg-gray-300 p-6 rounded-lg">
						<font-awesome-icon icon="crown" class="text-3xl mb-2" />
						<p class="text-lg font-medium">도전</p>
					</div>
				</div>

				<div class="bg-rose-200 w-full h-auto py-5 px-4 rounded-lg items-center">
					<p class="text-lg text-rose-500 font-bold text-center">“프로메테우스는 인공지능을 통한 가치있는 도전을 응원합니다.”</p>
				</div>
			</div>

			<div class="mb-48">
				<p class="font-bold text-4xl md:text-5xl mb-5">활동 내용</p>
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
					<div v-for="(section, index) in intro" :key="index">
						<div class="rounded-lg relative h-[200px] lg:h-[300px] bg-center bg-cover" 
								:style="{ backgroundImage : `url(${section.img})`}" 
								@mouseenter="section.hover = true"
								@mouseleave="section.hover = false">
							<div class="rounded-lg absolute w-full h-full z-0 backdrop-grayscale bg-black/60 p-5 sm:p-10 text-white flex flex-col" :class="{ 'backdrop-blur': section.hover }">
								<p class="mt-10 hover:mt-1 text-left lg:text-center whitespace-pre font-bold text-lg lg:text-2xl mb-12 lg:mb-20" id="section"
									:style="{
											transform: section.hover ? 'scale(1.25)' : 'none',
											width: section.hover ? '20px' : '100%',
											transition: 'width 0.5s ease, transform 0.6s ease'
										}"
								>{{ section.title }}</p>
								<p :style="{
											opacity: section.hover ? 1 : 0,
											pointerEvents: section.hover ? 'auto' : 'none',
											transition: 'opacity 0.5s ease, transform 0.5s ease',
											transform: section.hover ? 'translateY(-1.5rem)' : 'none'
										}"
									class="whitespace-normal text-sm lg:text-lg">{{ section.desc }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
				
			<div class="mb-48">
  			<p class="font-bold text-4xl md:text-5xl mb-5">부서 소개</p>

				<div class="flex justify-center">
					<!-- Box 1: 개발부 -->
					<a href="#" class="flex-1 flex flex-col items-center bg-gray-200 p-10 mx-10 rounded-lg hover:bg-gray-700 hover:text-white transition duration-300">
						<img src="@/assets/images/development.png" class="p-5"/>
						<p class="text-xl font-medium">개발부</p>
					</a>

					<!-- Box 2: 기획부 -->
					<a href="#" class="flex-1 flex flex-col items-center bg-gray-200 p-10 mx-10 rounded-lg hover:bg-gray-700 hover:text-white transition duration-300">
						<img src="@/assets/images/plan.png" class="p-5"/>
						<p class="text-xl font-medium">기획부</p>
					</a>
					<!-- Box 4: 섭외부 -->
					<a href="#" class="flex-1 flex flex-col items-center bg-gray-200 p-10 mx-10 rounded-lg hover:bg-gray-700 hover:text-white transition duration-300">
						<img src="@/assets/images/public_relation.png" class="p-5"/>
						<p class="text-xl font-medium">섭외부</p>
					</a>
					<!-- Box 3: 홍보부 -->
					<a href="#" class="flex-1 flex flex-col items-center bg-gray-200 p-10 mx-10 rounded-lg hover:bg-gray-700 hover:text-white transition duration-300">
						<img src="@/assets/images/promotion.png" class="p-5"/>
						<p class="text-xl font-medium">홍보부</p>
					</a>
				</div>
			</div>

			<div class="mb-32">
				<p class="font-bold text-4xl md:text-5xl mb-5">후원사</p>
				<div class="mt-10 grid grid-cols-5 gap-3 justify-center justify-items-center items-center px-4 sm:px-8">
					<img class="w-32 sm:w-48" src="@/assets/images/sponsor/commoncomputer.png" />
					<div></div>
					<img class="w-32 sm:w-48" src="@/assets/images/sponsor/neuralworkslab.png" />
					<div></div>
					<img class="w-32 sm:w-48" src="@/assets/images/sponsor/aifactory.png" />
					<img class="w-32 sm:w-48" src="@/assets/images/sponsor/kingsleyventures.png" />
					<div></div>
					<img class="w-32 sm:w-48" src="@/assets/images/sponsor/modulabs.png" />
					<div></div>
					<img class="w-32 sm:w-48" src="@/assets/images/sponsor/codeit.png" />
				</div>

			</div>

		</div>
	</div>
  
</template>

<script setup>
import projectImage from "@/assets/images/study.jpeg"
import studyImage from "@/assets/images/study.png"
import hackathonImage from "@/assets/images/hackathon.jpg"
import tutoringImage from "@/assets/images/tutoring.jpg"
import seminarImage from "@/assets/images/seminar.jpg"
import expoImage from "@/assets/images/expo.png"

const intro = ref([
  {
    summary: "project",
    img: projectImage,
    title: "프로젝트",
    desc: "프로메테우스는 매 분기별, 인공지능의 다양한 분야를 주제로 팀별 프로젝트를 진행하고 있습니다.",
		hover: false,
  },
  {
    summary: "hackathon",
    img: hackathonImage,
    title: "해커톤",
    desc: "프로메테우스는 인공지능 가치 창출 동아리로서 매년 초 'Prometheus AI Hackathon'을 개최합니다. 인공지능의 활용을 함께 고민하고 소통하여 미래 사회에 힘이 되고자합니다.",
		hover: false,
  },
  {
    summary: "tutoring",
    img: tutoringImage,
    title: "교육 봉사",
    desc: "프로메테우스는 청소년들에게도 좋은 영향력을 주고 싶습니다. 고등학생들에게 프로그래밍, 인공지능이라는 좋은 도구를 가르쳐 학생들이 꿈꾸는 무언가에 도전하게 하고 싶습니다.",
		hover: false,
  },
  {
    summary: "seminar",
    img: seminarImage,
    title: "정기 세미나",
    desc: "프로메테우스는 정기적으로 세미나를 통해 프로젝트 현황 발표를 합니다.",
		hover: false,
  },
	{
    summary: "project",
    img: expoImage,
    title: "박람회 견학",
    desc: "프로메테우스는 박람회 및 대외 공모전에 적극 참여하고 있습니다.",
		hover: false,
	},
	{
    summary: "study",
    img: studyImage,
    title: "기초스터디",
    desc: "프로메테우스는 기초 스터디를 매 기수를 대상으로 진행하고 있습니다.",
		hover: false,
	}
])

function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('이메일이 복사되었습니다.');
  }

const members = ref([]);
const tabs = [
  { key: 0, name: '창립멤버'},
  { key: -1, name: '운영진'},
  { key: 1, name: '1기'},
  { key: 2, name: '2기'},
  { key: 3, name: '3기'},
	{ key: 4, name: '4기'}
];

const activeTab = ref(3);
const activeMember = ref(null);
	
	
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
  if (!activeTab.value) {
    return members.value; // Show all members when no generation is selected
  }
	if(activeTab.value == -1) {
		return members.value.filter((member) => member.executive === true);
	}
	
	return members.value.filter((member) => member.gen === activeTab.value)
  
});

const setActiveTab = (tab) => {
	activeTab.value = activeTab.value === tab? null : tab;
};
	


function toggleMember(memberId) {
  activeMember.value = activeMember.value === memberId ? null : memberId;
}

onMounted(async () => {
  await getMembers();
});

</script>
