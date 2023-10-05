<template>
  <div class="container mx-auto pt-40 pb-24">
    <!-- 타이틀 -->
    <div class="mb-14">
      <p class="font-bold text-4xl md:text-5xl mb-5">후원사</p>
      <p class="font-medium text-gray-600 text-xl text-gray-600">프로메테우스는 다음 기업들의 후원을 받습니다.</p>
    </div>
    
    <div class="mb-14 flex items-center"> <!-- flex 클래스 추가하여 로고와 글귀를 수평 정렬하고 간격 조절 -->
      <div class="grid grid-cols-5 gap-3 justify-center justify-items-center items-center px-4 sm:px-8">
        <img class="w-32 sm:w-48 cursor-pointer transition duration-300 transform hover:scale-150 hover:shadow-lg"
             src="@/assets/images/sponsor/commoncomputer.png" />
				<div></div>
        <img class="w-32 sm:w-48 cursor-pointer transition duration-300 transform hover:scale-150 hover:shadow-lg" 
						 src="@/assets/images/sponsor/neuralworkslab.png">
				<div></div>
        <img class="w-32 sm:w-48 cursor-pointer transition duration-300 transform hover:scale-150 hover:shadow-lg" 
						 src="@/assets/images/sponsor/aifactory.png"/>
        <img class="w-32 sm:w-48 cursor-pointer transition duration-300 transform hover:scale-150 hover:shadow-lg" 
						 src="@/assets/images/sponsor/kingsleyventures.png" />
				<div></div>
        <img class="w-32 sm:w-48 cursor-pointer transition duration-300 transform hover:scale-150 hover:shadow-lg" 
						 src="@/assets/images/sponsor/modulabs.png" />
				<div></div>
        <img class="w-32 sm:w-48 cursor-pointer transition duration-300 transform hover:scale-150 hover:shadow-lg" 
						 src="@/assets/images/sponsor/codeit.png" />
      </div>
    </div>
  </div>
</template>

<script setup>
// function navigateToSponsor(sponsor) {
// 	navigateTo(`/sponsor/${sponsor}`);
// }
</script>
