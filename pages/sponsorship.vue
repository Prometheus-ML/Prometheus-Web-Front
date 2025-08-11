<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 헤더 섹션 -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">후원</h1>
            <p class="text-gray-600 mt-1">프로메테우스의 성장을 함께 만들어주시는 후원사들</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 대표 인사말 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">대표 인사말</h2>
          <div class="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div class="max-w-4xl mx-auto text-gray-700 leading-relaxed">
          <p class="mb-4">
            안녕하세요, 프로메테우스 대표 김지후입니다.
          </p>
          <p class="mb-4">
            프로메테우스는 인공지능을 통해 가치 있는 도전과 경험을 하고자 하는 대학생들이 모인 동아리입니다. 
            저희는 단순히 기술을 배우는 것을 넘어서, 실제로 사회에 기여할 수 있는 프로젝트를 만들어가고 있습니다.
          </p>
          <p class="mb-4">
            이러한 여정에서 저희를 지원해주시는 후원사들의 도움이 큰 힘이 되고 있습니다. 
            후원사들의 지원은 저희가 더 나은 프로젝트를 만들고, 더 많은 학생들이 AI 기술을 배울 수 있도록 
            도와주고 있습니다.
          </p>
          <p>
            앞으로도 프로메테우스는 인공지능 분야의 선두주자로서, 
            후원사들과 함께 더 큰 가치를 창출해 나가겠습니다.
          </p>
        </div>
      </div>

      <!-- 후원사 소개 -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">후원사 소개</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="sponsor in sponsors"
            :key="sponsor.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div class="text-center">
              <img
                :src="sponsor.logo"
                :alt="sponsor.name"
                class="w-32 h-16 object-contain mx-auto mb-4"
              />
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ sponsor.name }}</h3>
              <p class="text-sm text-gray-600 mb-4">{{ sponsor.description }}</p>
              <div class="flex items-center justify-center space-x-2">
                <span
                  v-for="category in sponsor.categories"
                  :key="category"
                  class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {{ category }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 명예의 전당 -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">명예의 전당</h2>
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="honor in honors"
              :key="honor.id"
              class="text-center p-4 border border-gray-200 rounded-lg"
            >
              <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl">🏆</span>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ honor.name }}</h3>
              <p class="text-sm text-gray-600 mb-2">{{ honor.contribution }}</p>
              <div class="flex items-center justify-center space-x-2">
                <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  {{ honor.points }} 포인트
                </span>
                <span
                  v-for="badge in honor.badges"
                  :key="badge"
                  class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                >
                  {{ badge }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 후원하기 CTA -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-center text-white">
        <h2 class="text-3xl font-bold mb-4">프로메테우스와 함께하세요</h2>
        <p class="text-lg mb-6 opacity-90">
          인공지능의 미래를 함께 만들어갈 후원사를 모집하고 있습니다.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="openSponsorshipForm"
            class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            후원하기
          </button>
          <button
            @click="contactUs"
            class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            문의하기
          </button>
        </div>
      </div>

      <!-- 후원 혜택 -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">후원 혜택</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">브랜드 노출</h3>
            <p class="text-sm text-gray-600">프로젝트 발표회, 웹사이트, SNS 등 다양한 채널을 통한 브랜드 노출</p>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">인재 채용</h3>
            <p class="text-sm text-gray-600">우수한 AI 인재들과의 네트워킹 및 채용 기회</p>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">기술 협력</h3>
            <p class="text-sm text-gray-600">AI 기술 개발 및 연구 협력 기회</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 후원 신청 모달 -->
    <div v-if="showSponsorshipModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">후원 신청</h3>
          <p class="text-sm text-gray-600 mb-6">후원에 관심이 있으시면 아래 링크를 통해 신청해주세요.</p>
          
          <div class="space-y-4">
            <a
              href="https://forms.google.com/your-sponsorship-form"
              target="_blank"
              class="block w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors text-center"
            >
              구글폼으로 신청하기
            </a>
            <button
              @click="closeSponsorshipModal"
              class="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 모달 상태
const showSponsorshipModal = ref(false);

// 후원사 데이터
const sponsors = ref([
  {
    id: 1,
    name: 'Common Computer',
    logo: '/sponsors/commoncomputer.png',
    description: 'AI 기술 개발 및 연구 지원',
    categories: ['기술', '연구']
  },
  {
    id: 2,
    name: 'Neural Works Lab',
    logo: '/sponsors/neuralworkslab.png',
    description: '머신러닝 프로젝트 후원',
    categories: ['AI', '머신러닝']
  },
  {
    id: 3,
    name: 'Codeit',
    logo: '/sponsors/codeit.png',
    description: '프로그래밍 교육 및 멘토링',
    categories: ['교육', '멘토링']
  },
  {
    id: 4,
    name: 'ENSL Partners',
    logo: '/sponsors/enslpartners.png',
    description: '창업 및 비즈니스 지원',
    categories: ['창업', '비즈니스']
  },
  {
    id: 5,
    name: 'Modulabs',
    logo: '/sponsors/modulabs.png',
    description: 'AI 연구 및 개발 환경 제공',
    categories: ['연구', '개발']
  },
  {
    id: 6,
    name: 'AI Factory',
    logo: '/sponsors/aifactory.png',
    description: 'AI 프로젝트 인큐베이션',
    categories: ['인큐베이션', 'AI']
  }
]);

// 명예의 전당 데이터
const honors = ref([
  {
    id: 1,
    name: 'Common Computer',
    contribution: 'AI 기술 개발 및 연구 지원',
    points: 1000,
    badges: ['플래티넘', '기술 파트너']
  },
  {
    id: 2,
    name: 'Neural Works Lab',
    contribution: '머신러닝 프로젝트 후원',
    points: 800,
    badges: ['골드', 'AI 파트너']
  },
  {
    id: 3,
    name: 'Codeit',
    contribution: '프로그래밍 교육 및 멘토링',
    points: 600,
    badges: ['실버', '교육 파트너']
  }
]);

// 메서드들
const openSponsorshipForm = () => {
  showSponsorshipModal.value = true;
};

const closeSponsorshipModal = () => {
  showSponsorshipModal.value = false;
};

const contactUs = () => {
  // 문의하기 기능 구현
  console.log('문의하기');
};
</script> 