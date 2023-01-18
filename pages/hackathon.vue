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
          <p class="text-l mb-2">
            <b>Prometheus Start-Up Company Hackathon</b>
          </p>
          <p class="text-sm mb-2">
            프로메테우스는 인공지능으로 가치 있는 도전과 경험을 하고자
            '스타트업'에 대한 열정을 지닌 대학생들이 모인 인공지능 가치 창출
            동아리입니다. 인공지능과 창업에 관심이 있는 여러분이 프로메테우스의
            해커톤에서 동료와 멘토를 만나 배우고 발전하길 희망합니다.
            프로메테우스는 새로운 가치를 찾는 시도를 통해 이번 해커톤이 대학생
            인공지능/창업 네트워킹의 장이 되기를 바랍니다. <br />
            <br />

            <b>대회 주제</b> <br />
            시장성을 고려한 인공지능 활용 서비스 개발 <br />
            <br />

            <b>대회 일정</b> <br />
            2023/1/19 (목) ~ 2023/1/28 (토) : 해커톤 대회 지원 <br />
            2023/1/29 (일) ~ 2023/1/31 (화) : 참가자 선발 <br />
            2023/2/1 (수) : 참가자 발표 <br />
            2023/2/2 (목) ~ 2023/2/10 (금) : 1주차 멘토링 기간 <br />
            2023/2/11 (토) ~ 2023/2/17 (금) : 2주차 멘토링 기간 <br />
            2023/2/18 (토) ~ 2023/2/24 (금) : 3주차 멘토링 기간 <br />
            2023/2/25 (토) : Demo Day 및 시상식 <br />
            <br />

            <b>대회 장소</b> <br />
            Demo Day 및 시상식 : 역삼 <br />
            Dreaum 멘토링 : 삼성 Uncommon Gallery <br />
            <br />

            <b>대회 상금</b> <br />
            1등 (1팀) | Common Computer 상 | 1,500,000원 <br />
            2등 (1팀) | Neuralworks 상 | 1,000,000원 <br />
            3등 (2팀) | AI Factory 상 | 500,000원 <br />
            <br />

            - 저희 해커톤 대회는 팀 참가자와 개인 참가자를 모두 지원받고
            있습니다. <br />
            - 팀 참가(4~5명)의 경우, 팀장이 팀원까지 함께 등록하는 방식으로
            팀장만 폼을 작성합니다. <br />
            - 개인 참가자의 경우, 지원 이후 다른 개인 참가자들과 팀 매칭을
            진행해드립니다.
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
