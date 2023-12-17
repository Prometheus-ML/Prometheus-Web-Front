<template>
  <div class="bg-black text-white">
    <div class="pt-24 pb-32">
      <div class="grid grid-cols-5 gap-x-4 container mx-auto">
        <p class="text-xl md:text-4xl font-bold">대회 안내</p>
        <div class="col-span-4 flex-grow">
          <hr class="p-1 border-t">
          <div class="grid grid-cols-4 gap-1">
            <div class="py-3 row-span-3 font-semibold text-base md:text-2xl">주제</div>
            <div class="py-4 col-span-3 text-sm md:text-xl">시장성을 고려한 인공지능 활용 서비스 개발, Chat GPT를 활용한 서비스 개발</div>

          </div>
          <hr class="p-1 border-t border-neutral-500">
          <div class="grid grid-cols-4 gap-1">
            <div class="py-3 row-span-3 font-semibold text-base md:text-2xl">참가 대상</div>
            <div class="pt-3 col-span-3 text-sm md:text-xl">- 인원: 약 60~80명 (한 팀당 4~5인으로 구성)</div>
            <div class="pt-3 col-span-3 text-sm md:text-xl">- 서비스 개발과 인공지능에 관심을 지닌 전국 대학생</div>
            <div class="py-3 col-span-3 text-sm md:text-xl">- 본 행사 기간동안 열리는 온/오프라인 행사에 참여가 가능한 자</div>
          </div>
          <hr class="p-1 border-t">
        </div>
      </div>
    </div>
    <div class="pt-24 bg-neutral-800 pb-32">
      <div class="grid grid-cols-5 gap-x-4 container mx-auto">
        <p class="text-xl md:text-4xl font-bold">대회 혜택</p>
          <div class="col-span-4 flex-grow">
            <hr class="p-1 border-t">
            <div class="grid grid-cols-3 md:grid-cols-4 gap-1">
              <div class="py-3 row-span-3 font-semibold text-base md:text-2xl">상금</div>
              <div class="mr-2 my-4 col-span-2 md:col-span-1 overflow-hidden rounded-lg text-sm md:text-xl flex flex-col justify-center items-center">
                <div class="lg:py-4 flex flex-col justify-center text-center text-base font-semibold overflow-hidden h-full w-full bg-neutral-600 p-3">대상 (1팀)</div>
                <div class="lg:py-4 flex flex-col justify-center text-center text-base font-semibold bg-white text-black h-full w-full p-3">2,000,000 원</div>
              </div>
              <div class="mr-2 my-4 col-span-2 md:col-span-1 overflow-hidden rounded-lg text-sm md:text-xl flex flex-col justify-center items-center">
                <div class="lg:py-4 flex flex-col justify-center text-center text-base font-semibold overflow-hidden h-full w-full bg-neutral-600 p-3">최우수상 (1팀)</div>
                <div class="lg:py-4 flex flex-col justify-center text-center text-base font-semibold bg-white text-black h-full w-full p-3">1,000,000 원</div>
              </div>
              <div class="mr-2 my-4 col-span-2 md:col-span-1 overflow-hidden rounded-lg text-sm md:text-xl flex flex-col justify-center items-center">
                <div class="lg:py-4 flex flex-col justify-center text-center text-base font-semibold overflow-hidden h-full w-full bg-neutral-600 p-3">우수상 (2팀)</div>
                <div class="lg:py-4 flex flex-col justify-center text-center text-base font-semibold bg-white text-black h-full w-full p-3">1,500,000 원</div>
              </div>

            </div>
            <hr class="p-1 border-t border-neutral-500">
            <div class="grid grid-cols-4 gap-1">
              <div class="py-3 font-semibold text-base md:text-2xl">특전</div>
              <div class="py-4 col-span-3 text-sm md:text-xl">예선/본선 진출팀 OpenAI Credit 지원</div>
            </div>
            <hr class="p-1 border-t">
          </div>
      </div>
    </div>
    <div class="pt-24 pb-32">
      <div class="grid grid-cols-5 gap-x-4 container mx-auto">
        <p class="text-xl md:text-4xl font-bold">대회 일정</p>
        <div class="col-span-4 flex-grow">
          <hr class="p-1 border-t">
          <div class="grid grid-cols-4 gap-1">
            <div class="py-3 font-semibold text-base md:text-2xl">지원 기간</div>
            <div class="ml-2 pt-4 col-span-3 text-sm md:text-xl">12.18(월) - 01.21(일)</div>
          </div>
          <hr class="p-1 border-t  border-neutral-500">
          <div class="grid grid-cols-4 gap-1">
            <div class="py-3 font-semibold text-base md:text-2xl">예선</div>
            <div class="ml-2 py-4 text-sm md:text-xl">01.22(월) - 01.28(일)</div>
            <div class="ml-2 py-4 font-light text-xs md:text-lg">온라인으로 진행</div>
          </div>
          <hr class="p-1 border-t border-neutral-500">
          <div class="grid grid-cols-4 gap-1">
            <div class="py-3 font-semibold text-base md:text-2xl">본선</div>
            <div class="ml-2 py-4 text-sm md:text-xl">02.02(금) - 02.03(토)</div>
            <div class="ml-2 py-4 col-span-2 font-light text-xs md:text-lg">팁스타운에서 진행</div>
          </div>
          <hr class="p-1 border-t">
        </div>
      </div>
    </div>
    <div class="pt-24 bg-neutral-800 pb-32">
      <div class="grid grid-cols-5 gap-x-4 container mx-auto">
        <p class="text-xl md:text-4xl font-bold">후원사</p>
        <div class="rounded-lg col-span-4 my-15 grid grid-cols-3 gap-3 justify-center justify-items-center items-center px-4 sm:px-8">
					<img class="w-full h-full object-cover p-5 bg-neutral-300" src="@/assets/images/sponsor/ncsoft.png" />
					<img class="w-full h-full object-cover p-5 bg-neutral-300" src="@/assets/images/sponsor/enslpartners.png" />
					<img class="w-full h-full object-cover p-5 bg-neutral-300" src="@/assets/images/sponsor/line.png" />
					<img class="w-full h-full object-cover p-5 bg-neutral-300" src="@/assets/images/sponsor/deepnoid.png" />
					<img class="w-full h-full object-cover p-5 bg-neutral-300" src="@/assets/images/sponsor/intel.png" />

				</div>
      </div>
    </div>
  </div>
</template>