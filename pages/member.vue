<template>
  <div class="container mx-auto pt-40 pb-24">
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">멤버</p>
      <p class="font-medium text-gray-600 text-xl text-gray-600">프로메테우스의 멤버들</p>
    </div>

    <!-- 탭 -->
		<div class="flex justify-center items-center p-6 text-2xl">
			<div class="flex flex-wrap md:gap-3 text-base md:text-xl justify-center">
				<div
					v-for="(tab, index) in tabs"
					:key="index"
					:class="{
						'font-bold': activeTab === tab.key,
						'text-gray-500 hover:text-gray-800': activeTab !== tab.key,
						'border-b-2 border-black': activeTab === tab.key,
					}"
					@click="setActiveTab(tab.key)"
					class="mr-5 cursor-pointer flex items-center"
				>
					<span class="mx-auto">{{ tab.name }}</span>
				</div>
			</div>
		</div>
		

		<!-- 멤버 리스트 -->
		<div>
			<div class="p-8">
				<ul v-if="activeTab === '1st_gen'" 
						class="flex flex-wrap justify-center gap-9"
				>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_005.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">강동우</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">1, 2기 기획부 부장</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">고려대학교 심리학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_011.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">김다정</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">숙명여자대학교 기계공학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_025.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">김선웅</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">1, 2기 개발부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">한양대학교 인공지능학과 석사과정</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_014.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">김수민</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">1기 홍보부 부장</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">세종대학교 스마트기기공학과</p>
					</li>
					
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_015.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">김수빈</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">1, 2기 기획부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">연세대학교 문헌정보학과, 산업공학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_016.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">김은비</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">1, 2기 기획부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">한국외국어대학교 컴퓨터전자시스템공학부</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_024.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">김준형</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">상명대학교 컴퓨터과학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_010.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">김하얀</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">고려대학교 심리학부</p>
					</li>
					
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_012.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">류다윤</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">한양대학교 경영학부, 빅데이터융합학부 / KB국민은행 데이터 직무</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_017.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">박수연</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">이화여자대학교 컴퓨터공학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_018.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">박지완</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">2기 섭외부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">한국외국어대학교 영어학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_019.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">서동재</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">서울대학교 수리과학부</p>
					</li>
					
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_020.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">서지은</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">덕성여자대학교 수학과, 정보통계학과 / LINE 데이터 분석 직무</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_006.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">손수경</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">2기 기획부 차장</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">숙명여자대학교 IT공학전공</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_021.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">양지연</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">2기 섭외부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">한양대학교 생체공학과 / 서울대학교 뇌인지과학과 석사 과정</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_007.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">이다솔</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">1, 2기 섭외부 부장</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">고려대학교 컴퓨터학과</p>
					</li>
					
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_003.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">이혁준</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">1, 2기 개발부 부장</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">고려대학교 컴퓨터학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_022.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">장지오</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">KAIST 전산학부</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_023.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">정민수</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">2기 섭외부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">고려대학교 생명공학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_008.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">정승은</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">2기 섭외부 차장</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">연세대학교 컴퓨터과학과</p>
					</li>
					
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_001.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">정승훈</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">프로메테우스 Founder 1, 2기 대표</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">세종대학교 인공지능학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_027.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">정지영</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">고려대학교 신소재공학부</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_002.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">정회성</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">1, 2기 총무</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">연세대학교 글로벌융합공학부</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_009.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">조동현</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">1, 2기 개발부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">세종대학교 지능기전공학부</p>
					</li>
					
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_004.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">조현우</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">1기 개발부 차장</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">세종대학교 인공지능학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_026.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">한재연</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">1, 2기 개발부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">한양대학교 수학과 / NAVER 취업</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/1_013.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">황영훈</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">2기 개발부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">한양대학교 철학과 / 스타트업 백엔드 인턴</p>
					</li>
				</ul>
				<ul v-if="activeTab === '2nd_gen'" 
						class="flex flex-wrap justify-center gap-9"
				>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/2_013.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">권미주</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">동덕여자대학교 정보통계학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/2_005.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">김종효</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">2기 개발부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">성균관대학교 소프트웨어학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/2_012.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">김준희</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">2기 개발부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">숙명여자대학교 컴퓨터과학전공</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/2_004.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">김태윤</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">2기 개발부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">서울대학교 컴퓨터공학부</p>
					</li>
					
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/2_010.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">배윤호</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">2기 개발부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">한양대학교 정책학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/2_002.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">변가은</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">2기 홍보부장</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">성균관대학교 건축학과, 데이터사이언스 융합전</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/2_003.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">심수민</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">2기 개발부 차장</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">연세대학교 행정학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets//images/member/2_006.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">여신호</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">세종대학교 정보보호학과</p>
					</li>
					
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/2_011.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">연유정</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">2기 개발부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">고려대학교 산업경영공학부</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/2_015.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">오유진</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">2기 섭외부 부원, 3기 개발부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">이화여자대학교 인공지능학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/2_007.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">이성민</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">2기 섭외부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">한국외국어대학교 컴퓨터공학부</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/2_008.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">최지웅</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">2기 개발부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">한국외국어대학교 포르투갈어과</p>
					</li>
					
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/2_014.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">최태은</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">2기 섭외부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">연세대학교 언더우드국제대학, 경제학 전공, 컴퓨터과학 복수전공</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/2_001.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">황보률</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">2기 기획부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">연세대학교 인공지능학과</p>
					</li>
				</ul>
				<ul v-if="activeTab === '3rd_gen'" 
						class="flex flex-wrap justify-center gap-9"
				>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/3_001.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">권용우</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">한양대학교 물리학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/blank.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">김도현</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">3기 섭외부 차장</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">한양대학교 데이터사이언스학부</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/3_002.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">김예진</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">3기 섭외부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">이화여자대학교 인공지능학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/3_003.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">김준석</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">3기 기획부 차장</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">세종대학교 인공지능학과</p>
					</li>
					
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/3_004.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">남승현</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">이화여자대학교 컴퓨터공학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/3_005.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">모진호</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">3기 개발부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">상명대학교 지능IOT융합전공</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/3_006.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">박은주</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">성신여자대학교 융합보안공학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets//images/member/3_007.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">배아람</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">3기 기획부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">경희대학교 경영대학 경영학과</p>
					</li>
					
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/3_008.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">성원희</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">이화여자대학교 컴퓨터공학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/3_009.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">심하민</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">3기 개발부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">고려대학교 전기전자공학</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/3_010.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">안서연</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">3기 홍보부 차장</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">세종대학교 디자인이노베이션학과, 만화애니메이션학과 복수전공</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/3_011.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">윤선미</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">성신여자대학교 AI융합학부</p>
					</li>
					
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/3_012.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">이대헌</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">한양대학교 자원환경공학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/3_013.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">이지윤</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">연세대학교 생명공학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/3_014.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">임서연</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">3기 홍보부 부원</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">이화여자대학교 인공지능학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/3_015.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">임준섭</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">연세대학교 국어국문학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/3_016.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">장나래</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">숙명여자대학교 청정융합에너지공학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/3_017.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">조우현</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">연세대학교 컴퓨터과학과</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/3_018.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">진유진</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600">3기 섭외부 차장</p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">숙명여자대학교 IT공학전공</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/3_019.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">최민재</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">서울대학교 바이오시스템소재학부</p>
					</li>
					<li class="w-24 md:w-64 text-center">
						<div class="w-24 h-24 md:w-64 md:h-80 mb-2 flex items-center justify-center">
							<img
								src="@/assets/images/member/3_020.jpeg"
								class="w-full h-full object-cover rounded-full md:rounded"
							/>
						</div>
						<p class="text-lg md:text-xl mb-2 font-bold">최 환</p>
						<p class="text-sm md:text-base mb-2 font-medium text-gray-600"></p>
						<p class="text-xs md:text-sm mb-2 text-gray-600">한국외국어대학교 경제학과</p>
					</li>
				</ul>
			</div>
		</div>

    
    
  </div>
</template>


<script setup>
import executives from '@/assets/data/member/executives.json';
import operations from '@/assets/data/member/operations.json';
import firstGenMembers from '@/assets/data/member/first-gen.json';
import secondGenMembers from '@/assets/data/member/second-gen.json';
import thirdGenMembers from '@/assets/data/member/third-gen.json';
import blank from '@/assets/images/member/blank.jpeg';

const tabs = [
  { key: 'executives', name: '창립멤버', data: executives },
  { key: 'operations', name: '운영진', data: operations },
  { key: '1st_gen', name: '1기', data: firstGenMembers },
  { key: '2nd_gen', name: '2기', data: secondGenMembers },
  { key: '3rd_gen', name: '3기', data: thirdGenMembers },
];

const activeTab = ref('executives');
	
const sortMembersByKoreanName = (data) => {
  return data.sort((a, b) => {
    const nameA = a.name;
    const nameB = b.name;

    // localeCompare 함수를 사용하여 한글 이름을 정렬
    return nameA.localeCompare(nameB, 'ko');
  });
};
	
const members = computed(() => {
  const activeTabData = tabs.find((tab) => tab.key === activeTab.value);
  return sortMembersByKoreanName(activeTabData.data);
});

const setActiveTab = (tab) => {
  activeTab.value = tab;
};


</script>
