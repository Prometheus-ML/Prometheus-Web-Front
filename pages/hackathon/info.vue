<template>
  <div class="bg-black text-white">
    <div class="p-5 container mx-auto">
      <h1 class="mb-2 text-3xl md:text-5xl font-bold">대회 공지</h1>
      <p class="text-xs md:text-lg font-light">예선, 본선 등 대회 관련 추가 공지가 올라올 예정입니다.</p>
      <div class="p-1 border-b-2"></div>
		</div>
    <div class="pt-24 pb-32">
      <div class="grid grid-cols-5 gap-x-4 container mx-auto">
        <p class="text-2xl md:text-4xl font-bold mr-3 md:mr-12">예선 공지</p>
        <div class="col-span-4 flex-grow">
          <p class="text-xl md:text-2xl font-bold mb-1">예선 일정</p>
          <p class="mb-3 text-sm md:text-lg">예선 기간동안 세부 일정은 다음과 같습니다.</p>
          <hr class="p-1 border-t">
          <div class="grid grid-cols-3 gap-1">
            <div class="py-2 font-semibold text-base md:text-2xl">접수 기간</div>
            <div class="ml-2 py-3 col-span-2 text-sm md:text-xl">01.22(월) - 01.28(일) <span class="text-xs md:text-sm">오후 11시 59분</span></div>
          </div>
          <hr class="p-1 border-t border-neutral-500">
          <div class="grid grid-cols-3 gap-1">
            <div class="py-2 font-semibold text-base md:text-2xl">통과 인원</div>
            <div class="ml-2 py-3 text-sm md:text-lg">20팀 내외</div>
          </div>
          <hr class="p-1 border-t border-neutral-500">
          <div class="grid grid-cols-3 gap-1">
            <div class="py-2 font-semibold text-base md:text-2xl">결과 발표</div>
            <div class="ml-2 col-span-2 py-3 text-sm md:text-lg">01.31(월) <span class="text-xs md:text-sm">오전 11시</span></div>
          </div>
          <hr class="p-1 border-t">
          <p class="mb-2 text-xs md:text-base">* 지원 조건을 충족한 팀에 한하여 팀장에게 예선 제출 안내 메일을 01.22(월) 오전 10시에 일괄적으로 발송해드릴 예정입니다. 안내 메일을 받지 못한 팀은 메일(prometheus0513@gmail.com)로 문의 바랍니다.</p>
          <p class="mb-2 text-xs md:text-base">* 기획안에 넣을 디자인 관련 질문이나, 데이터셋·전처리 관련 질문은 FAQ 게시판을 참고해주시길 바랍니다.</p>
          <p class="mb-12 text-xs md:text-base">* 주의사항: 제출 기한이 지나면 제출 창구가 자동으로 닫힙니다. 이후 어떠한 경우에도 제출이 불가합니다.</p>

          <p class="text-xl md:text-2xl font-bold mb-1">예선 평가 방식</p>
          <p class="mb-3 text-sm md:text-lg">해커톤 심사위원단이 블라인드 심사 방식을 통해 기획안을 평가합니다. 평가 기준은 다음과 같습니다.</p>
          <div class="col-span-4 grid grid-cols-3 md:grid-cols-4">
            <div class="py-3 bg-neutral-800 text-center font-semibold text-sm md:text-lg">심사항목</div>
            <div class="py-3 bg-neutral-800 col-span-2 md:col-span-3 text-center font-semibold text-sm md:text-lg">세부사항</div>
          
            <div class="pt-6 row-span-2 inline-block flex flex-col align-middle font-semibold text-center border-neutral-600 border-b">
              <span class="text-base md:text-xl">주제적합성</span>
              <span class="font-medium text-sm md:text-lg text-red-400">(35점)</span>
            </div>
            <div class="py-3 col-span-2 md:col-span-3 font-semibold text-sm md:text-lg  border-neutral-600 border-b">- 제안 아이디어와 대회 주제의 적합성</div>
            <div class="py-3 col-span-2 md:col-span-3 font-semibold text-sm md:text-lg  border-neutral-600 border-b">- 제안 아이디어의 AI 도입 필요성</div>

          
            <div class="pt-6 row-span-2 inline-block flex flex-col align-middle font-semibold text-center border-neutral-600 border-b">
              <span class="text-base md:text-xl">기술 구현</span>
              <span class="font-medium text-sm md:text-lg text-red-400">(35점)</span>
            </div>
            <div class="py-3 col-span-2 md:col-span-3 font-semibold text-sm md:text-lg border-neutral-600 border-b">- 개발목표 및 개발 내용(방법, 기간 등)의 구체성</div>
            <div class="py-3 col-span-2 md:col-span-3 font-semibold text-sm md:text-lg border-neutral-600 border-b">- 제안 아이디어의 구현 가능성</div>

          
            <div class="py-2 inline-block flex flex-col align-middle font-semibold text-center border-neutral-600 border-b">
              <span class="text-base md:text-xl">창의성</span>
              <span class="font-medium text-sm md:text-lg text-red-400">(20점)</span>
            </div>
            <div class="pt-5 col-span-2 md:col-span-3 font-semibold text-sm md:text-lg border-neutral-600 border-b">- 제안 아이디어의 독창성</div>


            <div class="py-2 inline-block flex flex-col align-middle font-semibold text-center border-neutral-600 border-b">
              <span class="text-base md:text-xl">기대 효과</span>
              <span class="font-medium text-sm md:text-lg text-red-400">(10점)</span>
            </div>
            <div class="pt-5 col-span-2 md:col-span-3 font-semibold text-sm md:text-lg border-neutral-600 border-b">- 사회에 대한 긍정적 영향</div>

          </div>
          <p class="mt-1 mb-24 text-xs md:text-base">* 동점 팀이 발생할 경우, 배점이 높은 항목을 우선하여 순위를 부여합니다.</p>
      
        </div>
      </div>
    </div>
    <div class="pt-24 pb-32 bg-neutral-800">
      <div class="grid grid-cols-5 gap-x-4 container mx-auto">
        <p class="text-xl md:text-4xl font-bold mr-3 md:mr-12">이전 회차 수상작</p>
        <div class="col-span-4 flex-grow">
          <div class="grid grid-col md:grid-cols-2 gap-x-6">
            <div class="mr-4 my-4 overflow-hidden rounded-lg text-sm md:text-xl flex flex-col justify-center items-center">
              <div class="lg:py-4 flex flex-col justify-center text-center text-xs md:text-sm font-semibold overflow-hidden h-full w-full bg-yellow-400 p-3">(1등) 커먼컴퓨터 상 - AI Interprenuers 팀</div>              
              <div class="lg:py-4 flex flex-col justify-center text-center text-xs md:text-sm font-semibold bg-white text-black h-full w-full p-3">AI Enterprenuers	투로잉 : IP 기반 웹툰 텍스트 드로잉 SaaS</div>
            </div>
            <div class="mr-4 my-4 overflow-hidden rounded-lg text-sm md:text-xl flex flex-col justify-center items-center">
              <div class="lg:py-4 flex flex-col justify-center text-center text-xs md:text-sm font-semibold overflow-hidden h-full w-full bg-gray-400 p-3">(2등) 뉴럴웍스랩 상 - 자비스 팀</div>             
              <div class="lg:py-4 flex flex-col justify-center text-center text-xs md:text-sm font-semibold bg-white text-black h-full w-full p-3">AI 보컬 트레이닝 솔루션 Progressing</div>
            </div>
            <div class="mr-4 my-4 overflow-hidden rounded-lg text-sm md:text-xl flex flex-col justify-center items-center">
              <div class="lg:py-4 flex flex-col justify-center text-center text-xs md:text-sm font-semibold overflow-hidden h-full w-full bg-yellow-800 p-3">(3등) AIFactory 상 - 코스메테틱 팀</div>
              <div class="lg:py-4 flex flex-col justify-center text-center text-xs md:text-sm font-semibold bg-white text-black h-full w-full p-3">메이크업샵 가상피팅&매칭 서비스 CosMethetic</div>
            </div>
            <div class="mr-4 my-4 overflow-hidden rounded-lg text-sm md:text-xl flex flex-col justify-center items-center">
              <div class="lg:py-4 flex flex-col justify-center text-center text-xs md:text-sm font-semibold overflow-hidden h-full w-full bg-yellow-800 p-3">(3등) AIFactory 상 - 플러스알파 팀</div>
              <div class="lg:py-4 flex flex-col justify-center text-center text-xs md:text-sm font-semibold bg-white text-black h-full w-full p-3">LIV:Ebook 리비북 : eBook을 읽으면서 생생한 음향 효과를 경험하기까지</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>